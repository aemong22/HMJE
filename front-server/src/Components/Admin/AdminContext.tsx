import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserMyinfoQuery, useLazyGetAdminDogamQuery, useLazyGetAdminUserListQuery, useLazyGetAdminUserSearchListQuery, usePutAdminUserDeleteMutation, usePutAdminUserUpdateMutation } from "../../Store/api";
import Loading from "../Common/Loading";
import Navbar from "../Common/Navbar"
import { Toast } from "../Common/Toast";
import styles from "./Admin.module.css";

function AdminContext():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminContextSection1/>
    </>
  )
}
export default AdminContext

interface UserListType {
  'userId': number,
  'username': string,
  'nickname': string,
  'phoneNumber': string,
  'level': number,
  'exp': number,
  'isAdmin': boolean,
  'isSecession': boolean,
  'nowbadgeId': number,
  'characterId': number,
  'todayRight': number,
  'todayWrong': number,
  'todaySemo': number,
}

function AdminContextSection1():JSX.Element {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const [dogamList, setDogamList] = useState<any>()
  const [isClickDogam,setIsClickDogam] = useState<boolean>(false) 
  const [clickDogamData, setClickDogamData] = useState<any>()
  const [Getdogam, {error:error2, isLoading:isLoading1}] = useLazyGetAdminDogamQuery()
  
  
  const loading = <Loading/>
  

  useEffect(()=> {
    Getdogam('').unwrap().then((r)=> {
      setDogamList(r.data)
    })
  },[])


  const tbodyData = dogamList?.map((e:any, idx:number)=> {
    return (
      <tr key={idx} className={`border-b-2 border-b-[#B7B7B7] lg:text-[0.6rem] xl:text-[1rem] text-[#525252] cursor-pointer ${styles.userData}`} onClick={()=> {
        setIsClickDogam(true)
        setClickDogamData(e)
      }}>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.dogamId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.dogamName}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.dogamClass}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.dogamOrigin === '' ? 'null': e.dogamOrigin}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.isRared === null ? 'null': e.isRared}</th>
      </tr>
    )
  })
  

  function UserDetail():JSX.Element {
    const [PutAdminUserDelete, {isLoading}] = usePutAdminUserDeleteMutation()
    const [changeNickname, setChangeNickname] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsClickDogam(false)
      }
    }
    const loading = <Loading/>
    
    return (
      <>
        {isLoading && loading}
        <div ref={ref} className="flex justify-center absolute mx-auto w-screen h-[90vh]  z-10" onClick={(e)=> {
        if (e.target === ref.current) {
          setIsClickDogam(false)
      }}}>
          <div className="flex justify-center items-center w-[90%] my-auto bg-white border-4 border-[#A87E6E] rounded-lg">
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center text-[1.3rem] text-[#A87E6E] font-semibold py-5">DETAIL</div>
              <div className="flex justify-evenly w-full">
                <div className="flex flex-col justify-center items-end w-[10%] mx-5 text-[1rem] text-[#A87E6E] font-semibold">
                  <div className="py-[0.15rem]">dogamId</div>
                  <div className="py-[0.15rem]">dogamName</div>
                  <div className="py-[0.15rem]">dogamClass</div>
                  <div className="py-[0.15rem]">dogamOrigin</div>
                  <div className="py-[0.15rem]">dogamMean1</div>
                  <div className="py-[0.15rem]">dogamMean2</div>
                  <div className="py-[0.15rem]">dogamMean3</div>
                  <div className="py-[0.15rem]">dogamExam1</div>
                  <div className="py-[0.15rem]">dogamExam2</div>
                  <div className="py-[0.15rem]">dogamExam3</div>
                  <div className="py-[0.15rem]">isRared</div>
                </div>
                <div className="flex flex-col justify-center items-start w-[90%] mx-5 text-[1rem] text-[#767676] font-semibold">
                  <div className="py-[0.15rem]">{clickDogamData?.dogamId}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamName}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamClass}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamOrigin === ''? 'null': clickDogamData?.dogamOrigin}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamMean1}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamMean2}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamMean3}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamExam1}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamExam2}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.dogamExam3}</div>
                  <div className="py-[0.15rem]">{clickDogamData?.isRared === null ? 'null': clickDogamData?.isRared}</div>
                </div>
              </div>
              <div className="flex justify-center  text-[1rem] text-[#A87E6E] font-semibold my-4">
                <div aria-label="취소" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>취소</div>
                <div aria-label="수정" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>수정</div>
                <div aria-label="삭제" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>삭제</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {
        isClickDogam? <UserDetail/>: null
      }
      <Toast />
      {(isLoading1) && loading}
      <div className="container max-w-screen-xl w-[90%] my-4 mx-auto ">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-5">
          Dogam 관리
        </div>
        <div className="w-full mb-4 font-bold flex justify-between">
          <div>
            <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">
              Dogam
            </span>
          </div>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dogamId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dogamName</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dogamClass</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dogamOrigin</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">isRared</th>
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

