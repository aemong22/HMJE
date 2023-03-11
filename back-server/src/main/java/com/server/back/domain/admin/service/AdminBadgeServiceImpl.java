package com.server.back.domain.admin.service;

import com.server.back.domain.user.dto.BadgeRequestDto;
import com.server.back.domain.user.dto.BadgeResponseDto;
import com.server.back.domain.user.dto.BadgeResultResponseDto;
import com.server.back.domain.user.entity.Badge;
import com.server.back.domain.user.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class AdminBadgeServiceImpl implements AdminBadgeService {
    private final BadgeRepository badgeRepository;
    @Override
    public List<BadgeResponseDto> adminAllBadgeList() {
        return badgeRepository.findAll().stream().map(o -> BadgeResponseDto.builder()
                .badgeId(o.getBadgeId())
                .badgeName(o.getBadgeName())
                .badgeImage(o.getBadgeImage())
                .badgeDetail(o.getBadgeDetail())
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    public boolean adminBadgeInsert(BadgeRequestDto requestDto) {
        Badge badge = Badge.builder()
                .badgeName(requestDto.getBadgeName())
                .badgeImage(requestDto.getBadgeImage())
                .badgeDetail(requestDto.getBadgeDetail())
                .build();

        Badge entity = badgeRepository.save(badge);
        if(entity.getBadgeId() != null) return true;
        else return false;
    }

    @Override
    public boolean adminBadgeUpdate(Long badgeId, BadgeRequestDto requestDto) {
        Optional<Badge> entity = badgeRepository.findById(badgeId);

        if(entity.isPresent()){
            Badge badge = entity.get();
            badge.update(requestDto);

            return true;
        }else return false;
    }

    @Override
    public boolean adminBadgeDelete(Long badgeId) {
        Optional<Badge> entity = badgeRepository.findById(badgeId);
        if(entity.isPresent()){
            Badge badge = entity.get();
            badgeRepository.delete(badge);

            return true;
        }else return false;
    }
}
