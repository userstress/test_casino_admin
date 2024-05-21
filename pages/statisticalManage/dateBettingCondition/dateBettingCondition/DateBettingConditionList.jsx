// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import MonthPickerComponent from "@components/monthpicker/MonthPickerComponent"
import { datePickerTransMonth } from "@utils/REST/LIST/datePickerTrans"
import styles from "./DateBettingConditionList.module.css"
import { useGridApiRef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  DataGrid,
  GridRow,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

export default function DateBettingConditionList() {
  const [rows, setRows] = useState()
  const [statics, setStatics] = useState()
  const aggregateStyle = {
    width: "100%",
    height: "100%",
    background: "#3A6287",
    color: "white",
    paddingRight: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  }
  const columns = [
    {
      field: "id",
      headerName: "날짜",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id.includes("auto-generated-group")) {
          return (
            <div
              style={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#1565c0",
                width: "100%",
                height: "100%",
                background: "#3A6287",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              TOTAL
            </div>
          )
        } else {
          return <div>{params.formattedValue}</div>
        }
      },
    },
    {
      field: "dailyRechargeTotals",
      headerName: "충전",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 원</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 원</div>
      },
    },
    {
      field: "dailyExchangeTotals",
      headerName: "환전",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 원</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 원</div>
      },
    },
    {
      field: "dailyDifferenceAmounts",
      headerName: "차액",
      flex: 2,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 원</div>
        }

        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 원</div>
      },
    },
    {
      field: "dailyRevenueRates",
      headerName: "수익율",
      flex: 2,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          if (statics?.monthlyRevenueRate === undefined) {
            return <div>로딩 중...</div>
          }
          return <div style={aggregateStyle}>{statics.monthlyRevenueRate} %</div>
        }

        return <div style={{ marginRight: "10px" }}>{params.formattedValue} %</div>
      },
    },
    {
      field: "dailyDebitTotals",
      headerName: "베팅금액",
      flex: 2,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          // console.log(params)

          return <div style={aggregateStyle}>{params.formattedValue} 원</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 원</div>
      },
    },
    {
      field: "dailyBetRewardTotals",
      headerName: "베팅배당",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          // console.log(params)

          return <div style={aggregateStyle}>{Math.floor(params.formattedValue)} 원</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 원</div>
      },
    },
    {
      field: "dailyPointTotals",
      headerName: "포인트",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} P</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} p</div>
      },
    },
    {
      field: "dailyCustomerCenterPosts",
      headerName: "고객센터",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 건</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 건</div>
      },
    },
    {
      field: "dailyArticlePosts",
      headerName: "게시판",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 건</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 건</div>
      },
    },
    {
      field: "dailyJoinTotals",
      headerName: "가입",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 건</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 건</div>
      },
    },
    {
      field: "dailyRechargeCounts",
      headerName: "실입금자수",
      flex: 1,
      headerAlign: "center",
      align: "right",
      type: "number",
      renderCell: (params) => {
        if (params.aggregation) {
          return <div style={aggregateStyle}>{params.formattedValue} 명</div>
        }
        return <div style={{ marginRight: "10px" }}>{params.formattedValue} 명</div>
      },
    },
  ]
  const aggres = {
    dailyRechargeTotals: "sum",
    dailyExchangeTotals: "sum",
    dailyDifferenceAmounts: "sum",
    dailyRevenueRates: "sum",
    dailyDebitTotals: "sum",
    dailyPointTotals: "sum",
    dailyCustomerCenterPosts: "sum",
    dailyArticlePosts: "sum",
    dailyJoinTotals: "sum",
    dailyRechargeCounts: "sum",
    dailyBetRewardTotals: "sum",
  }

  const betCountRefs = useGridApiRef()
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedYearMonth = today.toISOString().split("T")[0].slice(0, 7)
  const [datepick, setDate] = useState({ start: formattedYearMonth, end: "" })

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTransMonth(startDate) })
  }

  const takeList = () => {
    // event.preventDefault()
    const month = datepick.start.substr(-2)
    const year = datepick.start.substr(0, 4)
    const method = "GET"
    const url = `/api/v2/managers/monthly-totals/${year}/${month.replace("0", "")}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        const val = responseData.data

        // 날짜별 데이터를 저장할 배열 초기화
        let dailyDataArray = []

        // 1일부터 31일까지 반복
        for (let day = 1; day <= 31; day++) {
          // 각 날짜에 대한 데이터 객체 생성
          const dailyData = {
            id: `${year}-${month.padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
          }

          // val 객체 내의 각 키(데이터 포인트)에 대해 반복하여 값을 추가합니다.
          Object.keys(val).forEach((key) => {
            dailyData[key] = val[key][day] !== undefined ? val[key][day] : 0
          })

          // 배열에 날짜별 데이터 객체 추가
          dailyDataArray.push(dailyData)
        }

        console.log(val)
        const static1 = {
          monthlyArticlePostsTotal: val.monthlyArticlePostsTotal,
          monthlyCustomerCenterPostsTotal: val.monthlyCustomerCenterPostsTotal,
          monthlyDebitTotal: val.monthlyDebitTotal,
          monthlyDifferenceAmount: val.monthlyDifferenceAmount,
          monthlyExchangeTotal: val.monthlyExchangeTotal,
          monthlyJoinTotal: val.monthlyJoinTotal,
          monthlyPointTotal: val.monthlyPointTotal,
          monthlyRechargeCountTotal: val.monthlyRechargeCountTotal,
          monthlyRechargeTotal: val.monthlyRechargeTotal,
          monthlyRevenueRate: val.monthlyRevenueRate,
          monthlyBetRewardTotal: val.monthlyBetRewardTotal.toFixed(2),
        }
        setRows(dailyDataArray) // 최종 날짜별 데이터 배열 출력
        setStatics(static1)
      }
    })
  }

  useEffect(() => {
    takeList()
  }, [datepick.start])

  useEffect(() => {}, [rows, statics])

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

  return (
    <>
      <CustomHeader text={"날짜별 베팅현황"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar customStyle={{ display: "flex", justifyContent: "flex-start" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer1}>
            <button style={{ background: "#D9D9D9", width: "4vw", border: "none" }} onClick={() => takeList()}>
              새로고침
            </button>
          </div>
          <div className={styles.boxContainer2} title="해당 월에 맞춰 무작위 일을 선택하면 월이 표기됩니다">
            <MonthPickerComponent isMonth={true} getDate={handleStartDateChange} />
          </div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        {statics && (
          <DataGridPremium
            apiRef={betCountRefs}
            columns={columns}
            rows={rows}
            showCellVerticalBorder
            showColumnVerticalBorder
            // aggregationModel={aggres}
            rowHeight={25} // 행 높이를 10%로 설정
            columnHeaderHeight={25} // 헤더 높이를 5%로 설정
            pagination
            pageSizeOptions={[31]}
            sx={{
              width: "100%",

              "& .MuiDataGrid-overlay": {
                zIndex: 1,
                position: "relative",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3A6287",
                color: "white",
                fontsize: "12px",
                fontSize: "12px",
              },
              "& .MuiDataGrid-columnHeader": {
                textAlign: "center",
                padding: "0",
                justifyContent: "center",
                fontFamily: "SCDream",
              },
              // ".MuiTablePagination-root": {
              //   zIndex: "99999999",
              // },
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
              ".MuiDataGrid-main": {
                overflow: "visible !important",
              },
              ".MuiDataGrid-main > div:nth-child(3)": {
                display: "none !important",
              },
              ".MuiDataGrid-virtualScroller": {
                overflow: "visible !important",
                overflowY: "visible !important",
              },
              ".MuiDataGrid-footerContainer": {
                display: "none",
              },
            }}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            disableColumnResize={true}
            checkboxSelection={false}
            // autoPageSize={true}
          />
        )}
        {statics && (
          <section className={styles.aggreGate}>
            <div>TOTAL</div>

            <div>{addCommasToNumber(statics.monthlyRechargeTotal)}</div>

            <div>{addCommasToNumber(statics.monthlyExchangeTotal)}</div>

            <div>{addCommasToNumber(statics.monthlyDifferenceAmount)}</div>

            <div>{statics.monthlyRevenueRate}%</div>

            <div>{addCommasToNumber(statics.monthlyDebitTotal)}</div>

            <div>{addCommasToNumber(statics.monthlyDifferenceAmount)}</div>

            <div>{addCommasToNumber(statics.monthlyPointTotal)}</div>

            <div>{statics.monthlyCustomerCenterPostsTotal}건</div>
            <div>{statics.monthlyArticlePostsTotal}건</div>
            <div>{statics.monthlyJoinTotal}건</div>
            <div>{statics.monthlyRechargeCountTotal}건</div>
          </section>
        )}
      </div>
    </>
  )
}
