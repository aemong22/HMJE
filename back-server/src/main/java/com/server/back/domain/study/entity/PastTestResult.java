package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import com.server.back.domain.user.entity.User;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "past_test_id")
	private PastTest pastTest;

}
