function Navbar():JSX.Element {
  return (
    <div id='header' role={'banner'} className='h-12 flex justify-between items-center bg-white px-8  text-[#A87E6E] '>
      {/* 헤더 */}
      <div className='font-bold text-[0.3rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem]'>홍민정음</div>
      <div className='flex justify-center text-[0.2rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.8rem]'>
        <div className='cursor-pointer mr-2'>오리님</div>
        <div className='cursor-pointer'>어서오너라</div>
      </div>
  </div>
  )
}
export default Navbar