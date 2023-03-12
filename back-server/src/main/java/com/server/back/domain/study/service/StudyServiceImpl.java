package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.entity.*;
import com.server.back.domain.study.repository.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
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
    public void wordResult(StudyRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());
        for (Long i : requestDto.getRightIdList()) {
            Word word = wordRepository.findByWordId(i);
            RightWord rightWord = RightWord.builder()
                    .userId(user)
                    .wordId(word)
                    .build();
            rightWordRepository.save(rightWord);
        }
        for (Long j : requestDto.getWrongIdList()) {
            Word word = wordRepository.findByWordId(j);
            WrongWord wrongWord = WrongWord.builder()
                    .userId(user)
                    .wordId(word)
                    .build();
            wrongWordRepository.save(wrongWord);
        }
    }
    @Override
    public void contextResult(StudyRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());
        List<Long> badgeli = new ArrayList<>();
        for (Long i : requestDto.getRightIdList()) {
            Dogam dogam = dogamRepository.findDogamByDogamId(i);
            DogamResult d = dogamResultRepository.findByDogamIdAndUserId(dogam,user);
            if (!d.equals(null)){
                DogamResult dogamresult = DogamResult.builder()
                        .userId(user)
                        .dogamId(dogam)
                        .build();
                dogamResultRepository.save(dogamresult);
                badgeli.add(dogam.getDogamId());
            }
        }
//        return badgeli;
    }
}
