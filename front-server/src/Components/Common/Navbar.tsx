import { MouseEventHandler, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../Store/hooks"
import classNames from "classnames";
import { usePutUserLogoutMutation } from "../../Store/api";

function Navbar():JSX.Element {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState<any>()
  // const nickname:any = useAppSelector((state:any) => state.userNickname)
  const [menuToggle, setMenuToggle] = useState(false);
  const [putUserLogout,loading]=usePutUserLogoutMutation()

  useEffect(()=> {
    const nick = localStorage.getItem('nickname')
    if (nick) {
      setNickname(nick)
    }
  },[])


  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.ariaLabel === 'main') {
      navigate('/main')
    } else if (target.ariaLabel === 'mypage') {
      navigate('/mypage')
    } else if (target.ariaLabel === 'admin') {
      navigate('/admin')
    } else if (target.ariaLabel === 'note') {
      navigate('/note')
    } else if (target.ariaLabel === 'dogam') {
      navigate('/dogam')
    } else if (target.ariaLabel === 'dictionary') {
      navigate('/dictionary')
    } else if(target.ariaLabel === 'notice') {
      navigate('/notice')
    }
    else if(target.ariaLabel==="logout"){
      console.log("로그아웃 시작");      
      const data={
       userId:localStorage.getItem("userId")
      }
      putUserLogout(data).unwrap().then((r)=>{
        console.log(r.message=="success");
        
        if(r.message=="success"){
          console.log("로그아웃성공");          
          window.localStorage.clear();
          navigate("/login");
        }        
      })
    }

  }
  
  return (
  <div className="w-full bg-[#ffffff]" style={{borderBottom: 'solid 4px rgba(234,234,234,0.8)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-xl lg:w-[90%] w-full flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] lg:px-0  py-3 px-3" >
        <div className="flex">
          <div aria-label="main" className='font-bold text-[1.2rem] md:text-[1.3rem] cursor-pointer' onClick={onClick}>홍민정음</div>
          <div className="lg:flex text-[1rem] px-4 items-center hidden">
            <div aria-label="main" className = "px-4 cursor-pointer" onClick={onClick}>학습</div>
            <div aria-label="note" className = "px-4 cursor-pointer" onClick={onClick}>오답공책</div>
            <div aria-label="dogam" className = "px-4 cursor-pointer" onClick={onClick}>문맥도감</div>
            <div aria-label="mypage" className = "px-4 cursor-pointer" onClick={onClick}>관리</div>
            <div aria-label="dictionary" className = "px-4 cursor-pointer" onClick={onClick}>사전</div>
            <div aria-label="notice" className = "px-4 cursor-pointer" onClick={onClick}>알림공간</div>
          </div>
        </div>
        <div className='flex justify-around text-[1rem]'>
          {/* <div aria-label="admin" className='cursor-pointer mr-4' onClick={onClick}>관리자</div> */}
          <div  className="flex justify-center px-3">
            <div aria-label="mypage" className='cursor-pointer mr-2 font-bold' onClick={onClick}>{nickname}<span className="font-normal">님</span></div>
              <div className='cursor-pointer'>어서오세요</div>
            </div>
          <div aria-label="logout" className="lg:block hidden px-3 border-l border-[#A87E6E] cursor-pointer" onClick={onClick}>나가기</div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuToggle(!menuToggle)}
            >
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={classNames("lg:hidden z-10 absolute bg-[#ffffff] w-full text-[0.9rem] text-[#A87E6E] px-2", { hidden: !menuToggle})}>
        <div aria-label="main" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>학습</div>
        <div aria-label="note" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>오답공책</div>
        <div aria-label="dogam" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>문맥도감</div>
        <div aria-label="mypage" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>관리</div>
        <div aria-label="dictionary" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>사전</div>
        <div aria-label="notice" className = "p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>알림공간</div>
        <div aria-label="" className = "p-2 cursor-pointer hover:bg-gray-100">나가기</div>
    </div>
  </div>
  )
}
export default Navbar