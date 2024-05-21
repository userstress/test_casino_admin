import React, { useState } from "react"
import styles from "./UserManualPointController.module.css"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"

function UserManualPointController() {
  const [mode, setMode] = useState(true)
  const [money, setMoney] = useState(0)
  const [memot, setMemos] = useState("")
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

  return (
    <div className={styles.balanceConWrapper}>
      <label htmlFor="controller" className={styles.titlelabel}>
        회원 포인트 지급/회수
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
              sx={"justify-content: center"}
            >
              <FormControlLabel value="+" control={<Radio size="small" />} label="+" />
              <FormControlLabel value="-" control={<Radio size="small" />} label="-" />
            </RadioGroup>
          </FormControl>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              입력 금액
            </label>
            <input id="inputmoney" onInput={handleMoney} className={styles.inputMoneyInputBox} />
          </section>
        </section>
        <section className={styles.bananceOnoff}>
          <section className={styles.inputMoney}>
            <label htmlFor="inputmoney" className={styles.inputMoneyLabel}>
              비고(내역)
            </label>
            <input id="inputmoney" onInput={handleMoneyMemo} className={styles.inputMoneyInputBox} />
          </section>
          <section className={styles.inputMoney}>
            <select defaultValue="">
              <option value="">선택</option>
              <option value="winMoney">당첨금 수동지급</option>
              <option value="loseMoney">보유머니 차감금 재지급</option>
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

export default UserManualPointController
