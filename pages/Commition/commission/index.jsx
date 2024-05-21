import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"

export default function index() {
  const columns = [
    { field: "view", headerName: "보기", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "recommendedNumber",
      headerName: "추천수",
      maxWidth: 80,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "activity", headerName: "활동", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "lev", headerName: "레벨", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "name", headerName: "이름", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "startDate", headerName: "시작일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "endDate", headerName: "종료일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "deposit", headerName: "총입금", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "withdraw", headerName: "총출금", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "depositOutputDifference",
      headerName: "입출차액",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "commission", headerName: "커미션", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "settlementRequestDate",
      headerName: "정산요청일",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "calculate", headerName: "정산", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "settlementApplicationDate",
      headerName: "정산 적용일",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "reset",
      headerName: "리셋",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ]

  const rows = [
    {
      id: 1,
      view: "3",
      recommendedNumber: "10",
      activity: "",
      lev: "",
      grade: "",
      name: "",
      nick: "",
      startDate: "",
      endDate: "",
      deposit: "50,000",
      withdraw: "50,000",
      depositOutputDifference: "aaaaa",
      commission: "aaaaa",
      settlementRequestDate: "",
      calculate: "aaaaa",
      settlementApplicationDate: "",
      reset: "",
    },
    {
      id: 1,
      view: "3",
      recommendedNumber: "10",
      activity: "",
      lev: "",
      grade: "",
      name: "",
      nick: "",
      startDate: "",
      endDate: "",
      deposit: "50,000",
      withdraw: "50,000",
      depositOutputDifference: "aaaaa",
      commission: "aaaaa",
      settlementRequestDate: "",
      calculate: "aaaaa",
      settlementApplicationDate: "",
      reset: "",
    },
    {
      id: 1,
      view: "3",
      recommendedNumber: "10",
      activity: "",
      lev: "",
      grade: "",
      name: "",
      nick: "",
      startDate: "",
      endDate: "",
      deposit: "50,000",
      withdraw: "50,000",
      depositOutputDifference: "aaaaa",
      commission: "aaaaa",
      settlementRequestDate: "",
      calculate: "aaaaa",
      settlementApplicationDate: "",
      reset: "",
    },
    {
      id: 1,
      view: "3",
      recommendedNumber: "10",
      activity: "",
      lev: "",
      grade: "",
      name: "",
      nick: "",
      startDate: "",
      endDate: "",
      deposit: "50,000",
      withdraw: "50,000",
      depositOutputDifference: "aaaaa",
      commission: "aaaaa",
      settlementRequestDate: "",
      calculate: "aaaaa",
      settlementApplicationDate: "",
      reset: "",
    },
    {
      id: 1,
      view: "3",
      recommendedNumber: "10",
      activity: "",
      lev: "",
      grade: "",
      name: "",
      nick: "",
      startDate: "",
      endDate: "",
      deposit: "50,000",
      withdraw: "50,000",
      depositOutputDifference: "aaaaa",
      commission: "aaaaa",
      settlementRequestDate: "",
      calculate: "aaaaa",
      settlementApplicationDate: "",
      reset: "",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"유저 롤링 - 커미션리스트"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>정산</div>
          <CustomSelect
            customStyle={{ width: "100px", marginRight: "5px" }}
            optionArr={["선택", "대기", "신청", "완료"]}
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
        <div className={styles.footerSecondRowContainer}>
          <div>맨 위로</div>
          <div>
            <span style={{ display: "block" }}>총 입금 : 0</span>
            <span style={{ display: "block" }}>총 출금 : 0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
