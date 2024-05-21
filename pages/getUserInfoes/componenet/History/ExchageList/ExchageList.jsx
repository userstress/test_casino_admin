import React, { useState } from "react"
import styles from "./ExchageList.module.css"
import CustomTable from "../../../../../components/customTable/CustomTable"
import { currencyFormatter } from "@utils/formatNumberWithCommas"

function ExchageList() {
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
      field: "chargeMoney",
      headerName: "환전 금액",
      flex: 1,
      headerAlign: "center",
      align: "right",
      rendercell: (params) => {
        return <div>{currencyFormatter(params.formattedValue)}</div>
      },
    },
    { field: "createdAt", headerName: "신청 일자", maxWidth: 280, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "status",
      headerName: "결과",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ]
  return (
    <div>
      <section className={styles.historyText}>
        <span>환전 내역</span>
        <span>총 환전</span>
        <span className={styles.totalValue}>
          <p>기간별 환전</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>기간별 단가</p>
        </span>
      </section>
      <CustomTable columns={columns} rows={rows} checkbox={false} />
    </div>
  )
}

export default ExchageList
