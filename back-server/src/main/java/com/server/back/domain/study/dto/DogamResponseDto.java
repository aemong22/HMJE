package com.server.back.domain.study.dto;

import com.server.back.domain.study.entity.Dogam;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "DogamResponseDto")
public class DogamResponseDto {
    Long dogamId;
    String dogamName;
    String dogamClass;
    String dogamOrigin;
    String dogamMean1;
    String dogamMean2;
    String dogamMean3;
    String dogamExam1;
    String dogamExam2;
    String dogamExam3;
    Boolean isRared;

    public static DogamResponseDto MakeDogamResponseDto(Dogam d) {
        DogamResponseDto dogamResponseDto = DogamResponseDto.builder()
                .dogamId(d.getDogamId())
                .dogamName(d.getDogamName())
                .dogamClass(d.getDogamClass())
                .dogamOrigin(d.getDogamOrigin())
                .dogamExam1(d.getDogamExam1())
                .dogamExam2(d.getDogamExam2())
                .dogamExam3(d.getDogamExam3())
                .dogamMean1(d.getDogamMean1())
                .dogamMean2(d.getDogamMean2())
                .dogamMean3(d.getDogamMean3())
                .isRared(d.getIsRared())
                .build();
        return dogamResponseDto;
    }


    public static List<DogamResponseDto> MakeDogamResponseList(List<Dogam> dogamList) {
        List<DogamResponseDto> result = new ArrayList<>();
        for (Dogam dogam : dogamList) {
            DogamResponseDto dogamResponseDto = MakeDogamResponseDto(dogam);
            result.add(dogamResponseDto);
        }
        return result;
    }

    public static DogamResponseDto MakeDogamResponseDtoToEncode(Dogam d) {
        DogamResponseDto dogamResponseDto = DogamResponseDto.builder()
                                                            .dogamId(d.getDogamId())
                                                            .dogamName(Base64.getEncoder().withoutPadding().encodeToString(d.getDogamName().getBytes()))
                                                            .dogamClass(d.getDogamClass())
                                                            .dogamOrigin(d.getDogamOrigin())
                                                            .dogamExam1(d.getDogamExam1())
                                                            .dogamExam2(d.getDogamExam2())
                                                            .dogamExam3(d.getDogamExam3())
                                                            .dogamMean1(d.getDogamMean1())
                                                            .dogamMean2(d.getDogamMean2())
                                                            .dogamMean3(d.getDogamMean3())
                                                            .isRared(d.getIsRared())
                                                            .build();
        return dogamResponseDto;
    }


    public static List<DogamResponseDto> MakeDogamResponseListToEncode(List<Dogam> dogamList) {
        List<DogamResponseDto> result = new ArrayList<>();
        for (Dogam dogam : dogamList) {
            DogamResponseDto dogamResponseDto = MakeDogamResponseDtoToEncode(dogam);
            result.add(dogamResponseDto);
        }
        return result;
    }

}
