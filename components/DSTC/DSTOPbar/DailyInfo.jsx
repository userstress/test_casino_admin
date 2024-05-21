import React from "react"
import styles from "./DailyInfo.module.css"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

export default function DailyInfo() {
  return (
    <section className={styles.wrappers}>
      <div className={styles.innerWrapper}>
        <div className={styles.item} style={{ backgroundColor: "black", color: "#FFA700" }}>
          Amazon
        </div>
        <div className={styles.item} style={{ backgroundColor: "#800080" }}>
          금일입금 : 0원
        </div>
        <div className={styles.item} style={{ backgroundColor: "#F50057" }}>
          금일출금 : 0원
        </div>
        <div className={styles.item} style={{ backgroundColor: "#FF0000" }}>
          손익 : 0원
        </div>
        <div className={styles.item} style={{ backgroundColor: "#FF3D00" }}>
          회원보유 : 23,053원
        </div>
        <div className={styles.item} style={{ backgroundColor: "#0000FF" }}>
          파트너 보유 : 0원
        </div>
        <div className={styles.item} style={{ backgroundColor: "#FF0000" }}>
          합산 : 23,053원
        </div>
        <div className={styles.logoutBtn} style={{ backgroundColor: "black", color: "#FFA700" }}>
          로그아웃
        </div>
      </div>
    </section>
  )
}
