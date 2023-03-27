import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
import ReactDOMServer from 'react-dom/server';

function Study({question, studyType,num,correct,setCorrect,wrong,setWrong,semo,setSemo,right, setRight, openModal, setResultModal, modalOpen, resultModal, closeModal}:any): JSX.Element {
  // 단어 디코딩
  const [decoding, setDecoding] = useState<String>();
  // 초성
  const [result, setResult] = useState<String>();

  // 초성 뽑아내기
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  
  
  // 문맥 도감일 경우 제외
  const chosung = (temp:String) => {
    let make = ""

    for(let i=0; i<temp.length;i++){
      let code = temp.charCodeAt(i)-44032;
      if(code>-1 && code<11172) make += cho[Math.floor(code/588)];
      else make += temp.charCodeAt(i);
    }
    setResult(make);
  }
  if(studyType === "wordStudy"){

  }
  


  const [hint, setHint] = useState<Boolean>(false);

  // 그만두기
  const [stop, setStop] = useState<Boolean>(false);

  // 건너뛰기
  const [skip, setSkip] = useState<Boolean>(false);
  
  // 타이머
  const [count, setCount] = useState(30);

   useEffect(() => {
    setCount(30);
    SpeechRecognition.stopListening();
    setSkip(false);

    if(studyType === "wordStudy") {
      let temp = decodeURIComponent(escape(atob(question[num].wordName)))
      setDecoding(temp)
      chosung(temp)
    }
    else if(studyType==="contextStudy"){
      let temp = decodeURIComponent(escape(atob(question[num].dogamName)))
      setDecoding(temp)
    }
    else {
      setDecoding(question[num].wordName)
      if(studyType==="wrongStudy"){
        chosung(question[num].wordName)
      }
    }
    

   },[num])

   
   

   useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1); 
    }, 1000);
    

    // 못맞춤
    if(count <= 0){
      clearInterval(id);
      setInput("");
      if(studyType !== "contextStudy") {
        if(!wrong.includes(question[num]?.wordId)){
          setWrong([...wrong,question[num]?.wordId])
        }
      }
      else {
        if(!wrong.includes(question[num]?.dogamId)){
          setWrong([...wrong,question[num]?.dogamId])
        }
      }
      openModal()
      setHint(false)
    }
    // 시간초 내에 맞춤
    else if(right) {
      clearInterval(id);
    }
    // 그만두기
    else if(stop){
      clearInterval(id);
      setResultModal(true)
    }
    // 건너뛰기
    else if(skip){
      clearInterval(id);
      
      if(studyType !== "contextStudy") {
        if(!wrong.includes(question[num]?.wordId)){
          setWrong([...wrong,question[num]?.wordId])
        }
      }
      else {
        if(!wrong.includes(question[num]?.dogamId)){
          setWrong([...wrong,question[num]?.dogamId])
        }
      }
      openModal()
      setHint(false)
    }
     return () => clearInterval(id);
   }, [count]);

  // 입력
  const [input, setInput] = useState("");
  const onChange = (e:any)  => {
    if(modalOpen || resultModal) {
      console.log("이미 결과가 뜬 단어입니다.")
    }
    else{
      setInput(e.target.value)
    }
  }

  // 음성 입력
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
      var word = transcript.split(" ")[0];
      setInput(word)
  },[transcript,listening])

  useEffect(() => {
    if((transcript.split(" ")[0] === input ) && (transcript.length > 0) && (!listening))  {
      setTimeout(() => {
        if(studyType !== "contextStudy") {
          submit();
        }
        else {
          submit2();
        }
      },1500)
    }
  },[input,listening])

  // wordStudy, 복습
  const submit = () => {
    resetTranscript()
    setInput("")

    if( modalOpen || resultModal ) {
      console.log("이미 결과가 뜬 단어입니다.")
    }
    else {
      console.log("제출")
      //정답
      if(input === decoding) {
        if(hint) {
          setSemo(semo+1)
          setHint(false)
        }
        else {
          if(!correct.includes(question[num]?.wordId)) {
            setCorrect([...correct,question[num]?.wordId])
          }
          else {
            console.log("이미 결과 list에 포함된 단어입니다.")
          }
        }
        setRight(true)
        openModal()
      }
      // 오답 -> toast 띄우기
      else{
        toast.error("틀렸습니다")
      }
    }
  }

  // contextStudy
  const submit2 = () => {
    resetTranscript()
    setInput("")
    if( modalOpen || resultModal ) {
      console.log("이미 결과가 뜬 단어입니다.")
    }
    else {
      
      //정답
      if(input === decoding) {
        if(hint) {
          setSemo(semo+1)
          setHint(false)
        }
        else {
          if(!correct.includes(question[num]?.dogamId)){
            setCorrect([...correct,question[num]?.dogamId])
          }
          else{
            console.log("이미 결과 list에 포함된 단어입니다.")
          }
        }
        setRight(true)
        openModal()
      }

      // 오답 -> toast 띄우기
      else{
        toast.error("틀렸습니다")
      }
    }
  }


  return(
    <>
      <Toast />
      <div className="bg-[#F9F9F9] py-8">
        <div className="relative container max-w-screen-xl w-full p-2 mx-auto flex lg:flex-row flex-col lg:justify-between overflow-x-hidden">
          {/* 왼쪽 상단 */}
          <div className="absolute z-10 lg:w-[82%] w-full flex justify-between pr-5 text-[1.1rem]">
            <div className="bg-[#F7CCB7] min-h-[5rem] rounded-md py-1 px-4 font-bold text-[#ffffff]">문제 {num +1}</div>
            <div className="font-bold">{num+1} / {Object.keys(question).length}</div>
          </div>
          {/* 왼쪽 학습 영역 */}
          <div className="mt-8 z-20 bg-[#F4EFEC] lg:w-[82%] w-full min-h-[25rem] py-6 lg:px-6 px-4 flex flex-col justify-between rounded-lg md:text-[1.3rem] text-[1.2rem] font-normal">
            <div>
              <div className="font-semibold md:text-[1.2rem] text-[1.1rem] mb-3">
                {studyType !== "contextStudy" ? 
                  <>
                    해당 뜻을 가진 단어를 적으시오.
                  </>:
                  <>
                    빈칸에 공통적으로 들어갈 말을 적으시오.
                  </>}
              </div>
              <div className="py-4 overflow-auto">
                { studyType !== "contextStudy" ? 
                <>
                  <span className="">{question[num]?.wordDetailResponseList[0]?.details}</span>
                </> :  
                <>
                  <div className= "leading-10" dangerouslySetInnerHTML={{__html: question[num]?.dogamExam1.replace(
                    decoding,
                    `<span class="px-[2rem] mx-[0.2rem] rounded-lg border-2 border-[#F7CCB7] bg-[#ffffff]"></span>`
                  )}}></div>
                  <div className= "leading-10" dangerouslySetInnerHTML={{__html: question[num]?.dogamExam2.replace(
                    decoding,
                    `<span class="px-[2rem] mx-[0.2rem] rounded-lg border-2 border-[#F7CCB7] bg-[#ffffff]"></span>`
                  )}}></div>
                  <div className= "leading-10" dangerouslySetInnerHTML={{__html: question[num]?.dogamExam3.replace(
                    decoding,
                    `<span class="px-[2rem] mx-[0.2rem] rounded-lg border-2 border-[#F7CCB7] bg-[#ffffff]"></span>`
                  )}}></div>
                </>}
          
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-between w-full relative">
                <input type="text" value={input} className="m-1 block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50" placeholder="정답을 입력하세요." 
                required onChange={(e:any)=>onChange(e)} onKeyPress={(e:any)=>{
                  if ((e.key === 'Enter') && input.length > 0) {
                    if(studyType !== "contextStudy") {
                      submit();
                    }
                  else {
                    submit2();
                    }
                  }
                  else if((e.key === 'Enter')) {
                    toast.error("정답을 입력해주세요.")
                  }
                }}/>
                <button onClick={() => {!listening ? SpeechRecognition.startListening() : SpeechRecognition.stopListening()}} className="sm:absolute sm:bottom-2.5 right-2.5 m-1 text-white bg-[#F7CCB7] hover:bg-[#BF9F91] focus:outline-none font-bold rounded-lg text-sm px-4 py-2 ">
                  { listening ? <> 입력 중... </>: <>음성 입력</>}
                </button>
                <button type="submit" onClick={()=> {
                  if(input.length > 0 ) {
                    if(studyType !== "contextStudy") {
                      submit();
                    }
                    else {
                      submit2();
                    }
                  }
                  else {
                    toast.error("정답을 입력해주세요.")
                  }
}
                  } className="sm:absolute sm:bottom-2.5 right-[7rem] m-1 text-white bg-[#F7CCB7] hover:bg-[#BF9F91] focus:outline-none font-bold rounded-lg text-sm px-4 py-2 ">제출</button>
              </div>
            </div>
          </div>

          {/* 오른쪽 학습 상세정보 영역  */}
          <div className="lg:w-[17%] w-full flex lg:block flex-wrap text-center justify-between">
            <div className="px-4 m-2 lg:pt-6 lg:pb-4 rounded-lg md:text-[1.8rem] sm:text-[1.3rem] text-[1rem] text-[#A87C6E] font-bold flex flex-col justify-center">
              {studyType === "wordStudy"  ? <>단어학습</>
              : studyType === "contextStudy" ? <>문맥학습</>
              : <><span className="px-4">복습</span></>
              }

              </div>
            <div className="border-4 lg:py-3 md:py-2 m-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
              <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">시간</span>
              {count}
            </div>
            
            {studyType !== "contextStudy" ? 
            <>
              <div className="border-4 m-2 lg:py-3 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
                <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">품사</span>
                {question[num]?.wordType}
              </div>
              <div className="border-4 m-2 lg:py-3 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[#A87C6E] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC]">
                <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">귀띔</span>
                {hint ? <>{result}</> : <><div className="hover:text-[#F7CCB7] cursor-pointer" onClick={()=> setHint(true)}>도움받기</div></>}
              </div>
            </>
              :
              null
            }
            <div className="border-4 m-2 py-2 px-8 rounded-lg md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] flex flex-col justify-center border-[#F4EFEC] text-[#5F5F5F] font-bold cursor-pointer hover:text-[#D30000]" onClick={()=> setSkip(true)}>건너뛰기</div>
            <div className="border-4 m-2 py-2 px-8 rounded-lg md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] flex flex-col justify-center border-[#F4EFEC] text-[#5F5F5F] font-bold cursor-pointer hover:text-[#D30000]" onClick={()=> setStop(true)}>그만두기</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Study