import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import React, { useEffect, useState } from "react"
import styles from "./LevelCalculateList.module.css"
import { useGridApiRef, getCellValue } from "@mui/x-data-grid"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"

// 적중률=적중액/베팅액

export default function LevelCalculateList() {
  const apiRef = useGridApiRef()
  let howon = 0
  let dividend = 0
  const [rows, setRows] = useState([])
  const mytoken = getCookie("token")
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const columns = [
    {
      field: "lv",
      headerName: "레벨",
      width: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>합계&nbsp;&nbsp;</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "depositTotal",
      headerName: "입금액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "withdrawTotal",
      headerName: "출금액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      type: "number",
      align: "center",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "bad",
      headerName: "입출차액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "danpole",
      headerName: "보유머니",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      type: "number",
      align: "center",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "sportsBalance",
      headerName: "배팅액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "howon",
      headerName: "적중액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "stop",
      headerName: "적중률",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (!isNaN(Number(params?.id))) {
          return <div>{params?.formattedValue}%</div>
        }
        console.log(params)
        return <div style={{ color: "rgb(0, 0, 255)" }}>{params.formattedValue}%</div>
      },
      // 시바모르겠다
      // renderCell: ({ row }) => {
      //   howon = howon + row.howon
      //   dividend = dividend + row.dividend
      //   console.log(row.howon)
      // if (isNaN(rows.howon)) {
      //   return <div>{howon / dividend}</div>
      // } else {
      //   return
      // }
      // },
    },
    {
      field: "expired",
      headerName: "낙첨액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "expired1",
      headerName: "배팅차액",
      width: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF" }}>&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
  ]
  const { sendRequest } = useAxiosRequest()

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const aggres = {
    normal: "sum",
    evil: "sum",
    bad: "sum",
    danpole: "sum",
    dividend: "sum",
    howon: "sum",
    stop: "avg",
    expired: "sum",
    expired1: "sum",
  }
  const filteredColumns = columns.filter((column) => column.field !== "id")

  useEffect(() => {
    // sendingFecth()
  }, [datepick])
  return (
    <>
      <CustomHeader text={"레벨별 정산"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer2}>
          <DatePickerComponent className={styles.customCalendar} text={"시작일자 :"} getDate={handleStartDateChange} />
          <DatePickerComponent className={styles.customCalendar} text={"종료일자 :"} getDate={handleEndDateChange} />
          <CustomButton customStyle={{ width: "20%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable refs={apiRef} aggregations={aggres} columns={filteredColumns} rows={rows} checkbox={false} />
      </div>
    </>
  )
}
