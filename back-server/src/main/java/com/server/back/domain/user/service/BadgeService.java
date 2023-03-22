package com.server.back.domain.user.service;


import com.server.back.domain.study.repository.DogamRepository;
import com.server.back.domain.study.repository.DogamResultRepository;
import com.server.back.domain.user.entity.*;
import com.server.back.domain.user.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@RequiredArgsConstructor
@Service
public class BadgeService {
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final DogamResultRepository dogamResultRepository;
    private final BadgeResultRepository badgeResultRepository;
    private final StudyTimeRepository studyTimeRepository;


    public List<Long> badgecheck(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        // 첫로그인 : 회원가입시 획득

        // 출석 누적
        Integer accumAttendance = user.getAccumAttendance();
        if (accumAttendance.equals(10) && (!myBadgeList.contains(2L))){
            response.add(badgeadd(2L, user)); // 뱃지 추가
        }
        if (accumAttendance.equals(30) && (!myBadgeList.contains(3L))){
            response.add(badgeadd(3L, user)); // 뱃지 추가
        }
        if (accumAttendance.equals(90) && (!myBadgeList.contains(4L))){
            response.add(badgeadd(4L, user)); // 뱃지 추가
        }
        if (accumAttendance.equals(365) && (!myBadgeList.contains(5L))){
            response.add(badgeadd(5L, user)); // 뱃지 추가
        }

        // 출석 연속
        Integer continAttendance = user.getContinAttendance();
        if (continAttendance.equals(10) && (!myBadgeList.contains(6L))){
            response.add(badgeadd(6L, user)); // 뱃지 추가
        }
        if (continAttendance.equals(30) && (!myBadgeList.contains(7L))){
            response.add(badgeadd(7L, user)); // 뱃지 추가
        }
        if (continAttendance.equals(90) && (!myBadgeList.contains(8L))){
            response.add(badgeadd(8L, user)); // 뱃지 추가
        }
        if (continAttendance.equals(365) && (!myBadgeList.contains(9L))){
            response.add(badgeadd(9L, user)); // 뱃지 추가
        }

        // 학습 시간
        List<StudyTime> totalstudytimelist = studyTimeRepository.findAllByUser(user);
        int mytotalstudytime = 0;
        for (StudyTime s : totalstudytimelist){
            mytotalstudytime += s.getStudyTime();
        }
        System.out.println("mytotalstudytime = " + mytotalstudytime);
        if ((!myBadgeList.contains(10L)) && (mytotalstudytime >= 3600)){
            response.add(badgeadd(10L, user)); // 뱃지 추가
            if ((!myBadgeList.contains(11L)) && (mytotalstudytime >= 86400)){
                response.add(badgeadd(11L, user)); // 뱃지 추가
                if ((!myBadgeList.contains(12L)) && (mytotalstudytime >= 259200)){
                    response.add(badgeadd(12L, user)); // 뱃지 추가
                    if ((!myBadgeList.contains(13L)) && (mytotalstudytime >= 1296000)){
                        response.add(badgeadd(13L, user)); // 뱃지 추가
                    }
                }
            }
        }

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