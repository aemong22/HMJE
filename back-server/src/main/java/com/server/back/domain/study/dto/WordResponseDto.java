package com.server.back.domain.study.dto;


import com.server.back.domain.study.entity.Word;
import lombok.*;

import java.util.ArrayList;
import java.util.Base64;
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

	@Builder.Default
	private Boolean isFailed = false;

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

	public static WordResponseDto fromEntityToEncode(Word word) {
		WordResponseDto wordResponseDto = WordResponseDto.builder()
		                                                 .wordId(word.getWordId())
		                                                 .wordName(Base64.getEncoder().withoutPadding().encodeToString(word.getWordName().getBytes()))
		                                                 .wordIso(word.getWordIso())
		                                                 .wordType(word.getWordType())
		                                                 .wordRating(word.getWordRating())
		                                                 .wordOrigin(word.getWordOrigin())
		                                                 .wordDetailResponseList(WordDetailResponseDto.fromEntityList(word.getWordDetailList()))
		                                                 .build();

		return wordResponseDto;
	}
	public static WordResponseDto fromEntityToEncodeAndFailed(Word word) {
		WordResponseDto wordResponseDto = WordResponseDto.builder()
		                                                 .wordId(word.getWordId())
		                                                 .wordName(Base64.getEncoder().withoutPadding().encodeToString(word.getWordName().getBytes()))
		                                                 .wordIso(word.getWordIso())
		                                                 .wordType(word.getWordType())
		                                                 .wordRating(word.getWordRating())
		                                                 .wordOrigin(word.getWordOrigin())
		                                                 .wordDetailResponseList(WordDetailResponseDto.fromEntityList(word.getWordDetailList()))
		                                                 .isFailed(true)
		                                                 .build();

		return wordResponseDto;
	}

	public static List<WordResponseDto> fromEntityListToEncode(List<Word> wordList){
		List<WordResponseDto> result = new ArrayList<>();
		for (Word word : wordList) {
			WordResponseDto wordResponseDto = fromEntityToEncode(word);
			result.add(wordResponseDto);
		}
		return result;
	}

}
