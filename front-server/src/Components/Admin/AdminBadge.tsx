import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useLazyGetAdminBadgeListQuery } from "../../Store/api";
import Navbar from "../Common/Navbar"
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
  // 'user_id': number,
  // 'character_id': number,
  'badgeDetail': string,
  'badgeId': number,
  'badgeImage': string,
  'badgeName': string,
}

function AdminUserSection1():JSX.Element {
  
  const [userBadge, setUserBadge] = useState<UserListType[]>()
  const [isClickUser,setIsClickUser] = useState<boolean>(false) 
  const [clickUserData, setClickUserData] = useState<UserListType>()
  const [getUserBadge, {error:error1, isLoading:isLoading1}] = useLazyGetAdminBadgeListQuery()
  // console.log('받아온 데이터: ',userMyInfo?.data);
  
  const loading = <div>로딩중</div>
  

  useEffect(()=> {
    getUserBadge('').unwrap().then((r)=> {
      console.log(r.data);
      
      setUserBadge(r.data)
    })
  },[])

  // setUserList(userMyInfo?.data)

  const tbodyData = userBadge?.map((e:UserListType, idx:number)=> {  
    console.log(e);
    
    return (
      <tr key={idx} className={`border-b-2 border-b-[#B7B7B7] lg:text-[0.6rem] xl:text-[1rem] text-[#525252] cursor-pointer ${styles.userData}`} onClick={()=> {
        setIsClickUser(true)
        setClickUserData(e)
      }}>
        <th className="border-x-2 border-x-[#B7B7B7]">{idx}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeImage}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeName}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.badgeDetail}</th>
      </tr>
    )
  })
  
  function UserDetail():JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsClickUser(false)
      } else {
        // setIsClickUser()
      }
    }
    return (
      <div ref={ref} className="flex justify-center absolute mx-auto w-full z-10" onClick={(e)=> {
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
                <div className="py-[0.15rem]">{clickUserData?.badgeImage}</div>
                <div className="py-[0.15rem]">{clickUserData?.badgeName}</div>
                <div className="py-[0.15rem]">{clickUserData?.badgeDetail}</div>
              </div>
            </div>
            <div className="flex justify-center  text-[1rem] text-[#A87E6E] font-semibold my-4">
              <div aria-label="취소" className={`bg-[#F0ECE9] border-[#A87E6E] border-2 px-6 py-1 mx-5 rounded-md ${styles.choiceBtn}`} onClick={click}>취소</div>
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
        isClickUser? <UserDetail/>: null
      }
      {isLoading1 && loading}
      <div className="container max-w-screen-xl w-[70%] my-8 mx-auto ">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-10">
          USER 관리
        </div>
        <div className="w-full mb-4 font-bold">
          <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">
            USER
          </span>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">index</th>
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

