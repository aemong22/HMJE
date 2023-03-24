import Navbar from "../Common/Navbar"
import {useGetDogamUserIdQuery ,useGetDogamQuery} from "../../Store/api"
import { useState } from "react";
import DogamDetail from "./DogamDetail";

function Dogam(): JSX.Element {
  const userId = localStorage.getItem("userId");

  const {
    data: get,
    isLoading: isLoading,
    error: error,
  } = useGetDogamUserIdQuery(userId);
  const {
    data: total,
    isLoading: isLoading2,
    error: error2,
  } = useGetDogamQuery("");

  if (isLoading || isLoading2) {
    return <>로딩중</>;
  } else if (error || error2) {
    return <>에러</>;
  } else {
    return (
      <>
        <div className="w-full h-screen">
          <Navbar />
          <DogamHeader num={Object.keys(get.data).length} />
          <DogamList get={get.data} total={total.data} />
        </div>
      </>
    );
  }
}
export default Dogam;

function DogamHeader({ num }: any): JSX.Element {
  return (
    <>
      <div className="w-full border-b-2 border-[#895229]">
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto font-bold sm:flex block justify-between md:pt-14 pt-8 md:px-0 px-3">
          <div className="lg:text-[2.6rem] md:text-[2.3rem] sm:text-[2rem] text-[1.6rem] lg:px-0 px-2 pb-1 text-[#A87E6E]">문맥도감[文脈圖鑑]
          <div className="lg:text-[1.5rem] md:text-[1.4rem] sm:text-[1.2rem] text-[1rem] font-medium text-[#8E8E8E] py-1">문맥학습으로 단어들을 수집해보세요!</div>
          </div>

          <div className="flex justify-end md:pt-6 pt-4 text-[#A2A2A2]">
            <div className="md:px-6 px-4 py-1 mr-2 flex flex-col justify-end rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
              {num} / 100
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DogamList({ get, total }: any): JSX.Element {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [open, setOpen] = useState<Boolean>(false);
  const [select, setSelect] = useState<number>();

  
    return (
      <>
      <div className="w-full py-4">
        {open && select && <DogamDetail select={select} detail={total[select]} setOpen={setOpen}/>}
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto justify-evenly flex flex-wrap px-3">
        {numbers.map((num) => (
          
          <>
              {get.includes(num) ? (
                  <>
                    <div className="relative h-0 lg:pb-[21%] lg:w-[22%] lg:p-[1%] md:pb-[27%] md:w-[30%] md:p-[3%] sm:pb-[42%] sm:w-[45%] sm:p-[3%] pb-[75%] w-[78%] p-[3%] rounded-lg border-2 m-[1%]" onClick={()=>{
                      setSelect(num-1)
                      setOpen(true)
                      }}>
                        <div className="text-[0.9rem] text-[#000000] w-fit rounded-full border-2 border-[#AEAEAE] flex"> 
                          <div className="bg-[#AEAEAE] rounded-full px-3 font-bold text-[#fff]">
                            {num.toString().padStart(3,"0")}
                          </div>
                          <div className="px-3">{total[num-1].dogamName}</div>
                        </div>

                        <div className="pb-[80%] w-[80%] mx-auto mt-3 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url('/Assets/Dogam/메타몽.jpg')`}}></div>
                        <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5"></div>
                    </div> 
                  </>
                ) : (
                  <>
                    <div className="relative h-0 lg:pb-[21%] lg:w-[22%] lg:p-[1%] md:pb-[27%] md:w-[30%] md:p-[3%] sm:pb-[42%] sm:w-[45%] sm:p-[3%] pb-[75%] w-[78%] p-[3%] rounded-lg border-2 m-[1%]">
                        <div className="text-[0.9rem] text-[#000000] w-fit rounded-full border-2 border-[#AEAEAE] flex"> 
                          <div className="bg-[#AEAEAE] rounded-full px-3 font-bold text-[#fff]">
                            {num.toString().padStart(3,"0")}
                          </div>
                          <div className="pl-3 pr-4">미획득</div>
                        </div>
                        <div className="pb-[80%] w-[80%] mx-auto mt-3 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url('/Assets/Dogam/고라파덕.jpg')`}}></div>
                        <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5"></div>
                    </div>  
                  </>
                )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
