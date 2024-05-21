import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import CustomTable from "@components/customTable/CustomTable"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import Layout from "@components/Layout"
import React, { useState, useEffect } from "react"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import axios from "axios"
import { addNineHoursAndFormatCorrectly } from "@utils/DayTransform"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

export default function index() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const userToken = getCookie("token")
  const [apiData, setData] = useState()

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const fetchData = async () => {
    try {
      const statusOptions = ["스포츠머니 -> 카지노머니로 전환"]

      const headers = {
        Authorization: userToken, // 토큰을 Authorization 헤더에 추가
      }

      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios.get(
            `https://dailymodelapp.com/api/v2/managers/ct?startDate=${datepick.start}&endDate=${datepick.end}`,
            {
              headers,
            },
          ),
        ),
      )
      const apiDataCombined = [...responses[0]?.data?.data]
      const filteredArray = apiDataCombined.filter((item) => item.description === "스포츠머니 -> 카지노머니로 전환")

      setData(filteredArray)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [datepick])

  function sendingNote(event, params) {
    event.preventDefault()
    event.stopPropagation()
    return window.open(`/sendingNote?userId=${params?.row?.user?.id}`, "쪽지", "width=1024, height=500")
  }
  function addHoursAndFormat(dateStr, hoursToAdd) {
    // 날짜와 시간을 분리
    if (!dateStr) {
      return ""
    }
    let [datePart, timePart] = dateStr.split(" T ")
    let [hour, minute, second] = timePart.split(":")

    // 시간을 숫자로 변환하고 시간을 추가
    hour = parseInt(hour, 10) + hoursToAdd

    // 시간이 24시를 넘어가면 날짜 조정
    if (hour >= 24) {
      hour -= 24
      // ISO 날짜 포맷을 사용해서 날짜를 하루 더함
      const fullDate = new Date(datePart)
      fullDate.setDate(fullDate.getDate() + 1)
      datePart = fullDate.toISOString().split("T")[0]
    }

    // 시간, 분, 초를 두 자리 문자열로 조정
    hour = hour.toString().padStart(2, "0")
    minute = minute.padStart(2, "0")
    second = second.padStart(2, "0")

    // 최종적으로 변환된 문자열 반환
    return `${datePart} ${hour}:${minute}:${second}`
  }

  const columns = [
    {
      field: "username",
      headerName: "ID",
      flex: 0.8,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return params?.row?.user?.username
      },
    },
    {
      field: "nickname",
      headerName: "닉네임",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.user?.nickname
      },
    },
    {
      field: "description",
      headerName: "종류",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return "처리됨"
      },
    },
    {
      field: "usedSportsBalance",
      headerName: "신청금액",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isCasinoToS = params.row.description === "카지노머니 -> 스포츠머니로 전환"
        return (
          <div style={{ marginRight: "5px" }}>
            {isCasinoToS
              ? addCommasToNumber(params.row.usedCasinoBalance)
              : addCommasToNumber(params.row.usedSportsBalance)}
            {/* {params.row.usedSportsBalance}
            &nbsp;
            {params.row.usedCasinoBalance} */}
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "신청일시",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addHoursAndFormat(params.row.createdAt || params.row.processedAt, 9)
      },
    },
    {
      field: "processedAt",
      headerName: "처리일시",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addHoursAndFormat(params.formattedValue, 9)
      },
    },
    { field: "ip", headerName: "아이피", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "memo", headerName: "메모", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "remainingCasinoBalance",
      headerName: "후잔고 카지노 머니",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={{ marginRight: "5px" }}>{addCommasToNumber(params.formattedValue)}</div>
      },
    },
    {
      field: "exchangeDong",
      headerName: "쪽지",
      flex: 0.8,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <button
            style={{ width: "50%", border: "none", color: "white", backgroundColor: "#225F8B", borderRadius: "4px" }}
            onClick={() => sendingNote(event, params)}
          >
            쪽지
          </button>
        )
      },
    },
  ]

  const rows = []
  return (
    <div>
      <CustomHeader
        text={
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div>스포츠 → 카지노 목록 (전체:{apiData ? apiData.length : "0"})</div>
            {/* <div>10일동안 충/환전 : 24,307,000원 전체 충/환전 : 888,576,000원</div> */}
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
        />
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"종료일자 :"}
          getDate={handleEndDateChange}
        />
      </CustomBar>
      <CustomTable
        columns={columns}
        rows={apiData ? apiData : []}
        checkbox={false}
        SoltedModel={[
          {
            field: "processedAt",
            sort: "desc",
          },
        ]}
      />
    </div>
  )
}
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
