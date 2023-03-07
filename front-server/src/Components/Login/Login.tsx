import { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

function Login(): JSX.Element {
  // 입력 타입
  type input = string | undefined;
  const [Id, setId] = useState<input>();
  const [Password, setPassword] = useState<input>();

  const TextSize: number = 3; //가입하기 32 기준
  const defaultnum: number = 25;
  const HongSize: number = (TextSize * 60) / defaultnum;
  const TitleSize: number = (TextSize * 25) / defaultnum;
  const EnterSize: number = (TextSize * 32) / defaultnum;
  const SmallSize: number = (TextSize * 16) / defaultnum;

  const ChangeId = (event: any) => {
    // console.log(event.target.value);
    setId(event.target.value);
  };
  const ChangePassword = (event: any) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col h-screen w-screen ">
        <Navbar />
        {/* 로그인 창 */}
        <div className="flex flex-col items-center">
          {/* 로그인 둥근거 */}
          <div className="flex flex-col grow items-center justify-center border-2 h-[70rem] w-[60rem] border-black sm:w-[5rem]  md:w-[10rem]  lg:w-[20rem]  xl:w-[40rem]  2xl:w-[60rem] ">
            <div
              className={`border-2 border-black h-[5rem] text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${HongSize}rem]`}
            >
              홍민정음
            </div>
            <div
              className={`border-2 border-black text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${TextSize}rem]`}
            >
              즐거운 단어 학습
            </div>
            <div
              className={`border-2 border-black text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${TitleSize}rem]`}
            >
              또이름
            </div>
            <input
              className="border-black border-2 rounded-[3rem]"
              onChange={ChangeId}
              placeholder="이름"
            />
            <div
              className={`border-2 border-black text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${TitleSize}rem]`}
            >
              비밀번호
            </div>
            <input
              className="border-black border-2 rounded-[3rem]"
              onChange={ChangePassword}
              placeholder="비밀번호"
            />
            <div
              className={`cursor-pointer border-2 border-black text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${EnterSize}rem]`}
            >
              입장하기
            </div>

            <div
              className={`flex felx-row border-2 border-black text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${SmallSize}rem]`}
            >
              <div className=" cursor-pointer">가입하기 | </div>
              <div className=" cursor-pointer">또이름 찾기 | </div>
              <div className=" cursor-pointer">비밀번호 찾기</div>
            </div>
            <div
              className={`text-[1rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[${SmallSize}rem]`}
            >
              또는
            </div>
          </div>
        </div>
        {/* 로그인 창 끝 */}
        {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="/img/building.jpg"
                alt="Modern building architecture"
              ></img>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Company retreats
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                Incredible accommodation for your team
              </a>
              <p className="mt-2 text-slate-500">
                Looking to take your team away on a retreat to enjoy awesome
                food and take in some sunshine? We have a list of places to do
                just that.
              </p>
            </div>
          </div>
        </div> */}
        <Footer />
      </div>
    </>
  );
}

export default Login;
