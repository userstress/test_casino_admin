import React, { useState } from "react"
import styles from "./CouponController.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

function CouponController() {
  const [mode, setMode] = useState(true)
  const [money, setMoney] = useState(0)
  const [memot, setMemos] = useState("")
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  function handleChange(event) {
    const result = event.target.value
    if (result === "+") {
      setMode(true)
    }
    if (result === "-") {
      setMode(false)
    }
  }
  function handleMoney(event) {
    const moneys = event.target.value
    if (isNaN(Number(money))) {
      return setMoney(0)
    } else {
      return setMoney(Number(moneys))
    }
  }
  function handleMoneyMemo(event) {
    const text = event.target.value
    setMemos(text)
  }
  function handleSubmit(event) {
    event.preventDefault()
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  return (
    <div className={styles.balanceConWrapper}>
      <label htmlFor="controller" className={styles.titlelabel}>
        회원 쿠폰 지급
      </label>
      <form id="controller" className={styles.ControllerForm}>
        <section className={styles.bananceOnoff}>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              쿠폰명
            </label>
            <input id="inputmoney" onInput={handleMoney} className={styles.inputMoneyInputBox} />
          </section>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              지급 금액
            </label>
            <input id="inputmoney" onInput={handleMoney} className={styles.inputMoneyInputBox} />
          </section>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              만료 일자
            </label>
            <DatePickerComponent
              getDate={handleEndDateChange}
              customStyle={{ width: "300px", justifyContent: "space-around" }}
            />
          </section>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              비고(내역)
            </label>
            <input id="inputmoney" onInput={handleMoneyMemo} className={styles.inputMoneyInputBox} />
          </section>
          <section className={styles.inputMoney}>
            <select defaultValue="">
              <option value="">선택</option>
              <option value="winMoney">이벤트 당첨 포인트</option>
              <option value="loseMoney">보유 포인트 차감 재지급</option>
            </select>
            <button type="button" onSubmit={handleSubmit}>
              행운 포인트
            </button>
          </section>
        </section>
      </form>
    </div>
  )
}

export default CouponController
