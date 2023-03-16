import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

type PostData = {
  isAdmin: boolean,
  isSecession: boolean,
  nickname: string,
  password: string,
  phoneNumber: string,
  username: string
}
export const NonAuthApi = createApi({
  reducerPath: "NonAuthApi",
  tagTypes: ['NonAuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hmje.net/api',
  }),
  endpoints: (builder) => ({
    // ================sms================
    // 1. 인증번호 체크
    postSmsmodify: builder.mutation({
      query: (data) => {
        console.log("rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: {
            modifyNumber: data.modifyNumber,
            phoneNumber: data.phoneNumber,
            purpose: ""
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
    // 2. 인증번호 보내기
    postSmssend: builder.mutation({
      query: (data) => {
        console.log("rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: {
            to: data.to
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),


    // ================User================
    // 1. 닉네임 중복 체크
    postUserchecknickname: builder.mutation<PostData, PostData>({
      query: (data) => {
        console.log("rtk에서 받은 데이터 name : ", data.nickname);
        return {
          url: `user/check/nickname`,
          method: "POST",
          body: {
            isAdmin: false,
            isSecession: false,
            nickname: data.nickname,
            password: data.password,
            phoneNumber: data.phoneNumber,
            username: data.username
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 2. 아이디 중복
    postUseRcheckusername: builder.mutation<PostData, PostData>({
      query: (data) => {
        console.log("rtk에서 받은 데이터 username : ", data.username);
        return {
          url: `user/check/username`,
          method: "POST",
          body: {
            isAdmin: false,
            isSecession: false,
            nickname: data.nickname,
            password: data.password,
            phoneNumber: data.phoneNumber,
            username: data.username
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
  })
})

export const {
  // 인증번호
  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  //  중복확인
  usePostUserchecknicknameMutation,
  usePostUseRcheckusernameMutation

} = NonAuthApi;