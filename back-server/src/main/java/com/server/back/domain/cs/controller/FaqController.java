package com.server.back.domain.cs.controller;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;
import com.server.back.domain.cs.service.FaqService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/faq")
@RestController
public class FaqController {
    private final FaqService faqService;

    @ApiOperation(value = "FAQ 목록 조회")
    @GetMapping()
    public ResponseEntity<Map<String, Object>> faqAllList(){
        Map<String, Object> response = new HashMap<>();

        List<NoticeResponseDto> faqList = faqService.faqAllList();

        response.put("message", "success");
        response.put("data", faqList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value="FAQ 상세 조회")
    @GetMapping("/{faq_id}")
    public ResponseEntity<Map<String, Object>> faqDetailSelect(@PathVariable(name = "faq_id") Long faqId){
        Map<String, Object> response = new HashMap<>();

        NoticeResponseDto faq = faqService.faqDetailSelect(faqId);

        if(faq != null){
            response.put("message", "success");
            response.put("data", faq);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "FAQ 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> faqInsert(@RequestBody NoticeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(faqService.faqInsert(requestDto)){
            response.put("message", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "FAQ 수정")
    @PutMapping("/{faq_id}")
    public ResponseEntity<Map<String, Object>> faqUpdate(@PathVariable(name = "faq_id") Long faqId, @RequestBody NoticeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(faqService.faqUpdate(faqId, requestDto)) {
            response.put("message", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @ApiOperation(value = "FAQ 삭제")
    @DeleteMapping("/{faq_id}")
    public ResponseEntity<Map<String, Object>> faqUpdate(@PathVariable(name = "faq_id") Long faqId){
        Map<String, Object> response = new HashMap<>();

        faqService.faqDelete(faqId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
