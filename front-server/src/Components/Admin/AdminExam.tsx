import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAdminPastListQuery, useLazyGetAdminPastDetailListQuery, useLazyGetAdminPastListQuery, usePostAdminPostTestMutation } from "../../Store/api";
import Loading from "../Common/Loading";
import Navbar from "../Common/Navbar"
import { Toast } from "../Common/Toast";
import styles from "./Admin.module.css";

function AdminExam():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminPastSection1/>
    </>
  )
}
export default AdminExam

interface PastExamListType {
  'pastTestId': number,
  'startTime': string,
  'endTime': string,
}

interface PastExamDetailType {
  pastAnswer: number,
  pastChoice1: string,
  pastChoice2: string,
  pastChoice3: string,
  pastChoice4: string,
  pastChoice5: string,
  pastQuestion: string,
  pastQuestionId: string,
  pastText: any,
}

function AdminPastSection1():JSX.Element {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const [pastDataList, setPastDataList] = useState<PastExamListType[]>()
  const [isClickExam,setIsClickExam] = useState<boolean>(false) 
  const [isAddExam, setIsAddExam] = useState(false)
  const [clickExamData, setClickExamData] = useState<PastExamListType>()
  const [clickExamDataDetail, setClickExamDataDetail] = useState<PastExamDetailType[]>()

  const [pastData, {error:error1, isLoading:isLoading1}] = useLazyGetAdminPastListQuery()
  const [pastDataDetailList, {error:error2, isLoading:isLoading2}] = useLazyGetAdminPastDetailListQuery()
  const [adminPostTest, {error:error3, isLoading:isLoading3}] = usePostAdminPostTestMutation()

  useEffect(()=> {
    pastData('').unwrap().then((r:any)=> {
      setPastDataList(r.data)     
    })
  },[])
  
  // 클릭한 데이터가 변경될 때마다
  useEffect(()=> {
    if (clickExamData) {
      pastDataDetailList(clickExamData.pastTestId).unwrap().then((r)=> {
        setClickExamDataDetail(r.data)
        
      })
    }
  },[clickExamData])

  const loading = <Loading/>

  const addExam = () => {
    setIsAddExam(!isAddExam)
  }

  const tbodyData = pastDataList?.map((e:PastExamListType, idx:number)=> {    
    return (
      <tr key={idx} className={`border-b-2 border-b-[#B7B7B7] lg:text-[0.6rem] xl:text-[1rem] text-[#525252] cursor-pointer ${styles.userData}`} onClick={()=> {
        setIsClickExam(true)
        setClickExamData(e)
      }}>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.pastTestId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.startTime}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.endTime}</th>
      </tr>
    )
  })
  


  function UserDetail():JSX.Element {
    
    const ref = useRef<HTMLDivElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsClickExam(false)
      }
    }
    const detailList = (
      clickExamDataDetail?.map((data:PastExamDetailType ,idx:number)=> {

        return (
          <div className="flex flex-col w-full justify-center items-center">
            <div className="font-bold text-[#A87E6E] text-[1.5rem] text-start w-full ml-20 mt-10">{idx+1}</div>
            <div className="flex justify-evenly w-full my-4">
              <div className="flex flex-col justify-center items-start w-[10%] ml-10 text-[1rem] text-[#A87E6E] font-semibold">
                <div className="py-[0.3rem] border-b-2 w-full">pastQuestionId: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastQuestion: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastChoice1: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastChoice2: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastChoice3: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastChoice4: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastChoice5: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastAnswer: </div>
                <div className="py-[0.3rem] border-b-2 w-full">pastText: </div>
              </div>
              <div className="flex flex-col justify-center items-start w-[90%] mx-5 text-[1rem] text-[#767676] font-semibold">
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastQuestionId}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastQuestion}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastChoice1}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastChoice2}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastChoice3}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastChoice4}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastChoice5}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastAnswer}</div>
                <div className="py-[0.3rem] border-b-2 w-full">{data?.pastAnswer}</div>
              </div>
            </div>
          </div>
        )
      })
    )
    return (
      <div ref={ref} className="flex justify-center absolute mx-auto w-full h-[90vh]  z-10" onClick={(e)=> {
        if (e.target === ref.current) {
          setIsClickExam(false)
      }}}>
        <div className="flex justify-center items-center w-[80%] my-auto bg-white border-4 border-[#A87E6E] rounded-lg">
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center text-[1.3rem] text-[#A87E6E] font-semibold py-5">DETAIL</div>
            {/* 여기에 채워넣기 */}
            {detailList}
            <div className="flex justify-center  text-[1rem] text-[#A87E6E] font-semibold my-4">
              <div aria-label="취소" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>취소</div>
              <div aria-label="수정" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>수정</div>
              <div aria-label="삭제" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>삭제</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        isClickExam? <UserDetail/>: null
      }
      {(isLoading1||isLoading2||isLoading3)&&loading}
      <Toast />
      <div className="container max-w-screen-xl w-[90%] my-4 mx-auto ">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-5">
          과거시험 관리
        </div>
        <div className="w-full mb-4 font-bold flex justify-between">
          <div>
            <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">
            과거시험
            </span>
          </div>
          <div>
            <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70 cursor-pointer" onClick={addExam}>
            +
            </span>
          </div>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">pastTestId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">startTime</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">endTime</th>
                </tr>
              </thead>
              <tbody>
                {tbodyData}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

