import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

function IntroNavbar():JSX.Element {
  const navigate = useNavigate()
  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.ariaLabel === 'intro') {
      navigate('/')
    }
  }

  return (
    <div className="w-full bg-[#ffffff]" style={{borderBottom: 'solid 4px rgba(234,234,234,0.5)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-xl w-[80%] py-3 flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] " >
        <div aria-label="intro" className='font-bold text-[1.1rem] sm:text-[1.2rem] cursor-pointer' onClick={onClick}>홍민정음</div>
        <div className='flex justify-center text-[0.5rem] md:text-[0.55rem] lg:text-[0.85rem]'>
        </div>
      </div>
    </div>
  </div>
  )
}
export default IntroNavbar