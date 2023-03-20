import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface decodedInfo {
  sub: string;
  exp: number; //유효시간
  userId: number; //유저아이디
  username: string; //유저이름
}

type PostData = {
  isAdmin: boolean,
  isSecession: boolean,
  nickname: string,
  password: string,
  phoneNumber: string,
  username: string
}

type dict = {
  filter: string,
  keyword: string,
  p: number,
}

type dictresponse = {
  wordId: number,
  wordName: string,
  wordIso: number,
  wordType: string,
  wordRating: string,
  wordOrigin: string,
  wordDetailResponseList: []
}

const fetchAccessToken = async () => {
  // const userName: string = localStorage.getItem("userName")
  let accessToken: string | null = localStorage.getItem("accessToken");

  if (accessToken != null) {
    const decode: decodedInfo = jwtDecode(accessToken);
    const nowDate: number = new Date().getTime() / 1000;
    // 토큰 만료시간이 지났다면
    if (decode.exp < nowDate) {
      console.log("재발급처리 하는 로직");
      // 리프레쉬 토큰 발급 서버 요청
      const userName = localStorage.getItem('userName')
      const { data } = await axios({
        url: `https://hmje.net/api/user/auth/refresh/${userName}`,
        headers: {
          refreshToken: localStorage.getItem("refreshToken"),
        }
      })
      // 엑세스 토큰 갱신
      return data.accessToken;
    } else {
      // 유효기간이 싱싱할때
      console.log('유효기간이 싱싱할때');
      return localStorage.getItem("accessToken");
    }
  } else {
    // 토큰이 null 일때
    console.log("토큰이 null 일때 하는짓");
  }
};


const accessToken: any = localStorage.getItem('accessToken')

