package com.server.back.domain.cs.controller;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;
import com.server.back.domain.cs.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/notice")
@RestController
public class NoticeController {
    private final NoticeService noticeService;

    @ApiOperation(value = "공지사항 목록 조회")
    @GetMapping()
    public ResponseEntity<Map<String, Object>> noticeAllList(){
        Map<String, Object> response = new HashMap<>();

        List<NoticeResponseDto> noticeList = noticeService.noticeAllList();

        response.put("message", "success");
        response.put("data", noticeList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value="공지사항 상세 조회")
    @GetMapping("/{notice_id}")
    public ResponseEntity<Map<String, Object>> noticeDetailSelect(@PathVariable(name = "notice_id") Long noticeId){
        Map<String, Object> response = new HashMap<>();

        NoticeResponseDto notice = noticeService.noticeDetailSelect(noticeId);

        if(notice != null){
            response.put("message", "success");
            response.put("data", notice);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "공지사항 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> noticeInsert(@RequestBody NoticeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(noticeService.noticeInsert(requestDto)){
            response.put("message", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "공지사항 수정")
    @PutMapping("/{notice_id}")
    public ResponseEntity<Map<String, Object>> noticeUpdate(@PathVariable(name = "notice_id") Long noticeId, @RequestBody NoticeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(noticeService.noticeUpdate(noticeId, requestDto)) {
            response.put("message", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @ApiOperation(value = "공지사항 삭제")
    @DeleteMapping("/{notice_id}")
    public ResponseEntity<Map<String, Object>> noticeUpdate(@PathVariable(name = "notice_id") Long noticeId){
        Map<String, Object> response = new HashMap<>();

        noticeService.noticeDelete(noticeId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
