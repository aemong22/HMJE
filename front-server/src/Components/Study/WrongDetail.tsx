import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";

function WrongDetail({index, data , setOpen , open ,setIdx }:any ):JSX.Element {

    const handleSpeakClick = () => {
      const word = new SpeechSynthesisUtterance(data[index].wordName);
      speechSynthesis.speak(word);
      data[index].wordDetailResponseList.map((word:any, index:any) => {
        const mean = new SpeechSynthesisUtterance(word.details);
        speechSynthesis.speak(mean);
      })
    };
    
    // 스크롤 방지 효과 주는 코드
    useEffect(() => {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };

    }, []);

    // 카드 넘길때 마다 자동 재생
    useEffect(() => {
      speechSynthesis.cancel();
      handleSpeakClick();
    },[index])

    useEffect(()=> {
      speechSynthesis.cancel();
    },[open])

    
    return(
        <>
          <Toast />
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
          >
            <div className="relative my-6 mx-auto w-[30rem]">
              {/*content*/}
              <div className="border-0 rounded-lg relative flex flex-col w-full py-3 md:px-1 px-0 bg-white ">
            
                {/*body header*/}
                <div className="flex md:px-4 px-3 pt-3">
                    <div className="md:text-[2rem] text-[1.5rem] font-bold mr-1 text-[#000000]">{data[index].wordName}</div>
                    {data[index].wordIso > 0 && <div className="flex md:text-[1.2rem] text-[1rem] text-[#A2A2A2] ml-1">{data[index].wordIso}</div>}
                </div>
                <div className="relative md:px-4 px-3 flex pt-1 justify-between items-end sm:min-w-[25rem] min-w-[19rem] flex-wrap">
                    <div className="flex items-end md:text-[1.2rem] text-[1rem] text-[#A2A2A2] mr-1">
                        {data[index].wordOrigin &&<div>[{data[index].wordOrigin}]</div>}
                        <div>{data[index].wordType}</div>
                    </div>
                    <div className="">
                        {data[index].wordRating !="없음" && 
                        <div className="md:text-[1.2rem] text-[1rem] text-[#A2A2A2] mr-1">{data[index].wordRating}</div>}
                    </div>
                </div>
                {/* body content */}
                <div className="relative md:px-4 px-3 py-3 h-[45vh] max-h-[20rem] overflow-y-auto">
                    {data[index].wordDetailResponseList.map((detail:any , idx:any) => {
                        let temp =  detail.wordExampleResponseList.filter((ex:any) => ex.exampleType === "문장")[0]?.exampleDetail
                        let example = temp ? temp : detail.wordExampleResponseList[0]?.exampleDetail
                        return(
                            <div key={idx}className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.2rem] text-[1rem] font-semibold my-2 text-[#2F2F2F]">{detail.details}
                                <div className="mt-2 md:text-[1.1rem] text-[0.9rem] text-[#666666] leading-8 font-medium">
                                    <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">예제</span>
                                    {example}
                                </div>
                            </div>
                        )
                        })}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-between md:px-4 px-3 py-2 font-bold">
                  <div className="cursor-pointer text-[1.2rem] rounded-lg h-7 w-10" onClick={()=>{
                    if(index == 0 ) { toast.error("시작 단어 입니다.")}
                    else {
                        setIdx(index-1)
                    }}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:w-7 hover:h-7 mx-auto">
                        <path strokeLinecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </div>

                  <div className="text-[1.2rem] text-red-700 cursor-pointer h-7 w-15 hover:text-[1.3rem]" onClick={()=>{setOpen(false)}}>닫기</div>
                  <div className="cursor-pointer text-[1.2rem] rounded-lg h-7 w-10" onClick={()=>{
                    if(index == Object.keys(data).length -1) { toast.error("마지막 단어 입니다.")}
                    else {
                        setIdx(index+1)
                    }}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:w-7 hover:h-7 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black/20"></div>
        </>
    )
}

export default WrongDetail;