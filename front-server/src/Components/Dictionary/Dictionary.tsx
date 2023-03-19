import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import ReactPaginate from "react-paginate";
import style from "../Dictionary/Dictionary.module.css";
import { usePostWorddictMutation } from "../../Store/api";
import { type } from "@testing-library/user-event/dist/type";
interface test {
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

type dict = {
  filter: string;
  keyword: string;
  page: string;
};

type wordExampleResponseList = {
  exampleDetail: string;
  exampleType: string;
};

type wordDetailResponseList = {
  detailNum: number;
  details: Array<string>;
  wordExampleResponseList: wordExampleResponseList[];
};

type dictresponse = {
  wordId: number;
  wordName: string;
  wordIso: number;
  wordType: string;
  wordRating: string;
  wordOrigin: string;
  wordDetailResponseList: wordDetailResponseList[];
};

const DictionaryPage = () => {
  const [Words, setWords] = useState<dictresponse[]>(); // 백엔드와 통신하여 모든 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState<number>(10); // 한 페이지에 보여줄 데이터의 개수
  const [page, setPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(0); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  const offset = (page - 1) * limit;

  const [postWorddict, loading1] = usePostWorddictMutation();

  useEffect(() => {
    const first: dict = {
      filter: "",
      keyword: "",
      page: "0",
    };
    postWorddict(first)
      .unwrap()
      .then((r: any) => {
        // console.log("하잉", typeof r.data);

        setWords(r.data);
        setLimit(10);
        setCounts(r.data.length);
      })
      .then(() => {});

    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Search />
        <ListCharPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          counts={counts}
        />
        {Words ? (
          <>
            <List word={Words} limit={limit} offset={offset} />
          </>
        ) : null}
        {/* <PaginationList
          total={eee.length}
          limit={limit}
          page={page}
          setPage={setPage}
        /> */}
        <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          counts={counts}
        />
      </div>
      <Footer />
    </>
  );
};

function Search(): JSX.Element {
  return (
    <>
      <div className="flex flex-row justify-between items-baseline container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
        />
      </div>
    </>
  );
}

const List = ({
  word,
  offset,
  limit,
}: {
  word: dictresponse[];
  offset: number;
  limit: number;
}): JSX.Element => {
  const showDetail = (data: any): any => {
    console.log("선택한거", data);
  };
  return (
    <>
      <div className={`m-3 max-h-[50%] overflow-auto ${style.example} `}>
        <div
          className={`flex flex-col container max-w-screen-lg  w-full mx-auto px-10 lg:px-[10%]`}
        >
          {word
            .slice(offset, offset + limit)
            .map(function (word: dictresponse, i) {
              // console.log("??????", word);
              var a = new Array();

              word.wordDetailResponseList.map(function (
                wordDetailResponseList,
              ) {
                a.push(wordDetailResponseList.details);
              });
              const temp = a.join(" / ");
              // console.log(temp);

              return (
                <div className="py-2">
                  <div className="flex flex-row items-baseline">
                    <div
                      className="text-[#0078CE] text-2xl underline cursor-pointer"
                      onClick={() => {
                        showDetail(word.wordName);
                      }}
                    >
                      {word.wordName}
                    </div>
                    <div className="px-3">[ {word.wordOrigin} ]</div>
                    <div>{word.wordType}</div>
                  </div>
                  <div>
                    <div className="max-w-full truncate">{temp}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const ListPagination = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  page: number;
  setPage: Function;
  blockNum: number;
  setBlockNum: Function;
  counts: number;
}): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  }; // 새로운 배열을 만들기 위한 함수

  const [pageLimit, setpageLimit] = useState<number>(5); // 보여줄 페이지네이션 개수

  const [Width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    // console.log(Width);
    if (Width < 475) {
      console.log("적어지게");

      setpageLimit(3);
    } else {
      setpageLimit(5);
    }

    return () => {};
  }, [Width]);

  const totalPage: number = Math.ceil(counts / limit); //총 데이터의 개수(counts)를 한 페이지의 보여줄 데이터(limit)로 나눠 올림을 하면 전체 페이지의 개수가 나온다.

  const blockArea: number = Number(blockNum * pageLimit); // 화면 전환 할 때 보여줄 페이지네이션 개수를 구역으로 지정한다.
  const nArr = createArr(Number(totalPage)); // nArr 함수에 전체 페이지의 개수를 배열로 담는다.
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea); // 페이지네이션 구역을 nArr 함수에 slice하여 원하는 페이지네이션 block 만 보여 줄 수 있게 설정

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    } // page가 1보다 작거나 같으면 아무 것도 리턴하지 않는다.
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    } // 현재 페이지 - 1 이 보여줄 페이지네이션 개수(pageLimit) * blockNum 보다 작거나 같으면 setBlockNum에 - 1 을 작동시킨다.
    setPage((n: number) => n - 1); // setPage를 현재 페이지에서 -1 로 이동시킨다.
  };

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    } // page가 마지막 페이지보다 크거나 같으면 아무 것도 리턴하지 않는다.
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    } //보여줄 페이지네이션 개수(pageLimit) * (blockNum+1) 가 page + 1보다 작다면 setBlockNum은 현재 페이지 + 1을 한다.
    setPage((n: number) => n + 1); //setPage에 현재 페이지 + 1을 한다.
  };
  const ariaState =
    "aria-[current]:bg-[#F7CCB7] aria-[current]:text-white aria-[current]:font-extrabold aria-[current]:pointer-events-auto text-[#A87E6E] hover:-translate-y-1 hover:cursor-pointer disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-default disabled:translate-y-0 px-3 m-2 rounded-lg";

  return (
    <div className="ListPagenationWrapper flex flex-row justify-center pb-10  ">
      <button
        className={`moveToFirstPage ${ariaState}`}
        onClick={() => {
          firstPage();
        }}
      >
        &lt;&lt;
      </button>
      <button
        className={`moveToPreviousPage ${ariaState}`}
        onClick={() => {
          prevPage();
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      <div className="pageBtnWrapper">
        {pArr.map((n: number) => (
          <button
            className={`pageBtn ${ariaState}`}
            key={n}
            onClick={() => {
              setPage(n);
            }}
            aria-current={page === n ? "page" : undefined}
          >
            {n}
          </button>
        ))}
      </div>
      <button
        className={`moveToNextPage ${ariaState}`}
        onClick={() => {
          nextPage();
        }}
        disabled={page === totalPage}
      >
        &gt;
      </button>
      <button
        className={`moveToLastPage ${ariaState}`}
        onClick={() => {
          lastPage();
        }}
      >
        &gt;&gt;
      </button>

      {/* <style jsx>
        {`
          .ListPagenationWrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 37px;
            margin: 38px 94px 38px 88px;
          }

          .moveToPreviousPage,
          .moveToNextPage {
            color: #5a5a5a;
            background-color: transparent;
            border: none;
            font-size: 25px;
            cursor: pointer;
          }

          .moveToFirstPage,
          .moveToLastPage {
            width: 115px;
            height: 37px;
            margin: 0 0 0 0;
            border: none;
            color: black;
            background-color: transparent;
            cursor: pointer;
          }

          .pageBtn {
            width: 49px;
            height: 49px;
            margin: 0 10px;
            border: none;
            color: black;
            font-size: 20px;
            opacity: 0.2;

            &:hover {
              background-color: #b42954;
              cursor: pointer;
              transform: translateY(-2px);
            }

            &[disbled] {
              background-color: #e2e2e2;
              cursor: revert;
              transform: revert;
            }

            &[aria-current] {
              background-color: #f5d3dd;
              font-weight: bold;
              cursor: revert;
              transform: revert;
              opacity: 1;
            }
          }
        `}
      </style> */}
    </div>
  );
};

const ListCharPagination = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  page: number;
  setPage: Function;
  blockNum: number;
  setBlockNum: Function;
  counts: number;
}): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  }; // 새로운 배열을 만들기 위한 함수

  const [pageLimit, setpageLimit] = useState<number>(5); // 보여줄 페이지네이션 개수

  const [Width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    console.log(Width);
    if (Width < 475) {
      console.log("적어지게");

      setpageLimit(3);
    } else {
      setpageLimit(10);
    }

    return () => {};
  }, [Width]);
  const wordlock = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const totalPage: number = wordlock.length; //총 데이터의 개수(counts)를 한 페이지의 보여줄 데이터(limit)로 나눠 올림을 하면 전체 페이지의 개수가 나온다.

  const blockArea: number = Number(blockNum * pageLimit); // 화면 전환 할 때 보여줄 페이지네이션 개수를 구역으로 지정한다.
  const nArr = createArr(Number(totalPage)); // nArr 함수에 전체 페이지의 개수를 배열로 담는다.
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea); // 페이지네이션 구역을 nArr 함수에 slice하여 원하는 페이지네이션 block 만 보여 줄 수 있게 설정

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    } // page가 1보다 작거나 같으면 아무 것도 리턴하지 않는다.
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    } // 현재 페이지 - 1 이 보여줄 페이지네이션 개수(pageLimit) * blockNum 보다 작거나 같으면 setBlockNum에 - 1 을 작동시킨다.
    setPage((n: number) => n - 1); // setPage를 현재 페이지에서 -1 로 이동시킨다.
  };

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    } // page가 마지막 페이지보다 크거나 같으면 아무 것도 리턴하지 않는다.
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    } //보여줄 페이지네이션 개수(pageLimit) * (blockNum+1) 가 page + 1보다 작다면 setBlockNum은 현재 페이지 + 1을 한다.
    setPage((n: number) => n + 1); //setPage에 현재 페이지 + 1을 한다.
  };
  const ariaState =
    "aria-[current]:bg-pink-800 aria-[current]:font-extrabold aria-[current]:pointer-events-auto text-[#A87E6E] font-extrabold text-xl hover:text-white hover:-translate-y-1 hover:cursor-pointer hover:bg-[#F7CCB7] disabled:opacity-40 disabled:cursor-default disabled:translate-y-0 px-3 m-2 rounded-xl";
  // 전체 호출
  function allWord() {
    console.log("전체호출");
  }
  return (
    <div className="ListPagenationWrapper flex flex-row justify-center ">
      {/* <button
        className={`moveToPreviousPage ${ariaState}`}
        onClick={() => {
          prevPage();
        }}
        disabled={page === 1}
      >
        &lt;
      </button> */}
      <button
        className={`${ariaState}`}
        onClick={() => {
          allWord();
        }}
      >
        전체
      </button>
      <div className="pageBtnWrapper">
        {wordlock.map((n: any) => (
          <button
            className={`pageBtn ${ariaState}`}
            key={n}
            onClick={() => {
              console.log(n + "클릭했다");
            }}
            aria-current={page === n ? "page" : undefined}
          >
            {n}
          </button>
        ))}
      </div>
      {/* <button
        className={`moveToNextPage ${ariaState}`}
        onClick={() => {
          nextPage();
        }}
        disabled={page === totalPage}
      >
        &gt;
      </button> */}

      {/* <style jsx>
        {`
          .ListPagenationWrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 37px;
            margin: 38px 94px 38px 88px;
          }

          .moveToPreviousPage,
          .moveToNextPage {
            color: #5a5a5a;
            background-color: transparent;
            border: none;
            font-size: 25px;
            cursor: pointer;
          }

          .moveToFirstPage,
          .moveToLastPage {
            width: 115px;
            height: 37px;
            margin: 0 0 0 0;
            border: none;
            color: black;
            background-color: transparent;
            cursor: pointer;
          }

          .pageBtn {
            width: 49px;
            height: 49px;
            margin: 0 10px;
            border: none;
            color: black;
            font-size: 20px;
            opacity: 0.2;

            &:hover {
              background-color: #b42954;
              cursor: pointer;
              transform: translateY(-2px);
            }

            &[disbled] {
              background-color: #e2e2e2;
              cursor: revert;
              transform: revert;
            }

            &[aria-current] {
              background-color: #f5d3dd;
              font-weight: bold;
              cursor: revert;
              transform: revert;
              opacity: 1;
            }
          }
        `}
      </style> */}
    </div>
  );
};

export default DictionaryPage;
