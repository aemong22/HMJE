import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar"
import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { useLazyGetAdminUserListQuery } from "../../Store/api";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function AdminMain():JSX.Element {
  return (
    <>
      <Navbar/>
      <AdminMainSection1/>
      <AdminMainSection2/>
      {/* <AdminMainSection3/> */}
      <AdminMainSection4/>
    </>
  )
}
export default AdminMain

function AdminMainSection1():JSX.Element {
  return (
    <div className="w-full">
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto">
        <div className="flex justify-center">
          <span className="pt-8 text-[1.8rem] md:text-[2rem] text-[#A87E6E] font-bold  border-b-[#A87E6E]/70 border-b-4">
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
    <div className="container max-w-screen-xl w-[90%] mx-auto my-12">
      <div className="hidden lg:flex justify-center text-center lg:text-[1.3rem] font-semibold text-[#A87E6E]">
        <div aria-label="user" className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>USER</div>
        <div aria-label="badge" className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>BADGE</div>
        <div aria-label="context" className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>문맥도감</div>
        <div aria-label="exam" className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 ${styles.choiceBtn}`} onClick={click}>과거시험</div>
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
    <div className="container max-w-screen-xl md:w-[90%] lg:w-full mx-auto mt-16">
      <div className="flex justify-center font-semibold">
        <div className="flex flex-col mx-auto">
          <div className="text-[1.3rem] text-[#A87E6E]/80">평균 학습 시간</div>
          <div className="text-[2rem] text-[#A87E6E]">1시간 24분</div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[1.3rem] text-[#A87E6E]/80">평균 학습 단어</div>
          <div className="text-[2rem] text-[#A87E6E]">72개</div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[1.3rem] text-[#A87E6E]/80">유저수</div>
          <div className="text-[2rem] text-[#A87E6E]">5명</div>
        </div>
      </div>
    </div>
  )
}


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

// 유저 레벨 분포
function AdminMainSection4():JSX.Element {
  const [userList, setUserList] = useState<UserListType[]>()
  const [userMyInfo, {error:error1, isLoading:isLoading1}] = useLazyGetAdminUserListQuery()
  useEffect(()=> {
    userMyInfo('').unwrap().then((r)=> {
      setUserList(r.data)
    })
    Chart.register();
  },[])
  
  const loading = <div>로딩중</div>

  const levelArray = Array.from({length:9},()=> 0)
  // console.log('levelArray: ', levelArray);
  
  if (userList) {
    userList.map((user)=> {
      if (user.level === 1) {
        levelArray[0] += 1
      } 
      else if (user.level === 2) {
        levelArray[1] += 1
      }
      else if (user.level === 3) {
        levelArray[2] += 1
      }
      else if (user.level === 4) {
        levelArray[3] += 1
      }
      else if (user.level === 5) {
        levelArray[4] += 1
      }
      else if (user.level === 6) {
        levelArray[5] += 1
      }
      else if (user.level === 7) {
        levelArray[6] += 1
      }
      else if (user.level === 8) {
        levelArray[7] += 1
      }
      else if (user.level === 9) {
        levelArray[8] += 1
      }
      
    })
  }

  const options = {
    // 옵션 (1)
    responsive: true,
    // 옵션 (2)
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    // 옵션 (3)
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#E3E3E3",
        },
      },
    },
    maintainAspectRatio: false
  };
  console.log('levelArray: ', levelArray);
  
  const data = {
    datasets: [
      {
        data: levelArray, 
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 210, 86)',
          'rgb(255, 247, 86)',
          'rgb(136, 235, 54)',
          'rgb(54, 162, 235)',
          'rgb(99, 125, 255)',
          'rgb(161, 99, 255)',
          'rgb(250, 99, 255)',
          'rgb(255, 99, 146)',
      ], 
        hoverBorderColor: ['#d5cdcf'],
        hoverOffset: 4,
        label: '레벨'
      }
    ],
    
    labels: ['레벨1','레벨2','레벨3','레벨4','레벨5','레벨6','레벨7','레벨8','레벨9',]
  };

  return (
    <div className="container max-w-screen-xl md:w-[90%] lg:w-full mx-auto mt-12 mb-8">
      <div className="flex flex-col justify-start">
        <div className="flex justify-between">
          <div className="mb-4 font-semibold text-[#A87E6E] text-[1.5rem]">유저 레벨 분포</div>
          <div className="mb-4 font-semibold text-[#A87E6E] text-[1.5rem]">유저 수: &nbsp; {userList?.length}명</div>
        </div>
        <div className="bg-white py-5 px-5 rounded-lg">
          {isLoading1&&loading}
          <Line options={options} width={'100%'} height={'250px'} typeof='line' data={data}/>
        </div>
      </div>
    </div>
  )
}

