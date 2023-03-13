package com.server.back.domain.study.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PastTestResponseDto")
public class PastTestResponseDto {
    Long pastTestId;
    LocalDate startTime;
    LocalDate endTime;
}
