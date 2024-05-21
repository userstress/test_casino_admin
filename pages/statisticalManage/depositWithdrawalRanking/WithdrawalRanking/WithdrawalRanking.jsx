import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./WithdrawalRanking.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
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
    flex: "none !important", // flex: 1을 제거해야 중앙정렬 가능
  },
  ".MuiDataGrid-cell--textLeft": {
    justifyContent: "center",
  },
  ".MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },
}

export default function DifferStatics() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { userToken } = useAuthStore()
  const { sendRequest } = useAxiosRequest()

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: userToken && userToken,
  }

  //  const [apiData, setApiData] = useState(null)

  const apiData = [
    {
      id: 1,
      lv: 1020,
      username: 78676767,
      ownerName: 11,
      gubun: "2024-0101T24:00:000",
      ip: 30,
    },
    {
      id: 2,
      lv: 20,
      username: 101010535,
      ownerName: 22,
      gubun: "2024-0101T24:00:000",
      ip: 40,
    },
  ]

  useEffect(() => {}, [datepick.start])

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

  const apiRef = useGridApiRef()

  const nomalbtn = {
    width: "80%",
    height: "22px",
    backgroundColor: "#808080",
    color: "white",
    borderRadius: "4px",
    border: "none",
    padding: 0,
  }

  const delstyle = {
    width: "80%",
    height: "22px",
    backgroundColor: "#FF0000",
    color: "white",
    borderRadius: "4px",
    border: "none",
    padding: 0,
  }
  const columns = [
    { field: "no", headerName: "No.", flex: 0.5, headerAlign: "center", align: "center" },
    { field: "lv", headerName: "Lv.", flex: 0.5, headerAlign: "center", align: "center" },
    {
      field: "evil",
      headerName: "상태",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const ifBad = params.formattedValue
        return <div style={{ textAlign: "center", color: "red" }}>{ifBad ? "악성" : null}</div>
      },
    },
    { field: "username", headerName: "아이디", flex: 1.5, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네암", flex: 1.5, headerAlign: "center", align: "center" },
    { field: "name", headerName: "예금주", flex: 1, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "연락처", flex: 1.5, headerAlign: "center", align: "center" },
    { field: "refferer", headerName: "총판", flex: 1, headerAlign: "center", align: "center" },
    { field: "domain", headerName: "매장", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "charge",
      headerName: "충전금액",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "charge",
      headerName: "신청일",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "charge",
      headerName: "확인일",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "c3harge",
      headerName: "상태",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // 값에따라 수정필요
        return params.formattedValue
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const handlechVal = (event, count) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

        const inputSS = {
          width: "45px",
          marginLeft: "1px",
          marginRight: "1px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              쪽지
            </button>
          </>
        )
      },
    },
  ]
  const rows = [
    {
      id: 1,
      no: "2",
      normal: "머니",
      evil: "당첨금 수동 지급",
      bad: "올리기  내리기",
      danpole: "삭제",
    },
    {
      id: 2,
      no: "2",
      normal: "머니",
      evil: "보유머니 차감금 재지급",
      bad: "올리기  내리기",
      danpole: "삭제",
    },
  ]

  return (
    <>
      <CustomHeader text={"폴더별 손익 현황"} customStyle={{ height: "1.979vw", width: "100%" }}>
        <div className={styles.statics}>수익 : 294,793원 오차 합계 : 3,306,000원</div>
      </CustomHeader>
      <CustomBar customStyle={{ padding: "0.260vw 0", width: "100%" }}>
        <div className={styles.customBarInner}>
          <DatePickerComponent
            text={"시작일자:"}
            getDate={handleStartDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
          <DatePickerComponent
            text={"종료일자:"}
            getDate={handleEndDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
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
              rowHeight={22} // 행 높이를 10%로 설정
              columnHeaderHeight={22} // 헤더 높이를 5%로 설정
              autoHeight={true}
              rows={apiData}
              columns={columns}
              slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
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
      </div>
    </>
  )
}
