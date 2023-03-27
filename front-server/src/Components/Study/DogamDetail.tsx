import { useEffect, useRef } from "react";

function DogamDetail({select,detail,setOpen}:any):JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
    
    const closeModal = () => {
        setOpen(false);
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

    return (
        <>
        <div ref={ref} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none" onClick={(e) => {
          if (e.target === ref.current) {
            closeModal()
          }
        }}>
        <div className="relative mx-auto w-[35rem] max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="bg-[#AEAEAE] rounded-full px-3 font-bold text-[#fff] w-fit mx-4 mt-4">
                    {select.toString().padStart(3,"0")}
                </div>
                <div className="pb-[30%] w-[30%] mx-auto mt-2 bg-no-repeat bg-center bg-contain" style={{backgroundImage:`url('/Assets/Dogam/${select+1}.png')`}}></div>
            
            {/*body header*/}

            <div className="relative px-4 pt-3 flex justify-between items-end sm:min-w-[25rem] min-w-[19rem]">
                <div className="flex items-end">
                    <div className="md:text-[1.8rem] text-[1.5rem] font-bold mr-1">
                        {detail.dogamName}
                    </div>
                    {detail.wordOrigin && <div className="md:text-[1.1rem] text-[1rem] text-[#A2A2A2] mr-1">[{detail.wordOrigin}]</div>}
                    <div className="md:text-[1.1rem] text-[1rem] text-[#A2A2A2] mr-1">{detail.dogamClass}</div>
                </div>        
            </div>

            {/* body content */}
            
              <div className="relative px-4 py-3 max-h-[50vh] overflow-y-auto">
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {detail.dogamMean1}
                  <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                    <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                    </span>
                    {detail.dogamExam1}
                  </div>
                </div>
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {detail.dogamMean2}
                  <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                    <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                    </span>
                    {detail.dogamExam2}
                  </div>
                </div>
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {detail.dogamMean2}
                  <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                    <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                    </span>
                    {detail.dogamExam2}
                  </div>
                </div>
              </div>
            

            {/*footer*/}
            <div className="flex items-center justify-end px-4 py-2 rounded-b">
              <button
                className="text-white bg-[#F7CCB7] font-bold uppercase md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                    closeModal()
                }}
              >닫기
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="fixed inset-0 z-40 bg-black/20"></div>
        </>
    );
}

export default DogamDetail;