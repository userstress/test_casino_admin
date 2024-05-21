import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./LuckyPointLogList.module.css"

export default function LuckyPointLogList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "category",
      headerName: "항목",
      maxWidth: 150,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "금액",
      maxWidth: 400,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentDate",
      headerName: "지급일",
      maxWidth: 400,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "usedPeriod",
      headerName: "사용기간",
      maxWidth: 400,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "usedDate",
      headerName: "사용일",
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
      category: "행운복권",
      price: "20,000",
      paymentDate: "2022-08-22 오전 12:01:01",
      usedPeriod: "2022-08-26 오후 11:59:59까지",
      usedDate: "2022-08-19 오전 7:32:17",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      category: "행운복권",
      price: "20,000",
      paymentDate: "2022-08-22 오전 12:01:01",
      usedPeriod: "2022-08-26 오후 11:59:59까지",
      usedDate: "2022-08-19 오전 7:32:17",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      category: "행운복권",
      price: "20,000",
      paymentDate: "2022-08-22 오전 12:01:01",
      usedPeriod: "2022-08-26 오후 11:59:59까지",
      usedDate: "2022-08-19 오전 7:32:17",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      category: "행운복권",
      price: "20,000",
      paymentDate: "2022-08-22 오전 12:01:01",
      usedPeriod: "2022-08-26 오후 11:59:59까지",
      usedDate: "2022-08-19 오전 7:32:17",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      category: "행운복권",
      price: "20,000",
      paymentDate: "2022-08-22 오전 12:01:01",
      usedPeriod: "2022-08-26 오후 11:59:59까지",
      usedDate: "2022-08-19 오전 7:32:17",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 행운복권지급리스트"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>검색</div>
          <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["아이디", "닉네임"]} />
          <CustomInput customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }} />
          <CustomButton customStyle={{ width: "70px", backgroundColor: "#D9D9D9", marginRight: "5px" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <CustomButton
              customStyle={{ width: "15%", backgroundColor: "#696969", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"삭제"}
            />
          </div>
          <div>맨 위로</div>
        </div>
      </div>
    </div>
  )
}
