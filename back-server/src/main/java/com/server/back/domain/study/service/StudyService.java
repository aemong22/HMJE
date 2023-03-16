package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.dto.WordResponseDto;
import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.user.entity.User;

import java.util.List;


public interface StudyService {
    Integer wordResult(StudyRequestDto requestDto);
    List<Long> contextResult(StudyRequestDto requestDto);
    List<Dogam> contextQuestion();
    List<WordResponseDto> wordQuestion(Long userId);
}
