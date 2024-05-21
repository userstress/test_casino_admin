import CustomHeader from "@components/customHeader/CustomHeader"
import styles from "./index.module.css"
import CustomBar from "@components/custombar/CustomBar"
import CustomTable from "@components/customTable/CustomTable"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import Layout from "@components/Layout"
import { useState, useEffect } from "react"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { getCookie } from "cookies-next"
import axios from "axios"
import { ktimeTdeleteSecond } from "@utils/ktimetrans"
import { addCommasToNumber, addCommasToNumber2 } from "@utils/formatNumberWithCommas"

const inputSS = {
  width: "40px",
  marginLeft: "1px",
  marginRight: "2px",
  fontSize: "10px",
  textAlign: "center",
  padding: "0",
  backgroundColor: "green",
  color: "white",
  borderRadius: "4px",
  border: "none",
  height: "80%",
}

export default function index() {
  const basicURL = process.env.NEXT_PUBLIC_API_URL
  const userToken = getCookie("token")
  const handlechVal = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    return window.open(`/sendingNote?userId=${params.row.userId}`, "쪽지", "width=1024, height=500")
  }
  function formatDateTime(dateTimeString) {
    // "T"를 공백으로 대체하여 문자열 변환
    let correctedDateTimeString = dateTimeString.replace("T", " ")

    // Date 객체 생성
    const date = new Date(correctedDateTimeString)

    // 9시간 추가
    date.setHours(date.getHours() + 9)

    // 시간을 24시간 형식으로 표현
    let hours = date.getHours()
    hours = (hours < 10 ? "0" : "") + hours
    let minutes = date.getMinutes()
    minutes = (minutes < 10 ? "0" : "") + minutes
    let seconds = date.getSeconds()
    seconds = (seconds < 10 ? "0" : "") + seconds

    // 24시간을 넘어가면 다음 날로 전환
    if (hours >= 24) {
      date.setDate(date.getDate() + 1)
      hours -= 24
    }

    // 포맷된 문자열 반환
    correctedDateTimeString = `${date.getFullYear()} ${(date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)} ${
      (date.getDate() < 10 ? "0" : "") + date.getDate()
    } ${hours}:${minutes}:${seconds}`

    return correctedDateTimeString
  }

  const columns = [
    { field: "id", headerName: "번호", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "username",
      headerName: "아이디",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "nickname", headerName: "닉네임", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "transactionType",
      headerName: "종류",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isRt = params.formattedValue === "입금"

        return (
          <div
            style={{
              widht: "100%",
              height: "100%",
              color: isRt ? "#FF0000" : "#0000FF",
              display: "flex",
              alignItems: "center",
            }}
          >
            {params.formattedValue}
          </div>
        )
      },
    },
    {
      field: "ownerName",
      headerName: "예금주",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.wallet?.ownerName || ""
      },
    },
    {
      field: "bankName",
      headerName: "은행명",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.wallet?.bankName || ""
      },
    },
    {
      field: "accNumber",
      headerName: "계좌번호",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.wallet?.number || ""
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const vale = params.formattedValue
        if (vale === "APPROVAL") {
          return <span style={{ color: "green", fontSize: "11px" }}>승인</span>
        }
        if (vale === "UNREAD") {
          return <span style={{ color: "#853333", fontSize: "11px" }}>읽지않음</span>
        }
        if (vale === "WAITING") {
          return <span style={{ color: "black", fontSize: "11px" }}>대기</span>
        }
        if (vale === "CANCELLATION") {
          return <span style={{ color: "red", fontSize: "11px" }}>취소</span>
        }

        return vale
      },
    },
    {
      field: "reqMoney",
      headerName: "신청금액",
      flex: 0.8,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        const Amounts =
          params?.row?.transactionType === "입금" ? params?.row?.rechargeAmount : params?.row?.exchangeAmount

        return <div style={{ marginRight: "5px" }}>{addCommasToNumber(Amounts)}</div>
      },
    },
    {
      field: "point",
      headerName: "포인트",
      flex: 0.8,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        const result = params?.row?.wallet?.point || ""
        const isIp = params?.row?.transactionType === "입금"
        return <div style={{ marginRight: "5px" }}>{isIp && result > 0 ? addCommasToNumber2(result) : null}</div>
      },
    },
    {
      field: "createdAt",
      headerName: "신청시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.createdAt ? formatDateTime(params.formattedValue) : ""
      },
    },
    {
      field: "processedAt",
      headerName: "처리일시",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.processedAt ? formatDateTime(params.row.processedAt) : ""
      },
    },

    {
      field: "remainingSportsBalance",
      headerName: "처리후 잔고",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue > 0 ? (
          <div style={{ marginRight: "5px" }}>{params.formattedValue && addCommasToNumber(params.formattedValue)}</div>
        ) : null
      },
    },
    {
      field: "resultPoint",
      headerName: "처리후 포인트",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const result = params?.row?.wallet?.point || ""
        const isIp = params?.row?.transactionType === "입금"
        // return <div style={{ marginRight: "5px" }}>{result && addCommasToNumber2(result)}</div>

        return <div style={{ marginRight: "5px" }}>{isIp && result > 0 ? addCommasToNumber2(result) : null}</div>
      },
    },
    {
      field: "fn",
      headerName: "쪽지",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, params)}>
              쪽지
            </button>
          </>
        )
      },
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const [rows, setRows] = useState([])
  const [tenDate, setTen] = useState({ rechargeTo: "", exchangeTo: "" })
  const [totalLength, setLength] = useState(0)
  const [optionData, setOptionData] = useState(null)
  const [options, setOptions] = useState("all")

  const today = new Date()

  // 현재 날짜에서 10일을 뺌
  const startDate = new Date()
  startDate.setDate(today.getDate() - 10)
  const formattedStartDate = startDate.toISOString().split("T")[0]

  const formattedDate = today.toISOString().split("T")[0] // 현재 날짜

  const [datepick, setDate] = useState({
    start: formattedStartDate, // 시작 날짜를 현재 날짜에서 10일 이전으로 설정
    end: formattedDate, // 종료 날짜는 현재 날짜
  })

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const fetchData = async () => {
    try {
      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION"]

      const headers = {
        Authorization: `${userToken}`, // 토큰을 Authorization 헤더에 추가
      }

      // recharge에 대한 요청
      const responsePromises = statusOptions.map((status) =>
        axios.get(
          `${basicURL}/api/v2/managers/rt/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
          { headers: headers },
        ),
      )
      const responses = await Promise.all(responsePromises)

      // exchange에 대한 요청
      const responseEtPromises = statusOptions.map((status) =>
        axios.get(
          `${basicURL}/api/v2/managers/et/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
          { headers: headers },
        ),
      )
      const responsesEt = await Promise.all(responseEtPromises)

      // responses에 '입금' transactionType 추가
      const responsesWithTransactionType = responses.flatMap((response) =>
        response.data.map((item) => ({
          ...item,
          transactionType: "입금",
        })),
      )

      // responsesEt에 '출금' transactionType 추가
      const responsesEtWithTransactionType = responsesEt.flatMap((response) =>
        response.data.map((item) => ({
          ...item,
          transactionType: "출금",
        })),
      )

      // 두 요청의 응답 데이터를 하나의 배열로 통합
      const combinedData = [...responsesWithTransactionType, ...responsesEtWithTransactionType]
      setLength(combinedData.length)

      return combinedData
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const loadData = async () => {
    try {
      const charge = await fetchData()

      if (Array.isArray(charge)) {
        let combinedArray = charge
        combinedArray.sort((a, b) => {
          let dateA = new Date(a.createdAt)
          let dateB = new Date(b.createdAt)
          return dateB - dateA // 최신 날짜가 배열의 맨 위에 오도록
        })

        if (optionData && options !== "all" && combinedArray) {
          changeOption(options, combinedArray)
        }

        setRows(combinedArray)
      }
    } catch (error) {
      console.error("Error in loadData:", error)
    }
  }

  const tenDaysData = async () => {
    try {
      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION"]

      const headers = {
        Authorization: `${userToken}`, // 토큰을 Authorization 헤더에 추가
      }

      // recharge에 대한 요청
      const responsePromises = statusOptions.map((status) =>
        axios.get(
          `${basicURL}/api/v2/managers/rt/created?startDate=${formattedStartDate}&endDate=${formattedDate}&status=${status}`,
          { headers: headers },
        ),
      )
      const responses = await Promise.all(responsePromises)

      // exchange에 대한 요청
      const responseEtPromises = statusOptions.map((status) =>
        axios.get(
          `${basicURL}/api/v2/managers/et/created?startDate=${formattedStartDate}&endDate=${formattedDate}&status=${status}`,
          { headers: headers },
        ),
      )
      const responsesEt = await Promise.all(responseEtPromises)

      let totalRechargeAmount = 0
      const responsesWithTransactionType = responses.flatMap((response) => {
        return response.data.map((item) => {
          totalRechargeAmount += item.rechargeAmount || 0 // rechargeAmount가 없는 경우를 대비해 0을 더함
          return {
            ...item,
          }
        })
      })

      // responsesEt에 '출금' transactionType 추가 및 exchangeAmount의 총합 계산
      let totalExchangeAmount = 0
      const responsesEtWithTransactionType = responsesEt.flatMap((response) => {
        return response.data.map((item) => {
          totalExchangeAmount += item.exchangeAmount || 0 // exchangeAmount가 없는 경우를 대비해 0을 더함
          return {
            ...item,
          }
        })
      })
      // 두 요청의 응답 데이터를 하나의 배열로 통합
      const combinedData = { rechargeTo: totalRechargeAmount, exchangeTo: totalExchangeAmount }
      setTen(combinedData)
    } catch (error) {
      console.error("Error fetching data:1", error)
    }
  }
  function changeOption(value, totalList) {
    if (value === "all") {
      setOptionData(null)
      setOptions("all")
    } else {
      setOptions(value)
      setOptionData(totalList.filter((row) => row.status === value))
      console.log(totalList.filter((row) => row.status === value))
    }
  }

  useEffect(() => {
    loadData()
    tenDaysData()
  }, [datepick.start, datepick.end])

  useEffect(() => {}, [rows, tenDate.rechargeTo])

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div>전체 충환전 목록 (전체:{totalLength ? totalLength : 0})</div>
            <div>
              10일동안 충전 : {tenDate.rechargeTo && addCommasToNumber(tenDate.rechargeTo)} / 전체 환전 :{" "}
              {tenDate.exchangeTo && addCommasToNumber(tenDate.exchangeTo)}
            </div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"시작일자 :"}
          getDate={handleStartDateChange}
          isStart
        />
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"종료일자 :"}
          getDate={handleEndDateChange}
        />
        <select
          defaultValue="all"
          style={{ marginLeft: "20px", height: "100%" }}
          value={options}
          onChange={(event) => changeOption(event.target.value, rows)}
        >
          <option value="all">전체</option>
          <option value="UNREAD">읽지않음</option>
          <option value="APPROVAL">승인</option>
          <option value="WAITING">대기</option>
          <option value="CANCELLATION">취소</option>
        </select>
      </CustomBar>
      <CustomTable
        columns={filteredColumns}
        checkbox={false}
        rows={optionData ? optionData : rows || []}
        SoltedModel={[{ field: "createdAt", sort: "desc" }]}
      />
    </div>
  )
}
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
