package com.server.back.domain.study.dto;


import com.server.back.domain.study.entity.WordDetail;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WordDetailResponseDto {
	private String details;
	private Integer detailNum;
	private List<WordExampleResponseDto> wordExampleResponseList;

	public static WordDetailResponseDto fromEntity(WordDetail wordDetail) {
		WordDetailResponseDto wordDetailResponseDto = WordDetailResponseDto.builder()
			.details(wordDetail.getDetails())
			.detailNum(wordDetail.getDetailNum())
			.wordExampleResponseList(WordExampleResponseDto.fromEntityList(wordDetail.getWordExampleList()))
			.build();


		return wordDetailResponseDto;
	}

	public static List<WordDetailResponseDto> fromEntityList(List<WordDetail> wordDetailList){
		List<WordDetailResponseDto> result = new ArrayList<>();
		for (WordDetail wordDetail : wordDetailList) {
			WordDetailResponseDto wordDetailResponseDto = fromEntity(wordDetail);
			result.add(wordDetailResponseDto);
		}
		return result;
	}


}
