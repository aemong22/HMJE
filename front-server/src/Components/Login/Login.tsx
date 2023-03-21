import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostUserloginMutation } from "../../Store/NonAuthApi";
import Api from "../Common/Api";
import Footer from "../Common/Footer";
import IntroNavbar from "../Intro/IntroNavbar";
type login = {
  username: string;
  password: string;
};
function Login(): JSX.Element {
  const navigate = useNavigate();
  // 입력 타입
  // type input = string | undefined;

  const [Id, setId] = useState<string>("");
  const [Password, setPassword] = useState<string>("");

  const [PostUserlogin, isloading5] = usePostUserloginMutation();

  const ChangeId = (event: any): void => {
    setId(event.target.value);
  };
  const ChangePassword = (event: any): void => {
    setPassword(event.target.value);
  };
  const Nav = (e: any) => {
    if (e.target.id === "forgetPassword") {
      navigate("/forgetpassword");
    } else if (e.target.id === "forgetId") {
      navigate("/forgetid");
    } else if (e.target.id === "join") {
      navigate("/join");
    } else if (e.target.id === "enter") {
      // axios 입장하기
      Api.post("/login", {
        password: Password,
        username: Id,
      }).then((r) => {
        // console.log("받는 데이터", r.data);

        // const accessToken = r.data.accessToken;
        // const refreshToken = r.data.refreshToken;
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        // navigate("/main");
      });
    }
  };

  const Enter = () => {
    // axios 입장하기
    // console.log(Id);
    // console.log(Password);

    const data: login = { username: Id, password: Password };

    PostUserlogin(data)
      .unwrap()
      .then((r: any) => {
        if (r.status === "200") {
          // console.log("받는 데이터", r);
          const accessToken = r.accessToken;
          const refreshToken = r.refreshToken;
          const userId = r.userId;
          // console.log("accessToken", accessToken);
          // console.log("refreshToken", refreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userName", Id!);
          localStorage.setItem("userId", userId);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/main");
        }
      })
      .catch((e) => {
        console.log("error났다", e.data.status===401);
        if (e.data.status === 401 || e.data.status === 500) {
          alert("아이디 혹은 패스워드가 틀렸습니다");
        }
      });
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      Enter();
    }
  };

  const Social = () => {
    // 소셜 로그인
  };

  return (
    <>
      <IntroNavbar />
      <div className="">
        {/* <!-- Example --> */}
        <div className="flex min-h-screen max-w-screen-x">
          {/* <!-- Container --> */}
          <div className="flex flex-row justify-center w-full">
            {/* <!-- Login --> */}
            <div className="flex flex-col items-center justify-center px-10">
              {/* <!-- Login box --> */}
              <div className="flex flex-col justify-center">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-5xl font-extrabold text-[#A87E6E] md:text-6xl">
                    홍민정음
                  </div>
                  <div className="text-[#BD9789] font-extrabold text-[20px] leading-7 md:text-[24px] md:leading-8  w-[20rem] ">
                    즐거운 단어 학습
                  </div>
                </div>
                <div className="flex flex-col max-w-xl w-[100%] lg:w-[50rem] space-y-5">
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
                    type="password"
                    placeholder="비밀번호"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePassword}
                    onKeyPress={handleOnKeyPress}
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
                      id="forgetPassword"
                      className=" cursor-pointer font-extrabold "
                      onClick={Nav}
                    >
                      비밀번호 찾기
                    </div>
                    <div
                      id="forgetId"
                      className=" cursor-pointer font-extrabold px-10"
                      onClick={Nav}
                    >
                      계정 찾기{" "}
                    </div>
                    <div
                      id="join"
                      className=" cursor-pointer font-extrabold "
                      onClick={Nav}
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
