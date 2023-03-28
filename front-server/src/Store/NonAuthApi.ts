import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// 타입
type PostData = {
  isAdmin: boolean,
  isSecession: boolean,
  nickname: string,
  password: string,
  phoneNumber: string,
  username: string
}

type login = {
  username: string,
  password: string,
}

type find = {
  modifyNum: string,
  newPassword: string,
  phoneNum: string,
  username: string
}

type smsmodify = {
  modifyNumber: string,
  phoneNumber: string,
  purpose: string,
}

type smssend = {
  to: string,
  role: string
}



const accessToken: string | undefined | null = localStorage.getItem('accessToken')

export const NonAuthApi = createApi({
  reducerPath: "NonAuthApi",
  tagTypes: ['NonAuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hmje.net/api',
  }),
  endpoints: (builder) => ({
    // ================sms================
    // 1. 인증번호 체크
    postSmsmodify: builder.mutation<smsmodify, smsmodify>({
      query: (data) => {
        // console.log("인증번호 체크 rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
    // 2. 인증번호 보내기
    postSmssend: builder.mutation<smssend, smssend>({
      query: (data) => {
        // console.log("인증번호 보내기 rtk에서 받은 데이터 : ", data);
        // console.log("data.role",data.role);
        // console.log("data.to",data.to);        
        return {
          url: `sms/send/${data.role}`,
          method: "POST",
          body: {
            to: data.to
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),


    // ================User================
    // 1. 닉네임 중복 체크
    postUserchecknickname: builder.mutation<PostData, PostData>({
      query: (data) => {
        //console.log("닉네임 중복 체크 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/check/nickname`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 2. 아이디 중복
    postUsercheckusername: builder.mutation<PostData, PostData>({
      query: (data) => {
        //console.log("아이디 중복 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/check/username`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 3. 회원가입

    postUserjoin: builder.mutation<PostData, PostData>({
      query: (data) => {
        //console.log("회원가입 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/join`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 4. 로그인

    postUserlogin: builder.mutation<login, login>({
      query: (data) => {
        //console.log("로그인 rtk에서 받은 데이터 : ", data);
        return {
          url: `/login`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 5. 아이디 찾기
    postUserfindid: builder.mutation<find, find>({
      query: (data) => {
        //console.log("아이디 찾기 rtk에서 받은 데이터 : ", data);
        return {
          url: `/user/find/id`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 6. 비밀번호 찾기
    postUserfindpassword: builder.mutation<find, find>({
      query: (data) => {
        // console.log("비밀번호 찾기 rtk에서 받은 데이터 : ", data);
        return {
          url: `/user/find/password`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

  })
})

export const {
  // sms

  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  // user

  usePostUserchecknicknameMutation,
  usePostUsercheckusernameMutation,
  usePostUserjoinMutation,
  usePostUserloginMutation,
  usePostUserfindidMutation,
  usePostUserfindpasswordMutation,


} = NonAuthApi;