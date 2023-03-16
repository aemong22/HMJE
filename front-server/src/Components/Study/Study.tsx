import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";

function Study({question, studyType,num,correct,setCorrect,wrong,setWrong,semo,setSemo,right, setRight, openModal, setResultModal}:any): JSX.Element {

  // 초성 뽑아내기
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  let result = ""
  for(let i=0; i<question[num].wordName.length;i++){
    let code = question[num].wordName.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
    else result += question[num].wordName.charCodeAt(i);
  }

  const [hint, setHint] = useState<Boolean>(false);

  // 그만두기
  const [stop, setStop] = useState<Boolean>(false);

  // 타이머
  const [count, setCount] = useState(30);

   useEffect(() => {
    setCount(30);
    SpeechRecognition.stopListening();
   },[num])

   
   

   useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1); 
    }, 1000);
    
    // 못맞춤
    if(count <= 0){
      clearInterval(id);
      setWrong([...wrong,question[num].wordId])
      openModal()
      setHint(false)
    }
    // 시간초 내에 맞춤
    else if(right) {
      clearInterval(id);
    }
    // 그만두기
    else if(stop){
      setResultModal(true)
    }
     return () => clearInterval(id);
   }, [count]);

  // 입력
  const [input, setInput] = useState("");
  const onChange = (e:any)  => {
    setInput(e.target.value)
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
        submit();
      },2000)
    }
  },[input,listening])

  const submit = () => {
    resetTranscript()
    setInput("")
    //정답
    if(input === question[num].wordName) {
      // 힌트를 보고 맞춤 => 맞춤, semo 개수++, hint 원상복귀, modal open
      if(hint) {
        setSemo(semo+1)
        setHint(false)
      }
      // 힌트 안보고 맞춤 => 맞춤, correct에 추가, modal open
      else {
        setCorrect([...correct,question[num].wordId])
      }
      setRight(true)
      openModal()
    }

    // 오답 -> toast 띄우기
    else{
      toast.error("틀렸습니다")
    }
  }


  return(
    <>
      <Toast />
      <div className="bg-[#F9F9F9] lg:py-16 py-10">
        <div className="relative container max-w-screen-xl w-full p-2 mx-auto flex lg:flex-row flex-col lg:justify-between overflow-x-hidden">
          {/* 왼쪽 상단 */}
          <div className="absolute z-10 lg:w-[82%] w-full flex justify-between pr-5">
            <div className="bg-[#F7CCB7] min-h-[5rem] rounded-md py-1 px-4 font-bold text-[#ffffff]">문제 {num +1}</div>
            <div className="font-bold"> {num+1} / {Object.keys(question).length}</div>
          </div>
          {/* 왼쪽 학습 영역 */}
          <div className="mt-8 z-20 bg-[#F4EFEC] lg:w-[82%] w-full min-h-[25rem] py-6 lg:px-6 px-4 flex flex-col justify-between rounded-lg">
            <div>
              <div className="font-bold md:text-[1.1rem] text-[1rem] mb-6">
                {studyType === "wordStudy" ? 
                  <>
                    해당 뜻을 가진 단어를 적으시오.
                  </>:
                  <>
                    빈칸에 공통적으로 들어갈 말을 적으시오.
                  </>}
              </div>
              <div>
                {question[num].wordDetailList[0].details}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-between w-full relative">
                <input type="text" value={input} className="m-1 block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50" placeholder="정답을 입력하세요." 
                required onChange={(e:any)=>onChange(e)} onKeyPress={(e:any)=>{
                  if ((e.key === 'Enter') && input.length > 0) {
                    submit(); // Enter 입력이 되면 클릭 이벤트 실행
                  }
                }}/>
                <button onClick={() => SpeechRecognition.startListening()} className="sm:absolute sm:bottom-2.5 right-2.5 m-1 text-white bg-[#F7CCB7] hover:bg-[#BF9F91] focus:outline-none font-bold rounded-lg text-sm px-4 py-2 ">
                  { listening ? <> 입력 중... </>: <>음성 입력</>}
                </button>
                <button type="submit" onClick={()=>submit()} className="sm:absolute sm:bottom-2.5 right-[7rem] m-1 text-white bg-[#F7CCB7] hover:bg-[#BF9F91] focus:outline-none font-bold rounded-lg text-sm px-4 py-2 ">제출</button>
              </div>
            </div>
          </div>

          {/* 오른쪽 학습 상세정보 영역  */}
          <div className="lg:w-[17%] w-full flex lg:block flex-row flex-wrap text-center">
            <div className="px-1 m-2 lg:py-8 rounded-lg md:text-[1.8rem] sm:text-[1.3rem] text-[1rem] text-[#A87C6E] font-bold flex flex-col justify-center">
              {studyType === "wordStudy"  ? <>단어학습</>
              : studyType === "contextStudy" ? <>문맥학습</>
              : <>복습</>
              }

              </div>
            <div className="border-4 lg:py-4 md:py-2 m-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
              <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">시간</span>
              {count}
            </div>
            
            {studyType === "wordStudy" ? 
            <>
              <div className="border-4 m-2 lg:py-4 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
                <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">품사</span>
                {question[num].wordType}
              </div>
              <div className="border-4 m-2 lg:py-4 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[#A87C6E] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC]">
                <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">귀띔</span>
                {hint ? <>{result}</> : <><div className="hover:text-[#F7CCB7] cursor-pointer" onClick={()=> setHint(true)}>도움받기</div></>}
              </div>
            </>
              :
              null
            }

            <div className="border-4 m-2 py-4 md:py-2 px-8 rounded-lg md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] flex flex-col justify-center border-[#F4EFEC] text-[#5F5F5F] font-bold cursor-pointer hover:text-[#D30000]" onClick={()=> setStop(true)}>그만두기</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Study