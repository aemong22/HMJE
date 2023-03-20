import React, { useEffect } from "react";
import {
  useGetAdminPastListQuery,
  useLazyGetAdminPastListQuery,
} from "../../Store/api";

const PastTest = (): JSX.Element => {
  // const { data } = useLazyGetAdminPastListQuery();

  useEffect(() => {
    // data.join();
  }, []);

  return <div>과거시험 등장이요</div>;
};

export default PastTest;
