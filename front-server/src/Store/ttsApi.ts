import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const ttsApi = createApi({
  reducerPath: "ttsApi",
  tagTypes: ['ttsApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://j8e102.p.ssafy.io/api',
  }),
  endpoints: (builder) => ({
    // ================tts================
    // 1. tts
    getTts: builder.query({
      query: (text) => {
        return {
          url: `/word/${text}`,
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "ttsApi" }]
      }
    }),
  })
})

export const {
  // useGetWordQuery,
  useGetTtsQuery,
  useLazyGetTtsQuery,
} = ttsApi;