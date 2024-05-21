import { returnReqObj } from "./returnReqObj"

const baseUrl = "https://dailymodelapp.com"

/**
 *
 * @param {*} body   사용자 데이터
 * @param {*} url   서버url
 * @param {*} authToken  토큰
 * @param {*} method REST API 방식 uppercase
 *
 * @returns 성공시 { data: 전송받은 데이터 , status: 상태코드  }
 * @errors  실패시 { status: errorStatus, message: errorMessage }
 */
export default async function sendFetch(body, url, method, authToken) {
  // POST 요청 객체 생성
  const postRequest = returnReqObj(method, body, authToken)

  try {
    const response = await fetch(`${baseUrl}${url}`, postRequest)

    const result = {
      data: await response.json(), // 데이터를 JSON으로 변환
      status: response.status,
    }

    if (!response.ok) {
      // HTTP 오류 상태 처리
      throw result // 오류 객체를 throw하여 catch 블록으로 이동
    }

    return result // 성공 결과 반환
  } catch (error) {
    // 네트워크 오류 또는 HTTP 오류 상태 처리
    return error
  }
}
