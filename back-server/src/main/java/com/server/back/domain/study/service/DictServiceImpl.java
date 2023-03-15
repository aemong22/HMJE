package com.server.back.domain.study.service;


import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional
@Service
public class DictServiceImpl implements DictService{

	private final WordRepository wordRepository;
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

	@Override
	public List<Word> getDictList(DictRequestDto dictRequestDto) {
		int page = dictRequestDto.getPage();
		Pageable pageable = PageRequest.of(page, 10); // 페이지네이션. 10개씩 보여줌.
		List<Word> wordList = wordRepository.findByWordNameStartsWith(dictRequestDto.getKeyword(), pageable).getContent(); // 키워드와 페이지네이션 한 결과값 출력

		return wordList;
	}


	@Override
	public List<Word> getDictListWithFilter(DictRequestDto dictRequestDto) {
		int page = dictRequestDto.getPage();
		Pageable pageable = PageRequest.of(page, 10); // 페이지네이션. 10개씩 보여줌.
		String[] filters = wordFilter.get(dictRequestDto.getFilter());
		String startFilter = filters[0];
		String endFilter = filters[1];
		List<Word> wordList = wordRepository.findAllByWordNameAndFilterAndPaging(startFilter, endFilter, dictRequestDto.getKeyword(), pageable).getContent(); // 필터 정보를 넣고 검색
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
	public Word getDict(Long wordId) {
		Word word = wordRepository.findByWordId(wordId);
		return word;
	}

}
