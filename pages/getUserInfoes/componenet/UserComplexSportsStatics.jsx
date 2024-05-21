import React, { useState } from "react"
import styles from "./UserComplexSportsStatics.module.css"

function UserComplexSportsStatics() {
  const [statics, setStatics] = useState([])

  return (
    <>
      <div className={styles.staticsWrapper}>
        {statics
          ? statics?.map((item, _index) => {
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
          : "데이터를 불러오는중입니다"}
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
    </>
  )
}

export default UserComplexSportsStatics
