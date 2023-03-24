package com.server.back.domain.user.service;

import com.server.back.common.entity.RefreshToken;
import com.server.back.common.repository.RefreshTokenRepository;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.dto.StudyTimeRequestDto;
import com.server.back.domain.study.entity.DogamResult;
import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.repository.DogamResultRepository;
import com.server.back.domain.study.repository.RightWordRepository;
import com.server.back.domain.user.dto.*;
import com.server.back.domain.user.entity.*;
import com.server.back.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static com.server.back.domain.user.dto.BadgeResultResponseDto.MyBadgeResultList;

@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final BadgeResultRepository badgeresultRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final StudyTimeRepository studyTimeRepository;
    private final RightWordRepository rightWordRepository;
    private final DogamResultRepository dogamResultRepository;
    private final MyCharacterRepository myCharacterRepository;
    private final LoginHistoryRepository loginHistoryRepository;

    @Override
    public void join(UserRequestDto requestDto) {
        MyCharacter myCharacter = myCharacterRepository.findAll().get(0);
        Badge badge = badgeRepository.findAll().get(0);
        User user = User.builder()
                .username(requestDto.getUsername())
                .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .phoneNumber(requestDto.getPhoneNumber())
                .characterId(myCharacter)
                .nowBadge(badge)
                .level(1)
                .exp(0)
                .todaysemo(0)
                .todayRight(0)
                .todayWrong(0)
                .isAdmin(requestDto.getIsAdmin())
                .isSecession(requestDto.getIsSecession())
                .continAttendance(1)
                .accumAttendance(1)
                .build();

        userRepository.save(user);
    }
    @Override
    public void loginHistory(Long userId) {
        System.out.println("userId = " + userId);
        User user = userRepository.findByUserId(userId);
        //이전 로그인 기록과 비교해서 누적/연속 체크
        List<LoginHistory> mylogin = loginHistoryRepository.findByUser(user);
        System.out.println("mylogin = " + mylogin);
        if (mylogin.size() != 0){
            System.out.println("mylogin_now = " + mylogin);
            LocalDate history = mylogin.get(mylogin.size()-1).getCreatedAt().toLocalDate();
            LocalDate yesterday = LocalDate.now().minusDays(1);
            System.out.println("history = " + history);
            System.out.println("yesterday = " + yesterday);
            if (!history.isEqual(LocalDate.now())){
                user.accumAttendance();  // 누적 출석 +
                if (history.isEqual(yesterday)){
                    user.continAttendance(); // 연속 출석 +
                }
            }
        }
        //현재 로그인 기록
        LoginHistory loginHistory = LoginHistory.builder()
                .user(user)
                .build();
        loginHistoryRepository.save(loginHistory);

    }

    @Override
    public boolean userNicknameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-nickname///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getNickname().equals(requestDto.getNickname())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }
    @Override
    public boolean userUsernameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-username///////////////"+requestDto);
        User user = userRepository.findByUsername(requestDto.getUsername());
        if(user.equals(null)){
            return true;
        }
        else{
            return false;
        }


    }

    @Override
    public UserResponseDto userInfo(Long userId) {
        User entity = userRepository.findByUserId(userId);
        UserResponseDto responseDto = new UserResponseDto(entity);
        return responseDto;
    }
    @Override
    public void userNicknameUpdate(Long userId, UserRequestDto requestDto){
        User entity = userRepository.findByUserId(userId);
        entity.updateNickname(requestDto);
    }
    @Override
    public boolean changeInfo(Long userId, UserRequestDto requestDto){
        User user = userRepository.findByUserId(userId);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!user.equals(null)){
            return encoder.matches(requestDto.getPassword(), user.getPassword());
        }
        return false;
    }
    @Override
    public boolean changePassword(Long userId, ChangeRequestDto requestDto){
        User user = userRepository.findByUserId(userId);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!user.equals(null)){
            if (encoder.matches(requestDto.getPassword(), user.getPassword())){
                String newpassword = bCryptPasswordEncoder.encode(requestDto.getNewPassword());
                user.changePassord(newpassword);
                return true;
            }
        }
        return false;
    }
    @Override
    public boolean changePhonenumber(Long userId, ChangeRequestDto requestDto){
        User user = userRepository.findByUserId(userId);
        if (!user.equals(null)){
            user.changePhonenumber(requestDto.getNewPhonenumber());
            return true;
        }
        return false;
    }

    @Override
    public List<BadgeResultResponseDto> myBadgeAll(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<BadgeResult> badgeresult = badgeresultRepository.findByUser(user);
        return MyBadgeResultList(badgeresult);
    }
    @Override
    public void uesrLogout(Long userId){
        User user = userRepository.findByUserId(userId);
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(user.getJwtRefreshToken().getId());
        refreshTokenRepository.delete(token);
        user.logout();
    }
    @Override
    public void userDelete(Long userId){
        User user = userRepository.findByUserId(userId);
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(user.getJwtRefreshToken().getId());
        refreshTokenRepository.delete(token);
        user.logout();
        user.userdelete();
    }
    @Override
    public void updateBadge(Long userId, Long badgeId){
        User user = userRepository.findByUserId(userId);
        Badge badge = badgeRepository.findByBadgeId(badgeId);
        user.updateBadge(badge);
    }
    @Override
    public void updateStudyResult(StudyRequestDto requestDto){
        Integer wrongCount = requestDto.getWrongIdList().size();
        Integer rightCount = requestDto.getRightIdList().size();
        User user = userRepository.findByUserId(requestDto.getUserId());
        user.updateResult(requestDto.getSemo(), wrongCount, rightCount);
    }
    @Override
    public void updateStudyExp(Long userId,Integer rightExp){
        User user = userRepository.findByUserId(userId);
        user.updateExp(rightExp);
    }
    @Override
    public void studyTime(StudyTimeRequestDto requestDto){
        User user = userRepository.findByUserId(requestDto.getUserId());
        StudyTime studytime  = StudyTime.builder()
                .user(user)
                .startTime(requestDto.getStartTime())
                .endTime(requestDto.getEndTime())
                .studyTime(requestDto.getStudyTime())
                .studyType(requestDto.getStudyType())
                .build();
        studyTimeRepository.save(studytime);
    }
    @Override
    public StudyResponseDto mystudy(Long userId){
        User user = userRepository.findByUserId(userId);
        List<RightWord> totalwordlist = rightWordRepository.findAllByUser(user);
        Integer totalword = totalwordlist.size();
        int todayword = 0;
        for (RightWord r : totalwordlist){
            if ((r.getCreatedAt().toLocalDate()).equals(LocalDate.now())){
                todayword += 1;
            }
        }
        List<DogamResult> totalcontextlist = dogamResultRepository.findAllByUserOrderByDogamDesc(user);
        Integer totalcontext = totalcontextlist.size();
        int todaycontext = 0;
        for (DogamResult d : totalcontextlist){
            if ((d.getCreatedAt().toLocalDate()).equals(LocalDate.now())){
                todaycontext += 1;
            }
        }
        List<StudyTime> totalstudytimelist = studyTimeRepository.findAllByUser(user);
        int totalstudytime = 0;
        int todaystudytime = 0;
        for (StudyTime s : totalstudytimelist){
            if ((s.getEndTime().toLocalDate()).equals(LocalDate.now())){
                todaystudytime += s.getStudyTime();
            }
            totalstudytime += s.getStudyTime();
        }
        StudyResponseDto responseDto = StudyResponseDto.builder()
                .todayWord(todayword)
                .totalWord(totalword)
                .todayContext(todaycontext)
                .totalContext(totalcontext)
                .todayTime(todaystudytime)
                .totalTime(totalstudytime)
                .statsRight(user.getTodayRight())
                .statsWrong(user.getTodayWrong())
                .statsSemo(user.getTodaysemo())
                .build();
        return responseDto;
    }
    @Override
    public List<MonthStudyResponseDto> monthstudy(Long userId, MonthStudyRequestDto requestDto){
        // 달의 마지막 일 찾기
        int year = requestDto.getYear();
        int month = requestDto.getMonth();
        int day = 1;
        Calendar cal = Calendar.getInstance();
        cal.set(year, month-1, day);
        int dayMax = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        User user = userRepository.findByUserId(userId);

        //그만큼 dto 담은 리스트 만들어주기
        List<MonthStudyResponseDto> monthStudyResponseDtos = new ArrayList<>();
        for (int i=0; i<dayMax; i++){
            MonthStudyResponseDto dayStudyResponse = MonthStudyResponseDto.builder()
                    .WordCount(0)
                    .ContextCount(0)
                    .WrongTime(0)
                    .ContextTime(0)
                    .WordTime(0)
                    .build();
            monthStudyResponseDtos.add(dayStudyResponse);
        }

        //찾는 년월 만들기
        LocalDate findDate = LocalDate.of(year,month,day);
        String findMonth = findDate.toString().substring(0,7);   //년월 합쳐서만들어야함

        //단어 갯수 체크
        List<RightWord> totalwordlist = rightWordRepository.findAllByUser(user);
        for (RightWord r : totalwordlist){
            String createdAtMonth = r.getCreatedAt().toString().substring(0,7);
            String createdAtDay = r.getCreatedAt().toString().substring(8,10);
            if ((createdAtMonth).equals(findMonth)){
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(createdAtDay)-1);
                System.out.println("nowday = " + nowday);
                int nowdayword = nowday.getWordCount();
                nowday.setWordCount(nowdayword+1);
            }
        }

        //문맥 갯수 체크
        List<DogamResult> totalcontextlist = dogamResultRepository.findAllByUserOrderByDogamDesc(user);
        for (DogamResult d : totalcontextlist){
            String createdAtMonth = d.getCreatedAt().toString().substring(0,7);
            String createdAtDay = d.getCreatedAt().toString().substring(8,10);
            if ((createdAtMonth).equals(findMonth)){
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(createdAtDay)-1);
                System.out.println("nowday = " + nowday);
                int nowdaycontext = nowday.getContextCount();
                nowday.setContextCount(nowdaycontext+1);
            }
        }

        //학습 시간 체크
        List<StudyTime> totalstudytimelist = studyTimeRepository.findAllByUser(user);
        for (StudyTime s : totalstudytimelist){
            String endTimeMonth = s.getEndTime().toString().substring(0,7);
            String endTimeDay = s.getEndTime().toString().substring(8,10);
            if ((endTimeMonth).equals(findMonth)){
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(endTimeDay)-1);
                if (s.getStudyType().equals(0)){
                    int nowdayWordTime = nowday.getWordTime();
                    nowday.setWordTime(nowdayWordTime+s.getStudyTime());
                } else if (s.getStudyType().equals(1)) {
                    int nowdayContextTime = nowday.getContextTime();
                    nowday.setContextTime(nowdayContextTime+s.getStudyTime());
                }else if (s.getStudyType().equals(2)){
                    int nowdayWrongTime = nowday.getContextTime();
                    nowday.setWrongTime(nowdayWrongTime+s.getStudyTime());
                }
            }
        }

        return monthStudyResponseDtos;
    }

    @Override
    public Integer levelup(Long userId){
        User user = userRepository.findByUserId(userId);
        Integer nowlevel = user.getLevel();
        Integer newlevel = user.getLevel();
        while ((user.getExp() >= (100*Math.pow(2,nowlevel-1)))) {
            if(nowlevel >=9) {
                if ( nowlevel.equals(9) && user.getExp() >= 25600) {
                    newlevel = nowlevel + 1;
                    user.levelup(user.getExp(), newlevel);
                }
                break;
            }
            Integer newexp = (int) (user.getExp() - (100 * Math.pow(2, nowlevel - 1)));
            newlevel = nowlevel + 1;
            user.levelup(newexp, newlevel);
        }
        if (!nowlevel.equals(newlevel)){
            return newlevel;
        }
        return 0;
    }
    @Override
    public CompareResponseDto compare(Long userId){
        User user = userRepository.findByUserId(userId);
        CompareResponseDto responseDto = new CompareResponseDto();

        //찾는 년월 만들기
        LocalDate findDate = LocalDate.now(); //오늘
        String findMonth = findDate.toString().substring(0,7);   //년월 합쳐서만들어야함

        //내 학습 시간 체크 (한달, 하루)
        List<StudyTime> totalstudytimelist = studyTimeRepository.findAllByUser(user);
        Integer monthMyStatsTime = 0;
        Integer todayMyTime = 0;
        for (StudyTime s : totalstudytimelist){
            System.out.println("s = " + s);
            LocalDate endTimeDay = s.getEndTime().toLocalDate();
            String endTimeMonth = endTimeDay.toString().substring(0,7);
            if ((findMonth).equals(endTimeMonth)){   // 이번달이면
                monthMyStatsTime += s.getStudyTime();
                if ((endTimeDay).isEqual(findDate)){  // 오늘이면
                    todayMyTime += s.getStudyTime();
                }
            }
        }
        String todayDay = findDate.toString().substring(8,10);   // 오늘 날짜
        monthMyStatsTime = monthMyStatsTime/Integer.parseInt(todayDay); // 나의 이번달 평균 학습시간
        responseDto.setTodayMyTime(todayMyTime);
        responseDto.setMonthMyStatsTime(monthMyStatsTime);

        //오늘 학습한 유저의 평균
        List<StudyTime> monthUsersStatsTimeList = studyTimeRepository.findAll();
        Integer monthUsersStatsTimes = 0;
        Set<Long> studyusers = new HashSet<>();
        for (StudyTime s : monthUsersStatsTimeList){
            LocalDate endTimeDay = s.getEndTime().toLocalDate();
            if ((endTimeDay).isEqual(findDate)){  // 오늘이면
                monthUsersStatsTimes += s.getStudyTime();
                studyusers.add(s.getUser().getUserId());
            }
        }
        if (monthUsersStatsTimes.equals(0)) {
            responseDto.setMonthUsersStatsTime(0);
        }else{
            Integer monthUsersStatsTime = monthUsersStatsTimes/(studyusers.size()) ;
            responseDto.setMonthUsersStatsTime(monthUsersStatsTime);
        }

        return responseDto;
    }
    @Override
    public List<RankWordResponseDto> rankWord(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime today = LocalDateTime.of(now.getYear(),
                now.getMonth(), now.getDayOfMonth(), 0, 0, 0); //오늘 0:00:00
        List<User> users = rightWordRepository.findByDate(today);
        List<RankWordResponseDto> responseDto = new ArrayList<>();
        for (User user : users) {
            // 맞은 단어 가져오기 > 맨 앞부분 데이터에서 createdAt 저장
            List<RightWord> rightWords = rightWordRepository.findByUserAndCreatedAtAfterOrderByCreatedAtDesc(user,today);
            RankWordResponseDto userRankWord = new RankWordResponseDto().builder()
                    .userId(user.getUserId())
                    .nickname(user.getNickname())
                    .count(rightWords.size())
                    .badgeName(user.getNowBadge().getBadgeName())
                    .badgeImage(user.getNowBadge().getBadgeImage())
                    .updatedAt(rightWords.get(0).getCreatedAt())
                    .build();
            responseDto.add(userRankWord);
        }
        // 카운트 뒤집어서 정렬 + updatedAt 정렬 (먼저 많은 단어 맞춘사람이 위로)
        responseDto.sort(Comparator.comparing(RankWordResponseDto::getCount).reversed().thenComparing(RankWordResponseDto::getUpdatedAt));
        if (responseDto.size() > 10){
            responseDto.subList(10, responseDto.size()).clear();
        }
        return responseDto;
    }
    @Override
    public List<RankLevelResponseDto> rankLevel(){
        List<User> users = userRepository.findAll();
        users.sort(Comparator.comparing(User::getLevel).reversed().thenComparing(User::getExp).reversed().thenComparing(User::getTodayRight).reversed());
        System.out.println("users = " + users);
        List<RankLevelResponseDto> responseDto = new ArrayList<>();
        // 레벨, exp, 오늘 총 맞춘 갯수 순으로 정렬
        if (users.size() > 10){
            users.subList(10, responseDto.size()).clear();
        }
        for (User user: users){
            RankLevelResponseDto userRankLevel = new RankLevelResponseDto().builder()
                    .userId(user.getUserId())
                    .nickname(user.getNickname())
                    .level(user.getLevel())
                    .exp(user.getExp())
                    .badgeName(user.getNowBadge().getBadgeName())
                    .badgeImage(user.getNowBadge().getBadgeImage())
                    .build();
            responseDto.add(userRankLevel);
        }
        return responseDto;
    }
}