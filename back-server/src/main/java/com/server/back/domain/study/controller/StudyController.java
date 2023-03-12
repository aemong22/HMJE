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
        studyService.wordResult(requestDto);
        userService.updateStudyResult(requestDto);
        //response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
