package com.server.back.domain.study.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PastTestResultRequestDto {
	private Long userId;
	private Long pastTestId;
	private Integer score;
}
