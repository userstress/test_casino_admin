import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import React from "react"
import styles from "./GradeCalculateList.module.css"

export default function GradeCalculateList() {
  const columns = [
    { field: "no", headerName: "등급", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "normal", headerName: "입금액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "evil", headerName: "출금액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "bad", headerName: "입출차액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "danpole", headerName: "보유머니", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "dividend", headerName: "배팅액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "howon", headerName: "적중액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "stop", headerName: "적중률", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired", headerName: "낙첨액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired1", headerName: "배팅차액", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
      dividend: "168,140",
      howon: "112,140",
      stop: "66.69%",
      expired: "138,140",
      expired1: "56,000",
    },
    {
      id: 2,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
      dividend: "168,140",
      howon: "112,140",
      stop: "66.69%",
      expired: "138,140",
      expired1: "56,000",
    },
    {
      id: 3,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
      dividend: "168,140",
      howon: "112,140",
      stop: "66.69%",
      expired: "138,140",
      expired1: "56,000",
    },
  ]
  return (
    <>
      <CustomHeader text={"등급별 정산"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer2}>
          <DatePickerComponent className={styles.customCalendar} text={"시작일자 :"} />
          <DatePickerComponent className={styles.customCalendar} text={"종료일자 :"} />
          <CustomButton customStyle={{ width: "20%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </>
  )
}
