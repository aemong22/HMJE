import axios, { AxiosRequestConfig } from "axios";
import jwt from "jsonwebtoken";

const Api = axios.create({
  baseURL: "https://i8e102.p.ssafy.io",
  headers: {
    accessToke: localStorage.getItem("accessToken"),
  },
});
const JWT_SECRET = "your_jwt_secret";

const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem("access_token"); // 로컬 스토리지에서 JWT를 가져옵니다.
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // JWT를 decode합니다.
      if (config.headers !== undefined) {
        config.headers["Authorization"] = `Bearer ${token}`; // Authorization header에 JWT를 추가합니다.
      }
    } catch (err) {
      console.log("Invalid JWT"); // decode 에러 발생 시 적절히 처리합니다.
    }
  }
  return config;
};

Api.interceptors.request.use(
  // request할때 할 행동
  function (config) {
    console.log("request할때 할 행동/컨피그", config);

    // // 요청을 보내기 전 수행할 작업 = accessToken이 유효한지
    // const jwt = require("jsonwebtoken");
    // const crypto = require("crypto");
    // // sessionStorage에서 accessToken을 가져온다.
    let accessToken: string | null = localStorage.getItem("accessToken");
    // // jwt를 decode 하여 payload를 추출한다.
    if (accessToken != null) {
      const decode = jwt.decode(accessToken);
    }
    // const nowDate: number = new Date().getTime() / 1000;
    // // 토큰 만료시간이 지났다면
    // if (decode.exp < nowDate) {
    //   // 재발급 axios ㄱㄱ
    //   // 리프레쉬 토큰 발급 서버 요청
    //   // accessToken = refreshToken;
    // }

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
