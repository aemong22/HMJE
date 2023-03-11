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
@ApiModel(value = "BadgeResultResponseDto")
public class BadgeResultResponseDto {
    private Long badgeId;
    private String badgeImage;
    private String badgeName;
    private String badgeDetail;
    private LocalDateTime createdAt;

    public static BadgeResultResponseDto MakeBadgeResultResponseDto(BadgeResult b) {
        Badge badge = b.getBadge();
        BadgeResultResponseDto badgeResultResponseDto = BadgeResultResponseDto.builder()
                .badgeId(badge.getBadgeId())
                .badgeImage(badge.getBadgeImage())
                .badgeDetail(badge.getBadgeDetail())
                .badgeName(badge.getBadgeName())
                .createdAt(b.getCreatedAt())
                .build();
        return badgeResultResponseDto;
    }

    public static List<BadgeResultResponseDto> MyBadgeResultList(List<BadgeResult> badgeList) {
        List<BadgeResultResponseDto> result = new ArrayList<>();
        for (BadgeResult badgeResult : badgeList) {
            BadgeResultResponseDto badgeResultResponseDto = MakeBadgeResultResponseDto(badgeResult);
            result.add(badgeResultResponseDto);
        }
        return result;
    }
}