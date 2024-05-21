import React, { useEffect, useState, useCallback } from "react"
import AdminInfo from "./AdminInfo"
import DailyInfo from "./DailyInfo"
import styles from "./Topbar.module.css"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { currentStatusStore } from "@utils/currentStatusStore/currentStatusStore"
import { useUserDetailStore } from "@utils/useUserDetailStore"
import { useAuthStore } from "@utils/useAuthStore"

export default function Topbar() {
  const mytoken = getCookie("token")
  const { getUserData } = useUserDetailStore()
  const { user, status } = useAuthStore()
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()
  const { currentObj, setCurrentObj } = currentStatusStore()
  const rechargeSound = "https://megasimages3.s3.ap-northeast-2.amazonaws.com/chickSound.wav"
  const exchangeSound = "https://megasimages3.s3.ap-northeast-2.amazonaws.com/exchange.wav"
  const joinSound = "https://megasimages3.s3.ap-northeast-2.amazonaws.com/hogu.wav"
  const questionSound = "https://megasimages3.s3.ap-northeast-2.amazonaws.com/customer.wav"

  const [currentStat, setCurStat] = useState({
    rechargeUnreadCount: 0,
    rechargeWaitingCount: 0,
    rechargeApprovalCount: 0,
    exchangeUnreadCount: 0,
    exchangeWaitingCount: 0,
    exchangeApprovalCount: 0,
    requestAnswerCount: 0,
    waitingAnswerCount: 0,
    userCount: 0,
    guestCount: 0,
    referredByOldGuestUser: "",
    oldestExceedingBetUsername: "",
    oldestMonitoringBetUsername: "",
  })

  const getCurrentWebStatus = useCallback(() => {
    const method = "GET"
    const url = `/api/v2/managers/main/page/counts`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const isLoggedIn = document.cookie.includes("token")

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        return router.push("/")
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        const result = responseData.data

        setCurStat(result)
        setCurrentObj(result)
        if (status === "login succeeded") {
          playNotificationSound(result)
        }
      }
    })
  }, [router.isReady, mytoken])

  function playNotificationSound(result) {
    // 우선 순위에 따라 사운드 URL 배열 생성
    const soundQueue = []
    if (result.rechargeUnreadCount >= 1) {
      soundQueue.push(rechargeSound)
    }
    if (result.exchangeUnreadCount >= 1) {
      soundQueue.push(exchangeSound)
    }
    if (result.requestAnswerCount >= 1) {
      soundQueue.push(questionSound)
    }
    if (result.guestCount >= 1) {
      soundQueue.push(joinSound)
    }
    // 사운드 재생 함수
    function playSound(url) {
      return new Promise((resolve) => {
        const audio = new Audio(url)
        audio.play()
        audio.onended = resolve // 재생 완료 시 다음 사운드 재생
      })
    }

    // 순차적으로 모든 사운드 재생
    soundQueue.reduce((promise, soundUrl) => promise.then(() => playSound(soundUrl)), Promise.resolve())
  }

  const [currentStat2, setCurStat2] = useState({})

  const getCurrentWebStatus2 = useCallback(() => {
    const urls = ["api/v2/managers/sidebar2"]
    const method = "GET"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }

    Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve, reject) => {
            sendRequest(method, url, headers, null, (errorStatus, responseData) => {
              if (errorStatus) {
                reject({ errorStatus, url })
              } else {
                resolve(responseData.data)
              }
            })
          }),
      ),
    )
      .then((results) => {
        const combinedResults = results.reduce((acc, cur) => ({ ...acc, ...cur }), {})
        setCurStat2(combinedResults)
      })
      .catch((error) => {
        const { errorStatus, url } = error
        if (errorStatus >= 500) {
          toast.warn("서버오류입니다")
        } else if (errorStatus === 400) {
          toast.warn("올바르지 않은 입력 값입니다.")
        } else if (errorStatus === 403 || errorStatus === 401) {
          router.push("/")
        } else if (errorStatus === 404) {
          toast.error(`${url} 서버 응답이 없습니다.`)
        }
      })
  }, [router.isReady, mytoken])

  useEffect(() => {
    if (router.isReady) {
      getCurrentWebStatus() // 라우터가 준비되면 최초 실행
      getCurrentWebStatus2()

      const intervalId = setInterval(() => {
        getCurrentWebStatus() // 5초마다 실행
        getCurrentWebStatus2()
      }, 5000)

      return () => {
        clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 정리
      }
    }
  }, [router.isReady]) // 의존성 배열

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topInfoWrapper}>
          <div className={styles.topbarAdminInfo}>
            <AdminInfo currentStat={currentStat} />
            <DailyInfo totals={currentStat2} curFn={getCurrentWebStatus} />
          </div>
        </div>
      </div>
    </div>
  )
}
