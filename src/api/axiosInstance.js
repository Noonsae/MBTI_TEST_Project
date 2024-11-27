import axios from "axios";

// API 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },

  // 응답  오류 처리
  (error) => {
    if (error.response) {
      console.log("Response Error:", error.response.status, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
     return Promise.reject(error);
  }
);


export default axiosInstance;
