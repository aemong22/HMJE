// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { configureStore, createSlice, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { hmjeApi } from "./api"
import { NonAuthApi } from "./NonAuthApi";


// 유저 닉네임 저장
const userNickname = createSlice({
  name: "userNickname",
  initialState: '유저',
  reducers: {
    changeUserNickname(state, action) {
      return state = action.payload
    },
  },
});

// 한페이지에 나타나는 단어 리스트
const dictList = createSlice({
  name: "dictList",
  initialState: '',
  reducers: {
    changeDictList(state, action) {
      return state = action.payload
    }
  }
})
// 사전 페이지 번호
const dictPage = createSlice({
  name: "dictPage",
  initialState: '',
  reducers: {
    changeDictPage(state, action) {
      return state = action.payload
    },
  },
});

export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    [hmjeApi.reducerPath]: hmjeApi.reducer,
    [NonAuthApi.reducerPath]: NonAuthApi.reducer,
    userNickname: userNickname.reducer,
    // 사전
    dictList: dictList.reducer,
    dictPage: dictPage.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hmjeApi.middleware).concat(NonAuthApi.middleware),

});
//주석추가
setupListeners(store.dispatch)


export const { changeUserNickname } = userNickname.actions;

// 사전
export const { changeDictList } = dictList.actions;
export const { changeDictPage } = dictPage.actions;

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;
