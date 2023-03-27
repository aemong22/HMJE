import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Store/hooks";

import { showDictionaryDetail } from "../../Store/store";

const DictionaryDetail = ({ detail }: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //백그라운드 div
  const bgDiv = useRef<any>();

  function CloseDictionaryDetail(event: React.MouseEvent<HTMLDivElement>) {
    console.log("클릭인것같음", event.target);
    console.log("뭔가용", bgDiv.current);
    if (event.target === bgDiv.current) {
      console.log("인트로창꺼짐!");
      dispatch(showDictionaryDetail());
    }
  }
  return (
    <div
      ref={bgDiv}
      onMouseDown={CloseDictionaryDetail}
      className={
        "z-10 bg-slate-800 bg-opacity-80 fixed top-0 right-0 bottom-0 left-0"
      }
    >
      <div className="">   test</div>
   
    </div>
  );
};

export default DictionaryDetail;
