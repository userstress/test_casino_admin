import React from "react"
import styles from "./LoadingComponent.module.css"
import { CircularProgress } from "@mui/material"

function LoadingComponent() {
  return (
    <div className={styles.loadBox}>
      <CircularProgress disableShrink /> <p>데이터를 불러오는 중 입니다...</p>
    </div>
  )
}

export default LoadingComponent
