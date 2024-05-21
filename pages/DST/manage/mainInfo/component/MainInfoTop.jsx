import React from "react"
import styles from "./MainInfoTop.module.css"

function MainInfoTop() {
  const sellInfo = [
    { pname: "총판 업체명", pvalue: "3322 (신림)" },
    { pname: "총판 코드명", pvalue: "3322" },
    { pname: "계약일", pvalue: "2202-11-15 17:58:58" },
    { pname: "총판 종류", pvalue: "죽창" },
    { pname: "계약 조건", pvalue: "죽창: 40%" },
    { pname: "당일 충전금 (직하위)", pvalue: "300,000원" },
    { pname: "당일 환전금 (직하위)", pvalue: "0원" },
    { pname: "당일 정산금 (직하위)", pvalue: "120,000원" },
    { pname: "총 추천 회원수", pvalue: "12명" },
  ]
  return (
    <div className={styles.tablewrapper}>
      <section className={styles.titles}>총판 정보</section>
      <section className={styles.tablebox}>
        {sellInfo.map((ar) => {
          return (
            <div className={styles.tables}>
              <div className={styles.tableLeft}>{ar.pname}</div>
              <div className={styles.tableRight}>{ar.pvalue}</div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default MainInfoTop
