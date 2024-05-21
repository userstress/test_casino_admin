import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./HitRateUserList.module.css"

export default function HitRateUserList() {
  const columns = [
    { field: "no", headerName: "No.", maxWidth: 152, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 152, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 534, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "deposit", headerName: "입금액", maxWidth: 140, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "withdraw", headerName: "출금액", maxWidth: 227, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "cash", headerName: "보유머니", maxWidth: 227, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "total", headerName: "TOTAL", maxWidth: 227, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "winRate", headerName: "수익률", maxWidth: 227, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트 ", maxWidth: 227, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "39182",
      userId: "point7171",
      nick: "제네시스",
      deposit: "190,000",
      withdraw: "1,220,000",
      cash: "0",
      total: "-1,020,000",
      winRate: "642.11%",
      site: "wd01",
    },
    {
      id: 1,
      no: "39182",
      userId: "point7171",
      nick: "제네시스",
      deposit: "190,000",
      withdraw: "1,220,000",
      cash: "0",
      total: "-1,020,000",
      winRate: "642.11%",
      site: "wd01",
    },
    {
      id: 1,
      no: "39182",
      userId: "point7171",
      nick: "제네시스",
      deposit: "190,000",
      withdraw: "1,220,000",
      cash: "0",
      total: "-1,020,000",
      winRate: "642.11%",
      site: "wd01",
    },
    {
      id: 1,
      no: "39182",
      userId: "point7171",
      nick: "제네시스",
      deposit: "190,000",
      withdraw: "1,220,000",
      cash: "0",
      total: "-1,020,000",
      winRate: "642.11%",
      site: "wd01",
    },
    {
      id: 1,
      no: "39182",
      userId: "point7171",
      nick: "제네시스",
      deposit: "190,000",
      withdraw: "1,220,000",
      cash: "0",
      total: "-1,020,000",
      winRate: "642.11%",
      site: "wd01",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"회원관리 - 회원별 적중률"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            className={styles.customCalendar}
            text={"시작일자 :"}
            customStyle={{ display: "flex", justifyContent: "center" }}
          />
          <DatePickerComponent
            className={styles.customCalendar}
            text={"~ 종료일자 :"}
            customStyle={{ display: "flex", justifyContent: "center" }}
          />
        </div>
        <div className={styles.boxContainer3}>
          <CustomSelect customStyle={{ width: "36%" }} optionArr={["선택", "아이디", "닉네임"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "10%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
        <div className={styles.boxContainer4}>
          <CustomButton
            customStyle={{ width: "39%", backgroundColor: "#D9D9D9", width: "85px", marginLeft: "5px" }}
            text={"엑셀저장"}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
