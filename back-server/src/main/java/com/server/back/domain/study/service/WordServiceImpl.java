package com.server.back.domain.study.service;


import com.server.back.domain.study.dto.DailyWordResponseDto;
import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.dto.RemainWordResponseDto;
import com.server.back.domain.study.dto.WordResponseDto;
import com.server.back.domain.study.entity.DailyWord;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.study.repository.DailyWordRepository;
import com.server.back.domain.study.repository.RightWordRepository;
import com.server.back.domain.study.repository.WordRepository;
import com.server.back.domain.study.repository.WrongWordRepository;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional
@Service
public class WordServiceImpl implements WordService {

	private final WordRepository wordRepository;
	private final DailyWordRepository dailyWordRepository;
	private final Map<String, String[]> wordFilter = new HashMap<>(){ // 필터링에 사용할 맵 생성
		{
			put("가", new String[] {"가", "나"});
			put("나", new String[] {"나", "다"});
			put("다", new String[] {"다", "라"});
			put("라", new String[] {"라", "마"});
			put("마", new String[] {"마", "바"});
			put("바", new String[] {"바", "사"});
			put("사", new String[] {"사", "아"});
			put("아", new String[] {"아", "자"});
			put("자", new String[] {"자", "차"});
			put("차", new String[] {"차", "카"});
			put("카", new String[] {"카", "타"});
			put("타", new String[] {"타", "파"});
			put("파", new String[] {"파", "하"});
			put("하", new String[] {"하", "힣"});
		}
	};
	private final UserRepository userRepository;
	private final RightWordRepository rightWordRepository;
	private final WrongWordRepository wrongWordRepository;


	@Override
	public List<WordResponseDto> getDictList(DictRequestDto dictRequestDto) {
		int page = dictRequestDto.getPage();
		Pageable pageable = PageRequest.of(page, 10); // 페이지네이션. 10개씩 보여줌.
		List<WordResponseDto> wordList = WordResponseDto.fromEntityList(wordRepository.findByWordNameStartsWith(dictRequestDto.getKeyword(), pageable).getContent()); // 키워드와 페이지네이션 한 결과값 출력

		return wordList;
	}


	@Override
	public List<WordResponseDto> getDictListWithFilter(DictRequestDto dictRequestDto) {
		int page = dictRequestDto.getPage();
		Pageable pageable = PageRequest.of(page, 10); // 페이지네이션. 10개씩 보여줌.
		String[] filters = wordFilter.get(dictRequestDto.getFilter());
		String startFilter = filters[0];
		String endFilter = filters[1];
		List<WordResponseDto> wordList = WordResponseDto.fromEntityList(wordRepository.findAllByWordNameAndFilterAndPaging(startFilter, endFilter, dictRequestDto.getKeyword(), pageable).getContent()); // 필터 정보를 넣고 검색
		return wordList;
	}


	@Override
	public Integer getWordCount(DictRequestDto dictRequestDto) {
		return wordRepository.countAllByWordNameStartsWith(dictRequestDto.getKeyword());
	}


	@Override
	public Integer getWordCountWithFilter(DictRequestDto dictRequestDto) {
		String[] filters = wordFilter.get(dictRequestDto.getFilter());
		String startFilter = filters[0];
		String endFilter = filters[1];
		Integer wordCount = wordRepository.countAllByWordNameAndFilterAndPaging(startFilter, endFilter, dictRequestDto.getKeyword()); // 전체 페이지를 위해서 전체 갯수 보내줌
		return wordCount;
	}


	@Override
	public WordResponseDto getDict(Long wordId) {
		WordResponseDto word = WordResponseDto.fromEntity(wordRepository.findByWordId(wordId));
		return word;
	}


//	@Override
//	public List<WordResponseDto> getWrongWordList(Long userId, Integer page) {
//		Pageable pageable = PageRequest.of(page, 10); // 페이지네이션. 10개씩 보여줌.
//		User user = userRepository.findByUserId(userId);
//		List<Word> wordList = new ArrayList<>();
//		List<WrongWord> wrongWordList = wrongWordRepository.findByUser(user, pageable).getContent(); // 페이지네이션 하여 10개만 뽑아서 보내줌
//
//		for (WrongWord wrongWord : wrongWordList) {
//			Word word = wrongWord.getWord();
//			wordList.add(word);
//		}
//
//		List<WordResponseDto> result = WordResponseDto.fromEntityList(wordList);
//
//		return result;
//	}


	@Override
	public List<WordResponseDto> getWrongWordList(Long userId) {
		User user = userRepository.findByUserId(userId);
		List<Word> wordList = new ArrayList<>();
		List<WrongWord> wrongWordList = wrongWordRepository.findAllByUserOrderByCreatedAtDesc(user);
		for (WrongWord wrongWord : wrongWordList) {
			Word word = wrongWord.getWord();
			wordList.add(word);
		}
		List<WordResponseDto> result = WordResponseDto.fromEntityList(wordList);

		return result;
	}


	@Override
	public List<DailyWordResponseDto> getDailyWordList() {
		// 최신 80개 반환하는걸로 로직 수정.
		LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusDays(2), LocalTime.of(0,0,0)); //이틀전 00:00:00
		LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59)); //오늘 23:59:59
		List<DailyWord> dailyWordList = dailyWordRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(startDatetime, endDatetime);
		List<DailyWordResponseDto> dailyWordResponseDtoList = DailyWordResponseDto.fromEntityList(dailyWordList.subList(0,80));

		return dailyWordResponseDtoList;
	}


	@Override
	public RemainWordResponseDto getRemainWordCnt(Long userId) {
		User user = userRepository.findByUserId(userId);

		int lowWordCnt = wordRepository.countAllByWordRating("초급");
		System.out.println("lowWordCnt = " + lowWordCnt);
		int middleWordCnt = wordRepository.countAllByWordRating("중급");
		System.out.println("middleWordCnt = " + middleWordCnt);
		int highWordCnt = wordRepository.countAllByWordRating("고급");
		System.out.println("highWordCnt = " + highWordCnt);

		int myLowWordCnt = rightWordRepository.findAllByFilterAndUser(user, "초급").size();
		System.out.println("myLowWordCnt = " + myLowWordCnt);
		int mymiddleWordCnt = rightWordRepository.findAllByFilterAndUser(user, "중급").size();
		System.out.println("mymiddleWordCnt = " + mymiddleWordCnt);
		int myhighWordCnt = rightWordRepository.findAllByFilterAndUser(user, "고급").size();
		System.out.println("myhighWordCnt = " + myhighWordCnt);

		RemainWordResponseDto result = RemainWordResponseDto.builder()
										.lowWordCnt(lowWordCnt)
										.middleWordCnt(middleWordCnt)
										.highWordCnt(highWordCnt)
					                    .remainLowWordCnt(lowWordCnt - myLowWordCnt)
					                    .remainMiddleWordCnt(middleWordCnt - mymiddleWordCnt)
					                    .remainHighWordCnt(highWordCnt - myhighWordCnt)
							            .build();

		return result;
	}

	//	@Override
//	public Integer getWrongWordCount(Long userId) {
//		User user = userRepository.findByUserId(userId);
//		Integer wrongWordCount = wrongWordRepository.countAllByUser(user);
//		return wrongWordCount;
//	}

}
