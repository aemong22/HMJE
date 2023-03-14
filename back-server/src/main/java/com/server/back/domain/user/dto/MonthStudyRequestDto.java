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
@ApiModel(value = "MonthStudyRequestDto")
public class MonthStudyRequestDto {
    private Integer year;
    private Integer month;
}
