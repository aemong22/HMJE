import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import CamelSit from "../Threejs/CamelSit"
import Checked from "../Threejs/Checked"
import Gaming from "../Threejs/Gaming"
import Dolphin from "../Threejs/Dolphin"
import ClownFish from "../Threejs/ClownFish"
import Pangguin from "../Threejs/Pangguin"
import { useGetUserMyinfoQuery } from "../../Store/api"

function MyPage():JSX.Element {
  const userId = localStorage.getItem('userId')
  const {data, isError, isLoading} = useGetUserMyinfoQuery(userId)
  console.log('data: ',data);
  console.log('data: ',data?.data);
  
  return (
    <>
      <Navbar/>
      <MyPageSection1V1/>
      <MyPageSection2V1/>
      <MyPageSection1V2/>
      <MyPageSection2V2/>
      <MyPageSection3/>
      <Footer/>
    </>
  )
}
export default MyPage

// 데스크탑 & 태블릿
function MyPageSection1V1():JSX.Element {
  return (
    <div className="container max-w-screen-xl h-[26rem] w-[70%] mx-auto hidden md:flex flex-col md:flex-row md:justify-around items-center text-center py-[2rem]">
      <div className="flex flex-col md:w-[50%] h-full bg-[#ffffff] rounded-md ">
        <Pangguin position={-2} />
        <div className="bg-[#D9D9D9] rounded-xl font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] w-full py-1">학습 데이터 없어 슬퍼요 <br />서둘러 학습해주세요😥</div>
      </div>
      <div className="md:w-[45%] pt-[1rem] pb-[0.5rem] px-4">
        <div className="flex justify-center items-center h-full w-full">
          {/* 메인 데이터 */}
          <div className="flex flex-col justify-center items-center h-4/5 w-full">
            <div className="flex justify-between items-center w-full pb-1">
              {/* 칭호 & 수정 */}
              <div className="sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]">🥕&nbsp;한글을 사랑하는 자</div>
              <div className="text-[#8E8E8E] sm:text-[0.7rem] lg:text-[0.8rem]">정보 수정⚙</div>
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
              <div className="w-full rounded-xl h-4 bg-[#F0ECE9]">
                {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                <div className="w-[50%] rounded-xl h-full bg-[#F7CCB7]">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center w-full pt-4">
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// 데스크탑 & 태블릿
function MyPageSection2V1():JSX.Element {
  return (
    <div className="container max-w-screen-xl h-[15rem] w-[70%] mx-auto hidden md:flex md:justify-around items-center text-center py-[0.5rem]">
      <div className="flex flex-col w-1/2">
        <div className="flex justify-evenly items-center">
          {/* 통계 */}
          <div className="flex flex-col justify-center items-center w-1/4">
            {/* 오늘의 단어 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">15</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">개</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>오늘의 단어</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-[21%] lg:w-1/4">
            {/* 총 단어 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">320</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">개</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>총 단어</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-[29%] lg:w-1/4">
            {/* 오늘의 학습시간 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">3</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">개</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>오늘의 문맥도감</span></div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/4">
            {/* 총 학습시간 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">15</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">개</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>총 문맥도감</span></div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="flex flex-col justify-center items-center md:w-[29%] lg:w-1/4">
            {/* 오늘의 학습시간 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">47</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">분</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>오늘의 학습시간</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-[29%] lg:w-1/4">
            {/* 총 학습시간 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">1</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">시간</span><span className="font-bold md:text-[1.5rem] lg:text-[1.7rem]">5</span><span className=" md:text-[0.65rem] lg:text-[0.75rem]">분</span></div>
            <div className="text-[#A2A2A2] md:text-[0.6rem] lg:text-[0.7rem]"><span>총 학습시간</span></div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full border-4">통계</div>
    </div>
  )
}


// 모바일
function MyPageSection1V2():JSX.Element {
  return (
    <div className="flex flex-col md:hidden justify-center items-center h-[26rem] mt-7">
      <div className="flex justify-center items-center w-[90%] h-[70%]">
        <div className="flex justify-center items-center h-full w-full">
          {/* 렙업에 따른 3D 캐릭터 */}
          <div className="flex flex-col justify-end items-center w-full h-full">
            <div className="flex justify-between items-center w-full pb-1 text-[0.6rem]">
              {/* 칭호 & 수정 */}
              <div>🥕&nbsp;한글을 사랑하는 자</div>
              <div className="text-[#8E8E8E]">정보 수정⚙</div>
            </div>
            <span className="text-left w-full mr-1 text-[1.2rem] font-semibold">오리</span>
            {/* <Gaming/> */}
            <Pangguin position={-2}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[90%] h-[5%]">
        {/* 캐릭터 행동 버튼 */}
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
      </div>
      <div className="flex justify-center items-center w-[90%] h-[25%]">
        {/* 메인 데이터 */}
        <div className="flex flex-col justify-center items-center h-3/5 w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between items-center w-full">
              {/* 닉네임 & 등급 & 경험치 */}
              <div className="pb-1">
                {/* 닉네임 & 등급 */}
                <span className="text-[0.5rem] text-[#525252]">정 2품</span>
              </div>
              <div className="text-[0.7rem] text-[#525252]">
                {/* 등급 */}
                220 / 480
              </div>
            </div>
            <div className="flex justify-start items-center w-full rounded-xl h-4 bg-[#F0ECE9]">
              {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
              <div className="w-[50%] rounded-xl h-full bg-[#F7CCB7]">
                &nbsp;
              </div>
            </div>
            <div className="bg-[#D9D9D9] rounded-lg w-full text-center font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] my-2 py-2">학습 데이터 없어 슬퍼요 <br />서둘러 학습해주세요😥</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 모바일
function MyPageSection2V2():JSX.Element {
  return (
    <div className="flex flex-col md:hidden justify-center items-center h-[23rem] my-6">
      <div className="flex justify-center items-center h-[73%] w-[90%] mb-[2%]">
        <div className="flex justify-center items-center h-full w-full border-4">
          통계
        </div>
      </div>
      <div className="flex justify-center items-center h-[25%] w-[90%]">
        {/* 메인 데이터 */}
        <div className="flex flex-col w-full">
          <div className="flex justify-evenly items-center">
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 오늘의 단어 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">15</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[21%]">
              {/* 총 단어 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">320</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[29%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">3</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 문맥도감</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">15</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 문맥도감</span></div>
            </div>
          </div>
          <div className="flex justify-evenly items-center mt-1 ">
            <div className="flex flex-col justify-center items-center w-[28%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">47</span><span className="text-[0.7rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 학습시간</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[28%]">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">1</span><span className="text-[0.7rem]">시간</span><span className="font-bold text-[1.3rem]">5</span><span className="text-[0.7rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 학습시간</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MyPageSection3():JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[53rem] sm:h-[57rem] md:h-[58rem] lg:h-[70rem] mb-24">
      <div className="flex justify-center items-center h-[67%] max-w-screen-xl w-[90%] md:w-[70%]">
        {/* 학습 관리 */}
        <div className="flex flex-col justify-center items-start w-full h-[90%]">
          <div className="h-[10%] sm:h-[8%]">
            <div className="block text-[0.9rem] sm:text-[1rem] lg:text-[1.1rem] font-semibold pb-2">학습 관리</div>
            <div className="block font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] text-[#A2A2A2]">나의 학습 정보를 확인해보세요!</div>
          </div>
          <div className="h-[45%] sm:h-[46%] w-full mt-4">
            {/* 학습 시간 문구 */}
            <div className="flex justify-between items-center w-full h-[16%] sm:h-[20%]">
              <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.7rem] sm:text-[0.8rem] lg:text-[1rem]"><span>학습 시간</span></div>
              <div className="flex justify-between items-center w-[28%] md:w-[15%] sm:h-[60%] lg:h-[70%] font-semibold text-[0.8rem] sm:text-[0.8rem] lg:text-[0.9rem] text-[#868686]">
                <div className="w-[55%]"><span className="flex justify-center items-center border-2 ">2023</span></div>
                <div className="w-[45%]"><span className="flex justify-center items-center border-2 ">3월</span></div>
              </div>
            </div>
            {/* 학습 시간 데이터 */}
            <div className="flex justify-center items-center w-full h-[80%]">
              <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                {/* 한달 간격으로 학습시간 & 학습 단어 갯수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
          <div className="h-[45%] sm:h-[46%] w-full mt-4">
            {/* 학습 단어 개수 */}
            <div className="flex justify-between items-center w-full h-[16%] sm:h-[20%]">
              <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.7rem] sm:text-[0.8rem] lg:text-[1rem]"><span>학습 단어 개수</span></div>
              <div className="flex justify-between items-center w-[28%] md:w-[15%] sm:h-[60%] lg:h-[70%] font-semibold text-[0.8rem] sm:text-[0.8rem] lg:text-[0.9rem] text-[#868686]">
                <div className="w-[55%]"><span className="flex justify-center items-center border-2">2023</span></div>
                <div className="w-[45%]"><span className="flex justify-center items-center border-2">3월</span></div>
              </div>
            </div>
            {/* 학습 단어 개수 데이터 */}
            <div className="flex justify-center items-center w-full h-[80%]">
              <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                {/* 한달 간격으로 날짜별 맞힌 개수, 틀린 개수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-[33%] max-w-screen-xl w-[90%] md:w-[70%]">
        <div className="flex flex-col justify-center items-start w-full h-[90%]">
          <div className="flex items-center h-[15%]">
            <div className="block text-[0.9rem] sm:text-[1rem] lg:text-[1.4rem] font-semibold">칭호</div>
          </div>
          <div className="h-[85%] w-full">
            {/* 학습 단어 개수 */}
            <div className="flex justify-between items-end w-full h-[14%] mb-2">
               {/* 데스크탑 & 태블릿 */}
              <div className="hidden sm:flex flex-col justify-center items-start h-full w-[85%] text-[#A2A2A2] font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]">
                <div>
                  <div><span>홍민정음에서 특정 목표를 달성하면 얻을 수 있습니다!</span></div>
                </div>
                <div>
                  <div><span>칭호를 착용해 보세요</span></div>
                </div>
              </div>
              {/* 모바일 */}
              <div className="flex sm:hidden flex-col justify-center items-start h-full w-[85%] text-[#A2A2A2] font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]">
                <div>
                  <div><span>홍민정음에서 특정 목표를 달성하면 </span></div>
                </div>
                <div>
                  <div><span>얻을 수 있습니다! 칭호를 착용해 보세요</span></div>
                </div>
              </div>
              <div className="flex justify-center items-center w-[15%] font-semibold text-[1.3rem] h-full text-[#BF9F91]">
                <div className="w-full"><span className="flex justify-end items-center ">3개</span></div>
              </div>
            </div>
            {/* 학습 단어 개수 데이터 */}
            <div className="flex justify-center items-start w-full h-[86%] mt-1">
              <div className="h-[85%] w-full bg-[#F0ECE9] rounded-md">
                {/* 한달 간격으로 날짜별 맞힌 개수, 틀린 개수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}