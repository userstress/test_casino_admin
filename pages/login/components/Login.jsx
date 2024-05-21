import { useEffect, useState } from "react"
import styles from "../styles/Login.module.css"
import { useAuthStore } from "@utils/useAuthStore"
import { setupPushNotification } from "@utils/setupPushNotification"
import { useAudio } from "@utils/user/AudioContext"

export default function Login() {
  const { user, login, status, errorMessage, initialSet } = useAuthStore()
  const { setAudioEnabled, audioEnabled } = useAudio()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "admin",
  })
  const handleChange = (event) => {
    const {
      target: { name },
    } = event
    setFormData({ ...formData, [name]: event.target.value })
  }

  const onClickLogin = async (event) => {
    event.preventDefault()
    const loginSuccess = await login({ username: formData.username, password: formData.password })
    console.log("loginSuccess:", loginSuccess) // 로그인 성공 여부 확인
    if (loginSuccess === "good") {
      setAudioEnabled(true)
      window?.location?.assign("/main")
    } else {
      console.error("로그인 실패")
    }
  }

  useEffect(() => {
    setupPushNotification()
  }, [])

  // 예를 들어, 이 코드는 메인 컴포넌트 또는 사용자 상호작용을 유도하는 버튼이 있는 컴포넌트에 포함될 수 있습니다.

  useEffect(() => {
    console.log("오디오" + audioEnabled)
  }, [audioEnabled])
  function requestNotificationPermission() {
    // 서비스 워커 등록
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("Service Worker and Push is supported")

      navigator.serviceWorker
        .register("service-worker.js")
        .then(function (swReg) {
          console.log("Service Worker is registered", swReg)

          // 다음 단계로 넘어가기 전 서비스 워커 등록을 확인하는 로그
          return swReg.pushManager.getSubscription()
        })
        .catch(function (error) {
          console.error("Service Worker registration failed: ", error)
        })
    } else {
      console.warn("Push messaging is not supported")
    }
  }

  return (
    <div className={styles.boxContainer}>
      <form onChange={(event) => handleChange(event)} className={styles.formContainer}>
        <div>
          <div className={styles.idContainer}>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="username"
              value={formData.username}
              onChange={() => requestNotificationPermission()}
            />
          </div>
          <div className={styles.pwContainer}>
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" name="password" value={formData.password} />
          </div>
        </div>
        <div className={styles.submitBox}>
          <input type="submit" value="LogIn" onClick={(event) => onClickLogin(event)} />
        </div>
      </form>
    </div>
  )
}
