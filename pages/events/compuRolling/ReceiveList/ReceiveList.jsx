import { useState, useEffect } from "react"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ReceiveList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { GetDataFn } from "@utils/REST/serviceLayer/getFetch"
import { getCookie } from "cookies-next"
import axios from "axios"
import baseUrl from "@utils/REST/baseUrl"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { ktimeTdeleteSecond } from "@utils/ktimetrans"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

// 136 충전/환전 관리(문자 수신 목록)
export default function ReceiveList() {
  const [Rows, setRow] = useState([])
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const token = getCookie("token")

  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  function addHoursAndFormat(dateStr, hoursToAdd) {
    // 주어진 문자열에서 날짜와 시간을 분리
    if (!dateStr) {
      return ""
    }

    // 날짜와 시간을 분리
    const [datePart, timePart] = dateStr.split(" T ")

    // 시간을 시, 분, 초로 분리
    const [hour, minute, second] = timePart.split(":").map((part) => parseInt(part, 10))

    // 새로운 날짜와 시간 객체 생성
    const newDate = new Date(datePart)

    // 시간을 더함
    newDate.setHours(newDate.getHours() + hoursToAdd)

    // 새로운 날짜와 시간을 문자열로 변환하여 반환
    const newDateStr = newDate.toISOString().split("T")[0]
    const newTimeStr = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()]
      .map((part) => part.toString().padStart(2, "0"))
      .join(":")

    return `${newDateStr} ${newTimeStr}`
  }
  const handlechVal = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    return window.open(`/sendingNote?userId=${id}`, "쪽지", "width=1024, height=500")
  }

  const inputSS = {
    width: "60px",
    marginLeft: "1px",
    marginRight: "2px",
    fontSize: "11px",
    textAlign: "center",
    padding: "0",
    border: "none",
    backgroundColor: "#5386b5",
    color: "white",
    height: "80%",
    borderRadius: "4px",
  }
  const columns = [
    { field: "distribute", headerName: "총판", maxWidth: 50 },
    { field: "lv", headerName: "레벨", maxWidth: 50 },
    { field: "username", headerName: "아이디", maxWidth: 60, flex: 1, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", maxWidth: 60, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "요청시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addHoursAndFormat(params.formattedValue, 9)
      },
    },
    {
      field: "processedAt",
      headerName: "처리시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addHoursAndFormat(params.formattedValue, 9)
      },
    },
    {
      field: "lastDayChargeBalance",
      headerName: "전일 충전 금액",
      maxWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "calculatedReward",
      headerName: "지급 금액",
      maxWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "rate",
      headerName: "지급 퍼센트",
      maxWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "receptionTime",
      headerName: "롤링 퍼센트",
      maxWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sportsBalance",
      headerName: "보유잔고",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "casinoBalance",
      headerName: "보유 카지노 잔고",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "status",
      headerName: "상태",
      maxWidth: 80,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        let show
        if (params.formattedValue === "APPROVAL") {
          show = "완료"
        }
        if (params.formattedValue === "TIMEOUT") {
          show = "입금시간만료"
        }
        if (params.formattedValue === "CANCEL") {
          show = "취소"
        }
        if (params.formattedValue === "WAITING") {
          show = "대기"
        }
        return <div>{show}</div>
      },
    },
    {
      field: "userIp",
      headerName: "아이피",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "casino_id ",
      headerName: "카지노 아이디",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "memo",
      headerName: "메모",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userId",
      headerName: "쪽지",
      maxWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log(params)
        return (
          <button style={inputSS} onClick={(event) => handlechVal(event, params.row.userId || 1)}>
            쪽지
          </button>
        )
      },
    },
  ]

  const filteredColumns = columns
  const headers = {
    Authorization: token,
  }
  function getList() {
    axios
      .get(`${baseUrl}api/v2/managers/rolling/transaction?startDate=${datepick.start}&endDate=${datepick.end}`, {
        headers,
      })
      .then((response) => {
        setRow(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }
  useEffect(() => {
    if (datepick) {
      getList()
    }
  }, [datepick])

  useEffect(() => {}, [Rows])
  return (
    <>
      <CustomHeader
        text={`슬롯 롤링 이벤트 (전체: ${Rows ? Rows.length : 0})`}
        customStyle={{ height: "38px", maxWidth: "100%" }}
      />
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
        <CustomTable columns={filteredColumns} rows={Rows || []} />
      </div>
    </>
  )
}
