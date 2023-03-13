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
@ApiModel(value = "StudyResponseDto")
public class StudyResponseDto {
    private Integer todayWord;
    private Integer todayTime;
    private Integer totalWord;
    private Integer totalTime;
    private Integer semo;
    private Integer wrongWordCount;

}