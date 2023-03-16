package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.DogamResponseDto;
import com.server.back.domain.study.entity.*;
import com.server.back.domain.study.repository.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.server.back.domain.study.dto.DogamResponseDto.MakeDogamResponseList;

@RequiredArgsConstructor
@Transactional
@Service
public class DogamServiceImpl implements DogamService{
    private final UserRepository userRepository;
    private final DogamRepository dogamRepository;
    private final DogamResultRepository dogamResultRepository;
    @Override
    public List<DogamResponseDto> dogamAll() {
        List<Dogam> dogamAll = dogamRepository.findAll();
        List<DogamResponseDto> result = MakeDogamResponseList(dogamAll);
        return result;
    }

    @Override
    public List<Long> myDogamList(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<Long> result = new ArrayList<>();
        List<DogamResult> dogamResults = dogamResultRepository.findAllByUserOrderByDogamDesc(user);
        for (DogamResult dogamResult : dogamResults) {
            Long dogamId = dogamResult.getDogam().getDogamId();
            result.add(dogamId);
        }
        return result;
    }


}
