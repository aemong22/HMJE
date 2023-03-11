package com.server.back.domain.admin.service;

import com.server.back.domain.study.dto.PastQuestionRequestDto;
import com.server.back.domain.study.dto.PastQuestionResponseDto;
import com.server.back.domain.study.dto.PastRequestDto;
import com.server.back.domain.study.dto.PastTestResponseDto;

import java.util.List;

public interface AdminPastService {
    List<PastTestResponseDto> adminAllPastTestList();

    List<PastQuestionResponseDto> adminPastQuestionList(Long testId);

    boolean adminPastTestInsert(PastRequestDto requestDto);

    boolean adminPastTestUpdate(Long testId, Long questionId, PastQuestionRequestDto requestDto);

    boolean adminPastTestDelete(Long testId);
}
