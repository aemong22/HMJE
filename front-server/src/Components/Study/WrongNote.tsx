import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { useGetWordWrongQuery } from "../../Store/api"
import React, { useState } from "react";
import classNames from "classnames";

function WrongNote(): JSX.Element {
  const userId = localStorage.getItem("userId")
  const [select, setSelect] = useState("0");
  const {data, isLoading, error}  = useGetWordWrongQuery(userId);
  

  if(isLoading) {
    return <>로딩중</>
  }
  else if(error) {
    return <>에러</>
  }
  else {
    return(
      <>
        <div className="bg-[#F4EFEC] w-full min-h-screen">
          <Navbar />
          <NoteHeader num={Object.keys(data.data).length} select={select} setSelect={setSelect}/>
          <WrongList select={select} data={data.data}/>
          
        </div>
        <Footer />

      </>
    )
  }
}

export default WrongNote


// 오답노트 헤더
function NoteHeader({select,setSelect,num}:any): JSX.Element {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return(
    <>
      <div className="w-full bg-[#ffffff]">
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto font-bold sm:flex block justify-between md:pt-14 pt-8 md:px-0 px-3">
          <div className="lg:text-[2.6rem] md:text-[2.3rem] sm:text-[2rem] text-[1.6rem]  pb-1 text-[#A87E6E]">오답[誤答] <span className="lg:text-[2rem] md:text-[1.8rem] text-[1rem]">공책</span></div>
          
          <div className="flex justify-end md:pt-6 pt-4 text-[#ffffff]">
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-between w-[8rem] mr-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 focus:border-[#666666] rounded-md shadow-sm "
            >
              {select === 2 ? "단어만 보이게" : select === 1 ? "뜻만 보이게" : "전체"}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>

            </button>
              {isOpen && (
                <div className="absolute z-10 w-[8rem] mt-1 bg-white rounded-md shadow-lg font-medium text-center">
                  <ul>
                    <li
                      key={0}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        setSelect(0)
                        toggleMenu()
                      }
                    }
                    >
                    전체
                  </li>
                  <li
                      key={1}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        setSelect(1)
                        toggleMenu()
                      }
                    }
                    >
                    뜻만 보이게
                  </li>
                  <li
                      key={2}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        setSelect(2)
                        toggleMenu()
                      }
                    }
                    >
                    단어만 보이게
                  </li>
                  </ul>
                </div>
              )}
            </div>
              <div className="md:px-6 px-4 py-1 bg-[#F7CCB7] mr-2 flex flex-col justify-center rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
                {num}개
              </div>
              <div className="md:px-6 px-4 py-1 bg-[#F7CCB7] mr-1 flex flex-col justify-center rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
                복습하기
              </div>
          </div>
        </div>
      </div>
    </>
  )
} 

function WrongList({select, data}:any):JSX.Element {
  
  console.log(data)
  return (
    <>
      <div className="w-full">
        <div className="container max-w-screen-xl md:w-[90%] w-full mx-auto flex flex-wrap justify-between py-4">
          {data.map((word:any , index:number) => {
            return(
              <div key={index} className="bg-[#ffffff] md:w-[46%] w-full rounded-lg py-3 px-6 m-2 overflow-hidden">
                <div className="flex justify-between items-end">
                  <div className="flex items-end font-medium text-[#8E8E8E]">
                    <div className={classNames("md:text-[1.4rem] text-[1.1rem] px-[0.1rem] font-bold ", {'text-[#ffffff]': select === 1} ,{'text-[#000000]': select !== 1})}> {word?.wordName} </div>
                    <div className="md:text-[1rem] text-[0.8rem] px-[0.1rem]"> ({word?.wordIso}) </div>
                    {word?.wordOrigin && <div className="md:text-[1rem] text-[0.8rem] px-[0.1rem]">[{word?.wordOrigin}]</div> }
                    <div className="md:text-[1rem] text-[0.8rem] px-[0.1rem]">{word?.wordType}</div>
                  </div>
                  {word?.wordRating !== "없음" && 
                    <div>
                      <div className="md:text-[1rem] text-[0.8rem] px-[0.1rem] font-medium  text-[#8E8E8E]"> {word?.wordRating}</div>
                    </div>
                  }
                </div>
                <div className={classNames("truncate w-full md:text-[1rem] text-[0.8rem] px-[0.1rem] pt-[0.2rem]",{'text-[#ffffff]': select === 2} ,{'text-[#525252]': select !== 2})}>
                    {word?.wordDetailResponseList[0].details}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}