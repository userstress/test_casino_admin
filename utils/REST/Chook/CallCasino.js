import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://kplayone.com/", // 개발 환경의 Next.js 서버 주소
});

export default axiosInstance;
