import { useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";

const Login = () => {
  // 입력 타입
  type input = string | undefined;
  const [Id, setId] = useState();
  const [Password, setPassword] = useState();

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
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="flex flex-col items-center">
          <div className="flex flex-col grow items-center justify-center border-2 h-[70rem] w-[80rem] border-black">
            <div>홍민정음</div>
            <div>즐거운 단어 학습</div>
            <div>또이름</div>
            <input
              className="border-black border-2 rounded-[3rem]"
              onChange={ChangeId}
              placeholder="이름"
            />
            <div>비밀번호</div>
            <input
              className="border-black border-2 rounded-[3rem]"
              onChange={ChangePassword}
              placeholder="비밀번호"
            />
            <div className="cursor-pointer">입장하기</div>

            <div className="flex felx-row">
              <div className="cursor-pointer">가입하기</div>
              <div className="cursor-pointer">또이름 찾기</div>
              <div className="cursor-pointer">비밀번호 찾기</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
