import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./RoulletteLogList.module.css"

export default function RoulletteLogList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "type", headerName: "돌림판 타입", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "point", headerName: "획득 포인트", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "date", headerName: "획득일", maxWidth: 450, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      point: "500P",
      date: "2022-08-22 오전 10:53:11",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 돌림판 로그"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "normal" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent className={styles.customCalendar} text={"시작일자 :"} customStyle={{ width: "300px" }} />
          <DatePickerComponent
            className={styles.customCalendar}
            text={"~종료일자 :"}
            customStyle={{ width: "300px" }}
          />
        </div>
        <div className={styles.boxContainer3}>
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>타입</div>
          <CustomSelect
            customStyle={{ width: "100px", marginRight: "5px" }}
            optionArr={["선택", "실버타입", "골드타입", "다이아타입", "수동지급"]}
          />
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>검색</div>
          <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["아이디"]} />
          <CustomInput customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }} />
          <CustomButton customStyle={{ width: "70px", backgroundColor: "#D9D9D9", marginRight: "5px" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}>
          <div className={styles.footerFirstRowInner}>
            <span>실버 : 519명 / 933,400P</span>
            <span>골드 : 81명 / 520,000P</span>
            <span>다이아 : 0명 / 0P</span>
            <span>수동 : 22명 / 340,000P</span>
          </div>
        </div>
      </div>
    </div>
  )
}
