package com.server.back.domain.user.service;


import com.server.back.domain.study.entity.PastTest;
import com.server.back.domain.study.entity.PastTestResult;
import com.server.back.domain.study.repository.DogamRepository;
import com.server.back.domain.study.repository.DogamResultRepository;
import com.server.back.domain.study.repository.PastTestRepository;
import com.server.back.domain.study.repository.PastTestResultRepository;
import com.server.back.domain.user.entity.*;
import com.server.back.domain.user.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;



@RequiredArgsConstructor
@Service
public class BadgeService {
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final DogamResultRepository dogamResultRepository;
    private final BadgeResultRepository badgeResultRepository;
    private final StudyTimeRepository studyTimeRepository;
    private final PastTestResultRepository pastTestResultRepository;
    private final PastTestRepository pastTestRepository;

    public List<Long> badgecheckNewbie(String username) {
        User user = userRepository.findByUsername(username);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();
        if (!myBadgeList.contains(1L)) {
            response.add(badgeadd(1L, user)); // 뱃지 추가
        }
        return response;
    }

    public List<Long> badgecheckLogin(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        // 출석 누적 ( 2-5 )
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

        // 출석 연속 ( 6-9 )
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

        // 이스터에그 16 한글날
        SimpleDateFormat monthday = new SimpleDateFormat("MM/dd");
        Date now = new Date();
        String today = monthday.format(now);
        if (today.equals("10/09") && !myBadgeList.contains(16L)) {
            response.add(badgeadd(16L, user)); // 뱃지 추가
        }
        // 이스터에그 17 세종대왕생신
        if (today.equals("05/15") && !myBadgeList.contains(17L)) {
            response.add(badgeadd(17L, user)); // 뱃지 추가
        }

        // 이스터에그 19 첫일주일 이벤트
        LocalDate thisday = LocalDate.now();
        LocalDate startday = LocalDate.of(2023,03,26); // 기간 하루 전
        LocalDate endday = LocalDate.of(2023,04,01); // 기간 하루 뒤
        if (thisday.isAfter(startday) && thisday.isBefore(endday)){
            if (!myBadgeList.contains(19L)) {
                response.add(badgeadd(19L, user)); // 뱃지 추가
            }
        }

        return response;
    }

    public List<Long> badgecheckStudyTime(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        // 학습 시간 ( 10-13 )
        List<StudyTime> totalstudytimelist = studyTimeRepository.findAllByUser(user);
        int mytotalstudytime = 0;
        for (StudyTime s : totalstudytimelist){
            mytotalstudytime += s.getStudyTime();
        }
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
        return response;
    }


    public List<Long> badgecheckDogam(Long userId) {
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

    public List<Long> badgecheckPast(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        // 과거시험 장원급제 ( 20 )
        PastTest pastTest = pastTestRepository.findFirstByOrderByCreatedAtDesc();
        PastTestResult mypast = pastTestResultRepository.findFirstByUserAndPastTest(user, pastTest);
        if (null != mypast){
            if (mypast.getScore() >= 80){
                if (!myBadgeList.contains(20L)) {
                    response.add(badgeadd(20L, user)); // 뱃지 추가
                }
            }
        }
        return response;
    }

    public List<Long> badgecheckMalrang(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> myBadgeList = badgeResultRepository.badgelistfindByUserId(user);
        List<Long> response = new ArrayList<>();

        if (!myBadgeList.contains(18L)) {
            response.add(badgeadd(18L, user)); // 뱃지 추가
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