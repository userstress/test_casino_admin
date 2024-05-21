import React, { useState, useEffect, useCallback } from "react"
import styles from "./CurrentStatusList.module.css"
import FirstTab from "./firstTab/FirstTab"
import SecondTab from "./secondTab/SecondTab"
import ThirdTab from "./thirdTab/ThirdTab"
import FourthTab from "./fourthTab/FourthTab"
import FifthTab from "./fifthTab/FifthTab"
import SixthTab from "./sixthTab/SixthTab"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { currentStatusStore } from "@utils/currentStatusStore/currentStatusStore"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"

export default function CurrentStatusList() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`

  const [isOpen, setIsOpen] = useState(false)

  const onClickOpen = () => {
    setIsOpen(false)
  }
  const onClickHide = () => {
    setIsOpen(true)
  }

  const { currentObj, setCurrentObj } = currentStatusStore()

  const mytoken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()
  const [myaudio, setAudio] = useState("https://megasimages3.s3.ap-northeast-2.amazonaws.com/chickSound.wav")

  const [currentStat, setCurStat] = useState({})

  const getCurrentWebStatus = useCallback(() => {
    const urls = ["api/v2/managers/sidebar1", "api/v2/managers/sidebar2", "api/v2/managers/sidebar3"]
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
        setCurStat(combinedResults)
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

  const [datdas, setDatas] = useState([])
  const [curUser, setCurUser] = useState([])
  function requestAll() {
    const method = "GET"
    const url = "/api/v2/managers/active/find/all"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        return setCurUser(responseData.data)
      }
    })
  }

  useEffect(() => {
    if (router.isReady) {
      getCurrentWebStatus() // 라우터가 준비되면 최초 실행
      requestAll()
      const intervalId = setInterval(() => {
        getCurrentWebStatus() // 5초마다 실행
        requestAll()
      }, 4000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [router.isReady])

  useEffect(() => {}, [curUser])

  return (
    <div className={styles.boxContainer}>
      <div className={styles.hideBtnContainer}>
        <button onClick={onClickOpen}>보이기</button>
        <button onClick={onClickHide}>숨기기</button>
      </div>
      <div>
        <button className={styles.countDateAll}>총합({formattedDate})</button>
      </div>
      <div>
        <button className={styles.countDateAll}>현재 접속자({curUser ? curUser.length : 0})명</button>
      </div>
      <div className={isOpen ? `${styles.slideDownContainer}` : `${styles.hide}`}>
        <FirstTab customColor="#FA8072" currentStat={currentStat} />
        {/* <SecondTab customColor="#FFA500" /> */}
        <div>
          <button className={styles.cashDate}>
            <div>
              {month}월 {day}일 일별 실시간
            </div>
            <div>캐시 정보 (00시 기준)</div>
          </button>
        </div>
        <ThirdTab customColor="#FF0" currentStat={currentStat} />
        <FourthTab customColor="#0FF" currentStat={currentStat} />
        <FifthTab customColor="#00BFFF" currentStat={currentStat} />
        <SixthTab customColor="#9370DB" currentStat={currentStat} />
        {/* <div>
          <button className={styles.countDateAll}>GAME</button>
        </div>
        <SeventhTab customColor="#FFA500" /> */}
      </div>
    </div>
  )
}
