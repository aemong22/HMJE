package com.server.back.domain.study.controller;

import com.server.back.domain.study.dto.StudyRequestDto;
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

    @ApiOperation(value = "단어 학습 결과")
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
    @ApiOperation(value = "문맥 학습 결과")
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
}
