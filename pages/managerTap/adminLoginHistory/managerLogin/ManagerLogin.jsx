// 머니사용로그
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./ManagerLogin.module.css"
import CustomButton from "@components/customButton/CustomButton"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import ktimeTrans, { toKoreanTimeNoAdd, toKoreanTime } from "@utils/ktimetrans"
import { getCookie } from "cookies-next"
import { getUserHistory } from "@utils/user/getUserHistory"
import { useRouter } from "next/router"
export default function ManagerLogin() {
  //데이터 불러올때
  const router = useRouter()
  const { LoginTryList, callUserList } = getUserHistory()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const { sendRequest } = useAxiosRequest()
  const [total, setTotal] = useState(0)
  const [datas, setData] = useState()
  const mytoken = getCookie("token")

  function Iprequest(date) {
    const method = "GET"
    const url = `/api/v2/admins/history/success`
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
        setData(responseData.data)
      }
    })
  }

  useEffect(() => {
    if (router.isReady && !datas) {
      Iprequest()
    }
    const toggleData = () => {
      Iprequest()
    }

    const intervalId = setInterval(toggleData, 10000) // 5초마다 toggleData 실행
    return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [datepick.start, router.isReady])

  useEffect(() => {}, [LoginTryList, datas])

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const columns = [
    {
      field: "username",
      headerName: "접속시도 아이디",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nickname",
      headerName: "접속시도 아이디",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "attemptIp",
      headerName: "접속시도 IP",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countryCode",
      headerName: "접속시도 국가",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deviceType",
      headerName: "접속시도 기기",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "attemptDate",
      headerName: "접속시도 일자",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{toKoreanTime(params.formattedValue)}</div>
      },
    },
  ]

  const filteredColumns = columns.filter((column) => column.field !== "id")

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"총 로그인수 [113928명]"}
        customStyle={{ height: "38px", width: "100%", backgroundColor: "#181D4B", margin: 0 }}
      />
      {/* <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxContainer1}>
          <DatePickerComponent
            setDate={handleStartDateChange}
            className={styles.customCalendar}
            text={"시작일자 :"}
            textStyle={{ width: "120px" }}
          />
          <div>&nbsp;&nbsp;&nbsp;~&nbsp;</div>
          <DatePickerComponent
            setDate={handleEndDateChange}
            className={styles.customCalendar}
            text={"종료일자 :"}
            textStyle={{ width: "120px" }}
          />
        </div>
      </CustomBar> */}
      <div className={styles.tableContainer}>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--cell": {
              color: "green",
            },
            "& .super-app.negative": {
              color: "red",
            },
            "& .super-app.positive": {
              color: "blue",
            },
          }}
        >
          <CustomTable
            columns={filteredColumns}
            rows={datas ? datas : []}
            defaultIds={"attemptDate"}
            SoltedModel={[{ field: "attemptDate", sort: "desc" }]}
          />
        </Box>
      </div>
    </div>
  )
}
