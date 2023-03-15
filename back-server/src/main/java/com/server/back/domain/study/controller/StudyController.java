package com.server.back.domain.study.controller;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.dto.StudyTimeRequestDto;
import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.service.StudyService;
import com.server.back.domain.user.repository.StudyTimeRepository;
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
    private final StudyTimeRepository studyTimeRepository;

        @ApiOperation(value = "단어학습 문제")
        @GetMapping("/word/{userId}")
        public ResponseEntity<Map<String, Object>> wordQuestion(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        List<Word> wordQuestion = studyService.wordQuestion(userId);
        response.put("data", wordQuestion);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "단어학습 결과")
    @PostMapping("/word/result")
    public ResponseEntity<Map<String, Object>> wordResult(@RequestBody StudyRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        Integer rightexp = studyService.wordResult(requestDto)*10; //맞은단어,틀린단어 체크
        userService.updateStudyResult(requestDto); //오늘의 통계 OXV 체크
        userService.updateStudyExp(requestDto.getUserId(), rightexp); //경험치 부여
        //response.put("data", responseDto);
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
        response.put("data", newDogamli);
        response.put("message", "success");
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
