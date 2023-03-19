import { MouseEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../Store/hooks"
import classNames from "classnames";

function Navbar():JSX.Element {
  const navigate = useNavigate()
  const nickname:any = useAppSelector((state:any) => state.userNickname)
  const [menuToggle, setMenuToggle] = useState(false);

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
    } 

  }
  
  return (
  <div className="w-full" style={{borderBottom: 'solid 4px rgba(234,234,234,0.8)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-lg flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] lg:px-0 px-[1.5%] py-3" >
        <div className="flex">
          <div aria-label="main" className='font-bold text-[0.9rem] sm:text-[1rem] cursor-pointer' onClick={onClick}>홍민정음</div>
          <div className="md:flex text-[0.75rem] px-4 items-center hidden">
            <div aria-label="main" className = "px-4 cursor-pointer" onClick={onClick}>학습</div>
            <div aria-label="note" className = "px-4 cursor-pointer" onClick={onClick}>오답공책</div>
            <div aria-label="dogam" className = "px-4 cursor-pointer" onClick={onClick}>문맥도감</div>
            <div aria-label="mypage" className = "px-4 cursor-pointer" onClick={onClick}>관리</div>
            <div aria-label="dictionary" className = "px-4 cursor-pointer" onClick={onClick}>사전</div>
            <div aria-label="" className = "px-4 cursor-pointer" >알림공간</div>
          </div>
        </div>
        <div className='flex justify-around text-[0.75rem]'>
          {/* <div aria-label="admin" className='cursor-pointer mr-4' onClick={onClick}>관리자</div> */}
          <div  className="flex justify-center px-2">
            <div aria-label="mypage" className='cursor-pointer mr-2 font-bold' onClick={onClick}>{nickname}<span className="font-normal">님</span></div>
              <div className='cursor-pointer'>어서오세요</div>
            </div>
          <div className="px-2 border-l border-[#A87E6E]">나가기</div>
          <div className="md:hidden flex items-center">
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
    <div className={classNames("md:hidden z-10 absolute bg-[#ffffff] w-full text-[0.75rem] text-[#A87E6E]", { hidden: !menuToggle})}>
        <div aria-label="main" className = "p-2 cursor-pointer hover:bg-gray-200" onClick={onClick}>학습</div>
        <div aria-label="note" className = "p-2 cursor-pointer hover:bg-gray-200" onClick={onClick}>오답공책</div>
        <div aria-label="dogam" className = "p-2 cursor-pointer hover:bg-gray-200" onClick={onClick}>문맥도감</div>
        <div aria-label="mypage" className = "p-2 cursor-pointer hover:bg-gray-200" onClick={onClick}>관리</div>
        <div aria-label="dictionary" className = "p-2 cursor-pointer hover:bg-gray-200" onClick={onClick}>사전</div>
        <div aria-label="" className = "p-2 cursor-pointer hover:bg-gray-200" >알림공간</div>
    </div>
  </div>
  )
}
export default Navbar