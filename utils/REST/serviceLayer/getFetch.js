import { getCookie } from "cookies-next"
import handleApiError from "./handleApiError"
import baseUrl from "../baseUrl"
export async function GetDataFn(url, header) {
  const token = getCookie("token")

  if (!token) {
    console.log("토큰이 쿠키에 없습니다.")
    return
  }
  const sendUrl = `${baseUrl}${url}`
  try {
    const headers = header ? header : { Authorization: token }

    const response = await fetch(sendUrl, {
      method: "GET",
      headers,
    })

    const data = await response.json()
    return data
  } catch (error) {
    handleApiError(error)
  }
}
