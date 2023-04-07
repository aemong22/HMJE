package com.server.back.domain.message.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.domain.message.dto.MessageDto;
import com.server.back.domain.message.dto.ModifyNumberDto;
import com.server.back.domain.message.dto.SmsResponseDto;
import com.server.back.domain.message.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class SmsController {
    private final SmsService smsService;

    @PostMapping("/sms/send/{role}")
    public ResponseEntity<Map<String, Object>> sendSms(@PathVariable(value = "role") String role, @RequestBody MessageDto messageDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        Map<String, Object> response = new HashMap<>();
        if (role.equals("only")){
            Boolean onlyPhoneNumber = smsService.userPhonenumberCheck(messageDto);
            if (onlyPhoneNumber){
                System.out.println("수정가능한 번호임");
                SmsResponseDto responseDto = smsService.sendSms(messageDto);
                response.put("data", responseDto);
                response.put("message", "success");
            }else{
                response.put("data", "이미 가입된 휴대폰입니다.");
                response.put("message", "success");
            }
        }else{
            SmsResponseDto responseDto = smsService.sendSms(messageDto);
            response.put("data", responseDto);
            response.put("message", "success");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/sms/modify")
    public ResponseEntity<Map<String, Object>> checkSms(@RequestBody ModifyNumberDto requestDto) {
        Map<String, Object> response = new HashMap<>();
        String modifyResult = smsService.modifySms(requestDto);
        response.put("data", modifyResult);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
