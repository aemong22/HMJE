import { useState } from "react";

function Study({question, studyType,num,correct,setCorrect,wrong,setWrong,semo,setSemo, setRight, openModal}:any): JSX.Element {

  // 초성 뽑아내기
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  let result = ""
  for(let i=0; i<question[num].word_name.length;i++){
    let code = question[num].word_name.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
    else result += question[num].word_name.charCodeAt(i);
  }

  const [hint, setHint] = useState<Boolean>(false);

  const [input, setInput] = useState("");
  const onChange = (e:any)  => {
    setInput(e.target.value)
  }

  const submit = () => {
    console.log("here")
    setInput("")

    //정답
    if(input === question[num].word_name) {
      // 힌트를 보고 맞춤 => 맞춤, semo 개수++, hint 원상복귀, modal open
      if(hint) {
        setSemo(semo+1)
        setHint(false)
      }
      // 힌트 안보고 맞춤 => 맞춤, correct에 추가, modal open
      else {
        setCorrect([...correct,question[num].word_id])
      }
      setRight(true)
      openModal()
    }

    // 오답 -> toast 띄우기
    else{
      
    }
  }

  return(
    <>
      <div className="bg-[#F9F9F9]">
        <div className="container max-w-screen-xl w-full p-2 mx-auto flex lg:flex-row flex-col lg:justify-between">

          {/* 왼쪽 학습 영역 */}
          <div className="bg-[#F4EFEC] lg:w-[82%] w-full min-h-[25rem] py-6 lg:px-6 px-4 flex flex-col justify-between rounded-lg">
            <div>
              <div className="font-bold md:text-[1.1rem] text-[1rem] mb-6">
                {studyType === "word" ? 
                  <>
                    해당 뜻을 가진 단어를 적으시오.
                  </>:
                  <>
                    빈칸에 공통적으로 들어갈 말을 적으시오.
                  </>}
              </div>
              <div>
                {question[num].word_detail}
              </div>
            </div>
            <div>
              <div className="relative">
                <input type="text" value={input} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="정답을 입력하세요." 
                required onChange={(e:any)=>onChange(e)}/>
                <button type="submit" onClick={()=>submit()} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">제출</button>
              </div>
            </div>
          </div>

          {/* 오른쪽 학습 상세정보 영역  */}
          <div className="lg:w-[17%] w-full flex lg:block flex-row flex-wrap text-center">
            <div className="px-1 m-2 lg:py-8 rounded-lg md:text-[1.8rem] sm:text-[1.3rem] text-[1rem] text-[#A87C6E] font-bold flex flex-col justify-center">
              {studyType === "word" ? 
              <>
                단어학습
              </>:
              <>
                문맥학습
              </>}
              </div>
            <div className="border-4 lg:py-4 md:py-2 m-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
              <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">시간</span>
              30초
            </div>
            <div className="border-4 m-2 lg:py-4 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC] text-[#A87C6E]">
              <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">품사</span>
              {question[num].word_type}
            </div>
            <div className="border-4 m-2 lg:py-4 md:py-2 px-8 rounded-lg md:text-[1.6rem] sm:text-[1.3rem] text-[#A87C6E] text-[1rem] flex flex-col justify-center font-bold border-[#F4EFEC]">
              <span className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] font-medium text-[#8E8E8E]">귀띔</span>
              {hint ? <>{result}</> : <><div className="hover:text-[#F7CCB7] cursor-pointer" onClick={()=> setHint(true)}>도움받기</div></>}
            </div>
            <div className="border-4 m-2 py-4 md:py-2 px-8 rounded-lg md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] flex flex-col justify-center border-[#F4EFEC] text-[#5F5F5F] font-bold cursor-pointer">그만두기</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Study