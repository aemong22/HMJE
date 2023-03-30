function Footer():JSX.Element {
  return (
    <div className="w-full bg-[#BF9F91] text-white">
      <div className="container max-w-screen-xl w-full lg:px-1 px-2 py-4 mx-auto">
        <div className="justify-start items-end w-full py-1 border-b-2 border-b-white mb-3 sm:text-[0.9rem] text-[0.8rem]">
        ㅎ ㅗ ㅇ ㅁ ㅣ ㄴ ㅈ ㅓ ㅇ ㅇ ㅡ ㅁ
        </div>
        <div className="sm:flex block justify-between items-center w-full">
          <div className="py-1 items-end">
            <span className="sm:text-[1.3rem] text-[1.1rem] font-bold"> 홍민정음 </span>
            <span className="sm:text-[0.9rem] text-[0.8rem]">즐거운 단어학습</span>
            <div className="sm:text-[0.9rem] text-[0.8rem] py-1 font-bold">부울경 1반</div>
          </div>

          

          <div className="text-end">
            <div className="py-1 sm:text-[0.9rem] text-[0.8rem]">말랑하조</div>
            
            <div className="sm:text-[0.9rem] text-[0.8rem] flex justify-between">
              <div className="pr-2">앞. 김홍민 김찬희 김애림</div>
              <div className="">뒤. 김남규 양은진 최권민</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
export default Footer