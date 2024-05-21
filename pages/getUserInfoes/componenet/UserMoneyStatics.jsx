import Reac, { useState } from "react"
import styles from "./UserMoneyStatics.module.css"

function UserMoneyStatics() {
  const [statics, setStatics] = useState([])
  // 월 입출 정산, 주 입출 정산
  return (
    <>
      <div className={styles.staticsWrapper}>
        {statics || statics.length > 1
          ? statics.map((item, _index) => {
              return (
                <section className={styles.staticsBox}>
                  <div className={styles.title}>title</div>
                  <ul className={styles.insight}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ul>
                </section>
              )
            })
          : "데이터를 불러오는 중입니다"}
      </div>
      <div className={styles.staticsWrapper}>
        <section className={styles.staticsBoxTotal}>
          <div className={styles.titleTotal}>TOTAL</div>
          <ul className={styles.insightTotal}>
            <li>입금:</li>
            <li>출금:</li>
            <li>정산:</li>
          </ul>
        </section>
      </div>
      <div className={styles.staticsWrapper}>
        <section className={styles.staticsBoxTotal}>
          <div className={styles.titleTotal}>배당비율</div>
          <section className={styles.insightBox}>
            <ul className={styles.insightTotal2}>
              <li className={styles.ratioTitle}>
                <div>스포츠</div>
              </li>
              <li className={styles.ratioNumber}>
                <span>일</span>
                <span>월</span>
                <span>총</span>
              </li>
            </ul>
            <ul className={styles.insightTotal2}>
              <li className={styles.ratioTitle}>
                <div>게임존</div>
              </li>
              <li className={styles.ratioNumber}>
                <span>일</span>
                <span>월</span>
                <span>총</span>
              </li>
            </ul>
            <ul className={styles.insightTotal2}>
              <li className={styles.ratioTitle}>
                <div>그외</div>
              </li>
              <li className={styles.ratioNumber}>
                <span>일</span>
                <span>월</span>
                <span>총</span>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </>
  )
}

export default UserMoneyStatics
