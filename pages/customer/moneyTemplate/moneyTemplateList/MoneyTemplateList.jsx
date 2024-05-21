import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./MoneyTemplateList.module.css"

export default function MoneyTemplateList() {
  const columns = [
    { field: "no", headerName: "No.", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "normal", headerName: "구분", width: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "evil", headerName: "제목", width: 1000, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "bad", headerName: "순서", width: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "danpole", headerName: "삭제", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "2",
      normal: "머니",
      evil: "당첨금 수동 지급",
      bad: "올리기  내리기",
      danpole: "삭제",
    },
    {
      id: 2,
      no: "2",
      normal: "머니",
      evil: "보유머니 차감금 재지급",
      bad: "올리기  내리기",
      danpole: "삭제",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"머니 및 포인트 [템플릿] 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer3}>
          <CustomSelect customStyle={{ width: "36%" }} optionArr={["머니", "포인트"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "10%", backgroundColor: "#D9D9D9" }} text={"등록"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}></div>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <CustomButton
              customStyle={{ width: "100%", backgroundColor: "#696969", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"등록"}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
