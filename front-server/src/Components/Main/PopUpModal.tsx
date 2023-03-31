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

  const [images, setImages] = useState([
    "/Assets/PopUp/event.jpg",
    // "/Assets/PopUp/pasttest.png",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

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
      "; path=/main";
  }

  function getCookie(name: any) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  // 이전방문 날짜
  const VISITED_BEFORE_DATE = getCookie("VisitCookie");
  // 쿠키로바꾸자

  // 현재 날짜
  const VISITED_NOW_DATE = Math.floor(new Date().getDate());

  useEffect(() => {
    // 팝업 오늘 하루닫기 체크
    if (VISITED_BEFORE_DATE !== null) {
      // 날짜가 같을경우 노출
      if (VISITED_BEFORE_DATE === VISITED_NOW_DATE.toString()) {
        const expiry = new Date();
        setCookie("VisitCookie", "modal", expiry.toString());

        onClose?.(true);
      }
      // 날짜가 다를경우 비노출
      if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE.toString()) {
        onClose?.(false);
      }
    }
  }, [VISITED_BEFORE_DATE]);

  // 하루동안 팝업 닫기
  const Dayclose = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onClose) {
      onClose(e);

      const expiry = new Date();
      // +1일 계산
      const expiryDate = expiry.getDate() + 1;
      // 쿠키로바꾸자
      setCookie("VisitCookie", "modal", expiryDate.toString());
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
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/notice");
                }}
              >
                <img
                  className="w-full h-full"                  
                  src={images[currentIndex]}
                  alt={`image${currentIndex}`}
                />
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
