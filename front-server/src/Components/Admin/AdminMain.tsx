import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar"
import { MouseEventHandler } from "react";
import styles from "./Admin.module.css";

function AdminMain():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminMainSection1/>
      <AdminMainSection2/>
      <AdminMainSection3/>
      <AdminMainSection4/>
    </>
  )
}
export default AdminMain

function AdminMainSection1():JSX.Element {
  return (
    <div className="w-full border-b-2">
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto">
        <div className="flex justify-center">
          <span className="pt-28 text-[1.8rem] md:text-[2rem] text-[#A87E6E] font-bold  border-b-[#A87E6E]/70 border-b-4">
            관리자 모드
          </span>
        </div>
      </div>
    </div>
  )
}

// Router 이동
function AdminMainSection2():JSX.Element {
  const navigate = useNavigate()
  
  const click: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target.ariaLabel === 'user') {
      navigate('/admin/user')
    } else if (target.ariaLabel === 'badge') {
      navigate('/admin/badge')
    } else if (target.ariaLabel === 'context') {
      navigate('/admin/context')
    } else if (target.ariaLabel === 'exam') {
      navigate('/admin/exam')
    }
  };

  return (
    <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto my-12">
      <div className="hidden lg:flex justify-center text-center lg:text-[1.2rem] font-semibold text-[#A87E6E]">
        <div aria-label="user" className={`px-28 sm:py-5 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>USER</div>
        <div aria-label="badge" className={`px-28 sm:py-5 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>BADGE</div>
        <div aria-label="context" className={`px-28 sm:py-5 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>문맥도감</div>
        <div aria-label="exam" className={`px-28 sm:py-5 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>과거시험</div>
      </div>
      <div className="flex lg:hidden flex-col justify-center text-center text-[1.3rem] font-semibold text-[#A87E6E]">
        <div aria-label="user" className={`bg-[#F0ECE9] py-6 my-2 rounded-lg border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>USER</div>
        <div aria-label="badge" className={`bg-[#F0ECE9] py-6 my-2 rounded-lg border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>BADGE</div>
        <div aria-label="context" className={`bg-[#F0ECE9] py-6 my-2 rounded-lg border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>문맥도감</div>
        <div aria-label="exam" className={`bg-[#F0ECE9] py-6 my-2 rounded-lg border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>과거시험</div>
      </div>
    </div>
  )
}

// 평균 학습 시간, 평균 학습 단어, 유저수
function AdminMainSection3():JSX.Element {
  return (
    <div className="container max-w-screen-xl md:w-[90%] lg:w-full mx-auto my-16">
      <div className="flex justify-center font-semibold">
        <div className="flex flex-col mx-auto">
          <div className="text-[1.5rem] text-[#A87E6E]/80">평균 학습 시간</div>
          <div className="text-[3rem] text-[#A87E6E]">1시간 24분</div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[1.5rem] text-[#A87E6E]/80">평균 학습 단어</div>
          <div className="text-[3rem] text-[#A87E6E]">72개</div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[1.5rem] text-[#A87E6E]/80">유저수</div>
          <div className="text-[3rem] text-[#A87E6E]">5명</div>
        </div>
      </div>
    </div>
  )
}

// 유저 레벨 분포
function AdminMainSection4():JSX.Element {
  return (
    <div className="container max-w-screen-xl md:w-[90%] lg:w-full mx-auto my-20">
      <div className="flex flex-col justify-start">
        <div className="mb-4 font-semibold text-[#A87E6E] text-[1.5rem]">유저 레벨 분포</div>
        <div className="bg-[#D9D9D9] py-36 px-36 rounded-lg"></div>
      </div>
    </div>
  )
}

