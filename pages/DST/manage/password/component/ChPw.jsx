import React from "react"
import styles from "./ChPw.module.css"
import { useState } from "react"

function ChPw() {
  const sellInfo = [
    { pname: "현재 비밀번호", pvalue: "3322 (신림)" },
    { pname: "변경할 비밀번호", pvalue: "3322" },
    { pname: "비밀번호 확인", pvalue: "2202-11-15 17:58:58" },
  ]
  const [inputs, setInputs] = useState({
    nowpw: "",
    chpw: "",
    chpw2: "",
  })
  function chPwFn(event) {
    event.preventDefault()

    return console.log(inputs)
  }
  function chCurrent(event) {
    const thisVal = event.target.value
    setInputs((prevInputs) => ({
      ...prevInputs,
      nowpw: thisVal,
    }))
  }
  function chpwfn(event) {
    const thisVal = event.target.value
    setInputs((prevInputs) => ({
      ...prevInputs,
      chpw: thisVal,
    }))
  }
  function chpwfn2(event) {
    const thisVal = event.target.value
    setInputs((prevInputs) => ({
      ...prevInputs,
      chpw2: thisVal,
    }))
  }
  return (
    <form className={styles.tablewrapper} onSubmit={chPwFn}>
      <section className={styles.titles}>비밀번호 변경</section>
      <section className={styles.tablebox}>
        <div className={styles.tables}>
          <div className={styles.tableLeft}>현재 비밀번호</div>
          <div className={styles.tableRight}>
            <input type="text" onChange={chCurrent} />
          </div>
        </div>
        <div className={styles.tables}>
          <div className={styles.tableLeft}>변경할 비밀번호</div>
          <div className={styles.tableRight}>
            <input type="text" onChange={chpwfn} />
          </div>
        </div>
        <div className={styles.tables}>
          <div className={styles.tableLeft}>비밀번호 확인</div>
          <div className={styles.tableRight}>
            <input type="text" onChange={chpwfn2} />
          </div>
        </div>
      </section>
      <button type="submit" className={styles.onsubmitBtn} onClick={chPwFn}>
        변경
      </button>
    </form>
  )
}

export default ChPw
