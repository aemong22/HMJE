package com.server.back.domain.message.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.back.domain.message.dto.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@PropertySource("classpath:application.properties")
@Slf4j
@RequiredArgsConstructor
@Service
public class SmsService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    //휴대폰 인증 번호
    private final String smsConfirmNum = createSmsKey();
    private final RedisUtilService redisUtil;

    @Value("${naver-cloud-sms.accessKey}")
    private String accessKey;

    @Value("${naver-cloud-sms.secretKey}")
    private String secretKey;

    @Value("${naver-cloud-sms.serviceId}")
    private String serviceId;

    @Value("${naver-cloud-sms.senderPhone}")
    private String phone;

    public String getSignature(String time) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/"+ this.serviceId+"/messages";
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(time)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    public SmsResponseDto sendSms(MessageDto messageDto) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        String time = Long.toString(System.currentTimeMillis());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time);
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", getSignature(time)); // signature 서명

        List<MessageDto> messages = new ArrayList<>();
        messages.add(messageDto);

        SmsRequestDto request = SmsRequestDto.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(phone)
                .content("[홍민정음] 인증번호 [" + smsConfirmNum + "]를 입력해주세요")
                .messages(messages)
                .build();

        //쌓은 바디를 json형태로 반환
        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);
        // jsonBody와 헤더 조립
        HttpEntity<String> httpBody;
        httpBody = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        //restTemplate로 post 요청 보내고 오류가 없으면 202코드 반환
        SmsResponseDto smsResponseDto = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ serviceId +"/messages"), httpBody, SmsResponseDto.class);
        //SmsResponseDto responseDto = new SmsResponseDto(smsConfirmNum);
        redisUtil.setDataExpire(smsConfirmNum, messageDto.getTo(), 60 * 3L); // 유효시간 3분
        return smsResponseDto;
    }


    // 인증코드 만들기
    public static String createSmsKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 5; i++) { // 인증코드 5자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public boolean userPhonenumberCheck(MessageDto requestDto) {
        System.out.println("requestDto-phonenumber///////////////"+requestDto.getTo());
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getPhoneNumber().equals(requestDto.getTo())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }

    // 인증번호와 휴대폰번호가 일치하면 true
    public boolean isModify(ModifyNumberDto requestDto){
        String value = redisUtil.getData(requestDto.getModifyNumber());
        if (value == null) {
            return false;  // 인증번호 오류일 경우
        }
        Boolean result = redisUtil.getData(requestDto.getModifyNumber()).equals(requestDto.getPhoneNumber()); //인증번호와 휴대폰 번호가 일치하는지 확인
        return result;
    }

    // 아이디, 비밀번호 찾기 인증코드 만들기
    public static String createFindKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 7; i++) { // 인증코드 7자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public String modifySms(ModifyNumberDto requestDto) {
        // 인증번호 확인
        if (isModify(requestDto)) {
            redisUtil.deleteData(requestDto.getModifyNumber()); //인증번호 일치하면 인증번호 삭제
            if (requestDto.getPurpose().equals("findId")) {
                String findConfirmNum = createFindKey();
                redisUtil.setDataExpire(findConfirmNum, requestDto.getPhoneNumber(), 30 * 1L); // 인증시간 30초
                return findConfirmNum;
            } else if (requestDto.getPurpose().equals("findPassword")) {
                String findConfirmNum = createFindKey();
                redisUtil.setDataExpire(findConfirmNum, requestDto.getPhoneNumber(), 60 * 5L); // 인증시간 5분
                return findConfirmNum;
            }
            return "true";
        }
        return "false";
    }

    // 인증번호와 휴대폰번호가 일치하면 username
    public String findUsername(FindRequestDto requestDto){
        Boolean result = false;
        String value = redisUtil.getData(requestDto.getModifyNum());
        // 인증번호 오류가 아니고
        if (value != null) {
            result = redisUtil.getData(requestDto.getModifyNum()).equals(requestDto.getPhoneNum()); //인증번호와 휴대폰 번호가 일치하는지 확인
        }
        //결론
        if (result){
            redisUtil.deleteData(requestDto.getModifyNum()); //인증번호 일치하면 인증번호 삭제
            String username = userRepository.findByPhoneNumber(requestDto.getPhoneNum()).getUsername();
            return username;
        }
        return "false";
    }

    public Boolean findPassword(FindRequestDto requestDto){
        String value = redisUtil.getData(requestDto.getModifyNum());
        // 인증번호 오류, 새로운 비밀번호 존재여부 확인
        if ((value != null) && (requestDto.getNewPassword() != null)) {
            Boolean result = redisUtil.getData(requestDto.getModifyNum()).equals(requestDto.getPhoneNum());
            //인증번호와 휴대폰 번호가 일치하는지 확인
            if (result){
                redisUtil.deleteData(requestDto.getModifyNum()); //인증번호 일치하면 인증번호 삭제
                System.out.println("result = " + result);
                User user = userRepository.findByPhoneNumber(requestDto.getPhoneNum());
                System.out.println("user.getUserId() = " + user.getUserId());
                String newpassword = bCryptPasswordEncoder.encode(requestDto.getNewPassword());
                System.out.println("newpassword = " + newpassword);
                user.changePassord(newpassword);
                return true;
            }
        }
        return false;
    }
}
