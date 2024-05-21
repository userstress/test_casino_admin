import React, { useEffect, useState } from "react"
import styles from "./GetUserInfoes.module.css"
import UserComplexFirst from "./UserComplexFirst"
import UserComplexSecond from "./UserComplexSecond"
import UserComplexSportsStatics from "./UserComplexSportsStatics"
import UserMoneyStatics from "./UserMoneyStatics"
import UserBalanceController from "./UserCashControl/small/UserBalanceController"
import UserPointController from "./UserCashControl/small/UserPointController"
import CouponController from "./UserCashControl/small/CouponController"
import History from "./History/History"
import { useRouter } from "next/router"
import { GetDataFn } from "@utils/REST/serviceLayer/getFetch"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { ktimeTrans2 } from "@utils/ktimetrans"

const initialValues = {
  password: "",
  nickname: "",
  phone: "",
  email: "",
  bankName: "",
  ownerName: "",
  number: "",
  // number는 *계좌번호
  lv: 0,
  userGubunEnum: "",
  virtualAccountOwnerName: "",
  virtualAccountNumber: "",
  kakaoId: "",
  // kakaoId 카톡유무 옆 빈간
  telegramId: "",
  monitoringStatus: "",
  memo1: "",
  memo2: "",
  memo3: "",
  memo4: "",
  memo5: "",
  memo6: "",
}

function getUserInfoes() {
  const router = useRouter()
  const [userId, setId] = useState(null)
  const [userData, setData] = useState()
  const [values, setValues] = useState(initialValues)
  const { sendRequest } = useAxiosRequest()

  const fetchData = async () => {
    try {
      const indexValue = router.query.index
      const usercoo = getCookie("token")
      const headers = { Authorization: usercoo }
      setId(indexValue)
      const result = await GetDataFn(`api/v2/users/${indexValue}/detail/info`, headers)
      setData(result)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  useEffect(() => {
    if (router.isReady && router.query && router.query.index !== undefined) {
      fetchData()
    }
  }, [router.isReady, router.query])

  useEffect(() => {}, [userData, values])

  const handleInputChange = (e) => {
    const { type, name, value: inputValue } = e.target
    let value

    // 체크박스인 경우, 체크 여부 (true/false)
    if (type === "checkbox") {
      value = e.target.checked
    } else {
      // 입력값이 'true'/'false' 문자열인 경우 boolean으로 변환
      // 그 외의 경우 원래의 값을 사용
      value = inputValue === "true" ? true : inputValue === "false" ? false : inputValue
    }

    // 이전 상태를 기반으로 새 상태를 계산
    setValues((prevValues) => {
      // 필요한 로직으로 변경사항 추적 및 업데이트
      const newValue = { ...prevValues, [name]: value }

      // 여기에서 변경사항이 있으면 그 변경사항만 추적 또는 전송 로직 추가
      // 예: 초기값과 비교하여 변경된 경우에만 업데이트

      return newValue
    })
  }

  const cleanObject = (obj) => {
    const newObj = {}
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "" && obj[key] !== 0) {
        newObj[key] = obj[key]
      }
    })
    return newObj
  }

  function SendFix() {
    const method = "PATCH"
    const url = `/api/v2/admins/users/${router.query.index}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    const body = cleanObject(values)

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("유저 정보를 변경하였습니다")
        fetchData()
      }
    })
  }
  return (
    <div>
      <section className={styles.titlewrapper}>
        <span className={styles.titleText}>
          <p>회원 관리</p>&nbsp; ▶ 회원 상세정보 ▶ {userData && userData.username}
        </span>
        <div className={styles.titleText}>
          <button type="button" className={styles.buttonBox} onClick={() => fetchData()}>
            새로 고침
          </button>
          <button
            type="button"
            className={styles.buttonBox}
            style={{ backgroundColor: "#FF0000 !important" }}
            onClick={() => SendFix()}
          >
            수정 하기
          </button>
        </div>
      </section>
      <div className={styles.titleBoxes}>
        <div className={styles.leftBox}>
          회원기본정보-[사이트 : <p style={{ color: "#FF0000", margin: "0" }}>wd01</p>]
        </div>
        <div>가입일자 : {ktimeTrans2(userData?.createdAt) || "데이터를 불러오는중"}</div>
      </div>
      {userData && <UserComplexFirst data={userData} handleInput={handleInputChange} />}
      {userData && <UserComplexSecond />}
      {userData && <UserComplexSportsStatics />}
      {userData && <UserMoneyStatics />}
      {userData && <UserBalanceController data={userData} refresh={fetchData} />}
      {userData && <UserPointController data={userData} refresh={fetchData} />}
      {userData && <CouponController />}
      {userData && <History />}
    </div>
  )
}

export default getUserInfoes
