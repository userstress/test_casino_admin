import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import React from "react"
import styles from "./gradeManagementList.module.css"

export default function GradeManagementList() {
  const columns = [
    { field: "no", headerName: "등급", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "normal", headerName: "정상", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "evil", headerName: "악의", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "bad", headerName: "불량", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "danpole", headerName: "단폴", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "dividend", headerName: "배당", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "howon", headerName: "호원", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "stop", headerName: "정지", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired", headerName: "하락탈퇴", width: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired1", headerName: "탈퇴1", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired2", headerName: "탈퇴2", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired3", headerName: "탈퇴3", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "highPrice", headerName: "고액", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "일반",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
    },
    {
      id: 2,
      no: "일반",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
    },
    {
      id: 3,
      no: "일반",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
    },
  ]
  return (
    <>
      <CustomHeader text={"등급 리스트"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar>
        <div className={styles.customBarInner}>
          <div className={styles.inputInner}>
            <CustomSelect
              optionArr={["전체", "일반", "SM", "HM", "SO"]}
              customStyle={{ backgroundColor: "#D9D9D9", width: "100%" }}
            />
          </div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </>
  )
}
