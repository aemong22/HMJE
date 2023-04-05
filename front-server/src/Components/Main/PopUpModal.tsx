import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

interface ModalProps {
  className: string;
  onClose: (e: any) => void;
  maskClosable: boolean;
  closable: boolean;
  visible: boolean;
}

function Modal({ onClose, maskClosable, closable, visible }: ModalProps) {
  const navigate = useNavigate();


  const slides = [
    {
      url: "/Assets/PopUp/event.jpg",
    },
    {
      url: "/Assets/PopUp/pasttest.png",
    },
    // {
    //   url: "/Assets/PopUp/pocha.jpg",
    // },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.(e);
    }
  };

  function setCookie(name: any, value: any, days: any) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=/";
  }

  // 하루동안 팝업 닫기
  const Dayclose = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onClose) {
      onClose(e);
      const expiry = new Date();

      expiry.setDate(expiry.getDate() + 1);

      setCookie("VisitCookie", expiry.getDate().toString(), 1);
    }
  };

  const close = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClose?.(e);
  };

  return (
    <>
      <div
        className={`${
          visible ? "block" : "hidden"
        } flex box-border fixed top-0 left-0 bottom-0 right-0 z-[999] bg-[#000000] bg-opacity-60`}
      >
        <div
          className={`${
            visible ? "block" : "hidden"
          } box-border fixed top-0 md:left-0 -left-4 bottom-0 right-0 z-[1000] overflow-auto outline-0 `}
          onClick={maskClosable ? onMaskClick : undefined}
          tabIndex={-1}
        >
          <div
            className="box-border relative w-[400px] md:w-[480px] md:max-w-[2xl] top-[50%] transform translate-y-[-50%] mx-auto px-[40px] py-[20px]"
            tabIndex={0}
          >
            <div className="flex flex-col items-center">
              <div className="max-w-[480px] w-full md:w-[400px] h-[500px] md:h-[550px] relative group">
                <div
                  style={{
                    backgroundImage: `url(${slides[currentIndex].url})`,
                  }}
                  className="w-full h-full rounded-t-2xl bg-center bg-cover duration-500 cursor-pointer"
                  onClick={() => {
                    navigate("/notice");
                  }}
                ></div>
                {/* Left Arrow */}
                <div
                  className="lg:hidden lg:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-50 duration-300 hover:scale-125  hover:opacity-100"
                  onClick={handlePrevClick}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
                </div>

                {/* Right Arrow */}
                <div
                  className="lg:hidden lg:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-50 duration-300 hover:scale-125  hover:opacity-100"
                  onClick={handleNextClick}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="sr-only">Next</span>
                </div>
                {/* center point */}
                {/* <div className="flex flex-row space-x-2  absolute top-[94%] left-[24%]">
                  {slides.map((slides, slidesIndex) => (
                    <div key={slidesIndex} onClick={()=>{goToSlide(slidesIndex)}} className="cursor-pointer">
                      <div className="w-[5rem] h-[1rem] bg-white rounded-full " />
                    </div>
                  ))}
                </div> */}
              </div>
              {closable && (
                <div className="flex justify-between bg-[#282828] w-[320px] md:w-[400px] px-[20px] py-[7px] text-[0.8rem] text-[#ffffff]">
                  <div className="cursor-pointer" onClick={Dayclose}>
                    오늘 하루 닫기
                  </div>
                  <div className="cursor-pointer" onClick={close}>
                    닫기
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

export default React.memo(Modal);
