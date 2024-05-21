import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./AttendanceCheckList.module.css"

export default function AttendanceCheckList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 1 },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 1 },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 1 },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 1 },
    { field: "type", headerName: "출석타입", maxWidth: 80, flex: 1 },
    { field: "date", headerName: "출석일", maxWidth: 300, flex: 1 },
    { field: "couponUseDate", headerName: "쿠폰사용일", maxWidth: 300, flex: 1 },
    { field: "couponList", headerName: "쿠폰 보유현황", maxWidth: 510, flex: 1 },
  ]
  const rows = [
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 2,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "2022-08-22 오전 9:29:07",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 3,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 4,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "2022-08-22 오전 9:29:07",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 5,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 6,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      couponUseDate: "2022-08-22 오전 9:29:07",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 출석체크"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "normal" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent className={styles.customCalendar} text={"시작일자 :"} />
          <DatePickerComponent className={styles.customCalendar} text={"종료일자 :"} />
        </div>
        <div className={styles.boxContainer3}>
          <CustomSelect customStyle={{ width: "100px" }} optionArr={["닉네임(작성자)", "제목", "사이트"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomSelect customStyle={{ width: "36%" }} optionArr={["닉네임(작성자)", "제목", "사이트"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "10%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
