package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.*;


import java.util.List;


public interface StudyService {
    Integer wordResult(StudyRequestDto requestDto);
    List<Long> contextResult(StudyRequestDto requestDto);
    List<DogamResponseDto> contextQuestion();
    List<WordResponseDto> wordQuestion(Long userId);
	List<WordResponseDto> wordQuestionWithFilter(Long userId, String filter);
	PastTestResponseDto getPastInfo();

	List<PastQuestionResponseDto> getPastTest(Long userId);

	Boolean createPastTestResult(PastTestResultRequestDto pastTestResultRequestDto);


	List<PastTestResultResponseDto> getJangwonList(Long pastTestId);

	Integer getPastScore(Long userId, Long pastTestId);

}
