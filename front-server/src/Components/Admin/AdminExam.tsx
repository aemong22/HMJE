import { MouseEventHandler, useEffect, useRef, useState } from "react"
import Navbar from "../Common/Navbar"
import "./Admin.css";

function AdminExam():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminExamSection1/>
    </>
  )
}
export default AdminExam

function AdminExamSection1():JSX.Element {
  return (
    <div className="w-full border-b-2">
      <div className="container max-w-screen-lg w-[90%] lg:w-full mx-auto">
        <div className="flex justify-center mb-10">
          <span className="pt-14 text-[1.8rem] md:text-[2rem] text-[#A87E6E] font-bold  border-b-[#A87E6E]/70 border-b-4">
            알림공간
          </span>
        </div>
      </div>
      <AdminExamSection2/>
    </div>
  )
}

function AdminExamSection2():JSX.Element {
  const [isClickBtn,setIsClickBtn] = useState<boolean>(false)
  const [clickBtn, setClickBtn] = useState<string|null>(null)
  const one = useRef<HTMLDivElement>(null) 
  const two = useRef<HTMLDivElement>(null)
  console.log(one.current);
  console.log(two.current);
  
  useEffect(()=> {
    console.log('isClickBtn: ',isClickBtn);
    console.log('clickBtn: ',clickBtn);
    if (clickBtn === '공지사항') {
      one.current?.classList.add('testChoiceBtn')
      two.current?.classList.remove('testChoiceBtn')
      console.log(one.current);
      
    } else if (clickBtn === '질문') {
      two.current?.classList.add('testChoiceBtn')
      one.current?.classList.remove('testChoiceBtn')
      console.log(two.current);
    } else {
      one.current?.classList.remove('testChoiceBtn')
      two.current?.classList.remove('testChoiceBtn')
    }
  },[clickBtn])

  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if ((isClickBtn) && (clickBtn === '공지사항')) {
      if (clickBtn === target.ariaLabel) {
        setIsClickBtn(false)
        setClickBtn(null)
      } else {
        setClickBtn('질문')
      }
    } else if ((isClickBtn) && (clickBtn === '질문')) {
      if (clickBtn === target.ariaLabel) {
        setIsClickBtn(false)
        setClickBtn(null)
      } else {
        setClickBtn('공지사항')
      }
    } else if (isClickBtn === false) {
      if (target.ariaLabel === '공지사항') {
        setClickBtn('공지사항')
      } else {
        setClickBtn('질문')
      }
      setIsClickBtn(true)
    }
  }
  return (
    <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto">
      <div className="flex justify-between text-center font-semibold text-[#A87E6E] text-[1.3rem]">
        <div className="flex justify-start">
          <div ref={one} aria-label="공지사항" className="mr-4 px-4 py-2 border-b-white border-b-4 cursor-pointer testChoiceBtn testChoiceBtnHover" onClick={onClick}>공지사항</div>
          <div ref={two} aria-label="질문" className="mr-4 px-4 py-2 border-b-white border-b-4 cursor-pointer testChoiceBtn testChoiceBtnHover" onClick={onClick}>자주묻는 질문</div>
        </div>
        <div className="text-[#A87E6E] px-4 py-2 cursor-pointer">
          +
        </div>
      </div>
    </div>
  )
}

