import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import React, { useState, useEffect } from "react"
import styles from "./LeveledSettle.module.css"
import { useGridApiRef } from "@mui/x-data-grid"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import axios from "axios"
import { getCookie } from "cookies-next"

//125 레벨별 정산
export default function LeveledSettle() {
  const sumStyle = {
    backgroundColor: "#696969",
    color: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  const [rows, setRows] = useState()

  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${getCookie("token")}`,
  }

  useEffect(() => {
    // fetchLevelsData()
  }, [])

  useEffect(() => {}, [rows])

  const columns = [
    {
      field: "lv",
      headerName: "레벨",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (params.formattedValue) {
          return <div>{params.formattedValue}</div>
        }
        return (
          <div style={sumStyle}>
            <span>TOTAL</span>
          </div>
        )
      },
    },
    {
      field: "depositTotal",
      headerName: "입금액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "withdrawTotal",
      headerName: "출금액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "totalSettlement",
      headerName: "입출차액",
      width: 70,
      flex: 0.8,
      headerAlign: "RIGHT",
      align: "center",
      type: "number",
    },
    {
      field: "sportsBalance",
      headerName: "보유머니",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "dividend",
      headerName: "베팅액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "howon",
      headerName: "적중액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    { field: "stop", headerName: "정지", width: 70, flex: 0.8, headerAlign: "center", align: "center", type: "number" },
    {
      field: "expired",
      headerName: "적중률",
      width: 80,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "expired1",
      headerName: "낙첨액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "expired2",
      headerName: "베팅차액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
  ]

  const aggre = columns.reduce((acc, column) => {
    if (column.field) {
      acc[column.field] = "sum"
    }
    return acc
  })
  const updatedColumns = columns.map((column, index) => {
    if (index !== 0 && column.field && rows) {
      return {
        ...column,
        renderCell: (params) => {
          // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.

          if (params.aggregation) {
            // 각 row의 column.field 값을 사용하여 집계합니다.
            const total = rows.reduce((acc, item) => {
              const value = parseFloat(Number(item[column.field]))
              if (!isNaN(value)) {
                acc += value
              }
              return acc
            }, 0) // 초기값 0

            return (
              <div style={sumStyle}>
                <span>{total} 원</span>
              </div>
            )
          }

          // 일반 행의 경우 기본 렌더링을 적용합니다.
          return params.formattedValue
        },
      }
    }
    return column
  })

  const apiRef = useGridApiRef()

  return (
    <>
      <CustomHeader text={"레벨별 정산"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            getDate={handleStartDateChange}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"종료일자 :"}
            getDate={handleEndDateChange}
            customStyle={{ justifyContent: "space-around" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable
          refs={apiRef}
          columns={updatedColumns}
          rows={rows ? rows : []}
          checkbox={false}
          aggregations={aggre}
          defaultIds="lv"
        />
      </div>
    </>
  )
}
