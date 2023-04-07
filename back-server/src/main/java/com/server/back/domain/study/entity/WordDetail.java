package com.server.back.domain.study.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "word_id")
	private Word word;

	@JsonManagedReference
	@OneToMany(mappedBy = "wordDetail", fetch = FetchType.LAZY)
	private List<WordExample> wordExampleList = new ArrayList<>();


}
