package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import com.server.back.domain.study.dto.PastQuestionRequestDto;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PastQuestion extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "past_question_id")
	private Long pastQuestionId;

	private String pastQuestion;
	private String pastChoice1;
	private String pastChoice2;
	private String pastChoice3;
	private String pastChoice4;
	private String pastChoice5;
	private Integer pastAnswer;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "past_test_id")
	private PastTest pastTest;

	public void update(PastQuestionRequestDto requestDto) {
		this.pastQuestion = requestDto.getPastQuestion();
		this.pastChoice1 = requestDto.getPastChoice1();
		this.pastChoice2 = requestDto.getPastChoice2();
		this.pastChoice3 = requestDto.getPastChoice3();
		this.pastChoice4 = requestDto.getPastChoice4();
		this.pastChoice5 = requestDto.getPastChoice5();
		this.pastAnswer = requestDto.getPastAnswer();
	}
}
