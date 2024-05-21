// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./CancledGoalList.module.css"

export default function CancledGoalList() {
  const columns = [
    { field: "id", headerName: "아이디", flex: 1, type: "number", headerAlign: "center", align: "center" },
    { field: "league", headerName: "리그명", flex: 1.3, headerAlign: "center", align: "center" },
    { field: "date", headerName: "경기시간", flex: 2, headerAlign: "center", align: "center" },
    { field: "home", headerName: "홈팀", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "away", headerName: "원정팀", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "score", headerName: "스코어", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "regDate", headerName: "등록시간", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "scoreChanged", headerName: "스코어(변경)", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "changedDate", headerName: "변경시간", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "check", headerName: "확인", flex: 2.1, headerAlign: "center", align: "center" },
  ]
  const rows = []
  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", alignItems: "center" }}>
            게임관리&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="0.521vw" height="0.677vw" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>
            &nbsp;게임리스트&nbsp; <CustomButton text={"새로고침"} customStyle={{ background: "#D9D9D9" }} />
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />

      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
    </>
  )
}