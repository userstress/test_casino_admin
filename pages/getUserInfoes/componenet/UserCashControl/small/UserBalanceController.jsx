import React, { useState } from "react"
import styles from "./UserBalanceController.module.css"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { addCommasToNumberFree } from "@utils/formatNumberWithCommas"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

function UserBalanceController({ data, refresh }) {
  const [mode, setMode] = useState("지급")
  const [money, setMoney] = useState(0)
  const [memot, setMemos] = useState("")
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()

  function handleChange(event) {
    const result = event.target.value
    if (result === "지급") {
      setMode("지급")
    }
    if (result === "차감") {
      setMode("차감")
    }
  }
  function handleMoney(event) {
    const moneyString = event.target.value.replace(/[, ]/g, "") // 쉼표와 공백을 제거하여 숫자 문자열 생성
    const money = parseInt(moneyString, 10) // 문자열을 정수형 숫자로 변환

    if (isNaN(money)) {
      return setMoney(0)
    } else {
      return setMoney(money)
    }
  }

  function handleMoneyMemo(event) {
    const text = event.target.value
    setMemos(text)
  }
  function handleSubmit(event) {
    event.preventDefault()
  }

  function moneyTransfer(event, data) {
    event.preventDefault()
    event.stopPropagation()

    if (!confirm(mode === "지급" ? "금액을 지급하시겠습니까?" : "금액을 차감하시겠습니까?")) {
    } else {
      const method = "PATCH"
      const url = `api/v2/managers/add-sportsBalance/${data?.id}/${data?.wallet?.id}`
      const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

      // money가 문자열이 아닐 경우, 문자열로 변환하여 숫자 이외의 문자를 제거하고 숫자만 남기는 처리를 합니다.
      const moneyString = typeof money === "string" ? money : String(money)
      const sportsBalance = moneyString.replace(/[^0-9]/g, "")

      const body = {
        sportsBalance: sportsBalance,
        operation: mode,
      }
      sendRequest(method, url, headers, body, (errorStatus, responseData) => {
        if (errorStatus >= 500) {
          toast.success("관리자에게 문의해주세요")
        } else if (errorStatus >= 400) {
          toast.success("처리 중입니다")
        } else if (errorStatus === 403 || errorStatus === 401) {
          toast.success("로그인을 다시해주세요")
        } else if (errorStatus === 404) {
          toast.success("찾을수없는 주소입니다")
        } else if (!errorStatus && responseData) {
          toast.success(
            mode === "지급"
              ? ` ${addCommasToNumberFree(body.sportsBalance)} 머니 지급되었습니다`
              : `${addCommasToNumberFree(body.sportsBalance)} 머니 차감되었습니다`,
          )
          router.reload()
        }
        return false
      })
    }
  }

  return (
    <div className={styles.balanceConWrapper}>
      <label htmlFor="controller" className={styles.titlelabel}>
        회원 머니 충환전
      </label>
      <form id="controller" className={styles.ControllerForm}>
        <section className={styles.bananceOnoff}>
          <FormControl>
            <FormLabel htmlFor="radioAdd12" focused={false} className={styles.labeladd}>
              추가/삭제
            </FormLabel>
            <RadioGroup
              id="radioAdd12"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="row-radio-buttons-group"
              row
              onChange={handleChange}
              style={{ border: "1px solid black", justifyContent: "center" }} // 변경된 부분
            >
              <FormControlLabel value="지급" control={<Radio size="small" />} label="+" title="지급" />
              <FormControlLabel value="차감" control={<Radio size="small" />} label="-" title="차감" />
            </RadioGroup>
          </FormControl>

          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              입력 금액
            </label>
            <input
              id="inputmoney"
              onChange={handleMoney}
              value={addCommasToNumberFree(money) === "0" ? "" : addCommasToNumberFree(money)}
              className={styles.inputMoneyInputBox}
            />
          </section>
        </section>
        <section className={styles.bananceOnoff}>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              비고(내역)
            </label>
            <input id="inputmoney" onChange={handleMoneyMemo} className={styles.inputMoneyInputBox} />
          </section>
          <section className={styles.inputMoney}>
            <select defaultValue="">
              <option value="">선택</option>
              <option value="winMoney">당첨금 수동지급</option>
              <option value="loseMoney">보유머니 차감금 재지급</option>
            </select>
            <button type="button" onClick={(event) => moneyTransfer(event, data)}>
              머니 충환전
            </button>
          </section>
        </section>
      </form>
    </div>
  )
}

export default UserBalanceController
