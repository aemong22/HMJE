package com.server.back.domain.study.dto;


import com.server.back.domain.study.entity.WordExample;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WordExampleResponseDto {
	private String exampleType;
	private String exampleDetail;

	public static WordExampleResponseDto fromEntity(WordExample wordExample) {
		WordExampleResponseDto wordExampleResponseDto = WordExampleResponseDto.builder()
			.exampleType(wordExample.getExampleType())
			.exampleDetail(wordExample.getExampleDetail())
			.build();

		return wordExampleResponseDto;
	}

	public static List<WordExampleResponseDto> fromEntityList(List<WordExample> wordExampleList){
		List<WordExampleResponseDto> result = new ArrayList<>();
		for (WordExample wordExample : wordExampleList) {
			WordExampleResponseDto wordExampleResponseDto = fromEntity(wordExample);
			result.add(wordExampleResponseDto);
		}
		return result;
	}


}
