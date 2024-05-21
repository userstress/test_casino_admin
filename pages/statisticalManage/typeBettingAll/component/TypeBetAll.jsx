// 1.공지사항
import CustomHeader from "@components/customHeader/CustomHeader"
import styles from "./TypeBetAll.module.css"
import { useState, useEffect, Ref, useRef } from "react"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import MonthPickerComponent from "@components/monthpicker/MonthPickerComponent"
import { currencyFormatter } from "@utils/formatNumberWithCommas"
import useStore from "@utils/zustand/store"
import { toast } from "react-toastify"
import { useAuthStore } from "@utils/useAuthStore"
import axios from "axios"
import { fetchDate } from "@utils/DayTransform"
import { useRouter } from "next/router"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"
const basicURL = process.env.NEXT_PUBLIC_API_URL

//날짜별 충환 목록

const sxstyle = {
  width: "100%",

  "& .MuiDataGrid-aggregationColumnHeaderLabel": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#3A6287",
    color: "white",
    fontsize: "11px",
    fontSize: "11px",
  },
  "& .MuiDataGrid-columnHeader": {
    textAlign: "center",
    padding: "0",
    justifyContent: "center",
    fontFamily: "SCDream",
  },
  "& .MuiButtonBase-root": {
    color: "black",
    fontFamily: "SCDream",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "10px", //커스텀 폰트 사이즈
    padding: 0, // 빼면안됨 중앙정렬 안댐
    fontFamily: "SCDream",
  },
  "& .MuiDataGrid-cellCheckbox": {
    paddingLeft: "0px",
  },
  ".MuiTablePagination-actions svg ": {
    color: "black",
    width: "10px",
  },
  ".MuiDataGrid-columnHeaderTitleContainer": {
    width: "100%",
    width: "none !important", // width: 1을 제거해야 중앙정렬 가능
  },
  ".MuiDataGrid-cell--textLeft": {
    justifyContent: "center",
  },
  ".MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },
}

const buttonStyle = {
  width: "100px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  justifyContent: "center",
  color: "black",
  border: "0",
  backgroundColor: "#D9D9D9",
  fontSize: "15px",
  cursor: "pointer",
}

