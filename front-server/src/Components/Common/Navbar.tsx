import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../Store/hooks"

function Navbar():JSX.Element {
  const navigate = useNavigate()
  const nickname:any = useAppSelector((state:any) => state.userNickname)

  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.ariaLabel === 'main') {
      navigate('/main')
    } else if (target.ariaLabel === 'mypage') {
      navigate('/mypage')
    } else if (target.ariaLabel === 'admin') {
      navigate('/admin')
    }
  }
  
  return (
  <div className="w-full" style={{borderBottom: 'solid 4px rgba(234,234,234,0.5)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-xl w-[90%] h-12 flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-end w-full h-full bg-white text-[#A87E6E] text-[1rem] md:text-[1.2rem] " >
        <div aria-label="main" className='font-bold cursor-pointer' onClick={onClick}>홍민정음</div>
        <div className='h-full flex justify-center items-end'>
          {/* <div aria-label="admin" className='cursor-pointer mr-4' onClick={onClick}>관리자</div> */}
          <div aria-label="mypage" className='font-semibold cursor-pointer mr-2' onClick={onClick}>{nickname}</div>
          <div className="text-[0.8rem] md:text-[1rem]">어서오너라</div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Navbar