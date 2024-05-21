import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./AccessStatisticsList.module.css"

export default function AccessStatisticsList() {
  const columns = [
    { field: "date", headerName: "날짜", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "loginCount",
      headerName: "로그인 횟수",
      maxWidth: 280,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "chargeCount", headerName: "충전 횟수", maxWidth: 280, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "exchangeCount",
      headerName: "환전 횟수",
      maxWidth: 280,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "realBatter", headerName: "실베터", maxWidth: 280, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "member", headerName: "가입자", maxWidth: 285, flex: 0.8, headerAlign: "center", align: "center" },
  ]

  const rows = [
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"회원관리(접속 통계)"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
