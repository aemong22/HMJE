package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.Badge;
import com.server.back.domain.user.entity.BadgeResult;
import com.server.back.domain.user.entity.User;
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
@ApiModel(value = "BadgeResponseDto")
public class BadgeResponseDto {
    private Long badgeId;
    private String badgeImage;
    private String badgeName;
    private String badgeDetail;
    private LocalDateTime createdAt;

    public static BadgeResponseDto MakeBadgeResponseDto(BadgeResult b) {
        Badge badge = b.getBadge();
        BadgeResponseDto badgeResponseDto = BadgeResponseDto.builder()
                .badgeId(badge.getBadgeId())
                .badgeImage(badge.getBadgeImage())
                .badgeDetail(badge.getBadgeDetail())
                .badgeName(badge.getBadgeName())
                .createdAt(b.getCreatedAt())
                .build();
        return badgeResponseDto;
    }

    public static List<BadgeResponseDto> MyBadgeResultList(List<BadgeResult> badgeList) {
        List<BadgeResponseDto> result = new ArrayList<>();
        for (BadgeResult badgeResult : badgeList) {
            BadgeResponseDto badgeResponseDto = MakeBadgeResponseDto(badgeResult);
            result.add(badgeResponseDto);
        }
        return result;
    }
}