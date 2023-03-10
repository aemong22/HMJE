import React from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Dictionary = () => {
  interface dictionary {
    word_id: string;
    word_name: string;
    word_iso: string;
    word_type: string;
    word_rating: string;
    word_class: string;
    word_origin: string;
    word_detail: string;
    word_example: string;
    word_relation: string;
  }

  const TempWord: dictionary = {
    word_class: "test",
    word_detail: "test",
    word_example: "test",
    word_id: "test",
    word_iso: "test",
    word_name: "test",
    word_origin: "test",
    word_rating: "test",
    word_relation: "test",
    word_type: "test",
  };

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <div className="flex flex-col max-w-screen-xl w-[80%] justify-center items-center mx-auto px-10 sm:px-10 md:px-16 lg:px-20 border-2 border-black">
          {/**border-2 border-black  */}
          {/* 위쪽 */}
          <div className="flex flex-row w-[100%] justify-between py-10">
            <div className="text-[#A87E6E] font-extrabold text-xl lg:text-6xl">
              사전[辭典]
            </div>
            <input
              type="text"
              className="border-[#A87E6E] w-[50%] sm:w-[50%] md:w-[40%] lg:w-[30%] border-2 rounded-md px-5 font-medium text-lg placeholder:font-normal"
              placeholder="검색"
            />
          </div>
          {/* ㄱㄴㄷㄹㅁㅂ pagination */}
          <div>ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ</div>
          {/* 메인 */}
          <div className="flex flex-col border-2 border-black ">
            <div className="h-[3rem]">하이</div>
            <div>둘</div>
            <div>셋</div>
          </div>
          {/* 1 2 3 4 5 */}
          <div className="py-10 px-5">
            <nav aria-label="Page navigation">
              <ul className=" flex flex-row">
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
                    1
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
                    2
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 focus:shadow-outline">
                    3
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
                    4
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
                    5
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
                    6
                  </button>
                </li>
                <li>
                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dictionary;
