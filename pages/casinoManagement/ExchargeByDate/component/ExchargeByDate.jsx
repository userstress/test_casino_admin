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
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#3A6287",
    color: "white",
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
    fontSize: "11px", //커스텀 폰트 사이즈
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

const sumStyle = {
  backgroundColor: "green",
  color: "white",
  textAlign: "center",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  height: "30px",
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
  fontSize: "12px",
  borderRight: "solid 1px #808080",
  height: "50px",
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
  const [Mdata, setMdata] = useState({})
  const { userToken } = useAuthStore()
  const { sendRequest } = useAxiosRequest()

  const handleStartDateChange = (startDate) => {
    const month = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1
    setDate({ year: startDate.getFullYear(), month: month })
  }

  function sortingObj(datas, dates) {
    const 분류 = Object.entries(datas).reduce(
      (acc, [key, value]) => {
        const type = typeof value
        if (type === "object") {
          acc.daily[key] = value
        } else {
          acc.others[key] = value
        }
        return acc
      },
      { daily: {}, others: {} },
    )
    const keys = Object.keys(분류.daily)
    const length = Object.keys(분류.daily.dailyProfitRate).length // dailyProfitRate의 길이를 기준으로 함
    let result = [] // result 변수 초기화

    for (let i = 1; i <= length; i++) {
      const item = { date: `${dates.year}-${dates.month}-${i < 10 ? "0" + i : i}` } // date 생성
      keys.forEach((key) => {
        item[key] = datas[key][i] || null // datas 사용
      })
      result.push(item)
    }

    return { dailyData: result, monthlyData: 분류.others }
  }

  function changePage(month, year) {
    const method = "GET"
    const url = `/api/v2/managers/transform/statistics?month=${datepick.year}-${datepick.month}`
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
        const value = responseData.data
        const { dailyData, monthlyData } = sortingObj(value, datepick)
        setData(dailyData)
        setMdata(monthlyData)
      }

      return false
    })

    return null
  }
  useEffect(() => {
    if (router.isReady) {
      changePage(datepick.month, datepick.year)
    }
  }, [router.isReady, datepick]) // 의존성 배열에 router.isReady 추가

  const columns = [
    {
      field: "date",
      headerName: "날짜",
      flex: 1.5,
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue
      },
    },
    {
      field: "toCasino",
      headerName: "카지노머니로 전환 금액",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // 여기서 집계 행을 확인하고, 해당하는 경우 커스텀 렌더링을 적용합니다.

        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue ? `${params.formattedValue} 원` : "0원"
      },
    },
    {
      field: "toCasinoCount",
      headerName: "카지노 머니로 전환 건수",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} 건` : "0건"
      },
    },
    {
      field: "toCasinoAverage",
      headerName: "카지노 머니로 전환 평균 금액",
      flex: 2,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} 원` : "0원"
      },
    },

    {
      field: "toSports",
      headerName: "보유 머니로 전환 금액",
      flex: 2,
      align: "center",
      type: "number",

      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} 원` : "0원"
      },
    },
    {
      field: "toSportsCount",
      headerName: "보유 머니로 전환 건수",
      flex: 2,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} 건` : "0건"
      },
    },
    {
      field: "toSportsAverage",
      headerName: "보유 머니로 전환 평균 금액",
      flex: 2,
      align: "center",
      type: "number",

      renderCell: (params) => {
        // 일반 행의 경우 기본 렌더링을 적용합니다.
        return params.formattedValue ? `${params.formattedValue} 원` : "0원"
      },
    },

    {
      field: "toCasinoMinusToSports",
      headerName: "카지노 머니로 전환액 - 보유 머니로 전환액 = 차액",
      flex: 4,
      align: "center",
      type: "number",

      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} 원` : "0원"
      },
    },
    // 수익률 합산 = 충-환전 차액 평균/충전금액 합산
    {
      field: "dailyProfitRate",
      headerName: "수익률",
      flex: 1,
      align: "center",
      type: "number",

      renderCell: (params) => {
        return params.formattedValue ? `${params.formattedValue} %` : "0%"
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
          {Mdata && (
            <section className={styles.aggregationBox}>
              <div style={aggrebox}>
                <span style={sumStyle}>총합산(충전,환전)</span>
                <span
                  style={{
                    ...avgStyle,
                    display: "flex",
                    flexDirection: "column",
                    margin: "0",
                    padding: "0",
                    height: "50%",
                    fontSize: "10px",
                  }}
                >
                  <p
                    style={{
                      display: "content",
                      margin: "0",
                      padding: "0",
                      height: "45%",
                    }}
                  >
                    총합
                  </p>
                  <p
                    style={{
                      display: "content",
                      margin: "0",
                      padding: "0",
                      height: "50%",
                    }}
                  >
                    (평균[차액,수익률]은 총합)
                  </p>
                </span>
              </div>

              <div style={aggrebox}>
                <span style={sumStyle}>{addCommasToNumber(Mdata.totalToCasino)}</span>
                <span style={avgStyle}>{Mdata.totalToCasinoAverage} 원</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>{Mdata.totalToCasinoCount} 건</span>
                <span style={avgStyle}>{Mdata.averageToCasinoCount} 건</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>{Mdata.totalToSportsAverage} 원</span>
                <span style={avgStyle}>&nbsp;</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>{addCommasToNumber(Mdata.totalToSports)}</span>
                <span style={avgStyle}>{Mdata.totalToSportsAverage} 원</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>{Mdata.totalToSportsCount} 건</span>
                <span style={avgStyle}>{Mdata.averageToSportsCount} 건</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>&nbsp;</span>
                <span style={avgStyle}>&nbsp;</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>&nbsp;</span>
                <span style={avgStyle}>{Mdata.totalToCasinoMinusToSports}원</span>
              </div>
              <div style={aggrebox}>
                <span style={sumStyle}>&nbsp;</span>
                <span style={avgStyle}>{Mdata.monthlyAverageProfitRate}</span>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
