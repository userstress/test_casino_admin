import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./Statics.module.css"

export default function Statics() {
  const columns = [
    { field: "no", headerName: "No.", maxWidth: 70, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "adminId",
      headerName: "관리자 아이디[실패 아이디 포함]",
      maxWidth: 500,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "adminIP", headerName: "관리자 IP", maxWidth: 500, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "adminLoginAt",
      headerName: "관리자 접속시간",
      maxWidth: 480,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "isSuccess", headerName: "성공/실패", maxWidth: 180, flex: 1, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      no: "39182",
      adminId: "wind",
      adminIP: "121.186.23.118",
      adminLoginAt: "2023-09-25 11:59:24",
      isSuccess: "성공",
    },
    {
      id: 1,
      no: "39182",
      adminId: "wind",
      adminIP: "121.186.23.118",
      adminLoginAt: "2023-09-25 11:59:24",
      isSuccess: "성공",
    },
    {
      id: 1,
      no: "39182",
      adminId: "wind",
      adminIP: "121.186.23.118",
      adminLoginAt: "2023-09-25 11:59:24",
      isSuccess: "성공",
    },
    {
      id: 1,
      no: "39182",
      adminId: "wind",
      adminIP: "121.186.23.118",
      adminLoginAt: "2023-09-25 11:59:24",
      isSuccess: "성공",
    },
    {
      id: 1,
      no: "39182",
      adminId: "wind",
      adminIP: "121.186.23.118",
      adminLoginAt: "2023-09-25 11:59:24",
      isSuccess: "성공",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"계좌 관리 목록"}
        customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
      />
      <div className={styles.tableContainer}>
        <div className={styles.addedCount}>차액등록</div>
        <div className={styles.gridBox}>
          <div className={styles.gridHead}>등록일</div>
          <div className={styles.gridHead}>비고</div>
          <div className={styles.gridHead}>운영비(숫자만 입력)</div>
          <div className={styles.gridHead}>원환전(숫자만 입력)</div>
          <div className={styles.gridHead}>동환전(숫자만 입력)</div>
          <div className={styles.gridHead}>등록</div>
        </div>
        <div className={`${styles.gridBox} , ${styles.gridBody}`}>
          <div>2023-10-20 17:05:30</div>
          <input type="text" />
          <input type="text" />
          <div className={styles.rasioBox}>
            <input type="text" className={styles.leftInput} />
            <div className={styles.percentage}>
              <input type="text" className={styles.rightInput} />%
            </div>
          </div>
          <input type="text" />
          <div className={styles.buttonBox}>
            <button type="button" className={styles.button}>
              차액 등록하기
            </button>
          </div>
        </div>
        <div className={styles.titles}>
          <p className={styles.titleText}>앞방내역</p>
          <div className={styles.rightSide}>
            <p className={styles.redColors}>마지막 기록:없음</p>
            <div className={styles.rightSideNote}>앞방 기록</div>
          </div>
        </div>
        <div className={styles.listof}>
          <p>11</p>
          <p>11</p>
          <p>111</p>
        </div>
        <div className={styles.titles}>
          <p className={styles.titleText}>예비내역</p>
          <div className={styles.rightSide}>
            <p className={styles.whiteColors}>마지막 기록 : 2023-10-20 17:06:44</p>
            <div className={styles.rightSideNote}>앞방 기록</div>
          </div>
        </div>
        <div className={styles.listof}>
          <p>11</p>
          <p>11</p>
          <p>111</p>
        </div>
      </div>
    </div>
  )
}
