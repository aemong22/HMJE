// import React, { useEffect } from "react";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import Portal from "./portal";
// import img from "components/popup/img/1667.jpg";

// function Modal({ className, onClose, maskClosable, closable, visible }: any) {
//   const onMaskClick = (e: any) => {
//     if (e.target === e.currentTarget) {
//       onClose(e);
//     }
//   };

//   // 이전방문 날짜
//   const VISITED_BEFORE_DATE = localStorage.getItem("VisitCookie");
//   // 현재 날짜
//   const VISITED_NOW_DATE = Math.floor(new Date().getDate());

//   // console.log(VISITED_BEFORE_DATE)
//   // console.log(VISITED_NOW_DATE)
//   // localStorage.removeItem('VisitCookie')

//   useEffect(() => {
//     // 팝업 오늘 하루닫기 체크
//     if (VISITED_BEFORE_DATE !== null) {
//       // 날짜가 같을경우 노출
//       if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
//         localStorage.removeItem("VisitCookie");
//         onClose(true);
//       }
//       // 날짜가 다를경우 비노출
//       if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
//         onClose(false);
//       }
//     }
//   }, [VISITED_BEFORE_DATE]);

//   // 하루동안 팝업 닫기
//   const Dayclose = (e) => {
//     if (onClose) {
//       onClose(e);

//       const expiry = new Date();
//       // +1일 계산
//       const expiryDate = expiry.getDate() + 1;
//       // 로컬스토리지 저장
//       localStorage.setItem("VisitCookie", expiryDate);
//     }
//   };

//   const close = (e) => {
//     if (onClose) {
//       onClose(e);
//     }
//   };

//   return (
//     <Portal elementId="modal-root">
//       <ModalOverlay visible={visible} />
//       <ModalWrapper
//         className={className}
//         onClick={maskClosable ? onMaskClick : null}
//         tabIndex="-1"
//         visible={visible}
//       >
//         <ModalInner tabIndex="0" className="modal-inner">
//           <ModalInner2>
//             <ImgStyle>
//               <a
//                 href="https://www.pping.kr"
//                 rel="noopener noreferrer"
//                 target={"_blank"}
//                 cursor="pointer"
//               >
//                 <img
//                   src={img}
//                   style={{ width: "100%", height: "100%" }}
//                   alt=""
//                 />
//               </a>
//             </ImgStyle>
//             {closable && (
//               <CloseStyle>
//                 <Close className="modal-close" onClick={Dayclose}>
//                   오늘 하루 닫기
//                 </Close>
//                 <Close className="modal-close" onClick={close}>
//                   닫기
//                 </Close>
//               </CloseStyle>
//             )}
//           </ModalInner2>
//         </ModalInner>
//       </ModalWrapper>
//     </Portal>
//   );
// }

// Modal.propTypes = {
//   visible: PropTypes.bool,
// };

// const ModalInner2 = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ImgStyle = styled.div``;

// const CloseStyle = styled.div`
//   display: flex;
//   justify-content: space-between;
//   background-color: #282828;
//   width: 210px;
//   padding: 15px;
//   border-radius: 0 0 15px 15px;
//   color: #ffffff;
// `;

// const Close = styled.span`
//   cursor: pointer;
// `;

// const ModalWrapper = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   overflow: auto;
//   outline: 0;
// `;

// const ModalOverlay = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 999;
// `;

// const ModalInner = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   // box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
//   // background-color: #fff;
//   // border-radius: 10px;
//   width: 360px;
//   max-width: 480px;
//   top: 50%;
//   transform: translateY(-50%);
//   margin: 0 auto;
//   padding: 40px 20px;
// `;

// export default React.memo(Modal);
import React from 'react';

const PopUpModal = () => {
  return (
    <div>
      
    </div>
  );
};

export default PopUpModal;