const sumStyle = {
  backgroundColor: "green",
  color: "white",
  textAlign: "center",
  width: "100%",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const avgStyle = {
  backgroundColor: "black",
  color: "white",
  textAlign: "center",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const aggrebox = {
  fontWeight: "bold",
  color: "red",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
}
export default function TypeBetAll() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const formattedDate = `${year}-${month}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { userToken } = useAuthStore()
  const { sendRequest } = useAxiosRequest()

  // field name 및 통계 방식 입력.
  const aggres = {
    lv: "sum",
    username: "sum",
    ownerName: "sum",
    ip: "sum",
  }

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: userToken && userToken,
  }

  //  const [apiData, setApiData] = useState(null)

  const apiData = [
    {
      id: 1,
      lv: 10205465656,
      username: 78676767,
      ownerName: 11,
      gubun: "2024-0101T24:00:000",
      ip: 30,
    },
    {
      id: 2,
      lv: 2010101010,
      username: 101010535,
      ownerName: 22,
      gubun: "2024-0101T24:00:000",
      ip: 40,
    },
  ]

  useEffect(() => {}, [datepick.start, datepick.end])

  // 수익률 컬럼은 여기를 사용해서 계산
  // 수익률을 계산하는 함수
  function calculateProfit(row) {
    const sellValue = row.sellValue // 오늘 팔린값
    const buyValue = row.buyValue // 매수값

    if (sellValue !== undefined && buyValue !== undefined) {
      const profit = sellValue - buyValue
      const profitPercentage = (profit / buyValue) * 100 // 수익률 계산 (팔린값에서 매수값을 뺀 후, 매수값으로 나눔)
      return profitPercentage
    }

    return 0 // 팔린값 또는 매수값이 없을 경우 0으로 설정
  }

  // Aggregation 수익률을 계산하는 함수
  function calculateAggregationProfit(rows) {
    let totalProfit = 0
    let totalCount = 0

    rows.forEach((row) => {
      const profitPercentage = calculateProfit(row)
      totalProfit += profitPercentage
      totalCount++
    })

    if (totalCount > 0) {
      return totalProfit / totalCount // 평균 수익률 계산
    }

    return 0 // 행이 없을 경우 0으로 설정
  }

  const columns = [
    {
      field: "gubun",
      headerName: "날짜",
      width: 200,
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        if (params.formattedValue === undefined) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>TOTAL</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "lv",
      headerName: "실시간(베팅)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "username",
      headerName: "실시간(당첨)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",

      aggregation: "sum",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "ownerName",
      headerName: "%",
      width: 200,
      headerAlign: "center",
      type: "number",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          // 앞 실시간 값을 빼야함.
          // aggregation쪽은 모든 실시간의 값으로 구해야함.
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "rechargeAmount",
      headerName: "해외배당(베팅)",
      width: 200,
      headerAlign: "right",
      type: "number",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },

    {
      field: "pre-match",
      headerName: "해외배당(당첨)",
      width: 200,
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "infoes",
      headerName: "%",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "bonus",
      headerName: "해외배당(베팅)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },

    {
      field: "createdAt",
      headerName: "해외배당(당첨)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "ip",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "processedAt",
      headerName: "크로스(베팅)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "site",
      headerName: "크로스(당첨)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "site433",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "processedAt4",
      headerName: "승무패(베팅)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "site4",
      headerName: "승무패(당첨)",
      width: 200,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.aggregation) {
          return (
            <div style={aggrebox}>
              <span style={avgStyle}>{params.formattedValue} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return <span>{params.formattedValue} 원</span>
      },
    },
    {
      field: "site222",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site3",
      headerName: "핸디캡(베팅)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site1213",
      headerName: "핸디캡(당첨)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site2226546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site33124",
      headerName: "슬롯(베팅)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site121553",
      headerName: "슬롯(당첨)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site2226546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site133124",
      headerName: "가상게임(베팅)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site1215533",
      headerName: "가상게임(당첨)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site52226546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site363124",
      headerName: "파워볼(베팅)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site1215563",
      headerName: "파워볼(당첨)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site22264546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site3312524",
      headerName: "E스포츠(베팅)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site14521553",
      headerName: "E스포츠(당첨)",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site22263546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site331204",
      headerName: "홀덤(베팅)-준비중",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site12341553",
      headerName: "홀덤(당첨)-준비중",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "site222677546",
      headerName: "%",
      width: 200,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          console.log(numberWithNoCommas)
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
  ]

  const newColumns = columns.map((col) => {
    return {
      ...col,
      headerAlign: "center",
    }
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  function CustomFooter() {
    const sum = apiData.reduce((acc, row) => acc + row.username, 0)
    const avg = sum / apiData.length
    console.log(sum)
    console.log(avg)
    return (
      <div style={{ padding: "10px", textAlign: "center" }}>
        합계: {sum} | 평균: {avg}
      </div>
    )
  }
  const apiRef = useGridApiRef()

  return (
    <>
      <CustomHeader
        text={
          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <div>타입별 베팅 현황[전체][IN]</div>
              <button>새로고침</button>
            </div>
            <MonthPickerComponent customStyle={{ width: "8vw" }} getDate={setDate} />
            <div className={styles.headerInfoes}>
              <span>
                <label htmlFor="betmoney">베팅금</label>
                <p id="betmoney">12312321312 원</p>
              </span>
              <span>
                <label htmlFor="winmoney">당첨금</label>
                <p id="winmoney">1521312 원</p>
              </span>
              <span>
                <label htmlFor="winmoney">당첨금</label>
                <p id="winmoney">(12312321312-1521312) 원</p>
              </span>
              <span>
                <label htmlFor="winmoney">수익률</label>
                <p id="winmoney">(90) %</p>
              </span>
            </div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <div className={styles.tableContainer}>
        {apiData && (
          <DataGridPremium
            className={styles.gridmaincustom}
            sx={sxstyle}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={30} // 행 높이를 10%로 설정
            columnHeaderHeight={22} // 헤더 높이를 5%로 설정
            aggregationModel={aggres}
            autoHeight={true}
            rows={apiData}
            columns={newColumns}
            slots={{ Footer: CustomFooter, toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 32 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            apiRef={apiRef}
            pagination
            autoPageSize={false}
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
            disableColumnResize={true}
          />
        )}
      </div>
    </>
  )
}
