import axios from "axios"

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://dailymodelapp.com", // 올바른 기본 URL 설정
  // baseURL: "https://dailymodelapp.com/",
})

export default axiosInstance
