// 머니사용로그
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./userLoginHistory.module.css"
import CustomButton from "@components/customButton/CustomButton"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import DayTransform from "@utils/DayTransform"
import { getCookie } from "cookies-next"
import { getUserHistory } from "@utils/user/getUserHistory"
import { useRouter } from "next/router"
export default function userLoginHistory() {
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

  function blockIprequest(date) {
    const method = "GET"
    const url = `/api/v2/managers/history/range?startDate=${date.start}&endDate=${date.end}`
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
      blockIprequest(datepick)
    }
    const toggleData = () => {
      blockIprequest(datepick)
    }

    const intervalId = setInterval(toggleData, 10000) // 5초마다 toggleData 실행
    return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [datepick.start, router.isReady, datepick.end])

  useEffect(() => {}, [LoginTryList, datas])

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  function sendBlock(event, params) {
    event.stopPropagation()
    event.preventDefault()
    // 사용자로부터 메모 입력 받기
    const note = prompt("차단 사유를 입력해주세요:")

    // 사용자가 취소 버튼을 누른 경우, 함수 종료
    if (note === null) return

    const method = "POST"
    const url = "api/v2/managers/ip"
    // 입력 받은 note 값을 body에 추가
    const body = { ipContent: `${params.row.lastAccessedIp}`, note: note, enabled: false }
    const headers = { "Content-Type": "application/json", Authorization: mytoken }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("서버 반응이 없습니다")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("차단되었습니다", {
          onClose: () => blockIprequest(),
        })
      }
    })
  }

  const columns = [
    { field: "id", headerName: "No.", minWidth: 100, maxWidth: 100 },
    {
      field: "attemptUsername",
      headerName: "접속시도 아이디",
      minWidth: 300,
      maxWidth: 300,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "attemptPassword",
      headerName: "접속시도 비번",
      minWidth: 300,
      maxWidth: 300,
    },
    {
      field: "attemptIP",
      headerName: "접속시도 IP",
      minWidth: 400,
      maxWidth: 400,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log(params.row.attemptDevice)
        return (
          <div>
            <span style={{ color: "red" }}>
              {params.row.attemptDevice === "Unknown" || params.row.attemptDevice === undefined
                ? "(P)"
                : `(${params.row.attemptDevice})`}
            </span>

            <span style={{ marginRight: "10px" }}> {params.formattedValue}</span>
          </div>
        )
      },
    },
    {
      field: "attemptNation",
      headerName: "접속시도 국가",
      minWidth: 210,
      maxWidth: 210,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "attemptDate",
      headerName: "접속시도 일자",
      minWidth: 300,
      maxWidth: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{DayTransform(params.formattedValue)}</div>
      },
    },
    {
      field: "BTN",
      headerName: "IP블록추가",
      minwidth: 330,
      maxWidth: 330,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            onClick={(event) => sendBlock(event, params)}
            className={styles.blockBtn}
            style={{ border: "solid 1px black", width: "50px", textAlign: "center" }}
          >
            차단
          </div>
        )
      },
    },
  ]

  const filteredColumns = columns.filter((column) => column.field !== "id")

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"로그인 시도"}
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
