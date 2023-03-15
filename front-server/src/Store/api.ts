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
    console.log("토큰이 null 일때");
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
      localStorage.setItem('accessToken', accessToken)
      return fetch(input, { ...init, headers }, ...rest);
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
          url : `/api/user/myinfo/${userId}`,
          params : {
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

    // 3. 닉네임 중복 체크
    postUserchecknickname: builder.mutation({
      query: (data) => {
        const [nickname, password, phoneNumber, username] = data;
        return {
          url: `user/check/nickname`,
          method: `POST`,
          body: {
            isAdmin: false,
            isSecession: false,
            nickname: nickname,
            password: password,
            phoneNumber: phoneNumber,
            username: username
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Api" }]
    }),


    // ---------------STUDY---------------

    // 1. 단어학습 문제 
    getStudyWord: builder.query({
      query: () => "/study/word",
      providesTags: (result, error, arg) => {
        return [{ type: "Api" }]
      }
    }),

  }),
})

export const { useGetUserMyinfoQuery, useGetStudyWordQuery, useLazyGetAdminUserListQuery, usePutUserdataMutation, usePostUserchecknicknameMutation } = hmjeApi 
