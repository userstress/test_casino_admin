import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"
import axios from "axios"
import { useEffect } from "react"
import { getCookie } from "cookies-next"

export default function index() {
  const fetchData2 = async () => {
    console.log(123213123123123) // 초기 로그 출력
    const too = getCookie("token")
    const headers = { Authorization: too }

    try {
      console.log("try")

      // 각 상태에 대한 요청을 병렬적으로 실행
      const promises = axios.get(`https://dailymodelapp.com/api/v2/managers/rolling/transaction`, { headers })

      // Promise.all을 사용하여 모든 요청이 완료될 때까지 기다림
      const responses = await promises
      console.log(responses)
      // 모든 응답에서 데이터 추출 및 병합
      const allData = responses.reduce((acc, response) => acc.concat(response.data.data), [])
      console.log(allData)
      setRow(allData)

      return allData
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const columns = [
    { field: "lev", headerName: "레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "닉네임", maxWidth: 150, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "type", headerName: "시점 레벨", maxWidth: 80, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "startDate", headerName: "시작일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "endDate", headerName: "종료일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "rollingPrice", headerName: "롤링금", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "charge", headerName: "총충전", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "exchange", headerName: "총환전", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "useRolling", headerName: "유저롤링", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "batRolling", headerName: "베팅롤링", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "rollingFee", headerName: "롤링비", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "롤링 생성일", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "calculate", headerName: "정산", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "settlementRequestDate",
      headerName: "정산 요청일",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "settlementApplicationDate",
      headerName: "정산 적용일",
      maxWidth: 300,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bettingSummary",
      headerName: "베팅요약 ",
      maxWidth: 300,
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
      nick: "아구찜집사장",
      type: "실버",
      startDate: "2022-08-22 오전 10:53:11",
      endDate: "2022-08-22 오전 10:53:11",
      rollingPrice: "3,600,000",
      charge: "4,094,000",
      exchange: "50,000 수정",
      useRolling: "aaa",
      batRolling: "aaaaa",
      rollingFee: "aaaaa",
      createdAt: "2022-08-22 오전 10:53:11",
      calculate: "aaaaa",
      settlementRequestDate: "2022-08-22 오전 10:53:11",
      settlementApplicationDate: "2022-08-22 오전 10:53:11",
      bettingSummary: "aaaaa",
    },
  ]

  useEffect(() => {
    fetchData2()
  }, [])

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"유저 롤링 - 롤링리스트"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div>맨 위로</div>
          <div>
            <span style={{ display: "block" }}>총 베팅금 : 0</span>
            <span style={{ display: "block" }}>총 롤링금 : 0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
