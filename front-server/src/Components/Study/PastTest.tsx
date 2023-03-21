import React, { useEffect } from "react";
import {
  useGetAdminPastListQuery,
  useLazyGetAdminPastListQuery,
} from "../../Store/api";
import Navbar from "../Common/Navbar";

const PastTest = (): JSX.Element => {
  const { data }: any = useGetAdminPastListQuery("");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0부터 시작하므로 +1을 해줍니다.
  const date = today.getDate();
  const today_temp = year + "-" + month + "-" + date;
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      {data ? (
        // ㅎㅎ
        <>
          {/* 기간내로 입장 시 */}
          {year <= data.data[0].endTime.split("-")[0] &&
          month <= data.data[0].endTime.split("-")[1] &&
          date <= data.data[0].endTime.split("-")[2] ? (
            <div className="flex justify-center">
              <Title data={data.data[0]} />
            </div>
          ) : (
            <div>접속할 수 없는 기간입니다</div>
          )}
        </>
      ) : (
        // 데이터가 없을때
        <div>loading</div>
      )}
    </>
  );
};

const Title = (data: any): JSX.Element => {
  return (
    <>
      {data ? (
        <div className="w-full border-y-2 justify-between border-[#BF9F91] flex ">
          <div></div>
          <div className="max-w-screen-xl text-center">
            <div className="flex flex-col my-[2rem]  text-[#A87E6E] font-extrabold">
              <span className="text-2xl">{`제 ${data.data.pastTestId}회`}</span>
              <span className="text-6xl pt-3"> 과거시험</span>
            </div>
          </div>
          <Timer />
        </div>
      ) : null}
    </>
  );
};
const Timer = (): JSX.Element => {
  return <div className="pr-5">타이머 나오는곳</div>;
};

export default PastTest;
