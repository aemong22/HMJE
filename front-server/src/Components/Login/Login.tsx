import { useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";

const Login = () => {
  // 입력 타입
  type input = string | undefined;
  const [Id, setId] = useState<input>();
  const [Password, setPassword] = useState<input>();

  const ChangeId = (event: any) => {
    setId(event.target.value);
  };
  const ChangePassword = (event: any) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <Mainlogin />
      </div>
    </>
  );

  function Mainlogin(): JSX.Element {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col grow items-center justify-center border-2 h-[30rem] w-[30rem] border-black">
          <div>또이름</div>
          <input
            className="border-black border-2"
            onChange={ChangeId}
            placeholder="이름"
          />
          <div>비밀번호</div>
          <input
            className="border-black border-2"
            onChange={ChangePassword}
            placeholder="비밀번호"
          />
          <div className="cursor-pointer">입장하기</div>
        </div>
      </div>
    );
  }
};

export default Login;
