package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.DogamResponseDto;

import java.util.List;


public interface DogamService {
    List<DogamResponseDto> dogamAll();
    List<Long> myDogamList(Long userId);
}
