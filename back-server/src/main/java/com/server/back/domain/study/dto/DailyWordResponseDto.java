package com.server.back.domain.study.dto;


import com.server.back.domain.study.entity.DailyWord;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyWordResponseDto {
	private String category;
	private WordResponseDto wordResponseDto;
	private Integer score;

	public static DailyWordResponseDto fromEntity(DailyWord dailyWord) {
		DailyWordResponseDto dailyWordResponseDto = DailyWordResponseDto.builder()
			.category(dailyWord.getCategory())
			.wordResponseDto(WordResponseDto.fromEntity(dailyWord.getWord()))
			.score(dailyWord.getScore())
			.build();

		return dailyWordResponseDto;

	}

	public static List<DailyWordResponseDto> fromEntityList(List<DailyWord> dailyWordList){
		List<DailyWordResponseDto> result = new ArrayList<>();
		for (DailyWord dailyWord : dailyWordList) {
			DailyWordResponseDto dailyWordResponseDto = fromEntity(dailyWord);
			result.add(dailyWordResponseDto);
		}
		return result;
	}



}
