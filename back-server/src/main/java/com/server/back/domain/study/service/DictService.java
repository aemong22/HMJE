package com.server.back.domain.study.service;


import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.entity.Word;

import java.util.List;


public interface DictService {
	List<Word> getDictList(DictRequestDto dictRequestDto);
	List<Word> getDictListWithFilter(DictRequestDto dictRequestDto);
	Integer getWordCount(DictRequestDto dictRequestDto);
	Integer getWordCountWithFilter(DictRequestDto dictRequestDto);
	Word getDict(Long wordId);

}
