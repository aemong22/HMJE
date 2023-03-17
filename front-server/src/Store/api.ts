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

const fetchAccessToken = async () => {
  // const userName: string = localStorage.getItem("userName")
  let accessToken: string | null = localStorage.getItem("accessToken");

  if (accessToken != null) {
    // 유효성판단 ㄱㄱ
    console.log('유효성판단 ㄱㄱ');

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
      console.log(data);
      // 엑세스 토큰 갱신
      // localStorage.setItem('accessToken', data.accessToken)
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
      return fetch(input, { ...init,headers }, ...rest);
      //return fetch(input, { ...init }, ...rest);
    },
  }),

  endpoints: (builder) => ({

    // --------------admin---------------

    // 1. 전체 회원 목록
    getAdminUserList: builder.query({
      query: () => "/admin/user",
      providesTags: (result, error, arg) => {
        console.log('유저리스트 출력');
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
        const [userId, nickname, phoneNumber, username] = data
        return {
          url: `user/${userId}`,
          method: 'PUT',
          body: {
            isAdmin: false,
            isSecession: false,
            nickname: nickname,
            password: 'test13',
            phoneNumber: phoneNumber,
            username: username
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
          url: `/user/mystudy/${userId}`,
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


    // ---------------STUDY---------------

    // 1. 단어학습 문제 
    getStudyWord: builder.query({
      query: (userId: any) => {
        console.log("userId", userId);
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
    postStudyWordResult: builder.mutation<any,any>({
      query: (data) => {
        return {
          url: `/study/word/result`,
          method: 'POST',
          body:{
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
            endTime:data.korEnd,
            startTime:data.korStart,
            studyTime:data.studyTime,
            studyType:data.type,
            userId:data.userId,
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

  }),
})

export const {
  // ADMIN
  useLazyGetAdminUserListQuery,

  // USER
  useGetUserMyinfoQuery,
  usePutUserdataMutation,
  useGetUserMystudyQuery,

  // STUDY
  useLazyGetStudyWordQuery,
  usePostStudyWordResultMutation,
  usePostStudyStudyTimeMutation,
  useLazyGetStudyContextQuery,

  } = hmjeApi 
