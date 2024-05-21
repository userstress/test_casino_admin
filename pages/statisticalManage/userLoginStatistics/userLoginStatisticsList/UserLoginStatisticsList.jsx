import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { useEffect, useState } from "react"
import styles from "./UserLoginStatisticsList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"

export default function UserLoginStatisticsList() {
  const router = useRouter()
  const today = new Date()
  const mytoken = getCookie("token")
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { sendRequest } = useAxiosRequest()
  const [rows, setRows] = useState([])

  const columns = [
    { field: "date", headerName: "날짜", maxWidth: 152, flex: 1 },
    { field: "visitCount", headerName: "로그인 횟수", maxWidth: 152, flex: 1 },
    { field: "rechargedCount", headerName: "충전 횟수", maxWidth: 534, flex: 1 },
    { field: "exchangeCount", headerName: "환전 횟수", maxWidth: 140, flex: 1 },
    { field: "debitCount", headerName: "실배터", maxWidth: 227, flex: 1 },
    { field: "createUserCount", headerName: "가입자", maxWidth: 227, flex: 1 },
  ]
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  function reQuestJson() {
    const method = "GET"
    const url = `api/v2/managers/statistics/all?startDate=${datepick.start}&endDate=${datepick.end}`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        return setRows(responseData.data)
      }
    })
  }

  useEffect(() => {
    if (router.isReady) {
      reQuestJson()
    }
  }, [datepick, router.isReady])

  useEffect(() => {}, [rows])
  console.log(rows)

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"회원관리(로그인 통계)"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
        <CustomTable
          columns={columns}
          defaultIds="date"
          defe
          rows={rows ? rows : []}
          SoltedModel={[{ field: "date", sort: "desc" }]}
          checkbox={false}
        />
      </div>
    </div>
  )
}
