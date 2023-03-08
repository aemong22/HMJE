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

    public BadgeResponseDto(BadgeResult b) {
        this.badgeId = b.getBadge().getBadgeId();
        this.badgeImage = b.getBadge().getBadgeImage();
        this.badgeName = b.getBadge().getBadgeName();
        this.badgeDetail = b.getBadge().getBadgeDetail();
        this.createdAt = b.getCreatedAt();
    }

    public static List<BadgeResponseDto> fromEntityList(List<BadgeResult> badgeResults) {
        List<BadgeResponseDto> result = new ArrayList<>();

        for (BadgeResult badgeResult : badgeResults) {
            BadgeResponseDto badgeResponseDto = Ba
        }

        return result;

    }

}
