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
@ApiModel(value = "DictRequestDto")
public class DictRequestDto {
	@Builder.Default
	private int page = 0; // offset. 0부터 시작 유의
	@Builder.Default
	private String keyword = "";
	@Builder.Default
	private String filter = "";





}
