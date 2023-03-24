package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.Badge;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "BadgeResponseDto")
public class BadgeResponseDto {
    Long badgeId;
    String badgeImage;
    String badgeName;
    String badgeDetail;

    public static BadgeResponseDto fromEntity(Badge badge) {
        BadgeResponseDto badgeResponseDto = BadgeResponseDto.builder()
                                            .badgeId(badge.getBadgeId())
                                            .badgeImage(badge.getBadgeImage())
                                            .badgeName(badge.getBadgeName())
                                            .badgeDetail(badge.getBadgeDetail())
                                            .build();

        return badgeResponseDto;
    }

}
