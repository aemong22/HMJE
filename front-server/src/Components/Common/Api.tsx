import axios from "axios";
import jwt from "jsonwebtoken";

const Api = axios.create({
  baseURL: "http://118.67.130.158/api",
  headers: {
    accessToke: localStorage.getItem("accessToken"),
  },
});

// function decodeToken(token: string) {
//   try {
//     const decodedToken = jwt.verify(token, "your_secret_key");
//     return decodedToken;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

Api.interceptors.request.use(
  // request할때 할 행동
  function (config) {
    console.log("컨피그", config);
    // 요청을 보내기 전 수행할 작업 = accessToken이 유효한지

    // sessionStorage에서 accessToken을 가져온다.
    let accessToken: string | null = localStorage.getItem("accessToken");

    // jwt를 decode 하여 payload를 추출한다.
    //토큰이 있으면
    if (accessToken != null) {
      // 유효성판단
      console.log("accessToken있다", accessToken);

      // const decode: jwt.JwtPayload | null = jwt.decode(accessToken, {
      //   complete: true,
      // });
      // const nowDate: number = new Date().getTime() / 1000;
      // // 토큰 만료시간이 지났다면
      // if (decode?.exp != undefined) {
      //   if (decode.exp < nowDate) {
      //     // 재발급 axios ㄱㄱ
      //     // 리프레쉬 토큰 발급 서버 요청
      //     // accessToken = refreshToken;
      //   }
      // }
    } else {
      // 토큰이 null이면
    }
    return config;
  },

  function (err) {
    return Promise.reject(err);
  },
);

Api.interceptors.response.use(
  //response 받을 때 할 행동

  function (config) {
    // 받고 할 행동
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

export default Api;
