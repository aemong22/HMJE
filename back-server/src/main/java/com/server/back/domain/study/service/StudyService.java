package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.*;
import com.server.back.domain.study.entity.Dogam;


import java.util.List;


public interface StudyService {
    Integer wordResult(StudyRequestDto requestDto);
    List<Long> contextResult(StudyRequestDto requestDto);
    List<Dogam> contextQuestion();
    List<WordResponseDto> wordQuestion(Long userId);
	List<WordResponseDto> wordQuestionWithFilter(Long userId, String filter);
	PastTestResponseDto getPastInfo();

	List<PastQuestionResponseDto> getPastTest();

	Boolean createPastTestResult(PastTestResultRequestDto pastTestResultRequestDto);

}
