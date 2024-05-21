import React, { useState } from "react"
import styles from "./History.module.css"
import ChargeList from "./ChargeList/ChargeList"
import ExchageList from "./ExchageList/ExchageList"
import LoginHistory from "./LoginHistory/LoginHistory"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

function History() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`

  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const handleStartDateChange = (endDate) => {
    setDate({ ...datepick, start: datePickerTrans(endDate) })
  }
  return (
    <section className={styles.HistoryWrapper}>
      <div className={styles.historyHead}>
        <section className={styles.headDay}>
          <DatePickerComponent
            text={"시작일자:"}
            getDate={handleStartDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;
          <DatePickerComponent
            text={"종료일자:"}
            getDate={handleEndDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
          <button type="button" className={styles.submitBtn}>
            조회
          </button>
        </section>
        <section className={styles.Ip}>s</section>
      </div>
      <div className={styles.HidstoryList}>
        <ChargeList />
        <ExchageList />
        <LoginHistory />
      </div>
    </section>
  )
}

export default History
