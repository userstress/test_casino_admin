import { toast } from "react-toastify"

/**
 *
 * @param {error} error throw 되는 error 객체
 * @param {message1} message1 500에러에 사용될 메시지 없으면 서버 오류가 발생했습니다 출력
 */
export default function handleApiError(error, message1) {
  // 에러 상태 코드 확인
  const errorStatus = error.response ? error.response.status : 500 // 기본값 500 설정

  // 상태 코드에 따른 메시지 표시
  if (errorStatus >= 500) {
    return message1 ? toast.warn(message1) : toast.warn("서버 오류가 발생했습니다")
  } else if (errorStatus === 400) {
    return toast.warn("올바르지 않은 입력 값입니다")
  } else if (errorStatus === 403 || errorStatus === 401) {
    return toast.warn("로그아웃되었습니다.로그인을 다시 해 주세요")
  } else if (errorStatus === 404) {
    return toast.error("서버 응답이 없습니다")
  } else {
    if (message1) {
      return toast.error(message1)
    }
    return toast.error("알 수 없는 에러가 발생했습니다")
  }
}
