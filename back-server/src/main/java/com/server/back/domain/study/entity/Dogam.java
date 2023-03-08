package com.server.back.domain.study.entity;


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



}
