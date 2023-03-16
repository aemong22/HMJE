package com.server.back.domain.user.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "MonthStudyResponseDto")
public class MonthStudyResponseDto {
    private Integer WordCount;
    private Integer ContextCount;
    private Integer WordTime;
    private Integer ContextTime;
    private Integer WrongTime;
}