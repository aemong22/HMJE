package com.server.back.domain.study.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



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
}
