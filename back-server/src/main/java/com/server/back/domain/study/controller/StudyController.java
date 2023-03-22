package com.server.back.domain.study.controller;

import com.server.back.domain.study.dto.*;
import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.service.StudyService;
import com.server.back.domain.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/study")
@RestController
public class StudyController {
    private final StudyService studyService;
    private final UserService userService;


    @ApiOperation(value = "단어학습 문제")
    @GetMapping("/word/{userId}")
    public ResponseEntity<Map<String, Object>> wordQuestion(@PathVariable(value = "userId") Long userId,
                                                             @RequestParam(name = "filter", defaultValue = "") String filter){
        Map<String, Object> response = new HashMap<>();
        if(filter.isBlank()){
            List<WordResponseDto> wordQuestion = studyService.wordQuestion(userId);
            response.put("data", wordQuestion);
            response.put("message", "success");
        }else{
            List<WordResponseDto> wordQuestion = studyService.wordQuestionWithFilter(userId, filter);
            response.put("data", wordQuestion);
            response.put("message", "success");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "단어학습 결과")
    @PostMapping("/word/result")
    public ResponseEntity<Map<String, Object>> wordResult(@RequestBody StudyRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        Integer rightexp = studyService.wordResult(requestDto)*10 + requestDto.getSemo()*5; //맞은단어,틀린단어 체크
        userService.updateStudyResult(requestDto); //오늘의 통계 OXV 체크
        userService.updateStudyExp(requestDto.getUserId(), rightexp); //경험치
        Integer newlevel = userService.levelup(requestDto.getUserId()); //레벨업
        response.put("level", newlevel);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "문맥학습 문제")
    @GetMapping("/context")
    public ResponseEntity<Map<String, Object>> contextQuestion(){
        Map<String, Object> response = new HashMap<>();
        List<Dogam> contextQuestion = studyService.contextQuestion();
        response.put("data", contextQuestion);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "문맥학습 결과")
    @PostMapping("/context/result")
    public ResponseEntity<Map<String, Object>> contextResult(@RequestBody StudyRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        List<Long> newDogamli = studyService.contextResult(requestDto); //문맥도감 체크
        userService.updateStudyResult(requestDto); //오늘의 통계 OXV 체크
        int badgeExp = newDogamli.size()*30;
        userService.updateStudyExp(requestDto.getUserId(), badgeExp); //경험치 부여
        Integer newlevel = userService.levelup(requestDto.getUserId()); //레벨업
        response.put("data", newDogamli);
        response.put("level", newlevel);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "과거시험 회차 정보")
    @GetMapping("/past")
    public ResponseEntity<Map<String, Object>> getPastInfo(){
        Map<String, Object> response = new HashMap<>();
        PastTestResponseDto pastTestResponseDto = studyService.getPastInfo();
        response.put("data", pastTestResponseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "과거시험 문제")
    @GetMapping("/past/test")
    public ResponseEntity<Map<String, Object>> getPastTest(){
        Map<String, Object> response = new HashMap<>();
        List<PastQuestionResponseDto> result = studyService.getPastTest();
        if(result == null){
            response.put("message","fail");
        }else{
            response.put("data", result);
            response.put("message", "success");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value="과거시험 점수 저장")
    @PostMapping("/past/result")
    public ResponseEntity<Map<String, Object>> createPastTestResult(@RequestBody PastTestResultRequestDto pastTestResultRequestDto){
        Map<String, Object> response = new HashMap<>();
        Boolean result = studyService.createPastTestResult(pastTestResultRequestDto);
        if(result){
            response.put("message", "success");
        }else{
            response.put("message", "fail");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @ApiOperation(value = "학습 시간 관리")
    @PostMapping("/studytime")
    public ResponseEntity<Map<String, Object>> studyTime(@RequestBody StudyTimeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
         userService.studyTime(requestDto);
//        response.put("data", "");
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
