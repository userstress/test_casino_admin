import { useState, useEffect } from "react"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./StoreCalculateList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import axios from "axios"
import { getCookie } from "cookies-next"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
// 140 충전/환전 관리(자동 승인 계좌 목록)
export default function StoreCalculateList() {
  const [Rows, setRow] = useState([])
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const columns = [
    { field: "id", headerName: "id" },
    { field: "site", headerName: "사이트", maxWidth: 110, flex: 1, headerAlign: "center", align: "center" },
    { field: "resNumber", headerName: "수신번호", maxWidth: 180, flex: 1, headerAlign: "center", align: "center" },
    { field: "resType", headerName: "수신타입", maxWidth: 180, flex: 1, headerAlign: "center", align: "center" },
    { field: "money", headerName: "입출금", maxWidth: 100, flex: 1, headerAlign: "center", align: "center" },
    { field: "bank", headerName: "은행명", maxWidth: 130, flex: 1, headerAlign: "center", align: "center" },
    { field: "number", headerName: "계좌번호", maxWidth: 220, flex: 1, headerAlign: "center", align: "center" },
    { field: "ownerName", headerName: "입금명", maxWidth: 100, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "chargedDate",
      headerName: "고객 입금 시간",
      maxWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "messageReceievedDate",
      headerName: "문자 접수 시간",
      maxWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "message",
      headerName: "메시지",
      maxWidth: 279,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      headerName: "상태",
      maxWidth: 35,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ]

  const filteredColumns = columns.filter((column) => column.field !== "id")
  // 날짜정보로 수정 필요
  // &startDate=${datepick.start}&endDate=${datepick.end}
  const fetchData2 = async () => {
    console.log(123213123123123) // 초기 로그 출력
    const too = getCookie("token")
    const headers = { Authorization: too }

    try {
      console.log("try")
      const statusOptions = ["OK", "CANCEL", "TIMEOUT", "WAIT"]

      // 각 상태에 대한 요청을 병렬적으로 실행
      const promises = statusOptions.map((status1) =>
        axios.get(`https://dailymodelapp.com/api/v2/managers/accounts?page=1&size=999&status=${status1}`, { headers }),
      )

      // Promise.all을 사용하여 모든 요청이 완료될 때까지 기다림
      const responses = await Promise.all(promises)

      // 모든 응답에서 데이터 추출 및 병합
      const allData = responses.reduce((acc, response) => acc.concat(response.data.data), [])
      console.log(allData)
      setRow(allData)

      return allData
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    // setRow(fetchData2())
    // fetchData2()
  }, [])
  return (
    <>
      <CustomHeader text={"자동 충전 은행 설정 목록"} customStyle={{ height: "38px", maxWidth: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            getDate={handleStartDateChange}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"종료일자 :"}
            getDate={handleEndDateChange}
            customStyle={{ justifyContent: "space-around" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={Rows} />
      </div>
    </>
  )
}
