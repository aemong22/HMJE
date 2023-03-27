package com.server.back.domain.study.service;


import com.server.back.domain.study.dto.DailyWordResponseDto;
import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.dto.RemainWordResponseDto;
import com.server.back.domain.study.dto.WordResponseDto;

import java.util.List;


public interface WordService {
	List<WordResponseDto> getDictList(DictRequestDto dictRequestDto);
	List<WordResponseDto> getDictListWithFilter(DictRequestDto dictRequestDto);
	Integer getWordCount(DictRequestDto dictRequestDto);
	Integer getWordCountWithFilter(DictRequestDto dictRequestDto);
	WordResponseDto getDict(Long wordId);

	List<WordResponseDto> getWrongWordList(Long userId);
//	List<WordResponseDto> getWrongWordList(Long userId, Integer page);
//	List<WordResponseDto> getWrongWordQuestion(Long userId);
//	Integer getWrongWordCount(Long userId);

	List<DailyWordResponseDto> getDailyWordList();

	RemainWordResponseDto getRemainWordCnt(Long userId);

}
