import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./AttendanceCheckTypeCList.module.css"

export default function AttendanceCheckTypeCList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "type", headerName: "출석타입", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "date", headerName: "출석일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "beforeCharge",
      headerName: "전달 충전",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "beforeExchange",
      headerName: "전달 환전",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "beforeCalculate",
      headerName: "전달 정산",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "right",
    },
    { field: "luckyPoint", headerName: "럭키포인트", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "couponUseDate",
      headerName: "쿠폰사용일",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "couponList",
      headerName: "쿠폰 보유현황",
      maxWidth: 510,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
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
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "아구찜집사장",
      type: "실버",
      date: "2022-08-22 오전 10:53:11",
      beforeCharge: "7,694,000",
      beforeExchange: "3,600,000",
      beforeCalculate: "4,094,000",
      luckyPoint: "50,000 수정",
      couponUseDate: "",
      couponList: "실버 : 5개, 골드 : 0개, 다이아 : 0개",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 출석체크 C타입"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "normal" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent className={styles.customCalendar} text={"적용시점 :"} customStyle={{ width: "300px" }} />
        </div>
        <div className={styles.boxContainer3}>
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>검색</div>
          <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["아이디"]} />
          <CustomInput customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }} />
          <CustomButton customStyle={{ width: "50px", backgroundColor: "#D9D9D9", marginRight: "5px" }} text={"검색"} />
          <CustomButton
            customStyle={{ width: "150px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
            text={"지정포인트 적용"}
          />
          <CustomButton
            customStyle={{ width: "150px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
            text={"C쿠폰일괄지급"}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
