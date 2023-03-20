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
    <div id='header' role={'banner'} className='container max-w-screen-xl w-[80%] h-12 flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] " >
        <div aria-label="main" className='font-bold text-[0.3rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem] cursor-pointer' onClick={onClick}>홍민정음</div>
        <div className='flex justify-center text-[0.5rem] md:text-[0.55rem] lg:text-[0.85rem]'>
          {/* <div aria-label="admin" className='cursor-pointer mr-4' onClick={onClick}>관리자</div> */}
          <div aria-label="mypage" className='cursor-pointer mr-2' onClick={onClick}>{nickname}</div>
          <div className='cursor-pointer'>어서오너라</div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Navbar