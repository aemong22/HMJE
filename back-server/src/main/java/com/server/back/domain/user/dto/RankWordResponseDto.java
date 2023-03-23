package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.Badge;
import com.server.back.domain.user.entity.BadgeResult;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "RankWordResponseDto")
public class RankWordResponseDto {
    private Long userId;
    private String nickname;
    private Integer count;
    private String badgeName;
    private String badgeImage;
    private LocalDateTime updatedAt;
}