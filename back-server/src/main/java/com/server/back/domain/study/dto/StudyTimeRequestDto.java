package com.server.back.domain.study.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "StudyTimeRequestDto")
public class StudyTimeRequestDto {
    Long userId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Integer studyTime;
    Integer studyType;
}
