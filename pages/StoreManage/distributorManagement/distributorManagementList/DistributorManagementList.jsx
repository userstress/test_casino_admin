import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./DistributorManagementList.module.css"
import { useRouter } from "next/router"
export default function DistributorManagementList() {
  const columns = [
    { field: "no", headerName: "No.", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "id", headerName: "아이디", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "pwd", headerName: "암호", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "writer", headerName: "이름", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "fee", headerName: "수수료율", width: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "hdFee", headerName: "홀덤수수료", width: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "bdFee", headerName: "바둑이수수료", width: 100, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "storeNum", headerName: "매장수", width: 70, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "normal", headerName: "정상", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "evil", headerName: "악의", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "bad", headerName: "불량", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "danpole", headerName: "단폴", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "dividend", headerName: "배당", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "howon", headerName: "호원", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "stop", headerName: "정지", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired", headerName: "하락탈퇴", width: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired1", headerName: "탈퇴1", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired2", headerName: "탈퇴2", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "expired3", headerName: "탈퇴3", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "highPrice", headerName: "고액", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "allMember", headerName: "전체회원", width: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", width: 50, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
    {
      no: 1,
      id: "007942_01",
      pwd: "qwe123",
      writer: "(관리자)",
      fee: "15%",
      hdFee: "0%",
      bdFee: "0%",
      storeNum: "0",
      normal: "0",
      evil: "0",
      bad: "0",
      danpole: "0",
      dividend: "0",
      howon: "0",
      stop: "0",
      expired: "0",
      expired1: "0",
      expired2: "0",
      expired3: "0",
      highPrice: "0",
      allMember: "0",
      state: "정상",
    },
  ]
  const router = useRouter()
  return (
    <>
      <CustomHeader text={"총판 리스트"} customStyle={{ height: "38px", width: "100%" }} />
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <button className={styles.movementBtn} onClick={() => router.push("/DistributeManage/signIn")}>
              총판등록
            </button>
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
