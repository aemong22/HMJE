import style from "./Study.module.css";

function AnswerModal({closeModal, right,question,num,setNum, setRight, studyType, setResultModal}:any):JSX.Element {


    return(
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                {/*header*/}
                <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
                    {right ?
                    <>
                        <div className={`${style.checkicon} md:h-[3rem] h-[2rem]`}></div>
                        <div className="text-[1.5rem] font-bold mx-auto text-center">정답입니다</div>
                    </>:
                    <>
                        <div className="p-2"></div>
                        <div className={`${style.xicon} md:h-[2.5rem] h-[1.8rem]`}></div>
                        <div className="text-[1.5rem] font-bold mx-auto text-center">오답입니다</div>
                    </>}
                </div>

                {/*body header*/}
                <div className="relative px-4 pt-3 flex justify-between items-end">
                    <div className="flex items-end">
                        <div className="md:text-[1.5rem] text-[1.2rem] font-bold mr-1">{question[num].word_name}</div>
                        <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">[한자]</div>
                        <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">{question[num].word_type}</div>
                    </div>
                    <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">{question[num].word_rating}</div>
                </div>
                {/* body content */}
                <div className="relative px-4 py-3">
                    <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium">
                    {question[num].word_detail}
                        <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-6">
                            <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">예제</span>
                            {question[num].word_example}
                        </div>
                    </div>

                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-4 rounded-b">
                  <button
                    className="text-white bg-[#F7CCB7] font-bold uppercase md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                            closeModal()
                            setRight(false)
                            if(studyType === "wordStudy"){
                                if(num < 9){
                                    setNum(num+1)
                                }
                                else{
                                    // 결과 모달창 뜨기
                                    setResultModal(true)
                                }
                            }
                            else {
                                if(num < 4) {
                                    setNum(num+1)
                                    setResultModal(true)
                                }
                                else{
                                    // 결과 모달창 뜨기
                                    setResultModal(true)
                                }
                            }
                        }
                    }
                  >
                    다음 문제
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AnswerModal