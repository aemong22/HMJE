// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// Define a service using a base URL and expected endpoints
// export const api = createApi({
//   reducerPath: 'api',
//   tagTypes: ['Api'],
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://hmje.net/api' }),
//   endpoints: (builder) => ({
//     getAdminUserList: builder.query({
//       query: () => `/api/admin/user`,
//       providesTags: (result, error, arg) => {
//         return [{type: "Api"}]
//       }
//     }),
//     // setCount: builder.mutation({
//     //   query: ({name, value}) => {
//     //     return {
//     //       url: '',
//     //       method: 'POST',
//     //       body: {value}
//     //     }
//     //   },
//     //   invalidatesTags: (result, error, arg) => [{ type: "Api", id: arg.name}]
//     // })
//   }),
// })

// export const {useGetAdminUserListQuery}:any = api;

// ​https://hmje.net/api​/user​/auth​/refresh​/test13

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
    getAdminUserList: builder.query({
      query: () => "/admin/user",
      providesTags: (result, error, arg) => {        
        return [{type: "Api"}]
      }
    }),
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
  }),
})

export const {useGetAdminUserListQuery, useGetRefreshTokenQuery} = hmjeApi 
