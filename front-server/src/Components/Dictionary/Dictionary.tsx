import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import ReactPaginate from "react-paginate";
import style from "../Dictionary/Dictionary.module.css";
import { useGetWorddictQuery, useLazyGetWorddictQuery } from "../../Store/api";
import { type } from "@testing-library/user-event/dist/type";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeDictList, changeDictPage } from "../../Store/store";
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
  p: number;
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
  // store
  let dispatch = useAppDispatch();
  const dictPage = useAppSelector((state: any) => {
    return state.dictPage;
  });
  const dictList = useAppSelector((state: any) => {
    return state.dictList;
  });

  // 갯수 페이지네이션
  // const [dictList, setWords] = useState<dictresponse[]>(); // 백엔드와 통신하여 모든 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState<number>(10); // 한 페이지에 보여줄 데이터의 개수
  // const [dictPage, setPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(0); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  const offset = (dictPage - 1) * limit;

  // ㄱㄴㄷㄹ 페이지네이션
  const [charLimit, setcharLimit] = useState(10);
  // 내가 선택한 ㄱㄴㄷㄹ
  const [charPage, setcharPage] = useState(1);
  const [charCounts, setcharCounts] = useState<number>(0);
  const [charBlockNum, setcharBlockNum] = useState<number>(0);
  const charOffset = (charPage - 1) * charLimit;

  // RTK
  const [getWorddict, isLoading, error] = useLazyGetWorddictQuery();

  useEffect(() => {
    // 처음 렌더링되면 이렇게해라
    console.log("혹시나니?");

    const first: dict = {
      filter: "",
      keyword: "",
      p: 0,
    };
    getWorddict(first)
      .unwrap()
      .then((r: any) => {
        console.log(r.count);
        dispatch(changeDictPage(1));
        dispatch(changeDictList(r.data));
        setLimit(10);
        setCounts(r.count);
      })
      .then(() => {});

    return () => {};
  }, []);
  useEffect(() => {
    console.log("사전바뀐다", dictList);
  }, [dictList]);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Search />
        <ListCharPagination
          limit={charLimit}
          dictPage={charPage}
          setPage={setcharPage}
          blockNum={charBlockNum}
          setBlockNum={setcharBlockNum}
          counts={charCounts}
        />
        {dictList ? (
          <>
            {console.log("페이지 바인딩", dictList)}
            <List word={dictList} limit={limit} offset={offset} />
          </>
        ) : null}
        {/* <PaginationList
          total={eee.length}
          limit={limit}
          dictPage={dictPage}
          setPage={setPage}
        /> */}
        <ListPagination
          limit={limit}
          dictPage={dictPage}
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
  const [Search, setSearch] = useState("");
  const ChangeSearch = (event: any) => {
    console.log(event.target.value);

    setSearch(event.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      FindWord();
      console.log("검색 ㄱ");
    }
  };
  const [getWorddict, isLoading, error] = useLazyGetWorddictQuery();
  const FindWord = () => {
    const data: dict = {
      filter: "",
      keyword: Search,
      p: 0,
    };
    getWorddict(data)
      .unwrap()
      .then((r: any) => {
        console.log(r.data);
      });
  };
  return (
    <>
      <div className="flex flex-row justify-between items-baseline container max-w-screen-lg w-full mx-auto px-10 lg:px-10">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
          onChange={ChangeSearch}
          onKeyPress={handleOnKeyPress}
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
  dictPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  dictPage: number;
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
    dispatch(changeDictPage(1));
    setBlockNum(0);
  };

  const lastPage = () => {
    dispatch(changeDictPage(totalPage));
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (dictPage <= 1) {
      return;
    } // page가 1보다 작거나 같으면 아무 것도 리턴하지 않는다.
    if (dictPage - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    } // 현재 페이지 - 1 이 보여줄 페이지네이션 개수(pageLimit) * blockNum 보다 작거나 같으면 setBlockNum에 - 1 을 작동시킨다.
    dispatch(changeDictPage((n: number) => n - 1)); // setPage를 현재 페이지에서 -1 로 이동시킨다.
  };

  const nextPage = () => {
    if (dictPage >= totalPage) {
      return;
    } // page가 마지막 페이지보다 크거나 같으면 아무 것도 리턴하지 않는다.
    if (pageLimit * Number(blockNum + 1) < Number(dictPage + 1)) {
      setBlockNum((n: number) => n + 1);
    } //보여줄 페이지네이션 개수(pageLimit) * (blockNum+1) 가 dictPage + 1보다 작다면 setBlockNum은 현재 페이지 + 1을 한다.
    dispatch(changeDictPage((n: number) => n + 1)); //setPage에 현재 페이지 + 1을 한다.
  };
  const ariaState =
    "aria-[current]:bg-[#F7CCB7] aria-[current]:text-white aria-[current]:font-extrabold aria-[current]:pointer-events-auto text-[#A87E6E] hover:-translate-y-1 hover:cursor-pointer disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-default disabled:translate-y-0 px-3 m-2 rounded-lg";

  const [getWorddict, loading1] = useLazyGetWorddictQuery();

  const ChangeWords = (n: number) => {
    dispatch(changeDictPage(n));
    const data: dict = {
      filter: "",
      keyword: "",
      p: n - 1,
    };
    console.log("프론트에서 보내는 데이터", data);

    getWorddict(data)
      .unwrap()
      .then((r: any) => {
        console.log("r", r);
        dispatch(changeDictList(r.data));
      })
      .then(() => {});
  };
  const dispatch = useAppDispatch();
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
        disabled={dictPage === 1}
      >
        &lt;
      </button>
      <div className="pageBtnWrapper">
        {pArr.map((n: number) => (
          <button
            className={`pageBtn ${ariaState}`}
            key={n}
            onClick={() => {
              console.log(`${n} 클릭`);
              ChangeWords(n);
            }}
            aria-current={dictPage === n ? "page" : undefined}
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
        disabled={dictPage === totalPage}
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
    </div>
  );
};

const ListCharPagination = ({
  limit,
  dictPage,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  dictPage: number;
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
  const [charPageLimit, setcharPageLimit] = useState<number>(5); // 보여줄 페이지네이션 개수
  // 가로 사이즈에 따라
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
      setcharPageLimit(5);
    } else {
      setcharPageLimit(10);
    }
    return () => {};
  }, [Width]);

  const totalPage: number = wordlock.length; //총 데이터의 개수(counts)를 한 페이지의 보여줄 데이터(limit)로 나눠 올림을 하면 전체 페이지의 개수가 나온다.
  const blockArea: number = Number(blockNum * charPageLimit); // 화면 전환 할 때 보여줄 페이지네이션 개수를 구역으로 지정한다.
  const nArr = createArr(Number(totalPage)); // nArr 함수에 전체 페이지의 개수를 배열로 담는다.
  let pArr = nArr?.slice(blockArea, Number(charPageLimit) + blockArea); // 페이지네이션 구역을 nArr 함수에 slice하여 원하는 페이지네이션 block 만 보여 줄 수 있게 설정

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / charPageLimit) - 1);
  };

  const prevPage = () => {
    if (dictPage <= 1) {
      return;
    } // page가 1보다 작거나 같으면 아무 것도 리턴하지 않는다.
    if (dictPage - 1 <= charPageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    } // 현재 페이지 - 1 이 보여줄 페이지네이션 개수(charPageLimit) * blockNum 보다 작거나 같으면 setBlockNum에 - 1 을 작동시킨다.
    setPage((n: number) => n - 1); // setPage를 현재 페이지에서 -1 로 이동시킨다.
  };

  const nextPage = () => {
    if (dictPage >= totalPage) {
      return;
    } // page가 마지막 페이지보다 크거나 같으면 아무 것도 리턴하지 않는다.
    if (charPageLimit * Number(blockNum + 1) < Number(dictPage + 1)) {
      setBlockNum((n: number) => n + 1);
    } //보여줄 페이지네이션 개수(charPageLimit) * (blockNum+1) 가 dictPage + 1보다 작다면 setBlockNum은 현재 페이지 + 1을 한다.
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
        disabled={dictPage === 1}
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
        {wordlock.slice(0, 3).map((n: any) => (
          <button
            className={`pageBtn ${ariaState}`}
            key={n}
            onClick={() => {
              console.log(n + "클릭했다");
            }}
            aria-current={dictPage === n ? "page" : undefined}
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
        disabled={dictPage === totalPage}
      >
        &gt;
      </button> */}
    </div>
  );
};

export default DictionaryPage;
