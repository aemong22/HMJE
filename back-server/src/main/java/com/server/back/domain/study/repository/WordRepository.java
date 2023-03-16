package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;




public interface WordRepository extends JpaRepository<Word, Long> {
    Word findByWordId(Long wordId);
    Page<Word> findByWordNameStartsWith(String wordName, Pageable pageable); // 특정 키워드 서칭하여 페이지네이션
    int countAllByWordNameStartsWith(String wordName); // 특정 키워드로 시작하는 단어 카운팅

    @Query("select w from Word w where w.wordName >= :startFilter and w.wordName < :endFilter and w.wordName like :keyword%")
    Page<Word> findAllByWordNameAndFilterAndPaging(@Param("startFilter") String startFilter, @Param("endFilter") String endFilter, @Param("keyword") String keyword, Pageable pageable);

    @Query("select count(w) from Word w where w.wordName >= :startFilter and w.wordName < :endFilter and w.wordName like :keyword%")
    int countAllByWordNameAndFilterAndPaging(@Param("startFilter") String startFilter, @Param("endFilter") String endFilter, @Param("keyword") String keyword);

}