export const hmjeApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Api'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hmje.net/api',
    prepareHeaders(headers) {
      headers.set('accessToken', accessToken)
    },
    fetchFn: async (input, init, ...rest) => {
      // Call your axios request before fetching from the base URL
      const accessToken = await fetchAccessToken();
      const headers = new Headers(init?.headers);
      headers.set('accessToken', accessToken);
      headers.set("content-type", "application/json");
      headers.set("content-type", "application/json");
      localStorage.setItem('accessToken', accessToken)
      return fetch(input, { ...init, headers }, ...rest);
      //return fetch(input, { ...init }, ...rest);
    },
  }),

  endpoints: (builder) => ({

    // --------------admin---------------

    // 1. 전체 회원 목록
    getAdminUserList: builder.query({
      query: () => "/admin/user",
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 2. 전체 뱃지 목록 조회
    getAdminBadgeList: builder.query({
      query: () => "/admin/badge",
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 3. 회원 삭제
    putAdminUserDelete: builder.mutation({
      query: (data) => {
        let [delete_id, my_id] = data
        my_id = parseInt(my_id)        
        return {
          url: `/admin/user/${my_id}/${delete_id}`,
          method: 'put'
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 4. 회원 수정
    putAdminUserUpdate: builder.mutation({
      query: (data) => {
        const [userId, nickname] = data
        return {
          url: `/admin/user/${userId}`,
          method: 'put',
          body: {
            "nickname": nickname,
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 5. 검색 회원 목록 
    getAdminUserSearchList: builder.query({
      query: (nickname:string) => {
        console.log(nickname);
        
        return {
          url: `/admin/user/${nickname}`
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),
    
    // 6. 뱃지 삭제
    deleteAdminBadge: builder.mutation({
      query: (badge_id:(number|undefined)) => {        
        return {
          url: `/admin/badge/${badge_id}`,
          method: 'delete'
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 7. 뱃지 추가
    postAdminBadge: builder.mutation({
      query: (body) => {       
        console.log(body);
        
        return {
          url: `/admin/badge/`,
          method: 'post',
          body: body
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),


    // --------------admin | past ---------------
    // 전체 과거시험 회차 목록
    getAdminPastList: builder.query({
      query: () => "admin/past",
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),


    // --------------user---------------

    // 1. 내 정보 조회
    getUserMyinfo: builder.query({
      query: (userId: any) => {
        console.log("userId", userId);
        return {
          url: `/user/myinfo/${userId}`,
          params: {
            userId: userId
          }
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 2. 정보 수정
    putUserdata: builder.mutation({
      query: (data) => {
        const [userId, nickname] = data
        return {
          url: `/user/${userId}`,
          method: 'PUT',
          body: {
            isAdmin: true,
            isSecession: true,
            nickname: nickname,
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 3. 닉네임 중복 체크 => NonAuthApi.ts    

    // 4. 학습시간,단어, 문맥, 통계
    getUserMystudy: builder.query({
      query: (userId: any) => {
        console.log("userId", userId);
        return {
          url: `/user/stats/mystudy/${userId}`,
          params: {
            userId: userId
          }
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 5. 아이디 중복 체크 => NonAuthApi.ts

    // 6. 회원가입 => NonAuthApi.ts

    // 7. 학습시간,단어,문맥,통계 한달치
    postUserMonthstudy: builder.mutation({
      query: (data: (string | number | null | undefined)[]) => {
        const [userId, year, month] = data
        console.log(month);

        console.log(userId, month, year);

        return {
          url: `user/stats/monthstudy/${userId}`,
          method: 'POST',
          body: {
            year: year,
            month: month,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // ---------------STUDY---------------

    // 1. 단어학습 문제 
    getStudyWord: builder.query({
      query: (userId: any) => {
        return {
          url: `/study/word/${userId}`,
          params: {
            userId: userId
          }
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 2. 단어학습 결과
    postStudyWordResult: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/study/word/result`,
          method: 'POST',
          body: {
            rightIdList: data.correct,
            semo: data.semo,
            userId: data.userId,
            wrongIdList: data.wrong,
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 3. 학습 시간 관리
    postStudyStudyTime: builder.mutation({
      query: (data) => {
        return {
          url: `/study/studytime`,
          method: 'POST',
          body: {
            endTime: data.korEnd,
            startTime: data.korStart,
            studyTime: data.studyTime,
            studyType: data.type,
            userId: data.userId,
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),

    // 4. 문맥학습 문제
    getStudyContext: builder.query({
      query: () => {
        return {
          url: `/study/context`,
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 5. 문맥학습 결과
    postStudyContextResult: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/study/context/result`,
          method: 'POST',
          body: {
            rightIdList: data.correct,
            semo: data.semo,
            userId: data.userId,
            wrongIdList: data.wrong,
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),


    // 6. 획득한 도감번호 조회
    getDogamUserId: builder.query({
      query: (userId: any) => {
        return {
          url: `/dogam/${userId}`,
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 7. 전체 도감 목록
    getDogam: builder.query({
      query: () => {
        return {
          url: `/dogam/`,
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),


    // --------------word---------------

    // 1. 오늘의 단어 전체 조회

    // 2.사전 조회하기

    getWorddict: builder.query<dict, dict>({
      query: (data) => {
        console.log("사전 조회하기 rtk에서 받은 데이터 : ", data);
        // console.log(`url : word/?filter=${data.filter}/?keyword=${data.keyword}/?p=${data.p}`);
        return {
          url: `word/`,
          params: {
            filter: data.filter,
            keyword: data.keyword,
            p: data.p,
          }
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),
    // 3. 사전 개별조회
    getWorddictdetail: builder.query({
      query: (data) => {
        console.log("사전 조회하기 rtk에서 받은 데이터 : ", data);
        // console.log(`url : word/?filter=${data.filter}/?keyword=${data.keyword}/?p=${data.p}`);
        return {
          url: `word/dict/`,
          params: {
            wordId: data.wordId
          }
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

    // 4. 오답공책 전체조회
    getWordWrong: builder.query({
      query: (userId: any) => {
        return {
          url: `/word/wrong/${userId}`,
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),


  }),
})

export const {
  // ADMIN
  useLazyGetAdminUserListQuery,
  useLazyGetAdminBadgeListQuery,
  usePutAdminUserDeleteMutation,
  usePutAdminUserUpdateMutation,
  useLazyGetAdminUserSearchListQuery,
  useDeleteAdminBadgeMutation,
  usePostAdminBadgeMutation,

  // ADMIN PAST
  useGetAdminPastListQuery,
  useLazyGetAdminPastListQuery,

  // USER
  useGetUserMyinfoQuery,
  usePutUserdataMutation,
  useGetUserMystudyQuery,

  // STUDY
  useLazyGetStudyWordQuery,
  usePostStudyWordResultMutation,
  usePostStudyStudyTimeMutation,
  useLazyGetStudyContextQuery,
  usePostStudyContextResultMutation,
  useGetDogamUserIdQuery,
  useGetDogamQuery,
  usePostUserMonthstudyMutation,


  // WORD
  useGetWorddictQuery,
  useLazyGetWorddictQuery,

  useGetWorddictdetailQuery,
  useLazyGetWorddictdetailQuery,

  useGetWordWrongQuery,

} = hmjeApi 
