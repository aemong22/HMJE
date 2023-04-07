package com.server.back.domain.user.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "RankLevelResponseDto")
public class RankLevelResponseDto {
    private Long userId;
    private String nickname;
    private Integer exp;
    private Integer level;
    private String badgeName;
    private String badgeImage;
    private LocalDateTime updatedAt;
}