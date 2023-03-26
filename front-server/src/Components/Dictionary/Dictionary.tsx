import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
// import ReactPaginate from "react-paginate";
import Pagination from "react-js-pagination";
import style from "../Dictionary/Dictionary.module.css";
import { useGetWorddictQuery, useLazyGetWorddictQuery } from "../../Store/api";
import { type } from "@testing-library/user-event/dist/type";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeDictList, changeDictPage } from "../../Store/store";
import styled from "styled-components";

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
const posts = [
  { id: "ㄱ", name: "ㄱ" },
  { id: "ㄴ", name: "ㄴ" },
  { id: "ㄷ", name: "ㄷ" },
  { id: "ㄹ", name: "ㄹ" },
  { id: "ㅁ", name: "ㅁ" },
  { id: "ㅂ", name: "ㅂ" },
  { id: "ㅅ", name: "ㅅ" },
  { id: "ㅇ", name: "ㅇ" },
  { id: "ㅈ", name: "ㅈ" },
  { id: "ㅊ", name: "ㅊ" },
  { id: "ㅋ", name: "ㅋ" },
  { id: "ㅌ", name: "ㅌ" },
  { id: "ㅍ", name: "ㅍ" },
  { id: "ㅎ", name: "ㅎ" },
];
const DictionaryPage = () => {
  // store
  let dispatch = useAppDispatch();
  const dictPage = useAppSelector((state: any) => {
    return state.dictPage;
  });
  const dictList = useAppSelector((state: any) => {
    return state.dictList;
  });

  // RTK
  const first = {
    filter: "",
    keyword: "",
    p: 0,
  };
  const {
    data: wordList,
    isLoading: isLading1,
    error: error1,
  } = useGetWorddictQuery(first);
  const [getWorddict] = useLazyGetWorddictQuery();

  const [data, setData] = useState([]);
  const [WordList, setWordList] = useState();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(0);
  const handlePageChange = (page: any) => {
    console.log((page * items) / 10);

    console.log(page);
    const tempdata = {
      filter: "",
      keyword: "",
      p: (page * items) / 10 - 1,
    };
    getWorddict(tempdata)
      .unwrap()
      .then((r) => {
        console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));

        setWordList(r);
        setPage(page);
      });

    // wordList변경
  };
  useEffect(() => {
    setWordList(wordList);
    return () => {};
  }, [wordList]);

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
      setItems(5);
    } else {
      setItems(10);
    }
    return () => {};
  }, [Width]);

  useEffect(() => {
    console.log("item바뀌었다", items);

    return () => {};
  }, [items]);

  if (isLading1) {
    return <>loading</>;
  } else if (error1) {
    return <>error</>;
  } else {
    console.log(Math.floor(wordList.count));

    return (
      <>
        {WordList ? (
          <>
            <div className="flex flex-col justify-between h-[100vh]">
              <Navbar />
              <div className="container max-w-screen-lg w-full mx-auto px-10 lg:px-10">
                <Search />
                <List data={WordList} />
                <PaginationBox>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={wordList.count}
                    pageRangeDisplayed={items}
                    onChange={handlePageChange}
                    // firstPageText={"<<"}
                    // lastPageText={">>"}
                  ></Pagination>
                </PaginationBox>
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <>없음</>
        )}
      </>
    );
  }
};

function Search(): JSX.Element {
  const [Search, setSearch] = useState("");
  const ChangeSearch = (event: any) => {
    console.log(event.target.value);

    setSearch(event.target.value);
  };

  // const handleOnKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     FindWord();
  //     console.log("검색 ㄱ");
  //   }
  // };
  // const [getWorddict, isLoading, error] = useLazyGetWorddictQuery();

  // const FindWord = () => {
  //   const data: dict = {
  //     filter: "",
  //     keyword: Search,
  //     p: 0,
  //   };
  //   getWorddict(data)
  //     .unwrap()
  //     .then((r: any) => {
  //       console.log(r.data);
  //     });
  // };
  return (
    <>
      <div className="flex flex-row justify-between items-baseline ">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
          onChange={ChangeSearch}
          // onKeyPress={handleOnKeyPress}
        />
      </div>
    </>
  );
}

const List = (data: any) => {
  // console.log("wordList", data);

  return (
    <div className={`m-3 max-h-[40%] overflow-auto ${style.example} `}>
      <div className="flex flex-col">
        {data.data.data.map((it: any) => {
          var a = new Array();
          it.wordDetailResponseList.map(function (wordDetailResponseList: any) {
            a.push(wordDetailResponseList.details);
          });
          const temp = a.join(" / ");

          return (
            <>
              <div className="flex flex-row items-baseline my-2 font-extrabold">
                <div className="pr-2 text-2xl text-[#0078CE] underline underline-offset-[0.3rem]">
                  {it.wordName}
                </div>
                {it.wordOrigin ? (
                  <div className=" text-[#767676] font-normal">
                    [ {it.wordOrigin} ]
                  </div>
                ) : null}
                <div className="pl-2 text-[#767676] font-normal">
                  {it.wordType}
                </div>
              </div>
              <div className="max-w-full truncate my-3">{temp}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

// Example items, to simulate fetching from another resources.

// function Items({ currentItems }: { currentItems: any }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item: any) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// function PaginatedItems({ itemsPerPage }: { itemsPerPage: any }) {
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   // Simulate fetching items from another resources.
//   // (This could be items from props; or items loaded in a local state
//   // from an API endpoint with useEffect and useState)
//   const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);

//   // 보여질 아이템들 잘라서 내보냄
//   const currentItems = items.slice(itemOffset, endOffset);

//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event: any) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`,
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <PaginationBox>
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="next >"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={5}
//           pageCount={pageCount}
//           previousLabel="< previous"
//           // renderOnZeroPageCount={null}
//         />
//       </PaginationBox>
//     </>
//   );
// }
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin: 10px;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

export default DictionaryPage;
