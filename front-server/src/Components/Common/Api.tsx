import axios from "axios";

import jwtDecode from "jwt-decode";

const API = axios.create({
  baseURL: "http://118.67.130.158/api",
});

interface decodedInfo {
  sub: string;
  exp: number; //유효시간
  userId: number; //유저아이디
  username: string; //유저이름
}

API.interceptors.request.use(
  // request할때 할 행동
  function (config) {
    console.log("request", config);

    // method : POST

    // method : GET

    // method : put

    // method : delete

    console.log("컨피그 method : ", config.method);
    console.log("컨피그 data : ", config.data);

    // 요청을 보내기 전 수행할 작업 = accessToken이 유효한지
    // accesstoken 들고오기
    let accessToken: string | null = localStorage.getItem("accessToken");
    // let accessToken: string | null = TOKEN;
    console.log(accessToken);
    //  jwt를 decode 하여 payload를 추출한다.
    //  토큰이 있으면
    if (accessToken != null) {
      // 유효성판단 ㄱㄱ
      console.log("accessToken있다", accessToken);

      const decode: decodedInfo = jwtDecode(accessToken);
      console.log("decode", decode);
      console.log("decode exp", decode.exp);
      const nowDate: number = new Date().getTime() / 1000;
      // 토큰 만료시간이 지났다면
      if (decode.exp < nowDate) {
        console.log("재발급처리 하는 로직");
        // 리프레쉬 토큰 발급 서버 요청

        // accessToken = refreshToken;
        // axios({});
      }
    }

    // 토큰이 null인 경우
    // 로그인 / 회원가입
    else {
      // 뭐해야하지?
    }
    return config;
  },

  function (err) {
    return Promise.reject(err);
  },
);

API.interceptors.response.use(
  //response 받을 때 할 행동

  function (config) {
    console.log("response 받은 값 : ", config.data);
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

export default API;
