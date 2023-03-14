import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import internal from "stream"
import Navbar from "../Common/Navbar"
import AnswerModal from "./AnswerModal"
import ResultModal from "./ResultModal"
import Study from "./Study"

function WordStudy(): JSX.Element {

  // 학습 종류
  const location = useLocation();
  const [studyType, setStudyType] = useState<String>();
  useEffect(()=> {
    setStudyType((location.pathname).replace("/",""));
  },[])

  const question: object = [{
    word_id: 123,
    word_name: "무지개",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "공중에 떠 있는 물방울이 햇빛을 받아 나타나는, 반원 모양의 일곱 빛깔의 줄",
    word_example: "비가 그치고 구름 사이로 무지개가 나타났다.",
  },{
    word_id: 124,
    word_name: "강아지",
    word_type:"명사",
    word_rating: "초급",
    word_detail: "개의 새끼.1",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 125,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.2",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 126,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.3",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 127,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.4",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 128,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.5",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 129,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.6",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 130,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.7",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 131,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.8",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 132,
    word_name: "강아지",
    word_type: "명사",
    word_rating: "초급",
    word_detail: "개의 새끼.9",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  }] 
  
  // 학습 시작 시간
  const [startTime, setstartTime] = useState<any>();

  useEffect(()=>{
    setstartTime(Date.now())
  },[])


  // 학습 마무리 시간

  // 현재 문제 번호
  const [num, setNum] = useState<number>(0)

  // 세모 개수
  const [semo, setSemo] = useState<number>(0)

  // 맞힌 word_id
  const [correct, setCorrect] = useState([])

  // 틀린 word_id
  const [wrong, setWrong] = useState([])

  // 정답, 오답 모달
  const [modalOpen, setModalOpen ] = useState<Boolean>(false);

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  // 결과 모달
  const [resultModal, setResultModal] = useState<Boolean>(false);

  // 맞힘 틀림
  const [right, setRight] = useState<Boolean>(false);
  
  return (
    <>
      <Navbar/>
      <Study 
        question={question}
        studyType={studyType} 
        num={num}
        correct={correct} setCorrect={setCorrect} 
        wrong={wrong} setWrong={setWrong}
        semo={semo}
        setSemo={setSemo}
        right={right} setRight={setRight}
        setResultModal={setResultModal}
        openModal={openModal}/>

      { modalOpen ? 
        <AnswerModal 
          closeModal={closeModal} 
          studyType={studyType} 
          setRight={setRight}
          right={right} 
          num={num} 
          setNum={setNum}
          setResultModal={setResultModal} 
          question={question
        }/> : null }

        {resultModal ? 
          <ResultModal 
            studyType={studyType} 
            setResultModal={setResultModal}
            correct={correct}
            semo={semo}
            wrong={wrong}
            startTime={startTime}
            /> : null}
    </>
  )
}

export default WordStudy