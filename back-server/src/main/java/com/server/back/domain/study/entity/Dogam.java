package com.server.back.domain.study.entity;


import com.server.back.domain.study.dto.DogamRequestDto;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Dogam {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dogam_id")
	private Long dogamId;

	private String dogamName;
	private String dogamClass;
	private String dogamOrigin;
	private String dogamMean1;
	private String dogamMean2;
	private String dogamMean3;
	private String dogamExam1;
	private String dogamExam2;
	private String dogamExam3;
	private Boolean isRared;
    public void update(DogamRequestDto requestDto) {
		this.dogamName = requestDto.getDogamName();
		this.dogamClass = requestDto.getDogamClass();
		this.dogamOrigin = requestDto.getDogamOrigin();
		this.dogamMean1 = requestDto.getDogamMean1();
		this.dogamMean2 = requestDto.getDogamMean2();
		this.dogamMean3 = requestDto.getDogamMean3();
		this.dogamExam1 = requestDto.getDogamExam1();
		this.dogamExam2 = requestDto.getDogamExam2();
		this.dogamExam3 = requestDto.getDogamExam3();
		this.isRared = requestDto.isRared();
	}
}
