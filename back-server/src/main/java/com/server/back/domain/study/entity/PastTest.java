package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PastTest extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "past_test_id")
	private Long pastTestId;
	private LocalDate startTime;
	private LocalDate endTime;
	@OneToMany(mappedBy = "pastTest", fetch = FetchType.LAZY)
	List<PastQuestion> pastQuestionList;
}
