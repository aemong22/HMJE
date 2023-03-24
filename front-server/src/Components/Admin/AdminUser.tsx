import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserMyinfoQuery, useLazyGetAdminUserListQuery, useLazyGetAdminUserSearchListQuery, usePutAdminUserDeleteMutation, usePutAdminUserUpdateMutation } from "../../Store/api";
import Navbar from "../Common/Navbar"
import { Toast } from "../Common/Toast";
import styles from "./Admin.module.css";

function AdminUser():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminUserSection1/>
    </>
  )
}
export default AdminUser

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

function AdminUserSection1():JSX.Element {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const [userList, setUserList] = useState<UserListType[]>()
  const [isClickUser,setIsClickUser] = useState<boolean>(false) 
  const [clickUserData, setClickUserData] = useState<UserListType>()
  const [userMyInfo, {error:error1, isLoading:isLoading1}] = useLazyGetAdminUserListQuery()
  const [putAdminUserUpdate, {error:error2, isLoading:isLoading2}] = usePutAdminUserUpdateMutation()
  const [searchUser, {error:error3, isLoading:isLoading3}] = useLazyGetAdminUserSearchListQuery()

  console.log('유저 아이디: ', userId);
  
  // 어드민 확인 용
  const {data:isAdminInfo} = useGetUserMyinfoQuery(userId)
  
  const loading = <div>로딩중</div>
  

  useEffect(()=> {
    userMyInfo('').unwrap().then((r)=> {
      setUserList(r.data)
    })
  },[])

  // setUserList(userMyInfo?.data)

  const tbodyData = userList?.map((e:UserListType, idx:number)=> {
    let 등급:string = ''
    switch (e.level) {
      case 1:
        등급 = '정구품'
        break;
      case 2:
        등급 = '정팔품'
        break;
      case 3:
        등급 = '정칠품'
        break;
      case 4:
        등급 = '정육품'
        break;
      case 5:
        등급 = '정오품'
        break;
      case 6:
        등급 = '정사품'
        break;
      case 7:
        등급 = '정삼품'
        break;
      case 8:
        등급 = '정이품'
        break;
      case 9:
        등급 = '정일품'
        break;
    }
    
    return (
      <tr key={idx} className={`border-b-2 border-b-[#B7B7B7] lg:text-[0.6rem] xl:text-[1rem] text-[#525252] cursor-pointer ${styles.userData}`} onClick={()=> {
        setIsClickUser(true)
        setClickUserData(e)
      }}>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.userId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.username}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.nickname}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.phoneNumber}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{등급}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.exp}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.isAdmin? 'True':'False'}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.isSecession? 'True':'False'}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.nowbadgeId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.characterId}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.todayRight}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.todayWrong}</th>
        <th className="border-x-2 border-x-[#B7B7B7]">{e.todaySemo}</th>
      </tr>
    )
  })
  
  const search = (e:React.ChangeEvent<HTMLInputElement>) => {
    searchUser(e.target.value).unwrap().then((r)=> {
      setUserList(r.data)
      
    })
  }

  function UserDetail():JSX.Element {
    const [PutAdminUserDelete, {isLoading}] = usePutAdminUserDeleteMutation()
    const [changeNickname, setChangeNickname] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null)
    const click:MouseEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement 
      if (target.ariaLabel === '취소') {
        setIsClickUser(false)
      } else if (target.ariaLabel === '수정') {
        if (changeNickname === '') {
          toast.error('변경할 닉네임을 입력해주세요.')
        } else {
            putAdminUserUpdate([userId, changeNickname]).unwrap().then((r)=> {
            if (r.message === 'success') {
              toast.success('성공적으로 변경되었습니다.')
              setIsClickUser(false)
            } else {
              toast.error('요청에 오류가 있습니다.')
              setIsClickUser(false)
            }
          }).then(()=> {
            userMyInfo('').unwrap().then((r)=> {
              setUserList(r.data)
            })
          })
        }
      } else {
        if (isAdminInfo?.data.isAdmin) {
          PutAdminUserDelete([clickUserData?.userId, userId]).unwrap().then((r)=> {
            if (r.data) {
              toast.success('성공적으로 처리했습니다')
              userMyInfo('').unwrap().then((r)=> {
                setUserList(r.data)
              setIsClickUser(false)
              })
            } else {
              toast.error('뭔가 이상한데?')
            }
          })
        } else {
          toast.error('어드민 아닌데요?')
          navigate('/')
        }
      }
    }

    const change = (e:React.ChangeEvent<HTMLInputElement>) => {
      setChangeNickname(e.target.value)
    }
    
    return (
      <div ref={ref} className="flex justify-center absolute mx-auto w-full h-[90vh]  z-10" onClick={(e)=> {
        if (e.target === ref.current) {
          setIsClickUser(false)
      }}}>
        <div className="flex justify-center items-center w-[35rem] my-auto bg-white border-4 border-[#A87E6E] rounded-lg">
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center text-[1.3rem] text-[#A87E6E] font-semibold py-5">DETAIL</div>
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col justify-center items-end w-1/2 mx-5 text-[1rem] text-[#A87E6E] font-semibold">
                <div className="py-[0.15rem]">userId</div>
                <div className="py-[0.15rem]">username</div>
                <div className="py-[0.15rem]">nickname</div>
                <div className="py-[0.15rem]">phone_number</div>
                <div className="py-[0.15rem]">level</div>
                <div className="py-[0.15rem]">exp</div>
                <div className="py-[0.15rem]">isAdmin</div>
                <div className="py-[0.15rem]">isSecession</div>
                <div className="py-[0.15rem]">nowbadgeId</div>
                <div className="py-[0.15rem]">characterId</div>
                <div className="py-[0.15rem]">todayRight</div>
                <div className="py-[0.15rem]">todayWrong</div>
                <div className="py-[0.15rem]">todaySemo</div>
              </div>
              <div className="flex flex-col justify-center items-start w-1/2 mx-5 text-[1rem] text-[#767676] font-semibold">
                <div className="py-[0.15rem]">{clickUserData?.userId}</div>
                <div className="py-[0.15rem]">{clickUserData?.username}</div>
                <div className="py-[0.15rem]"><input className="rounded-lg focus:outline-[#e9bb78]" type="text" defaultValue={clickUserData?.nickname} autoFocus maxLength={6} onChange={change}/></div>
                <div className="py-[0.15rem]">{clickUserData?.phoneNumber}</div>
                <div className="py-[0.15rem]">{clickUserData?.level}</div>
                <div className="py-[0.15rem]">{clickUserData?.exp}점</div>
                <div className="py-[0.15rem]">{clickUserData?.isAdmin? 'True': 'False'}</div>
                <div className="py-[0.15rem]">{clickUserData?.isSecession? 'True': 'False'}</div>
                <div className="py-[0.15rem]">{clickUserData?.nowbadgeId}</div>
                <div className="py-[0.15rem]">{clickUserData?.characterId}</div>
                <div className="py-[0.15rem]">{clickUserData?.todayRight}</div>
                <div className="py-[0.15rem]">{clickUserData?.todayWrong}</div>
                <div className="py-[0.15rem]">{clickUserData?.todaySemo}</div>
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

  return (
    <>
      {
        isClickUser? <UserDetail/>: null
      }
      <Toast />
      {isLoading1 && loading}
      <div className="container max-w-screen-xl w-[90%] my-4 mx-auto ">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-5">
          USER 관리
        </div>
        <div className="w-full mb-4 font-bold flex justify-between">
          <div>
            <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">
              USER
            </span>
          </div>
          <div>
            <input className="text-center border-2 border-[#A87E6E] rounded-lg focus:outline-[#e9bb78]" type="text" placeholder="유저 닉네임" autoFocus onChange={search}/>
          </div>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">userId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">username</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">nickname</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">phone_number</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">level</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">exp</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">is_admin</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">is_secession</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">nowbadgeId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">characterId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">todayRight</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">todayWrong</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">todaySemo</th>
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

