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
@ApiModel(value = "DogamRequestDto")
public class DogamRequestDto {
    String dogamName;
    String dogamClass;
    String dogamOrigin;
    String dogamImage;
    String dogamMean1;
    String dogamMean2;
    String dogamMean3;
    String dogamExam1;
    String dogamExam2;
    String dogamExam3;
    boolean isRared;
}
