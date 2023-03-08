package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PastTestResult extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "past_test_result_id")
	private Long pastTestResultId;
	private Integer score;

}
