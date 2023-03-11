package com.server.back.domain.study.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PastRequestDto")
public class PastRequestDto {
    LocalDate startTime;
    LocalDate endTime;
    List<PastQuestionRequestDto> pastQuestionList;
}
