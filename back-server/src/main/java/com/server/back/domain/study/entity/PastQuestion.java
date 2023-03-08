package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
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

}
