package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.entity.*;
import com.server.back.domain.study.repository.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyServiceImpl implements StudyService{
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DogamRepository dogamRepository;
    private final RightWordRepository rightWordRepository;
    private final WrongWordRepository wrongWordRepository;
    private final DogamResultRepository dogamResultRepository;

    @Override
    public Integer wordResult(StudyRequestDto requestDto) {
        int rightCount = 0;
        User user = userRepository.findByUserId(requestDto.getUserId());
        for (Long i : requestDto.getRightIdList()) {
            Word word = wordRepository.findByWordId(i);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            //틀렸던 문제인지 확인
            if (wrong != null){
                //틀렸던 문제이면 틀린문제에서는 삭제
                wrongWordRepository.delete(wrong);
            }
            RightWord rightWord = RightWord.builder()
                    .user(user)
                    .word(word)
                    .build();
            rightWordRepository.save(rightWord);
            //경험치
            rightCount += 1;
        }
        for (Long j : requestDto.getWrongIdList()) {
            Word word = wordRepository.findByWordId(j);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            //틀린 문제 리스트에 없으면 추가해주기
            if (wrong == null){
                WrongWord wrongWord = WrongWord.builder()
                        .user(user)
                        .word(word)
                        .build();
                wrongWordRepository.save(wrongWord);
            }
        }
        return rightCount;
    }

    @Override
    public List<Long> contextResult(StudyRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());
        List<Long> newDogamli = new ArrayList<>();
        for (Long i : requestDto.getRightIdList()) {
            Dogam dogam = dogamRepository.findDogamByDogamId(i);
            DogamResult d = dogamResultRepository.findByDogamIdAndUserId(dogam,user);
            //획득한 도감에 없으면
            if (d == null){
                //도감 생성
                DogamResult dogamresult = DogamResult.builder()
                        .userId(user)
                        .dogamId(dogam)
                        .build();
                dogamResultRepository.save(dogamresult);
                //획득한 뱃지로 결과 보내주기
                newDogamli.add(dogam.getDogamId());
            }
        }
        //경험치
        return newDogamli;
    }
}
