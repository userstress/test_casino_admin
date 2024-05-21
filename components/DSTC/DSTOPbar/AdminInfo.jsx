import React from "react"
import styles from "./AdminInfo.module.css"

export default function AdminInfo() {
  return (
    <div style={{ padding: 0, border: "none" }}>
      <div className={styles.category} style={{ backgroundColor: "#AC2E2E" }}>
        충전
      </div>
      <div style={{ width: "70px" }}>대기 : 0</div>
      <div style={{ width: "100px" }}>완료 : 120</div>

      <div className={styles.category} style={{ backgroundColor: "#2E4AAC" }}>
        환전
      </div>
      <div style={{ width: "100px" }}>요청 : 3</div>
      <div style={{ width: "70px" }}>대기 : 0</div>
      <div style={{ width: "100px" }}>완료 : 16</div>

      <div className={styles.category}>문의</div>
      <div style={{ width: "70px" }}>요청 : 0</div>
      <div style={{ width: "70px" }}>대기 : 0</div>

      <div className={styles.category}>회원</div>
      <div style={{ width: "105px" }}>987,654,321</div>
      <div style={{ width: "70px" }}>대기 : 0</div>
      <div style={{ width: "110px" }}>GOLD123</div>

      <div className={styles.category} style={{ backgroundColor: "#964242" }}>
        초과베팅
      </div>
      <div style={{ width: "100px" }}></div>

      <div className={styles.category} style={{ backgroundColor: "#964242" }}>
        주시베팅
      </div>
      <div style={{ width: "100px" }}>길동이</div>

      <div className={styles.category}>지인 정산 요청</div>
      <div style={{ width: "201px" }}></div>
    </div>
  )
}
