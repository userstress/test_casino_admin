import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./DifferStatics.module.css"
import MonthPickerComponent from "@components/monthpicker/MonthPickerComponent"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { useState, useEffect } from "react"
import {
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
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/router"
import DayTransform from "@utils/DayTransform"
import {
  addCommasToNumber,
  addCommasToNumber2,
  addCommasToNumberDong,
  addCommasToNumberFree,
} from "@utils/formatNumberWithCommas"
import { useDifferStastic } from "@utils/useDifferStastic"

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
  const mytoken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const { getdateData } = useDifferStastic()
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const [data, setData] = useState()

  function boardRequest() {
    const method = "GET"
    const url = `/api/v2/managers/difference-statistic/list?date=${datepick.start}`
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

  function deleteLog(event, params) {
    const method = "DELETE"
    const url = `/api/v2/managers/difference-statistic/delete/${params.row.id}`
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
        toast.success("삭제완료")
        boardRequest()
      }
    })
  }

  useEffect(() => {
    boardRequest()
  }, [datepick.start])

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

  function moveToDetail() {
    getdateData(datepick.start)
    router.push("/statisticalManage/DepositManagements")
  }
  const nomalbtn = {
    width: "80%",
    height: "22px",
    backgroundColor: "#808080",
    color: "white",
    borderRadius: "4px",
    border: "none",
    padding: 0,
    fontSize: "12px",
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
    {
      field: "createdAt",
      headerName: "시간",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "currentSportsBalance",
      headerName: "보유캐시",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "currentPoint",
      headerName: "보유포인트",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber2(params.formattedValue)
      },
    },
    {
      field: "totalBet",
      headerName: "배당금액",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "frontAccount",
      headerName: "앞방",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "middleAccount",
      headerName: "중간방",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "backAccount",
      headerName: "뒷방",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "totalAccount",
      headerName: "합산금액(앞중뒤)",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },

    {
      field: "danpole3",
      headerName: "계좌상세",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <button style={nomalbtn} type="button" onClick={() => moveToDetail()}>
              계좌상세
            </button>
          </div>
        )
      },
    },
    {
      field: "operatingExpense",
      headerName: "운영비",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "wonExchange",
      headerName: "원환전",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "commission",
      headerName: "수수료",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "dongExchange",
      headerName: "동환전",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumberDong(params.formattedValue)
      },
    },
    {
      field: "bigo",
      headerName: "비고",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "userCount",
      headerName: "회원수",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumberFree(params.formattedValue) + "명"
      },
    },
    {
      field: "totalRecharge",
      headerName: "충전",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "totalExchange",
      headerName: "환전",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "subtract",
      headerName: "충-환",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },
    {
      field: "difference",
      headerName: "차액",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
      },
    },

    {
      field: "daqwle187",
      headerName: "삭제",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <button style={delstyle} type="button" onClick={() => deleteLog(event, params)}>
              삭제
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <CustomHeader text={"차액 통계 목록"} customStyle={{ height: "1.979vw", width: "100%" }}>
        <div className={styles.statics}>수익 : 294,793원 오차 합계 : 3,306,000원</div>
      </CustomHeader>
      <CustomBar customStyle={{ padding: "0.260vw 0", width: "100%" }}>
        <div className={styles.customBarInner}>
          <DatePickerComponent
            getDate={handleStartDateChange}
            customStyle={{ width: "300px", justifyContent: "center" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <div className={styles.boxContainer}>
          <DataGridPremium
            className={styles.gridmaincustom}
            sx={sxstyle}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={30} // 행 높이를 10%로 설정
            columnHeaderHeight={22} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={data || []}
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
        </div>
      </div>
    </>
  )
}
