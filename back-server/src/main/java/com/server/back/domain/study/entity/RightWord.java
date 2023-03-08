package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RightWord extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "right_word_id")
	private Long rightWordId;

}
