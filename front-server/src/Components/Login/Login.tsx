import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Common/Api";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

function Login(): JSX.Element {
  const navigate = useNavigate();
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

  const ChangeId = (event: any): void => {
    // console.log(event.target.value);
    setId(event.target.value);
  };
  const ChangePassword = (event: any): void => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const ForgetPassword = () => {
    navigate("/forgetpassword");
  };
  const ForgetId = () => {
    navigate("/forgetid");
  };
  const GoJoin = () => {
    navigate("/join");
  };

  const Enter = () => {
    // axios 입장하기
    Api.post("/login", {
      password: Password,
      username: Id,
    }).then((r) => {
      console.log(r.data);
    });
  };

  const Social = () => {
    // 소셜 로그인
  };

  return (
    <>
      <Navbar />
      <div className="">
        {/* <!-- Example --> */}
        <div className="flex min-h-screen">
          {/* <!-- Container --> */}
          <div className="flex flex-row w-full">
            {/* <!-- Login --> */}
            <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
              {/* <!-- Login box --> */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-xl">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-5xl font-extrabold text-[#A87E6E] md:text-6xl">
                    홍민정음
                  </div>
                  <div className="text-[#BD9789] font-extrabold text-[20px] leading-7 md:text-[24px] md:leading-8  w-[20rem] ">
                    즐거운 단어 학습
                  </div>
                </div>
                <div className="flex flex-col max-w-xl w-[50rem] space-y-5">
                  <div className="text-[#A87C6E] font-extrabold text-[22px] leading-7">
                    계정
                  </div>
                  <input
                    type="text"
                    placeholder="계정"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeId}
                  />
                  <div className="text-[#A87C6E] font-extrabold text-[22px] leading-7">
                    비밀번호
                  </div>
                  <input
                    type="text"
                    placeholder="비밀번호"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePassword}
                  />
                  <button
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-extrabold bg-[#BF9F91] text-white"
                    onClick={Enter}
                  >
                    입장하기
                  </button>
                  <div
                    className={`flex flex-row-reverse items-center text-[#666666]  h-4 text-base`}
                  >
                    <div
                      className=" cursor-pointer font-extrabold "
                      onClick={ForgetPassword}
                    >
                      비밀번호 찾기
                    </div>
                    <div
                      className=" cursor-pointer font-extrabold px-10"
                      onClick={ForgetId}
                    >
                      또이름 찾기{" "}
                    </div>
                    <div
                      className=" cursor-pointer font-extrabold "
                      onClick={GoJoin}
                    >
                      가입하기
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[45%] border border-[#B18978]"></div>
                    <div className="w-[10%] text-center text-[#BF9F91] font-extrabold text-base">
                      또는
                    </div>
                    <div className="w-[45%] border border-[#B18978]"></div>
                  </div>

                  <button
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E]"
                    onClick={Social}
                  >
                    <span className="absolute left-4"></span>
                    <span> 소셜 로그인</span>
                  </button>
                  {/* <div className="flex lg:hidden justify-between items-center w-full py-4">
                    <div className="flex items-center justify-start space-x-3"></div>
                    <div className="flex items-center space-x-2">
                      <span>회원이 아니신가요? </span>
                      <a
                        href="#"
                        className="underline font-medium text-[#070eff]"
                      >
                        가입하기
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Example --> */}
      </div>
      <Footer />
    </>
  );
}

export default Login;
