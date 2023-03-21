package com.server.back.domain.admin.service;

import com.server.back.domain.study.dto.PastQuestionRequestDto;
import com.server.back.domain.study.dto.PastQuestionResponseDto;
import com.server.back.domain.study.dto.PastRequestDto;
import com.server.back.domain.study.dto.PastTestResponseDto;
import com.server.back.domain.study.entity.PastQuestion;
import com.server.back.domain.study.entity.PastTest;
import com.server.back.domain.study.repository.PastQuestionRepository;
import com.server.back.domain.study.repository.PastTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class AdminPastServiceImpl implements AdminPastService {
    private final PastTestRepository pastTestRepository;
    private final PastQuestionRepository pastQuestionRepository;
    @Override
    public List<PastTestResponseDto> adminAllPastTestList() {



        return pastTestRepository.findAll().stream().map(o -> PastTestResponseDto.builder()
                .pastTestId(o.getPastTestId())
                .startTime(o.getStartTime())
                .endTime(o.getEndTime())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<PastQuestionResponseDto> adminPastQuestionList(Long testId) {
        PastTest test = pastTestRepository.findById(testId).orElseThrow(
            () -> new IllegalArgumentException("테스트가 존재하지 않습니다.")
        );
        List<PastQuestion> pastQuestionList = pastQuestionRepository.findAllByPastTest(test);
        List<PastQuestionResponseDto> result = PastQuestionResponseDto.fromEntityList(pastQuestionList);

        return result;
    }

    @Override
    public boolean adminPastTestInsert(PastRequestDto requestDto) {
        // 새로운 과거시험 회차 생성.
        PastTest pastTest = PastTest.builder()
                .startTime(requestDto.getStartTime())
                .endTime(requestDto.getEndTime())
                .build();

        // DB에 추가
        PastTest entity = pastTestRepository.save(pastTest);
        if(entity != null){
            for(PastQuestionRequestDto request : requestDto.getPastQuestionList()){
                // 새로운 과거시험의 문제 생성
                PastQuestion pastQuestion = PastQuestion.builder()
                        .pastQuestion(request.getPastQuestion())
                        .pastChoice1(request.getPastChoice1())
                        .pastChoice2(request.getPastChoice2())
                        .pastChoice3(request.getPastChoice3())
                        .pastChoice4(request.getPastChoice4())
                        .pastChoice5(request.getPastChoice5())
                        .pastAnswer(request.getPastAnswer())
                        .pastText(request.getPastText())
                        .pastTest(entity)
                        .build();

                //DB에 추가
                pastQuestionRepository.save(pastQuestion);
            }

            return true;
        }

        return false;
    }

    @Override
    public boolean adminPastTestUpdate(Long testId, Long questionId, PastQuestionRequestDto requestDto) {
        Optional<PastTest> optionalTest = pastTestRepository.findById(testId);
        Optional<PastQuestion> optionalQuestion = pastQuestionRepository.findById(questionId);

        if(optionalTest.isEmpty() || optionalQuestion.isEmpty()) return false;

        PastTest pastTest = optionalTest.get();
        PastQuestion pastQuestion = optionalQuestion.get();

        if(pastQuestion.getPastTest().getPastTestId() != pastTest.getPastTestId()) return false;

        pastQuestion.update(requestDto);

        return true;
    }

    @Override
    public boolean adminPastTestDelete(Long testId) {
        Optional<PastTest> optional = pastTestRepository.findById(testId);

        if(optional.isEmpty()) return false;

        PastTest entity = optional.get();
        // 문제 삭제
        pastQuestionRepository.deleteAll(entity.getPastQuestionList());
        // 회차 삭제
        pastTestRepository.delete(entity);
        
        return true;
    }
}
