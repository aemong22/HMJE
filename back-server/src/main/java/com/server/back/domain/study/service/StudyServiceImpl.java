package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.*;
import com.server.back.domain.study.entity.*;
import com.server.back.domain.study.repository.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyServiceImpl implements StudyService{
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DogamRepository dogamRepository;
    private final RightWordRepository rightWordRepository;
    private final WrongWordRepository wrongWordRepository;
    private final DogamResultRepository dogamResultRepository;
    private final PastTestRepository pastTestRepository;
    private final PastQuestionRepository pastQuestionRepository;
    private final PastTestResultRepository pastTestResultRepository;


    @Override
    public Integer wordResult(StudyRequestDto requestDto) {
        int rightCount = 0;
        User user = userRepository.findByUserId(requestDto.getUserId());
        for (Long i : requestDto.getRightIdList()) {
            Word word = wordRepository.findByWordId(i);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            RightWord right = rightWordRepository.findByWordAndUser(word, user);
            //틀렸던 문제인지 확인
            if (wrong != null){
                //틀렸던 문제이면 틀린문제에서는 삭제
                wrongWordRepository.delete(wrong);
            }
            if (right == null){
                RightWord rightWord = RightWord.builder()
                        .user(user)
                        .word(word)
                        .build();
                rightWordRepository.save(rightWord);
                //경험치
                rightCount += 1;
            }
        }
        for (Long j : requestDto.getWrongIdList()) {
            Word word = wordRepository.findByWordId(j);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            //틀린 문제 리스트에 없으면 추가해주기
            if (wrong == null){
                WrongWord wrongWord = WrongWord.builder()
                        .user(user)
                        .word(word)
                        .build();
                wrongWordRepository.save(wrongWord);
            }
        }
        return rightCount;
    }

    @Override
    public List<Long> contextResult(StudyRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());
        List<Long> newDogamli = new ArrayList<>();
        for (Long i : requestDto.getRightIdList()) {
            Dogam dogam = dogamRepository.findByDogamId(i);
            DogamResult d = dogamResultRepository.findByDogamAndUser(dogam,user);
            //획득한 도감에 없으면
            if (d == null){
                //도감 생성
                DogamResult dogamresult = DogamResult.builder()
                        .user(user)
                        .dogam(dogam)
                        .build();
                dogamResultRepository.save(dogamresult);
                //획득한 뱃지로 결과 보내주기
                newDogamli.add(dogam.getDogamId());
            }
        }
        //경험치
        return newDogamli;
    }

    @Override
    public List<Dogam> contextQuestion(){
        //랜덤 5문제 (숫자) 뽑기
        Set<Long> set = new HashSet<>();
        while (set.size() < 5) {
            Double d = Math.random() * 100 + 1;                        // 문맥학습 문제 갯수~!~!~!
            set.add(d.longValue());
        }
        List<Long> list = new ArrayList<>(set);
        //도감 리스트로 변신
        List<Dogam> DogamQuestion = new ArrayList<>();
        for (Long i : list){
            Dogam dogam = dogamRepository.findByDogamId(i);
            DogamQuestion.add(dogam);
        }
        return DogamQuestion;
    }
    @Override
    public List<WordResponseDto> wordQuestion(Long userId){
        User user = userRepository.findByUserId(userId);
        Set<Word> wordQuestion = new HashSet<>(); //문제 리스트 준비
        Set<Long> set = new HashSet<>(); //랜덤 10문제 (숫자) 뽑기
        List<WrongWord> myWrong = wrongWordRepository.findAllByUser(user);
        if (myWrong.size() < 3){
            for (WrongWord m : myWrong){
                set.add(m.getWord().getWordId());
                wordQuestion.add(m.getWord());
            }
        }else{
            while (set.size() < 2) {
                Double d = Math.random() * myWrong.size() + 1;
                int index = d.intValue();
                Word word = myWrong.get(index).getWord();
                set.add(word.getWordId());
                wordQuestion.add(word);
            }
        }
        while (set.size() < 10) {
            Double d = Math.random() * wordRepository.count() + 1;
            Word word = wordRepository.findByWordId(d.longValue());
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            RightWord right = rightWordRepository.findByWordAndUser(word, user);
            if (wrong == null && right == null){
                set.add(d.longValue());
                wordQuestion.add(word);
            }
        }
        List<Word> wordQuestionList = new ArrayList<>(wordQuestion);
        List<WordResponseDto> wordResponseDtoList = WordResponseDto.fromEntityList(wordQuestionList);
        return wordResponseDtoList;
    }

    @Override
    public List<WordResponseDto> wordQuestionWithFilter(Long userId, String filter){
        User user = userRepository.findByUserId(userId);
        Set<Word> wordQuestion = new HashSet<>(); //문제 리스트 준비
        Set<Long> set = new HashSet<>(); //랜덤 10문제 (숫자) 뽑기
        List<WrongWord> myWrong = wrongWordRepository.findAllByFilterAndUser(user, filter);
        if (myWrong.size() < 3){
            for (WrongWord m : myWrong){
                set.add(m.getWord().getWordId());
                wordQuestion.add(m.getWord());
            }
        }else{
            while (set.size() < 2) {
                Double d = Math.random() * myWrong.size() + 1;
                int index = d.intValue();
                Word word = myWrong.get(index).getWord();
                set.add(word.getWordId());
                wordQuestion.add(word);
            }
        }
        while (set.size() < 10) {
            List<Word> wordList = wordRepository.findAllByWordRating(filter);
            Double d = Math.random() * wordList.size() + 1;
            int index = d.intValue();
            Word word = wordList.get(index);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            RightWord right = rightWordRepository.findByWordAndUser(word, user);
            if (wrong == null && right == null){
                set.add(word.getWordId());
                wordQuestion.add(word);
            }
        }
        List<Word> wordQuestionList = new ArrayList<>(wordQuestion);
        List<WordResponseDto> wordResponseDtoList = WordResponseDto.fromEntityList(wordQuestionList);
        return wordResponseDtoList;
    }


    @Override
    public PastTestResponseDto getPastInfo() {
        PastTest pastTest = pastTestRepository.findFirstByOrderByCreatedAtDesc();
        PastTestResponseDto result = PastTestResponseDto.fromEntity(pastTest);
        return result;
    }


    @Override
    public List<PastQuestionResponseDto> getPastTest() {
        PastTest pastTest = pastTestRepository.findFirstByOrderByCreatedAtDesc();
        LocalDate today = LocalDate.now(); // 오늘 날짜 확인
        if(today.isBefore(pastTest.getStartTime()) || today.isAfter(pastTest.getEndTime())){ // 시작날짜보다 빠르거나 종료날짜보다 늦으면
            return null;
        }
        List<PastQuestion> pastQuestionList = pastQuestionRepository.findAllByPastTest(pastTest);
        List<PastQuestionResponseDto> result = PastQuestionResponseDto.fromEntityList(pastQuestionList);

        return result;

    }


    @Override
    public Boolean createPastTestResult(PastTestResultRequestDto pastTestResultRequestDto) {

        User user = userRepository.findByUserId(pastTestResultRequestDto.getUserId());
        PastTest pastTest = pastTestRepository.findByPastTestId(pastTestResultRequestDto.getPastTestId());

        PastTestResult pastTestResult = PastTestResult.builder()
            .score(pastTestResultRequestDto.getScore())
            .user(user)
            .pastTest(pastTest)
            .build();

        pastTestResultRepository.save(pastTestResult);

        return true;
    }

}
