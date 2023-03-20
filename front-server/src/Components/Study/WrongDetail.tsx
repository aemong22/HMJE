import { useState } from "react";

function WrongDetail({index, data , setOpen , open }:any ):JSX.Element {
    console.log("index값", index)
    



    
    return(
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full py-3 px-1 bg-white outline-none focus:outline-none">
            
                {/*body header*/}
                <div className="flex items-end px-4 pt-3">
                    <div className="md:text-[2rem] text-[1.5rem] font-bold mr-1 text-[#000000]">{data[index].wordName}</div>
                    <div className="flex items-end md:text-[1.2rem] text-[1rem] text-[#A2A2A2] mr-1">({data[index].wordIso})</div>
                </div>
                <div className="relative px-4 flex pt-1 justify-between items-end sm:min-w-[25rem] min-w-[19rem] flex-wrap">
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
                <div className="relative px-4 py-3 max-h-[50vh] overflow-y-auto">
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
                
                <div className="flex items-center justify-between p-4 font-bold">
                  <div className="cursor-pointer text-[1.2rem] rounded-lg h-7 w-15" onClick={()=>{}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:w-7 hover:h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </div>

                  <div className="text-[1.2rem] text-red-700 cursor-pointer h-7 w-15 hover:text-[1.3rem]" onClick={()=>{}}>닫기</div>
                  <div className="cursor-pointer text-[1.2rem] hover:shadow-xl rounded-lg h-7 w-15" onClick={()=>{}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:w-7 hover:h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default WrongDetail;