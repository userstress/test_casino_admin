import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./Notes.module.css"

export default function Notes() {
  const columns = [
    { field: "id", headerName: "id", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "title", headerName: "제목", maxWidth: 800, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "importance", headerName: "읽음표시", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "날짜", maxWidth: 500, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      importance: "3",
      title: "게임머니 교환",
      createdAt: "2022-08-22 오전 10:53:11",
    },
    {
      id: 2,
      importance: "3",
      title: "## BET365 점검종료 안내 ##",
      createdAt: "2022-08-22 오전 10:53:11",
    },
    {
      id: 3,
      importance: "3",
      title: "## BET365 점검안내 ##",
      createdAt: "2022-08-22 오전 10:53:11",
    },
    {
      id: 4,
      importance: "3",
      title: "## 스폐셜타임 돌발이벤트 ##",
      createdAt: "2022-08-22 오전 10:53:11",
    },
    {
      id: 5,
      importance: "3",
      title: "##에불루션 점검 완료 안내##",
      createdAt: "2022-08-22 오전 10:53:11",
    },
    {
      id: 6,
      importance: "3",
      title: "## 11월 이벤트 안내 ##",
      createdAt: "2022-08-22 오전 10:53:11",
    },
  ]
  const noteCount = 8

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"총판 쪽지 > 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "normal" }}>
        <div className={styles.boxContainer2}>
          <div className={styles.totalNotes}>전체 : {noteCount}</div>
          <DatePickerComponent className={styles.customCalendar} text={"시작일자 :"} customStyle={{ width: "300px" }} />
          <DatePickerComponent
            className={styles.customCalendar}
            text={"~종료일자 :"}
            customStyle={{ width: "300px" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
