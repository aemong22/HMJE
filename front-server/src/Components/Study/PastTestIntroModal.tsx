import { useNavigate } from "react-router-dom";
import style from "./PastTestIntroModal.module.css";

const PastTestIntroModal = ({ openModal }: any): JSX.Element => {
  const navigate = useNavigate();
  const Nav = (e: any) => {
    if (e.target.id === "OUT") {
      openModal(false);
    } else if (e.target.id === "START") {
      openModal(false);
      navigate("/PastTest");
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
              <>
                <div className={`${style.oicon} md:h-[3rem] h-[2rem]`}></div>
                <div className="text-[1.5rem] font-bold mx-auto text-center">
                  <>과거시험은 한번만 응시 가능합니다.</>
                </div>
              </>
            </div>
            <div className="relative px-4 pt-3 flex justify-center items-end sm:min-w-[25rem] min-w-[19rem]">
              <div className="flex flex-col items-center text-[#da4040]">
                <div className="md:text-[1.0rem] text-[1.2rem] font-bold mr-1 ">
                  주의
                </div>
                <div className="flex flex-col items-center justify-center max-w-[100%]">
                  <span>과거시험장을 나가게 되면 응시가 불가합니다.</span>
                  <span>시작하기 버튼을 누르면 바로 시작합니다.</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between p-2 ">
              <button
                id="OUT"
                className="w-[40%] h-[40%] py-2 bg-[#B7B7B7] rounded-[10px] text-white font-extrabold"
                onClick={openModal(false)}
              >
                그만두기
              </button>
              <button
                id="START"
                className="w-[40%] h-[40%] py-2 bg-[#F5BEA4] rounded-[10px] text-white font-extrabold"
                onClick={openModal(false)}
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastTestIntroModal;
