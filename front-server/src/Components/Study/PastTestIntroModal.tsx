import React from "react";

const PastTestIntroModal = ({ openModal }: any): JSX.Element => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
              <>
                <div className={` md:h-[3rem] h-[2rem]`}>ㅅㄷㄴㅅ</div>
                <div className="text-[1.5rem] font-bold mx-auto text-center">
                  <>정답입니다.</>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastTestIntroModal;
