import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

function IntroNavbar():JSX.Element {
  const navigate = useNavigate()

  const nav:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.ariaLabel === 'login') {
      navigate('/login')  
    } else if (target.ariaLabel === 'join'){
    navigate('/join')
    }
    else{
      navigate('/')
    }
  }

  return (
    <div className="w-full bg-[#ffffff]" style={{borderBottom: 'solid 4px rgba(234,234,234,0.8)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-xl lg:w-[90%] w-full flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] lg:px-0  py-3 px-3" >
        <div aria-label="intro" className='font-bold text-[1.2rem] md:text-[1.3rem] cursor-pointer' onClick={nav}>홍민정음</div>
        <div className='flex justify-center text-[1rem]'>
          <div aria-label="login" className="px-4 my-[0.1rem] border-r-2 border-[#E4D1B9] cursor-pointer" onClick={nav}>입장하기</div>
          <div aria-label="join" className="px-4 my-[0.1rem] cursor-pointer"  onClick={nav}>가입하기 </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default IntroNavbar