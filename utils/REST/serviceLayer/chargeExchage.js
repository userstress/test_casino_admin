import { toast } from "react-toastify"
import useAxiosRequest from "../Chook/useAxiosRequest"
import { getCookie } from "cookies-next"

const { sendRequest } = useAxiosRequest()

export async function exchageSendAll(transactionIds) {
  const method = "PATCH"
  const url = `/api/v2/exchange/approval?${transactionIds.map((id) => `transactionIds=${id}`).join("&")}`
  const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

  sendRequest(method, url, headers, null, (errorStatus, responseData) => {
    if (errorStatus >= 500) {
      toast.warn("서버 내부 오류입니다.")
    } else if (errorStatus === 400) {
      toast.warn("올바르지 않은 입력 값입니다.")
    } else if (errorStatus === 403 || errorStatus === 401) {
      toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
    } else if (errorStatus === 404) {
      toast.error("서버 응답이 없습니다.")
    } else if (!errorStatus && responseData) {
      toast.success("처리되었습니다.")
    }
    return false
  })
}
