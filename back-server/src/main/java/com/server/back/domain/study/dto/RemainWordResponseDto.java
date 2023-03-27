package com.server.back.domain.study.dto;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "RemainWordResponseDto")
public class RemainWordResponseDto {
	private Integer lowWordCnt;
	private Integer middleWordCnt;
	private Integer highWordCnt;
	private Integer remainLowWordCnt;
	private Integer remainMiddleWordCnt;
	private Integer remainHighWordCnt;
}
