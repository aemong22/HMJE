function Footer():JSX.Element {
  return (
    <div className="h-[5rem] md:h-[6rem] lg:h-[10rem] flex justify-center items-center bg-[#D8C1A5] text-white">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] h-[80%] mx-auto ">
        <div className="flex justify-start items-end w-full h-[30%] border-b-2 border-b-white mb-3 text-[0.5rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem]">
        ㅎ ㅗ ㅇ ㅁ ㅣ ㄴ ㅈ ㅓ ㅇ ㅇ ㅡ ㅁ
        </div>
        <div className="flex justify-start items-center w-full h-[70%]">
          <div className="w-full">
            <div className="">
              <span className="text-[0.8rem] sm:text-[0.8rem] md:text-[1.1rem] lg:text-[1.3rem] font-semibold">홍민정음</span>
              <span className="text-[0.3rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.7rem]">즐거운 단어 학습</span>
            </div>
            <div className="flex justify-between items-center text-[0.3rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.7rem]">
              <div className="font-semibold">부울경 1반</div>
              <div>말랑말랑하조하조?</div>
            </div>
            <div className="flex justify-end items-start text-[0.3rem] sm:text-[0.3rem] md:text-[0.5rem] lg:text-[0.7rem]">
              <span className="font-semibold">앞.</span>&nbsp;<span>김홍민&nbsp;김애림&nbsp;김찬희</span>&emsp;
              <span className="font-semibold">뒤.</span>&nbsp;<span>양은진&nbsp;최권민&nbsp;김남규</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer