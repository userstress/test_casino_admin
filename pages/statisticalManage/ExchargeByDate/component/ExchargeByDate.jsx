// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ExchargeByDate.module.css"
import MonthPickerComponent from "@components/monthpicker/MonthPickerComponent"
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
import { currencyFormatter } from "@utils/formatNumberWithCommas"
import { toast } from "react-toastify"
import { useAuthStore } from "@utils/useAuthStore"
import { useRouter } from "next/router"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import parseDateString from "@utils/MonthForApi"

const basicURL = process.env.NEXT_PUBLIC_API_URL
/**
 *  한국 시간대를 고려한 해당 월의 마지막 날짜를 구함
 *
 */
function generateCurrentMonthDatesKST(year, month) {
  const lastDayOfMonth = new Date(Date.UTC(year, month, 0, 9)).getUTCDate()
  return lastDayOfMonth
}

const sxstyle = {
  width: "100%",

  "& .MuiDataGrid-aggregationColumnHeaderLabel": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#3A6287",
    color: "white",
    fontsize: "13px",
    fontSize: "13px",
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
    fontSize: "12px", //커스텀 폰트 사이즈
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
    flex: "none !important", // flex: 1을 제거해야 중앙정렬 가능
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
  height: "50%",
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
/**
 *  datePicker로 선택한 날짜가
 *  오늘 날짜와 같으면 오늘 날짜 까지만 랜더링,
 *  이전 날짜(과거)라면 전체 날짜 랜더링,
 *  이후 날짜(미래)라면 랜더링 안함
 *  이 함수는 api요청 함수의 응답값 배열 slice함수의 인자로 들어감
 */
const matchDate = (datePickerYear, datePickerMonth) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = Number(today.getMonth() + 1)
  const date = today.getDate()
  // month : 오늘 날짜
  // datePickerMonth : react-datePicker로 선택한 날짜
  if (month === datePickerMonth && year === datePickerYear) {
    return date
  } else if (year > datePickerYear || month > datePickerMonth) {
    return generateCurrentMonthDatesKST(datePickerYear, datePickerMonth)
  } else if (year < datePickerYear || month < datePickerMonth) {
    return 0
  }
}
export default function ExchargeByDate() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const date = today.getDate()
  const formattedDate = `${year}-${month}`
  const [datepick, setDate] = useState({ year: year, month: month })
  const [apiData, setData] = useState()
  const { userToken } = useAuthStore()
  const { sendRequest } = useAxiosRequest()
  const aggres = {
    exchangeCount: "sum",
    firstRechargeCount: "sum",
    netRechargeAmount: "sum",
    point: "sum",
    totalRechargeAmount: "sum",
    totalExchangeAmount: "sum",
    date: "sum",
    rechargeCount: "sum",
    averageRechargeAmount: "sum",
    averageExchangeAmount: "sum",
    revenueRate: "sum",
  }

  const handleStartDateChange = (startDate) => {
    setDate({ year: startDate.getFullYear(), month: startDate.getMonth() + 1 })
  }

  function changePage(month, year) {
    const method = "GET"
    const url = `api/v2/managers/statistics/daily?month=${month}&year=${year}`
    const headers = { Authorization: userToken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("잘못된 요청입니다.")
      } else if (errorStatus === 400) {
        return toast.warn("잘못된 요청입니다.", {})
      } else if (errorStatus === 403 || errorStatus === 401) {
        return toast.warn("로그인을 다시 해 주세요", {
          onClose: () => router.push("/"),
        })
      } else if (errorStatus === 404) {
        return toast.warn("서버의 응답이 없습니다.", {})
      } else if (!errorStatus && responseData) {
        const datesArray = Object.values(responseData.data).slice(0, matchDate(year, Number(month)))
        const updatedDates = datesArray.map((array, index) => {
          return { ...array, date: `${year}/${String(month).padStart(2, 0)}/${String(index + 1).padStart(2, 0)}` }
        })

        // map 함수 호출 후 로그 추가

        setData(updatedDates)
      }

      return false
    })

    return null
  }
  useEffect(() => {
    if (router.isReady) {
      changePage(datepick.month, datepick.year)
    }
    // if (router.isReady) {
    //   changePage(datepick)
    //   const intervalId = setInterval(() => {
    //     changePage(datepick)
    //   }, 5000) // 5초마다 changePage 실행
    //   return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
    // }
  }, [router.isReady, datepick]) // 의존성 배열에 router.isReady 추가

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
      field: "date",
      headerName: "날짜",
      flex: 3.5,
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        if (params.formattedValue === undefined) {
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>총합산(충전,환전)</span>
              <span style={avgStyle}>총합(평균[차액,수익률]은 총합)</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "firstRechargeCount",
      headerName: "첫충전 건수",
      flex: 2,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          let total = 0
          let count = 0

          apiData.forEach((item) => {
            if (item && item.firstRechargeCount !== undefined) {
              const value = Number(item.firstRechargeCount)
              if (!isNaN(value)) {
                total += value
                count++
              }
            }
          })

          const average = count > 0 ? total / count : 0

          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{null}</span>
              <span style={avgStyle}>{average.toFixed(2)} 건</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "totalRechargeAmount",
      headerName: "충전금액",
      flex: 3,
      type: "number",
      headerAlign: "center",
      align: "center",
      aggregation: "sum",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${params.formattedValue} 원`
      },
    },
    {
      field: "rechargeCount",
      headerName: "충전 건수",
      flex: 1.71,
      headerAlign: "center",
      type: "number",
      align: "center",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          let total = 0
          let count = 0

          apiData.forEach((item) => {
            if (item && item.rechargeCount !== undefined) {
              const value = Number(item.rechargeCount)
              if (!isNaN(value)) {
                total += value
                count++
              }
            }
          })

          const average = count > 0 ? total / count : 0
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 건</span>
              <span style={avgStyle}>{average.toFixed(2)} 건</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "averageRechargeAmount",
      headerName: "충전 평균 금액",
      flex: 3.3,
      headerAlign: "center",
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          let total = 0
          let count = 0

          apiData.forEach((item) => {
            const value = parseFloat(Number(item.averageRechargeAmount))
            if (!isNaN(value)) {
              total += value
              count++
            }
          })

          const average = count > 0 ? total / count : 0
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{total} 원</span>
              <span style={avgStyle}>{currencyFormatter(average)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },

    {
      field: "totalExchangeAmount",
      headerName: "환전",
      flex: 3,
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
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 원</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${params.formattedValue} 원`
      },
    },
    {
      field: "exchangeCount",
      headerName: "환전 건수",
      flex: 2,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          let total = 0
          let count = 0

          apiData.forEach((item) => {
            if (item && item.exchangeCount !== undefined) {
              const value = Number(item.exchangeCount)
              if (!isNaN(value)) {
                total += value
                count++
              }
            }
          })

          const average = count > 0 ? total / count : 0
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} 건</span>
              <span style={avgStyle}>{average.toFixed(2)} 건</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "averageExchangeAmount",
      headerName: "환전 평균 금액",
      flex: 3,
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
          return null
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${currencyFormatter(params.row.totalExchangeAmount / params.row.exchangeCount || 0)} 원`
      },
    },

    {
      field: "netRechargeAmount",
      headerName: "충-환전 차액",
      flex: 3,
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
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{null}</span>
              <span style={avgStyle}>{currencyFormatter(result)} 원</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${params.formattedValue} 원`
      },
    },
    // 수익률 합산 = 충-환전 차액 평균/충전금액 합산
    {
      field: "revenueRate",
      headerName: "수익률",
      flex: 3,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        const numberWithNoCommas = params.formattedValue
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue
          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          const [rechargeAmountSum, setRechargeAmountSum] = useState(0)
          const [rechargeDiffExchangeAvg, setRechargeDiffExchangeAvg] = useState(0)

          useEffect(() => {
            if (apiData) {
              const 충환전합산 = apiData.reduce((acc, row) => acc + row.totalRechargeAmount, 0)
              const 충환전차액합산 = apiData.reduce((acc, row) => acc + row.netRechargeAmount, 0)
              setRechargeAmountSum(충환전합산)
              setRechargeDiffExchangeAvg((충환전차액합산 / date).toFixed(0))
              console.log(충환전합산)
              console.log((충환전차액합산 / date).toFixed(0))
            }
          }, [apiData])
          return (
            <>
              {
                <div style={aggrebox}>
                  <span style={sumStyle}>{null}</span>
                  <span style={avgStyle}>{((rechargeDiffExchangeAvg / rechargeAmountSum) * 100).toFixed(2)}%</span>
                </div>
              }
            </>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${params.formattedValue}%`
      },
    },
    {
      field: "point",
      headerName: "포인트지급",
      flex: 3,
      align: "center",
      type: "number",

      // sortComparator: dateSortComparator,
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.
        if (params.aggregation) {
          // 이 경우, params.value에는 집계 결과 값이 포함되어 있을 것입니다.
          // 커스텀 렌더링 로직을 여기에 추가합니다.
          const numberWithNoCommas = params.formattedValue.replace(/,/g, "")

          const denominator = Number(apiData.length)
          const result = denominator === 0 ? "분모는 0일 수 없습니다." : numberWithNoCommas / denominator
          return (
            <div style={aggrebox}>
              <span style={sumStyle}>{params.formattedValue} P</span>
              <span style={avgStyle}>{null}</span>
            </div>
          )
        }

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return `${params.formattedValue} p`
      },
    },
    {
      field: "site",
      headerName: "카지노 이벤트 지급",
      flex: 3,
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
    return (
      <div style={{ padding: "10px", textAlign: "center" }}>
        합계: {sum} | 평균: {avg}
      </div>
    )
  }
  const apiRef = useGridApiRef()

  return (
    <>
      <CustomHeader text={"날짜별 충환 목록"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.customBarInner}>
          <MonthPickerComponent customStyle={{ width: "300px" }} getDate={handleStartDateChange} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <div className={styles.boxContainer}>
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
              rows={apiData ? apiData : []}
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
              getRowId={(row) => row.date}
            />
          )}
        </div>
      </div>
    </>
  )
}
