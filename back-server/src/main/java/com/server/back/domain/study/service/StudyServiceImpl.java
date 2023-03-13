package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.study.repository.RightWordRepository;
import com.server.back.domain.study.repository.WordRepository;
import com.server.back.domain.study.repository.WrongWordRepository;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyServiceImpl implements StudyService{
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final RightWordRepository rightWordRepository;
    private final WrongWordRepository wrongWordRepository;

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
}
