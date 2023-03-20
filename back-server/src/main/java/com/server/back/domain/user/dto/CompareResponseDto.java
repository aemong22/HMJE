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
@ApiModel(value = "CompareResponseDto")
public class CompareResponseDto {
    private Integer monthUsersStatsTime;
    private Integer todayMyTime;
    private Integer monthMyStatsTime;
}