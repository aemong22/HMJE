package com.server.back.domain.study.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WordDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "word_detail_id")
	private Long wordDetailId;
	private String details;
	private Integer detailNum;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "word_id")
	private Word word;

	@OneToMany(mappedBy = "wordDetail", fetch = FetchType.LAZY)
	private List<WordExample> wordExampleList = new ArrayList<>();


}
