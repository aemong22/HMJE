package com.server.back.domain.study.dto;



import com.server.back.domain.study.entity.PastTestResult;
import com.server.back.domain.user.dto.BadgeResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PastTestResultResponseDto {
	private String nickname;
	private BadgeResponseDto nowBadge;
	private Integer level;
	private Integer score;

	public static PastTestResultResponseDto fromEntity(PastTestResult pastTestResult) {
		PastTestResultResponseDto pastTestResultResponseDto = PastTestResultResponseDto.builder()
														.nickname(pastTestResult.getUser().getNickname())
														.nowBadge(BadgeResponseDto.fromEntity(pastTestResult.getUser().getNowBadge()))
														.level(pastTestResult.getUser().getLevel())
														.score(pastTestResult.getScore())
						                                .build();

		return pastTestResultResponseDto;
	}

	public static List<PastTestResultResponseDto> fromEntityList(List<PastTestResult> pastTestResultList) {
		List<PastTestResultResponseDto> result = new ArrayList<>();
		for (PastTestResult pastTestResult : pastTestResultList) {
			PastTestResultResponseDto pastTestResultResponseDto = PastTestResultResponseDto.fromEntity(pastTestResult);
			result.add(pastTestResultResponseDto);
		}
		return result;
	}

}
