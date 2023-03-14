import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

function Navbar():JSX.Element {
  const navigate = useNavigate()
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
    <div id='header' role={'banner'} className='h-12 flex justify-between items-center bg-white px-8 text-[#A87E6E] border-b-4 border-solid' style={{borderBottomColor: 'rgba(234,234,234,0.5)'}}>
      {/* 헤더 */}
      <div aria-label="main" className='font-bold text-[0.3rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem] cursor-pointer' onClick={onClick}>홍민정음</div>
      <div className='flex justify-center text-[0.2rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.8rem]'>
        <div aria-label="admin" className='cursor-pointer mr-4' onClick={onClick}>관리자</div>
        <div aria-label="mypage" className='cursor-pointer mr-2' onClick={onClick}>오리님</div>
        <div className='cursor-pointer'>어서오너라</div>
      </div>
  </div>
  )
}
export default Navbar