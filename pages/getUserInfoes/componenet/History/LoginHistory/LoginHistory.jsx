import React, { useState } from "react"
import styles from "./LoginHistory.module.css"
import CustomTable from "../../../../../components/customTable/CustomTable"
import { currencyFormatter } from "@utils/formatNumberWithCommas"

function LoginHistory() {
  const [rows, setRows] = useState([])

  const columns = [
    {
      field: "number",
      headerName: "No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "loginHistory",
      headerName: "접속아이피",
      flex: 1,
      headerAlign: "center",
      align: "right",
      rendercell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    { field: "createdAt", headerName: "접속일자", maxWidth: 280, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "domain",
      headerName: "접속도메인",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ]
  return (
    <div>
      <section className={styles.historyText}>
        <span>로그인 정보</span>
      </section>
      <CustomTable columns={columns} rows={rows} checkbox={false} />
    </div>
  )
}

export default LoginHistory
