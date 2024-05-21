import React from "react"
import AdminInfo from "./AdminInfo"
import DailyInfo from "./DailyInfo"
import styles from "./Topbar.module.css"
import Link from "next/link"

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topInfoWrapper}>
          <div className={styles.topbarAdminInfo}>
            <DailyInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
