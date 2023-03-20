// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { configureStore, createSlice, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { hmjeApi } from "./api"
import { NonAuthApi } from "./NonAuthApi";


// 친구 요청 검색 모달 켜고 끄는 함수
const userNickname = createSlice({
  name: "userNickname",
  initialState: '유저',
  reducers: {
    changeUserNickname(state, action) {
      return state = action.payload
    },
  },
});

export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    [hmjeApi.reducerPath]: hmjeApi.reducer,
    [NonAuthApi.reducerPath]: NonAuthApi.reducer,
    userNickname: userNickname.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hmjeApi.middleware).concat(NonAuthApi.middleware),

});
//주석추가
setupListeners(store.dispatch)


export const { changeUserNickname } = userNickname.actions;

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;
