package com.server.back.domain.user.service;


import com.server.back.domain.study.repository.DogamRepository;
import com.server.back.domain.study.repository.DogamResultRepository;
import com.server.back.domain.user.entity.*;
import com.server.back.domain.user.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@RequiredArgsConstructor
@Service
public class BadgeService {
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final DogamRepository dogamRepository;
    private final DogamResultRepository dogamResultRepository;
    private final BadgeResultRepository badgeResultRepository;


    public List<Long> badgecheck(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        // 14 도감 확인
        if (!myBadgeList.contains(14L)) {
            List<Long> dogamlist = dogamResultRepository.dogamlistfindByUserId(user);
            Integer dogamSize = dogamlist.size();
            if (dogamSize.equals(100)) {
                response.add(badgeadd(14L, user)); // 뱃지 추가
            }
        }

        // 15 도감 확인
        List<Long> rarebadge15 = Arrays.asList(27L, 37L, 53L, 73L, 83L, 97L); // 레어카드
//        List<Long> rarebadge15 = Arrays.asList(1L, 2L, 3L, 4L, 5L); // 레어카드 테스트
        if (!myBadgeList.contains(15L)) {
            List<Long> dogamlist = dogamResultRepository.dogamlistfindByUserId(user);
            Integer myraredogam15 = 0;
            for (Long myrare : dogamlist) {
                if (rarebadge15.contains(myrare)) {
                    myraredogam15 += 1;
                }
            }
            if (myraredogam15.equals(6)) {
                response.add(badgeadd(15L, user)); // 뱃지 추가
            }
        }
        return response;
    }

    public Long badgeadd (Long badgeId, User user){
        Badge badge = badgeRepository.findByBadgeId(badgeId);
        BadgeResult badgeResult = BadgeResult.builder()
                .badge(badge)
                .user(user)
                .build();
        badgeResultRepository.save(badgeResult);
        return badgeId;
    }

}