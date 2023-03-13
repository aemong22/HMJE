package com.server.back.domain.admin.controller;

import com.server.back.domain.admin.service.AdminPastService;
import com.server.back.domain.study.dto.PastQuestionRequestDto;
import com.server.back.domain.study.dto.PastQuestionResponseDto;
import com.server.back.domain.study.dto.PastRequestDto;
import com.server.back.domain.study.dto.PastTestResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin/past")
@RestController
public class AdminPastController {
    private final AdminPastService adminPastService;
    @ApiOperation(value = "전체 과거시험 회차 목록")
    @GetMapping
    public ResponseEntity<Map<String, Object>> adminAllPastTestList(){
        Map<String, Object> response=  new HashMap<>();
        List<PastTestResponseDto> pastTestList = adminPastService.adminAllPastTestList();

        response.put("message", "success");
        response.put("data", pastTestList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "과거시험 문제 목록")
    @GetMapping("/{test_id}")
    public ResponseEntity<Map<String, Object>> adminPastQuestionList(@PathVariable(name = "test_id")Long testId){
        Map<String, Object> response=  new HashMap<>();
        List<PastQuestionResponseDto> pastQuestionList = adminPastService.adminPastQuestionList(testId);

        response.put("message", "success");
        response.put("data", pastQuestionList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "과거시험 회차 추가")
    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> adminPastTestInsert(@RequestBody PastRequestDto requestDto){
        Map<String, Object> response=  new HashMap<>();

        if(adminPastService.adminPastTestInsert(requestDto)) {
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "과거시험 문제 수정")
    @PutMapping("/{test_id}/{question_id}")
    public ResponseEntity<Map<String, Object>> adminPastTestUpdate(@PathVariable(name = "test_id") Long testId,
                                                                   @PathVariable(name = "question_id") Long questionId,
                                                                   @RequestBody PastQuestionRequestDto requestDto){
        Map<String, Object> response=  new HashMap<>();

        if(adminPastService.adminPastTestUpdate(testId, questionId, requestDto)) {
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "과거시험 삭제")
    @DeleteMapping("/{test_id}")
    public ResponseEntity<Map<String, Object>> adminPastTestDelete(@PathVariable(name = "test_id") Long testId){
        Map<String, Object> response=  new HashMap<>();

        if(adminPastService.adminPastTestDelete(testId)) {
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
