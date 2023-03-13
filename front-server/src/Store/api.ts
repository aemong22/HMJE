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



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// Define a service using a base URL and expected endpoints
export const hmjeApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Api'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hmje.net/api' }),
  endpoints: (builder) => ({
    getAdminUserList: builder.query({
      query: () => "/api/admin/user",
      // providesTags: (result, error, arg) => {
      //   return [{type: "Api"}]
      // }
    }),
  }),
})

export const {useGetAdminUserListQuery}:any = hmjeApi;