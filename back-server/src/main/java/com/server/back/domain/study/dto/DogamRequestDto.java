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

    private String dogamName;
    private String dogamClass;
    private String dogamOrigin;
    private String dogamImage;
    private String dogamMean1;
    private String dogamMean2;
    private String dogamMean3;
    private String dogamExam1;
    private String dogamExam2;
    private String dogamExam3;
    private Boolean isRared;
}
