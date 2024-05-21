import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import styles from "./StoreCalculateList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

// 121 매장 정산
export default function StoreCalculateList() {
  const columns = [
    { field: "id", headerName: "id" },
    { field: "number", headerName: "매장", maxWidth: 50 },
    { field: "site", headerName: "총판", maxWidth: 110, flex: 1, headerAlign: "center", align: "center" },
    { field: "resNumber", headerName: "입금액", maxWidth: 180, flex: 1, headerAlign: "center", align: "center" },
    { field: "resType", headerName: "출금액", maxWidth: 180, flex: 1, headerAlign: "center", align: "center" },
    { field: "money", headerName: "입출차액", maxWidth: 100, flex: 1, headerAlign: "center", align: "center" },
    { field: "bankName", headerName: "베팅액", maxWidth: 130, flex: 1, headerAlign: "center", align: "center" },
    { field: "accNumber", headerName: "적중액", maxWidth: 220, flex: 1, headerAlign: "center", align: "center" },
    { field: "ownerName", headerName: "적중률", maxWidth: 100, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "chargedDate",
      headerName: "낙첨차액",
      maxWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ]
  const rows = [
    {
      id: "",
      number: "1234_02",
      site: "1234_01",
      resNumber: "0",
      resType: "0",
      money: "0",
      bankName: "0",
      accNumber: "0",
      ownerName: "0",
      chargedDate: "0.00%",
      messageReceievedDate: "0",
      message: "0",
      state: "",
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")

  return (
    <>
      <CustomHeader text={"매장별 정산"} customStyle={{ height: "38px", maxWidth: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent text={"종료일자 :"} customStyle={{ justifyContent: "space-around" }} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"매장등록"}
              onClick={{}}
            />
          </div>
          <div className={styles.footerSecondRowInput}>
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정상"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정지"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴1"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴2"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴3"}
            />
          </div>
        </div>
      </div>
    </>
  )
}
