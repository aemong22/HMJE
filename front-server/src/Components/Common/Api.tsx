import axios from "axios";

const Api = axios.create({
  baseURL: "https://i8e102.p.ssafy.io",
  headers: {
    accessToke: localStorage.getItem("accessToken"),
  },
});

Api.interceptors.request.use(
  // request할때 할 행동
  function (config) {
    console.log("컨피그", config);

    // 요청을 보내기 전 수행할 작업 = accessToken이 유효한지
    const jwt = require("jsonwebtoken");
    const crypto = require("crypto");
    // sessionStorage에서 accessToken을 가져온다.
    let accessToken: string | null = localStorage.getItem("accessToken");
    // jwt를 decode 하여 payload를 추출한다.
    const decode = jwt.decode(accessToken);
    const nowDate: number = new Date().getTime() / 1000;
    // 토큰 만료시간이 지났다면
    if (decode.exp < nowDate) {
      // 재발급 axios ㄱㄱ
      // 리프레쉬 토큰 발급 서버 요청
      // accessToken = refreshToken;
    }

    return config;
  },

  function (err) {
    // return Promise.reject(err);
  },
);

Api.interceptors.response.use(
  //response 받을 때 할 행동

  function (config) {
    // 받고 할 행동
    return config;
  },
  function (err) {
    // return Promise.reject(err);
  },
);

export default Api;
