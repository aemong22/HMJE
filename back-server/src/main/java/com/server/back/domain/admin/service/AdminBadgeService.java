package com.server.back.domain.admin.service;

import com.server.back.domain.user.dto.BadgeRequestDto;
import com.server.back.domain.user.dto.BadgeResponseDto;

import java.util.List;

public interface AdminBadgeService {
    List<BadgeResponseDto> adminAllBadgeList();

    boolean adminBadgeInsert(BadgeRequestDto requestDto);

    boolean adminBadgeUpdate(Long badgeId, BadgeRequestDto requestDto);

    boolean adminBadgeDelete(Long badgeId);
}
