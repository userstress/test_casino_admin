// 1.공지사항
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DayTransformMinit from "@utils/DayTransformMinit"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import { useEffect, useState } from "react"
import styles from "./ExpList.module.css"
import rendercellCopy from "@utils/Tables/rendercellCopy"
import { addCommasToNumber3 } from "@utils/formatNumberWithCommas"
import { useRouter } from "next/router"
import useStore from "@utils/zustand/store"
import { useAuthStore } from "@utils/useAuthStore"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import CustomButton from "@components/customButton/CustomButton"
import { toast } from "react-toastify"
import axios from "axios"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function ExpList() {
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()
  const [selectionModel, setSelectionModel] = useState([])
  const [noteAdd, setNote] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(0)
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const columns = [
    { field: "id", headerName: "번호.", flex: 0.5 },
    { field: "username", headerName: "아이디", flex: 3, align: "center", renderCell: rendercellCopy() },
    { field: "nickname", headerName: "닉네임", flex: 2.9, align: "center" },
    { field: "Exp", headerName: "경험치", flex: 1, align: "center" },
    { field: "Ip", headerName: "IP", flex: 2.3 },
    { field: "contents", headerName: "내용", flex: 2.3 },
    {
      field: "date",
      type: "number",
      headerName: "일시",
      flex: 1,
      flex: 2.3,
      align: "right",
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0} P
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "등록일",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },

    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 0.7,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const { ids, getUserIds } = useStore()

        const handleClick = (event) => {
          event.preventDefault()
          event.stopPropagation()
          console.log(params.row.id)
          window.open(`/sendingNote?userId=${params?.row?.id}`, "쪽지", "width=1024, height=500")
        }
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => handleClick(event)}>
              쪽지
            </button>
          </>
        )
      },
    },
  ]
  const newColumns = columns.map((col) => {
    return {
      ...col,
      headerAlign: "center",
    }
  })
  const [apiData, setApiData] = useState(null)
  const { userToken } = useAuthStore()
  const { userList, callUserList } = getUserList()
  const [accountId, setAccoutid] = useState()

  // useEffect를 사용하여 userList가 업데이트 될 때마다 apiData를 설정
  useEffect(() => {
    if (userList) {
      setApiData(userList)
    }
  }, [userList])

  // callUserList 함수가 비동기 함수인 경우
  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        await callUserList(userToken)
      }
    }

    fetchData()
  }, [router, userToken])

  const [selectedIds, setSelectedIds] = useState([])
  const handleSelection = (ids) => {
    const value = apiData.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
    setAccoutid(value)
  }
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }
  const apiRef = useGridApiRef()

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
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  function approveAccountId(ids) {
    const method = "PATCH"
    const url = `/api/v2/managers/${ids}/account/approval`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

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
        toast.success("등록되었습니다")
      }
      return false
    })
  }

  return (
    <>
      <CustomHeader text={`경험치 이력 `} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
            setDate={handleStartDateChange}
          />
        </div>
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"종료일자 :"}
            customStyle={{ justifyContent: "space-around" }}
            setDate={handleEndDateChange}
          />
        </div>
      </CustomBar>

      <div className={styles.tableContainer}>
        {apiData && (
          <DataGridPremium
            className={styles.gridmaincustom}
            onPageSizeChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",

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
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={22} // 행 높이를 10%로 설정
            columnHeaderHeight={22} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={apiData}
            columns={newColumns}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            apiRef={apiRef}
            pagination
            autoPageSize={false}
            checkbox={false}
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
            onRowSelectionModelChange={(params) => handleSelection(params)}
            selectionModel={selectionModel}
            disableColumnResize={true}
          />
        )}
      </div>
    </>
  )
}
