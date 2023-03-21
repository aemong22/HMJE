package com.server.back.domain.study.dto;

import com.server.back.domain.study.entity.PastTest;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PastTestResponseDto")
public class PastTestResponseDto {
    Long pastTestId;
    LocalDate startTime;
    LocalDate endTime;

    public static PastTestResponseDto fromEntity(PastTest pastTest) {
        PastTestResponseDto pastTestResponseDto = PastTestResponseDto.builder()
            .pastTestId(pastTest.getPastTestId())
            .startTime(pastTest.getStartTime())
            .endTime(pastTest.getEndTime())
            .build();

        return pastTestResponseDto;
    }

}
