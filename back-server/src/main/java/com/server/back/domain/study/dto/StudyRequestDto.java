package com.server.back.domain.study.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "StudyRequestDto")
public class StudyRequestDto {
    Long userId;
    Integer semo;
    List<Long> wrongIdList;
    List<Long> RightIdList;
}
