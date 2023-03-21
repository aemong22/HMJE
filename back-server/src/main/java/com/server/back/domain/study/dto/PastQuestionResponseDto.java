package com.server.back.domain.study.dto;

import com.server.back.domain.study.entity.PastQuestion;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PastQuestionResponseDto")
public class PastQuestionResponseDto {
    Long pastQuestionId;
    String pastQuestion;
    String pastChoice1;
    String pastChoice2;
    String pastChoice3;
    String pastChoice4;
    String pastChoice5;
    Integer pastAnswer;
    String pastText;

    public static PastQuestionResponseDto fromEntity(PastQuestion pastQuestion) {
        PastQuestionResponseDto pastQuestionResponseDto = PastQuestionResponseDto.builder()
                                                                                 .pastQuestionId(pastQuestion.getPastQuestionId())
                                                                                 .pastQuestion(pastQuestion.getPastQuestion())
                                                                                 .pastChoice1(pastQuestion.getPastChoice1())
                                                                                 .pastChoice2(pastQuestion.getPastChoice2())
                                                                                 .pastChoice3(pastQuestion.getPastChoice3())
                                                                                 .pastChoice4(pastQuestion.getPastChoice4())
                                                                                 .pastChoice5(pastQuestion.getPastChoice5())
                                                                                 .pastAnswer(pastQuestion.getPastAnswer())
                                                                                 .pastText(pastQuestion.getPastText())
                                                                                 .build();

        return pastQuestionResponseDto;
    }

    public static List<PastQuestionResponseDto> fromEntityList(List<PastQuestion> pastQuestionList){
        List<PastQuestionResponseDto> result = new ArrayList<>();
        for (PastQuestion pastQuestion : pastQuestionList) {
            PastQuestionResponseDto pastQuestionResponseDto = fromEntity(pastQuestion);
            result.add(pastQuestionResponseDto);
        }
        return result;
    }

}
