package com.server.back.domain.admin.service;

import com.server.back.domain.study.dto.DogamRequestDto;
import com.server.back.domain.study.dto.DogamResponseDto;

import java.util.List;

public interface AdminDogamService {
    List<DogamResponseDto> adminAllDogamList();

    boolean adminDogamInsert(DogamRequestDto requestDto);

    boolean adminDogamUpdate(Long dogamId, DogamRequestDto requestDto);

    boolean adminDogamDelete(Long dogamId);
}
