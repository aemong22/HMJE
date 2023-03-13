import style from "./Study.module.css";

function ResultModal({studyType,setResultModal, correct, semo, wrong,startTime}:any):JSX.Element {

    let getExp = 0;
    let endTime = Date.now()
    let studyTime = (endTime - startTime) / 1000
    console.log("startTime", startTime)
    console.log("endTime", endTime)
    

    // 단어 학습
    if(studyType === "word") {
        getExp = Object.keys(correct).length * 10
    }

    return(
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                {/*header*/}
                <div className="mx-4 my-1 border-b border-solid border-slate-200 rounded-t md:pt-2 pt-1">
                    <div className={`${style.resulticon} md:h-[4rem] h-[2rem]`}></div>
                    <div className="md:text-[1.8rem] text-[1.2rem] font-bold mx-auto text-center">학습 결과</div>
                </div>
                {/* body content */}
                <div className="relative px-4 py-2">
                    <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium flex justify-between items-center">
                    <div className="md:px-10 px-4">
                            <div className={`${style.oicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                            <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#0082E0]">{Object.keys(correct).length}</div>
                        </div>
                        <div className="md:px-10 px-4">
                            <div className={`${style.semoicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                            <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#FFA800]">{semo}</div>
                        </div>
                        <div className="md:px-10 px-4">
                            <div className={`${style.xicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                            <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#E40000]">{Object.keys(wrong).length}</div>
                        </div>
                    </div>

                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-4 rounded-b">
                    학습시간 : {studyTime}초
                  <button
                    className="text-white bg-[#F7CCB7] font-bold uppercase md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setResultModal(false)
                        }
                    }
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default ResultModal