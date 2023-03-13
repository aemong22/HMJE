import { Dictionary } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
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

const TempWord: test[] | null | undefined = [
  {
    word_class: "test_word_class",
    word_detail: "시와 시, 시와 군 사이의 경계.",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계",
    word_origin: "市界",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
  {
    word_class: "test_word_class",
    word_detail:
      "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
    word_example: "test_word_example",
    word_id: "test_word_id",
    word_iso: "test_word_iso",
    word_name: "시계2",
    word_origin: "市界2",
    word_rating: "test_word_rating",
    word_relation: "test_word_relation",
    word_type: "명사2",
  },
];
const DictionaryPage = () => {
  const [Words, setWords] = useState<test[]>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  console.log(TempWord);

  useEffect(() => {
    setWords(TempWord);
    setLimit(5);
    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Search />
        <List word={TempWord} limit={limit} offset={offset} />
        <PaginationList
          total={TempWord.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <Footer />
      </div>
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
  word: test[];
  offset: number;
  limit: number;
}): JSX.Element => {
  return (
    <>
      <div className="flex flex-col container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        {word.slice(offset, offset + limit).map(function (word) {
          return (
            <div className="py-2">
              <div className="flex flex-row items-baseline">
                <div className="text-[#0078CE] text-2xl underline cursor-pointer">
                  {word.word_name}
                </div>
                <div className="px-3">[ {word.word_origin} ]</div>
                <div>{word.word_type}</div>
              </div>
              <div className="truncate">{word.word_detail}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

function PaginationList({
  total,
  limit,
  page,
  setPage,
}: {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {/* {Array(numPages)
          // .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))} */}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
}
export default DictionaryPage;
