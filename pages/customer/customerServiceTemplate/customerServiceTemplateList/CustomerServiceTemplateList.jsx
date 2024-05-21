import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import React from "react"
import styles from "./CustomerServiceTemplateList.module.css"

export default function CustomerServiceTemplateList() {
  const columns = [
    { field: "no", headerName: "레벨", width: 150, headerAlign: "center", align: "center" },
    { field: "normal", headerName: "고객센터템플릿검색", width: 150, headerAlign: "center", align: "center" },
    { field: "evil", headerName: "제목", width: 150, headerAlign: "center", align: "center" },
    { field: "bad", headerName: "수정", width: 150, headerAlign: "center", align: "center" },
    { field: "danpole", headerName: "삭제", width: 150, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
    },
    {
      id: 2,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
    },
    {
      id: 3,
      no: "일반",
      normal: "1,750,000",
      evil: "1,550,000",
      bad: "200,000",
      danpole: "164,342",
    },
  ]
  return (
    <>
      <CustomHeader text={"고객센터[템플릿]관리"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxContainer2}>
          <CustomButton customStyle={{ width: "20%", backgroundColor: "#D9D9D9" }} text={"순서변경"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
      <div className={styles.footerSecondRowContainer}>
        <div className={styles.footerSecondRowButtons}>
          <CustomButton
            customStyle={{ width: "100%", backgroundColor: "#696969", color: "white" }}
            fontStyle={{ fontSize: "0.6vw" }}
            text={"등록"}
          />
        </div>
      </div>
    </>
  )
}
