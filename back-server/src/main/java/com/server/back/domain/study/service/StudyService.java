package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.StudyRequestDto;

import java.util.List;


public interface StudyService {
    Integer wordResult(StudyRequestDto requestDto);
    List<Long> contextResult(StudyRequestDto requestDto);
}
