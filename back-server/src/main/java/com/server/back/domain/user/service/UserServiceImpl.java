package com.server.back.domain.user.service;

import com.server.back.common.entity.RefreshToken;
import com.server.back.common.repository.RefreshTokenRepository;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.dto.StudyTimeRequestDto;
import com.server.back.domain.study.entity.DogamResult;
import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.repository.DogamResultRepository;
import com.server.back.domain.study.repository.RightWordRepository;
import com.server.back.domain.user.dto.BadgeResultResponseDto;
import com.server.back.domain.user.dto.StudyResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;
import com.server.back.domain.user.entity.*;
import com.server.back.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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
                .level(0)
                .exp(0)
                .todaysemo(0)
                .todayRight(0)
                .todayWrong(0)
                .isAdmin(requestDto.getIsAdmin())
                .isSecession(requestDto.getIsSecession())
                .build();

        userRepository.save(user);
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
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getUsername().equals(requestDto.getUsername())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }

    @Override
    public UserResponseDto userInfo(Long userId) {
        User entity = userRepository.findByUserId(userId);
        UserResponseDto responseDto = new UserResponseDto(entity);
        return responseDto;
    }
    @Override
    public void userUpdate(Long userId, UserRequestDto requestDto){
        User entity = userRepository.findByUserId(userId);
        entity.update(requestDto);
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
        for (int i=0; i<=dayMax; i++){
            MonthStudyResponseDto dayStudyResponse = MonthStudyResponseDto.builder()
                    .WordCount(0)
                    .ContextCount(0)
                    .Time(0)
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
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(createdAtDay));
                System.out.println("nowday = " + nowday);
                int nowdayword = nowday.getWordCount();
                nowday.setWordCount(nowdayword+1);
            }
        }

        //문맥 갯수 체크
        List<DogamResult> totalcontextlist = dogamResultRepository.findAllByUserId(user);
        for (DogamResult d : totalcontextlist){
            String createdAtMonth = d.getCreatedAt().toString().substring(0,7);
            String createdAtDay = d.getCreatedAt().toString().substring(8,10);
            if ((createdAtMonth).equals(findMonth)){
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(createdAtDay));
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
                MonthStudyResponseDto nowday = monthStudyResponseDtos.get(Integer.parseInt(endTimeDay));
                int nowdayTime = nowday.getTime();
                nowday.setTime(nowdayTime+s.getStudyTime());
            }
        }

        return monthStudyResponseDtos;
    }
}