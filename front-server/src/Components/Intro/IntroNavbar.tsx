import { useNavigate } from "react-router-dom"

function IntroNavbar():JSX.Element {
  
  return (
    <>
      <div id='header' role={'banner'} className='h-12 flex justify-between items-center bg-white px-8 text-[#A87E6E] border-b-4 border-solid' style={{borderBottomColor: 'rgba(234,234,234,0.25)'}}>
        {/* 헤더 */}
        <div className='font-bold text-[0.3rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem]'>홍민정음</div>
        <div className='flex justify-center text-[0.2rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.8rem]'>
          {/* <div id="enter" className='cursor-pointer mr-2' onClick={nav}>입장하기</div>
          <div id="join" className='cursor-pointer' onClick={nav}>가입하기</div> */}
        </div>
      </div>
    </>
  )
}
export default IntroNavbar