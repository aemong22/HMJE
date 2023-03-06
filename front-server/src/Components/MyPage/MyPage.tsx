import Navbar from "../Common/Navbar"
import Pangguin from "../Threejs/Pangguin"

function MyPage():JSX.Element {
  return (
    <>
      <Navbar/>
      <MyPageSection/>
    </>
  )
}
export default MyPage

function MyPageSection():JSX.Element {
  return (
    <div className="flex justify-between items-center h-[38rem] border-2 border-pink-300">
      <div className="flex justify-end items-center h-4/5 w-[30%]">
        {/* 렙업에 따른 3D 캐릭터 */}
        <div className="flex justify-center items-center w-[80%] h-full">
          <Pangguin/>
        </div>
      </div>
      <div className="flex justify-center items-center h-full w-[40%] ">
        {/* 메인 데이터 */}
        <div className="flex flex-col justify-center items-center h-3/5 w-full">
          <div className="flex justify-between items-center w-full pb-2">
            {/* 칭호 & 수정 */}
            <div className="sm:text-[0.8rem] lg:text-[1rem]">🥕&nbsp;한글을 사랑하는 자</div>
            <div className="text-[#8E8E8E] sm:text-[0.7rem] lg:text-[1rem]">정보 수정⚙</div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between items-center w-full">
              {/* 닉네임 & 등급 & 경험치 */}
              <div className="pb-1">
                {/* 닉네임 & 등급 */}
                <span className="mr-1 sm:text-[1.5rem] lg:text-[1.8rem] font-semibold">오리</span><span className="sm:text-[0.75rem] lg:text-[1rem] text-[#525252]">정 2품</span>
              </div>
              <div className="text-[1rem] text-[#525252]">
                {/* 등급 */}
                220 / 480
              </div>
            </div>
            <div className="w-full rounded-xl bg-[#F0ECE9]">
              {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
              <div className="w-[50%] rounded-xl bg-[#F7CCB7]">
                &nbsp;
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            {/* 통계 */}
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 오늘의 단어 */}
              <div className="text-[#B18978]"><span className="font-bold sm:text-[1.3rem] lg:text-[1.5rem]">15</span><span className="sm:text-[0.7rem] lg:text-[0.9rem]">개</span></div>
              <div className="text-[#A2A2A2] sm:text-[0.6rem] lg:text-[0.7rem]"><span>오늘의 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 총 단어 */}
              <div className="text-[#FFA800]"><span className="font-bold sm:text-[1.3rem] lg:text-[1.5rem]">320</span><span className="sm:text-[0.7rem] lg:text-[0.9rem]">개</span></div>
              <div className="text-[#A2A2A2] sm:text-[0.6rem] lg:text-[0.7rem]"><span>총 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold sm:text-[1.3rem] lg:text-[1.5rem]">47</span><span className="sm:text-[0.7rem] lg:text-[0.9rem]">분</span></div>
              <div className="text-[#A2A2A2] sm:text-[0.6rem] lg:text-[0.7rem]"><span>오늘의 학습시간</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold sm:text-[1.3rem] lg:text-[1.5rem]">1</span><span className="sm:text-[0.7rem] lg:text-[0.9rem]">시간</span><span className="font-bold sm:text-[1.3rem] lg:text-[1.5rem]">5</span><span className="sm:text-[0.7rem] lg:text-[0.9rem]">분</span></div>
              <div className="text-[#A2A2A2] sm:text-[0.6rem] lg:text-[0.7rem]"><span>총 학습시간</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center h-full w-[30%]">
        {/* d원형 그래프 통계 */}
        <div className="flex justify-center items-center w-[80%] h-3/5">
          통계
        </div>
      </div>
    </div>
  )
}