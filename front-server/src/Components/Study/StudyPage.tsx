import { useLazyGetStudyWordQuery } from "../../Store/api";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
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

  // 문제
  const [question, setQuestion] = useState<Object>([
    {
      word_id: 123,
      word_name: "무지개",
      word_type: "명사",
      word_rating: "초급",
      word_detail: "공중에 떠 있는 물방울이 햇빛을 받아 나타나는, 반원 모양의 일곱 빛깔의 줄",
      word_example: "비가 그치고 구름 사이로 무지개가 나타났다.",
    }
  ]);
  
  // RTK QUERY 불러오기
  const [ getStudyWord,{ data:questions, isLoading, error } ] = useLazyGetStudyWordQuery();

  useEffect(() => {
    if(studyType === "wordStudy") {
      getStudyWord(50)
    }
  },[studyType])

  useEffect(() => {
    if(questions){
      console.log("here",questions.data.length)
      setQuestion(questions.data)
    }
  },[questions?.data])
  
  // 학습 시작 시간
  const [startTime, setstartTime] = useState<any>();

  useEffect(()=>{
    setstartTime(Date.now())
  },[])

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

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div>error</div>
  }
  if(!questions && ){
    return <div>로딩중</div>
  }


  return (
    <>
      {!isLoading && !error && 
       <>
       <Navbar/>
       <Study 
         question={question ? question : null}
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
      }
    </>
   
  )
}

export default WordStudy