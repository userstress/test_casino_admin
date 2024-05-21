import React, { useState } from "react"
import styles from "./ChargeList.module.css"
import CustomTable from "../../../../../components/customTable/CustomTable"
import { currencyFormatter } from "@utils/formatNumberWithCommas"

function ChargeList() {
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
      headerName: "충전금액",
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
        <span>충전 내역</span>
        <span>총 충전</span>
        <span className={styles.totalValue}>
          <p>기간별 충전</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>기간별 단가</p>
        </span>
      </section>
      <CustomTable columns={columns} rows={rows} checkbox={false} />
    </div>
  )
}

export default ChargeList
