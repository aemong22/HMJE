import Navbar from "../Common/Navbar"
import {useGetDogamUserIdQuery ,useGetDogamQuery} from "../../Store/api"
import { useState } from "react";
import DogamDetail from "./DogamDetail";
import Loading from "../Common/Loading";
import classNames from "classnames";

function Dogam(): JSX.Element {
  const userId = localStorage.getItem("userId");
  const [toggle , setToggle] = useState<Boolean>(true);

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
    return(
      <>
        <Loading />
      </>
    )
  } else if (error || error2) {
    return <>에러</>;
  } else {
    return (
      <>
        <div className="w-full h-screen">
          <Navbar />
          <DogamHeader num={Object.keys(get.data).length} toggle={toggle} setToggle={setToggle} />
          <DogamList get={get.data} total={total.data} toggle={toggle} />
        </div>
      </>
    );
  }
}
export default Dogam;

function DogamHeader({ num, toggle, setToggle }: any): JSX.Element {

  return (
    <>
      <div className="w-full border-b-2 border-[#D0B8A8]">
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto font-bold sm:flex block justify-between md:pt-14 pt-8 md:px-0 px-3">
          <div className="lg:text-[2.6rem] md:text-[2.3rem] sm:text-[2rem] text-[1.6rem] lg:px-0 px-2 pb-1 text-[#A87E6E]">문맥도감[文脈圖鑑]
          <div className="lg:text-[1.5rem] md:text-[1.4rem] sm:text-[1.2rem] text-[1rem] font-medium text-[#8E8E8E] py-1">문맥학습으로 단어들을 수집해보세요!</div>
          </div>

          <div className="flex justify-end md:pt-6 pt-4 text-[#A2A2A2]">
            <div className="md:px-6 px-2 py-1 mr-1 flex flex-col justify-end rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
              {num} / 100
            </div>
            <div className="flex flex-col justify-end md:pb-1 sm:pb-[0.1rem] pb-0">
              <div>
                <input
                  className={classNames("mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary",  toggle ? "bg-neutral-300" : "bg-[#F7CCB7]")}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchChecked" 
                  onClick={() => setToggle(!toggle) }/>
                <label
                  htmlFor="flexSwitchChecked"
                  className="inline-block pl-[0.15rem] hover:cursor-pointer text-[0.9rem] md:pb-[0.2rem] ">획득한 도감
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DogamList({ get, total,toggle }: any): JSX.Element {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [open, setOpen] = useState<Boolean>(false);
  const [select, setSelect] = useState<number>();

  
    return (
      <>
      <div className="w-full py-4">
        {open && select && <DogamDetail select={select} detail={total[select-1]} setOpen={setOpen}/>}
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto justify-center flex flex-wrap px-3">
        {numbers.map((num) => (
        
          
          <>
              {get.includes(num) ? (
                  <>
                    <div className={classNames("relative h-0 lg:pb-[21%] lg:w-[22%] lg:p-[1%] md:pb-[27%] md:w-[30%] md:p-[3%] sm:pb-[42%] sm:w-[45%] sm:p-[3%] pb-[75%] w-[78%] p-[3%] rounded-lg m-[1%]",  num == 27 ? "border-[#FED049] border-4" : num == 73 ? "border-[#FC2947] border-4" : num == 37 ? "border-[#FF8E9E] border-4" : num == 83 ? "border-[#1C6DD0] border-4" : num == 97 ? "border-[#B762C1] border-4" : num == 53 ? "border-[#95CD41] border-4" : "border-[#EEEEEE] border-2")} onClick={()=>{
                      setSelect(num)
                      setOpen(true)
                      }}>
                        <div className={classNames("text-[0.9rem] text-[#000000] w-fit rounded-full border-2 flex", num == 27 ? "border-[#FED049] " : num == 73 ? "border-[#FC2947]" : num == 37 ? "border-[#FF8E9E]" : num == 83 ? "border-[#1C6DD0]" : num == 97 ? "border-[#B762C1]" : num == 53 ? "border-[#95CD41]" : "border-[#AEAEAE]" )}> 
                          <div className={classNames("rounded-full px-3 font-bold text-[#fff]", num == 27 ? "bg-[#FED049] " : num == 73 ? "bg-[#FC2947]" : num == 37 ? "bg-[#FF8E9E]" : num == 83 ? "bg-[#1C6DD0]" : num == 97 ? "bg-[#B762C1]" : num == 53 ? "bg-[#95CD41]" : "bg-[#AEAEAE]") }>
                            {num.toString().padStart(3,"0")}
                          </div>
                          <div className="px-3">{total[num-1].dogamName}</div>
                        </div>

                        <div className="pb-[80%] w-[80%] mx-auto mt-3 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url('/Assets/Dogam/${num}.png')`}}></div>
                        <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5"></div>
                    </div> 
                  </>
                ) : (
                  <>
                    <div className={classNames("relative h-0 lg:pb-[21%] lg:w-[22%] lg:p-[1%] md:pb-[27%] md:w-[30%] md:p-[3%] sm:pb-[42%] sm:w-[45%] sm:p-[3%] pb-[75%] w-[78%] p-[3%] rounded-lg border-4 m-[1%]", toggle? null: 'hidden')}>
                        <div className="text-[0.9rem] text-[#000000] w-fit rounded-full border-2 border-[#AEAEAE] flex"> 
                          <div className="bg-[#AEAEAE] rounded-full px-3 font-bold text-[#fff]">
                            {num.toString().padStart(3,"0")}
                          </div>
                          <div className="pl-3 pr-4">미획득</div>
                        </div>
                        <div className="pb-[80%] w-[80%] mx-auto mt-3 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url('/Assets/Dogam/물음표.png')`}}></div>
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
