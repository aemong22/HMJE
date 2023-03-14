import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const accessToken:any = localStorage.getItem("accessToken")
const refreshToken:any = localStorage.getItem("refreshToken")

export const hmjeApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Api'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://hmje.net/api',
    prepareHeaders(headers) {
      headers.set('accessToken', accessToken)
    },
  }),
  endpoints: (builder) => ({
    // 토큰 재요청
    getRefreshToken: builder.query<any,any>({      
      query: (username:any) => {
        console.log('username:',username);
        return {
          url: `/user/auth/refresh/${username}`,
          params: {
            username: username
          },
          headers: {
            refreshToken: refreshToken
          }
        }
      },
      providesTags: (result, error, arg) => {        
        return [{type: "Api"}]
      }
    }),
    // admin
    getAdminUserList: builder.query({      
      query: () => "/admin/user",
      providesTags: (result, error, arg) => {
        console.log('수정완료');
        
        return [{type: "Api"}]
      }
    }),

    // user
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
      invalidatesTags: (result, error, arg) => [{ type: "Api"}]
    })
  }),
})

export const { useLazyGetAdminUserListQuery, useLazyGetRefreshTokenQuery, usePutUserdataMutation } = hmjeApi 
