import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./BuyLogList.module.css"

export default function BuyLogList() {
  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "coupon", headerName: "쿠폰", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "couponType", headerName: "쿠폰형", maxWidth: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "buyPoint", headerName: "구매포인트", maxWidth: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "standard", headerName: "사용기준", maxWidth: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "price", headerName: "적용금액", maxWidth: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "etc", headerName: "비고", maxWidth: 450, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "adaptDate", headerName: "적용일", maxWidth: 450, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "buyDate", headerName: "구매일", maxWidth: 450, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "cancel", headerName: "취소", maxWidth: 50, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 이벤트 - 상점구매 로그"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>쿠폰 구분</div>
          <CustomSelect
            customStyle={{ width: "100px", marginRight: "5px" }}
            optionArr={["선택", "추가충전형 쿠폰", "기프티콘", "게임머니 교환", "리얼머니 교환", "배당업 쿠폰"]}
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
