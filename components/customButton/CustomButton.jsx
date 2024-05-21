import styles from "./CustomButton.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"

/**
 *
 * @param {*customStyle param : css in js
 * @param {*text param : 버튼 문구에 들어갈 텍스트
 * @param {*fontStyle param : css in js 버튼 글자 크기
 * @param {*onClick param : onClick 유무 boolean
 * @param {*restApi param : onclick시 사용할 api 요청 객체 {method : method value,url : api전송 url,token : api 전송때 사용할 토큰 없으면 null처리}
 *
 * @returns toast ui 리턴.
 */
export default function CustomButton({ customStyle, text, fontStyle, onClick, restApi }) {
  const { sendRequest } = useAxiosRequest()

  function patchCommon(event, id) {
    if (!restApi.body) {
      return toast.warn("선택된 개체가 없습니다.")
    }
    const method = restApi.method && restApi.url ? restApi.method : null
    const url = restApi.method && restApi.url ? restApi.url : null

    const headers = {
      "Content-Type": "application/json",
      ...(restApi.token ? { Authorization: restApi.token } : {}),
    }

    sendRequest(method, url, headers, restApi.body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("잘못된 입력값입니다 관리자에게 문의 해 주세요. ERRCODE:500")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.succsess("전송했습니다.")
      }
      return false
    })
  }
  return (
    <div
      {...(onClick && restApi ? { onClick: (event) => patchCommon(event, idx) } : {})}
      className={styles.boxWrapper}
      style={customStyle}
    >
      <div style={fontStyle}>{text}</div>
    </div>
  )
}
