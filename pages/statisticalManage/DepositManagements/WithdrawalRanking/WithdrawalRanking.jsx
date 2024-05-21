import CustomHeader from "@components/customHeader/CustomHeader"
import styles from "./WithdrawalRanking.module.css"
import { useState, useEffect, Ref, useRef } from "react"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useRouter } from "next/router"
import { addCommasToNumber, addCommasToNumberFree } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import _ from "lodash"
import AccountRegistrationModal from "./AccountRegistrationModal"
import { useDifferStastic } from "@utils/useDifferStastic"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function DifferStatics() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const [accountArray, setAccount] = useState([])

  const [inputObj, setObj] = useState({
    turn: "",
    usage: "카지노캐시",
    ownerName: "",
    number: "0",
    source: "",
    use: true,
    transferLimit: "",
    currentMoney: "0",
    memo: "",
  })
  const [inputPercent, setPercent] = useState({
    bigo: "string",
    operatingExpense: 0,
    wonExchange: 0,
    commissionPercent: 0,
    dongExchange: 0,
  })

  const [apbangstate, setapbang] = useState("")

  function numberHandle(event) {
    event.preventDefault()
    const { value, id } = event.target

    // '비고' 항목을 제외하고 숫자 여부를 검증합니다.
    if (id !== "비고" && isNaN(Number(value))) {
      toast.warn(`${id}는 반드시 숫자여야 합니다.`)
      return // 숫자가 아닐 경우 여기에서 함수 실행을 중단합니다.
    }

    // commissionPercent * wonExcahnge =  commition
    // dong ex
    // 숫자 여부를 확인한 후 상태를 업데이트합니다.
    if (id === "운영비") {
      setPercent({ ...inputPercent, operatingExpense: Number(value) }) // 숫자 타입으로 변환하여 저장
    } else if (id === "비고") {
      setPercent({ ...inputPercent, bigo: value }) // 문자열은 검증 없이 저장
    } else if (id === "원환전") {
      setPercent({ ...inputPercent, wonExchange: Number(value) })
    } else if (id === "동환전") {
      setPercent({ ...inputPercent, dongExchange: Number(value) })
    } else if (id === "percentage") {
      setPercent({ ...inputPercent, commissionPercent: Number(value) })
    }
  }

  function saveToServer() {
    const method = "POST"
    const url = `/api/v2/managers/difference-statistic/save`
    const headers = { "Content-Type": "application/json", Authorization: userToken }
    const body = inputPercent

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("저장되었습니다")
        setAccount([])
        getSessionList()
      }
    })
  }

  useEffect(() => {}, [accountArray])

  const groupedAccounts = _.groupBy(accountArray, "usage")

  function getSessionList() {
    const method = "GET"

    const url = `/api/v2/managers/difference-statistic/all`
    const headers = { "Content-Type": "application/json", Authorization: userToken }

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
        setAccount(responseData.data)
      }
    })
  }

  function delAccount(event, params) {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?")
    if (!isConfirmed) {
      return
    }

    const method = "DELETE"
    const url = `/api/v2/managers/difference-statistic/delete/account/${params?.accountId}`
    const headers = { "Content-Type": "application/json", Authorization: userToken }

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
        toast.success("삭제되었습니다", { onClose: () => getSessionList() })
      }
    })
  }

  function patchValue(event, account) {
    const isConfirmed = window.confirm("정말로 수정하시겠습니까?")
    if (!isConfirmed) {
      return
    }

    const method = "POST"
    const url = `/api/v2/managers/difference-statistic/update/account`
    const headers = { "Content-Type": "application/json", Authorization: userToken }

    const body = {
      accountId: account.accountId,
      turn: account.turn,
      usage: account.usage,
      ownerName: account.ownerName,
      number: account.number,
      source: account.source,
      transferLimit: account.transferLimit,
      currentMoney: account.currentMoney,
      memo: account.memo,
      use: account.use,
    }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("수정되었습니다")
        getSessionList()
      }
    })
  }

  const handleMoney = (event, account) => {
    const inputValue = event.target.value.replace(/,/g, "") // 콤마 제거
    const updatedMoney = parseFloat(inputValue) // 숫자로 변환

    setAccount((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.accountId === account.accountId ? { ...acc, currentMoney: isNaN(updatedMoney) ? 0 : updatedMoney } : acc,
      ),
    )
  }
  const handleMoneyBlur = (event, account) => {
    const inputValue = event.target.value.replace(/,/g, "") // 콤마 제거
    const updatedMoney = parseFloat(inputValue) // 숫자로 변환

    setAccount((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.accountId === account.accountId ? { ...acc, currentMoney: isNaN(updatedMoney) ? 0 : updatedMoney } : acc,
      ),
    )
  }

  useEffect(() => {
    getSessionList()
  }, [])
  return (
    <>
      <CustomHeader text={"계좌관리 목록"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <section className={styles.title2}>차액등록</section>
      <section>
        <section clas sName={styles.table}>
          <div className={styles.tableHeads}>
            <span>등록일</span>
            <span>비고</span>
            <span>운영비(숫자만 입력)</span>
            <span>원환전(숫자만 입력)</span>
            <span>동환전(숫자만 입력)</span>
            <span>등록</span>
          </div>
          <div className={styles.tablebody}>
            <span>현재시간</span>
            <span>
              <input type="text" id="비고" className={styles.inputBox} onChange={(event) => numberHandle(event)} />
            </span>
            <span>
              <input type="number" id="운영비" className={styles.inputBox} onChange={(event) => numberHandle(event)} />
            </span>
            <span>
              <input type="number" id="원환전" className={styles.inputBox} onChange={(event) => numberHandle(event)} />
              <input
                type="number"
                id="percentage"
                className={styles.inputBox3}
                onChange={(event) => numberHandle(event)}
                onBlur={(event) => handleMoneyBlur(event, account)}
              />
              %
            </span>
            <span>
              <input type="number" id="동환전" className={styles.inputBox2} onChange={(event) => numberHandle(event)} />
            </span>
            <span>
              <button className={styles.submits} onClick={() => saveToServer()}>
                차액 등록하기
              </button>
            </span>
          </div>
        </section>
      </section>
      <section className={styles.makeAccount}>
        <div className={styles.apbangLog2}>
          <AccountRegistrationModal
            inputObj={inputObj}
            setObj={setObj}
            accountArray={accountArray}
            setAccount={setAccount}
          />
        </div>
      </section>

      <figure className={styles.gridBox}>
        {groupedAccounts &&
          Object.entries(groupedAccounts).map(([usage, accounts]) => (
            <section key={usage}>
              <section className={styles.title}>
                <div className={styles.contents}>
                  {usage}
                  <div className={styles.apbangDiv}>
                    <span>마지막 기록: 없음</span>
                    <button
                      type="button"
                      className={styles.apbangLog}
                      onClick={() => router.push("/statisticalManage/differenceStatistics")}
                    >
                      앞방 기록
                    </button>
                  </div>
                </div>
              </section>
              {accounts.map((account, index) => (
                <section className={styles.apbang} key={index}>
                  <div className={styles.first} style={{ color: "#0000FF" }}>
                    순번: {account.turn}
                  </div>
                  <div className={styles.first} style={{ color: "#FF0000" }}>
                    예금주: {account.ownerName}
                  </div>
                  <div className={styles.first}>
                    <div>
                      보유금액:{" "}
                      <input
                        value={addCommasToNumberFree(account.currentMoney)}
                        onChange={(event) => handleMoney(event, account)}
                      />
                    </div>
                  </div>

                  <div className={styles.buttonsBox}>
                    <button onClick={(event) => patchValue(event, account)}>기록 수정</button>
                    <button onClick={(event) => delAccount(event, account)}>기록 삭제</button>
                  </div>
                </section>
              ))}
            </section>
          ))}
      </figure>
    </>
  )
}

// {
//   "turn": "string",
//   "usage": "카지노캐시",
//   "ownerName": "string",
//   "number": 0,
//   "source": "string",
//   "use": true,
//   "transferLimit": "string",
//   "currentMoney": 0,
//   "memo": "string"
// }
