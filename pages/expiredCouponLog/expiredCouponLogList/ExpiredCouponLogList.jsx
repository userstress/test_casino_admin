import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./ExpiredCouponLogList.module.css"

export default function ExpiredCouponLogList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "couponEnds",
      headerName: "쿠폰종료",
      maxWidth: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "couponPaymentDate",
      headerName: "쿠폰지급일",
      maxWidth: 400,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "couponExpirationDate",
      headerName: "쿠폰소멸일",
      maxWidth: 400,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "couponHoldingStatus",
      headerName: "쿠폰 보유현황",
      maxWidth: 400,
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
      nick: "또배기",
      couponEnds: "실버",
      couponPaymentDate: "2022-08-15 오후 5:50:36",
      couponExpirationDate: "2022-08-22 오전 12:01:01",
      couponHoldingStatus: "실버 : 3개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      couponEnds: "실버",
      couponPaymentDate: "2022-08-15 오후 5:50:36",
      couponExpirationDate: "2022-08-22 오전 12:01:01",
      couponHoldingStatus: "실버 : 3개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      couponEnds: "실버",
      couponPaymentDate: "2022-08-15 오후 5:50:36",
      couponExpirationDate: "2022-08-22 오전 12:01:01",
      couponHoldingStatus: "실버 : 3개, 골드 : 0개, 다이아 : 0개",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      couponEnds: "실버",
      couponPaymentDate: "2022-08-15 오후 5:50:36",
      couponExpirationDate: "2022-08-22 오전 12:01:01",
      couponHoldingStatus: "실버 : 3개, 골드 : 0개, 다이아 : 0개",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 유저 소멸 럭키쿠폰"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>쿠폰종료</div>
          <CustomSelect
            customStyle={{ width: "100px", marginRight: "5px" }}
            optionArr={["선택", "실버 타입", "골드 타입", "다이아 타입"]}
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
    </div>
  )
}
