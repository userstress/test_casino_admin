import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
// import { getCookie } from "cookies-next"
// import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
// import { useRouter } from "next/router"
// import { useState, useEffect, useCallback } from "react"

export default function SecondTab({ customColor }) {
  // const mytoken = getCookie("token")
  // const { sendRequest } = useAxiosRequest()
  // const router = useRouter()
  // const [myaudio, setAudio] = useState("https://megasimages3.s3.ap-northeast-2.amazonaws.com/chickSound.wav")

  // const [currentStat, setCurStat] = useState({
  //   todayAutoPoint: 0,
  //   todayChargedCountSum: 0,
  //   todayDifference: 0,
  //   todayExchangeCount: 0,
  //   todayExchangeSum: 0,
  //   todayJoinSum: 0,
  //   todayPoint: 0,
  //   todayRechargeCount: 0,
  //   todayRechargeSum: 0,
  //   todayTransformToCasinoBalance: 0,
  //   todayTransformToSportsBalance: 0,
  //   totalPoint: 0,
  //   totalSportsBalance: 0,
  // })

  // const getCurrentWebStatus = useCallback(() => {
  //   const method = "GET"
  //   const url = `/api/v2/managers/sidebar2`
  //   const headers = { "Content-Type": "application/json", Authorization: mytoken }

  //   sendRequest(method, url, headers, null, (errorStatus, responseData) => {
  //     if (errorStatus >= 500) {
  //       toast.warn("중복된 회원정보 입니다.")
  //     } else if (errorStatus === 400) {
  //       toast.warn("올바르지 않은 입력 값입니다.")
  //     } else if (errorStatus === 403 || errorStatus === 401) {
  //       return router.push("/")
  //     } else if (errorStatus === 404) {
  //       toast.error("서버 응답이 없습니다.")
  //     } else if (!errorStatus && responseData) {
  //       const result = responseData.data
  //       setCurStat(result)

  //       // console.log(result)
  //       // if (
  //       //   status === "login succeeded" &&
  //       //   (result.rechargeUnreadCount >= 1 || result.exchangeUnreadCount >= 1 || result.guestCount >= 1)
  //       // ) {
  //       //   playNotificationSound()
  //       // }
  //     }
  //   })
  // }, [router.isReady, mytoken])

  // function playNotificationSound() {
  //   console.log("플레이")
  //   const audio = new Audio(myaudio)
  //   audio.play()
  // }

  // useEffect(() => {
  //   if (router.isReady) {
  //     getCurrentWebStatus() // 라우터가 준비되면 최초 실행

  //     const intervalId = setInterval(() => {
  //       getCurrentWebStatus() // 5초마다 실행
  //     }, 3500)

  //     return () => {
  //       clearInterval(intervalId)
  //     }
  //   }
  // }, [router.isReady])

  return (
    <div
      className={styles.boxContainer}
      style={{ background: customColor }}
      onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
    >
      <ul>
        <li>
          <div>캐시백 이벤트 요청</div>
          <div>0건</div>
        </li>
        <li>
          <div>슬롯 롤링 이벤트 요청</div>
          <div>0건</div>
        </li>
        <li>
          <div>쿠폰 지급 요청</div>
          <div>0건</div>
        </li>
      </ul>
    </div>
  )
}
