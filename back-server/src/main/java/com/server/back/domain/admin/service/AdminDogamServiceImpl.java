package com.server.back.domain.admin.service;

import com.server.back.domain.study.dto.DogamRequestDto;
import com.server.back.domain.study.dto.DogamResponseDto;
import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.repository.DogamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class AdminDogamServiceImpl implements AdminDogamService {
    private final DogamRepository dogamRepository;
    @Override
    public List<DogamResponseDto> adminAllDogamList() {
        return dogamRepository.findAll().stream().map(o -> DogamResponseDto.builder()
                .dogamId(o.getDogamId())
                .dogamName(o.getDogamName())
                .dogamMean1(o.getDogamMean1())
                .dogamMean2(o.getDogamMean2())
                .dogamMean3(o.getDogamMean3())
                .dogamExam1(o.getDogamExam1())
                .dogamExam2(o.getDogamExam2())
                .dogamExam3(o.getDogamExam3())
                .dogamOrigin(o.getDogamOrigin())
                .dogamClass(o.getDogamClass())
                .isRared(o.getIsRared())
                .dogamImage("hmm?이거 무엇")
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    public boolean adminDogamInsert(DogamRequestDto requestDto) {
        Dogam dogam = Dogam.builder()
                .dogamName(requestDto.getDogamName())
                .dogamOrigin(requestDto.getDogamOrigin())
                .dogamClass(requestDto.getDogamClass())
                .dogamMean1(requestDto.getDogamMean1())
                .dogamMean2(requestDto.getDogamMean2())
                .dogamMean3(requestDto.getDogamMean3())
                .dogamExam1(requestDto.getDogamExam1())
                .dogamExam2(requestDto.getDogamExam2())
                .dogamExam3(requestDto.getDogamExam3())
                .isRared(requestDto.isRared())
                .build();

        Dogam entity = dogamRepository.save(dogam);
        if(entity.getDogamId() != null) return true;
        else return false;
    }

    @Override
    public boolean adminDogamUpdate(Long dogamId, DogamRequestDto requestDto) {
        Optional<Dogam> entity = dogamRepository.findById(dogamId);

        if(entity.isPresent()){
            Dogam dogam = entity.get();
            dogam.update(requestDto);

            return true;
        }else return false;
    }

    @Override
    public boolean adminDogamDelete(Long dogamId) {
        Optional<Dogam> entity = dogamRepository.findById(dogamId);
        if(entity.isPresent()){
            Dogam dogam = entity.get();
            dogamRepository.delete(dogam);

            return true;
        }else return false;
    }
}
