package com.server.back.domain.study.dto;


import com.server.back.domain.study.entity.Word;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WordResponseDto {

	private Long wordId;
	private String wordName;
	private Integer wordIso;
	private String wordType;
	private String wordRating;
	private String wordOrigin;

	private List<WordDetailResponseDto> wordDetailResponseList;

	public static WordResponseDto fromEntity(Word word) {
		WordResponseDto wordResponseDto = WordResponseDto.builder()
		                                                 .wordId(word.getWordId())
		                                                 .wordName(word.getWordName())
		                                                 .wordIso(word.getWordIso())
		                                                 .wordType(word.getWordType())
		                                                 .wordRating(word.getWordRating())
		                                                 .wordOrigin(word.getWordOrigin())
		                                                 .wordDetailResponseList(WordDetailResponseDto.fromEntityList(word.getWordDetailList()))
		                                                 .build();

		return wordResponseDto;
	}

	public static List<WordResponseDto> fromEntityList(List<Word> wordList){
		List<WordResponseDto> result = new ArrayList<>();
		for (Word word : wordList) {
			WordResponseDto wordResponseDto = fromEntity(word);
			result.add(wordResponseDto);
		}
		return result;
	}

}
