import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { useDeleteAdminBadgeMutation, useLazyGetAdminBadgeListQuery, usePostAdminBadgeMutation, usePutAdminBadgeMutation } from "../../Store/api";
import Navbar from "../Common/Navbar"
import { Toast } from "../Common/Toast";
import styles from "./Admin.module.css";

function AdminBadge():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminUserSection1/>
    </>
  )
}
export default AdminBadge

interface UserListType {
  'badgeDetail': string,
  'badgeId': number,
  'badgeImage': string,
  'badgeName': string,
}

function AdminUserSection1():JSX.Element {
  
  const [userBadge, setUserBadge] = useState<UserListType[]>()
  const [isClickUser,setIsClickUser] = useState<boolean>(false) 
  const [isClickUser2,setIsClickUser2] = useState<boolean>(false) 
  const [isBadgeAdd,setIsBadgeAdd] = useState<boolean>(false) 
  const [clickUserData, setClickUserData] = useState<UserListType>()
  const [getUserBadge, {error:error1, isLoading:isLoading1}] = useLazyGetAdminBadgeListQuery()
  const [deleteAdminBadge, {error:error2, isLoading:isLoading2}] = useDeleteAdminBadgeMutation()
  const [postAdminBadge, {error:error3, isLoading:isLoading3}] = usePostAdminBadgeMutation()
  const [putAdminBadge, {error:error4, isLoading:isLoading4}] = usePutAdminBadgeMutation()
  
  const loading = <div>로딩중</div>
  

  useEffect(()=> {
    getUserBadge('').unwrap().then((r)=> {
      console.log(r.data);
      
      setUserBadge(r.data)
    })
  },[])

  // setUserList(userMyInfo?.data)

  const tbodyData = userBadge?.map((e:UserListType, idx:number)=> {      
    return (
      <tr key={idx} className={`border-b-2 border-b-[#B7B7B7] lg:text-[0.6rem] xl:text-[1rem] text-[#525252] cursor-pointer ${styles.userData}`} onClick={()=> {
        setIsClickUser(true)
        setClickUserData(e)
      }}>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeImage}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeName}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeDetail}</th>
      </tr>
    )
  })
  
  const addBadge = () => {
    setIsBadgeAdd(!isBadgeAdd)
  }

  function BadgeDetail():JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const detailRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsClickUser(false)
      } else if (target.ariaLabel === '삭제') {
        deleteAdminBadge(clickUserData?.badgeId).unwrap().then((r)=>{
          if (r.message === 'success') {
            toast.success('뱃지 삭제 완료')
            setIsClickUser(false)
          } else {
            toast.error('에러 발생')
            setIsClickUser(false)
          }
        })
      } else {
        if ((nameRef.current?.value !== undefined)&&(detailRef.current?.value !== undefined)&&(imgRef.current?.value !== undefined)) {
          const body = {
            badgeName: nameRef.current?.value,
            badgeDetail: detailRef.current?.value,
            badgeImage: imgRef.current?.value
          }
          putAdminBadge([clickUserData?.badgeId,body]).unwrap().then((r)=> {
            if (r.message === 'success') {
              toast.success('뱃지 수정 성공!')
              setIsClickUser(false)
            } else  {
              toast.error('에러 발생!')
              setIsClickUser(false)
            }
          })
        } else {
          // 비어있음
          toast.error('값을 모두 입력해주세요!')
        } 
      }
    }

    return (
      <div ref={ref} className="flex justify-center absolute mx-auto w-full h-[88vh] z-10" onClick={(e)=> {
        if (e.target === ref.current) {
          setIsClickUser(false)
      }}}>
        <div className="flex justify-center items-center w-[35rem] my-auto bg-white border-4 border-[#A87E6E] rounded-lg">
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center text-[1.3rem] text-[#A87E6E] font-semibold py-5">DETAIL</div>
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col justify-center items-end w-1/2 mx-5 text-[1rem] text-[#A87E6E] font-semibold">
                <div className="py-[0.15rem]">badgeId</div>
                <div className="py-[0.15rem]">badgeImage</div>
                <div className="py-[0.15rem]">badgeName</div>
                <div className="py-[0.15rem]">badgeDetail</div>
              </div>
              <div className="flex flex-col justify-center items-start w-1/2 mx-5 text-[1rem] text-[#767676] font-semibold">
                <div className="py-[0.15rem]">{clickUserData?.badgeId}</div>
                <div className="py-[0.15rem]"><input ref={imgRef} className="focus:outline-[#e9bb78]" id="img" type="text" defaultValue={clickUserData?.badgeImage} autoFocus/></div>
                <div className="py-[0.15rem]"><input ref={nameRef} className="focus:outline-[#e9bb78]" id="name" type="text" defaultValue={clickUserData?.badgeName}/></div>
                <div className="py-[0.15rem]"><input ref={detailRef} className="focus:outline-[#e9bb78]" id="detail" type="text" defaultValue={clickUserData?.badgeDetail}/></div>
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
    )
  }

  function BadgeAdd():JSX.Element {
    const ref1 = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const detailRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsBadgeAdd(false)
      } else {
        if ((nameRef.current?.value !== undefined)&&(detailRef.current?.value !== undefined)&&(imgRef.current?.value !== undefined)) {
          const body = {
            badgeName: nameRef.current?.value,
            badgeDetail: detailRef.current?.value,
            badgeImage: imgRef.current?.value
          }
          postAdminBadge(body).unwrap().then((r)=> {
            if (r.message === 'success') {
              toast.success('뱃지 생성 성공!')
              setIsBadgeAdd(false)
            } else  {
              toast.error('에러 발생!')
              setIsBadgeAdd(false)
            }
          })
        } else {
          toast.error('모든 칸에 입력해주세요!')
        }
      } 
    }
    return (
      <div ref={ref1} className="flex justify-center absolute mx-auto w-full h-[88vh] z-10" onClick={(e)=> {
        if (e.target === ref1.current) {
          setIsClickUser(false)
      }}}>
        <div className="flex justify-center items-center w-[35rem] my-auto bg-white border-4 border-[#A87E6E] rounded-lg">
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center text-[1.3rem] text-[#A87E6E] font-semibold py-5">DETAIL</div>
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col justify-center items-end w-1/2 mx-5 text-[1rem] text-[#A87E6E] font-semibold">
                <div className="py-[0.15rem]">badgeName</div>
                <div className="py-[0.15rem]">badgeDetail</div>
                <div className="py-[0.15rem]">badgeImage</div>
              </div>
              <div className="flex flex-col justify-center items-start w-1/2 mx-5 text-[1rem] text-[#767676] font-semibold">
                <div className="py-[0.15rem]"><input className="focus:outline-[#e9bb78]" ref={nameRef} type="text" placeholder="이름" autoFocus/></div>
                <div className="py-[0.15rem]"><input className="focus:outline-[#e9bb78]" ref={detailRef} type="text" placeholder="설명"/></div>
                <div className="py-[0.15rem]"><input className="focus:outline-[#e9bb78]" ref={imgRef} type="text" placeholder="이미지"/></div>
              </div>
            </div>
            <div className="flex justify-center  text-[1rem] text-[#A87E6E] font-semibold my-4">
              <div aria-label="취소" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>취소</div>
              <div aria-label="추가" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>추가</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        isClickUser? <BadgeDetail/>: null
      }
      {
        isBadgeAdd? <BadgeAdd/>: null
      }
      <Toast/>
      {isLoading1 && loading}
      <div className="container max-w-screen-xl w-[70%] my-8 mx-auto ">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-10">
          Badge 관리
        </div>
        <div className="flex justify-between w-full mb-4 text-[1.4rem] text-[#A87E6E] font-bold">
          <div>
            <span className="border-b-4 border-b-[#A87E6E]/70">
              Badge
            </span>
          </div>
          <div>
            <span className="cursor-pointer" onClick={addBadge}>+</span>
          </div>
        </div>
        <div className="overflow-y-auto h-[49vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">badgeId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">badgeImage</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">badgeName</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">badgeDetail</th>
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

