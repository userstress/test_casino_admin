import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./DepositCalList.module.css"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import { useAuthStore } from "@utils/useAuthStore"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { fetchDate } from "@utils/DayTransform"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import useStore from "@utils/zustand/store"
import { getCookie } from "cookies-next"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function DepositCalList() {
  const [selectionModel, setSelectionModel] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const apiRef = useGridApiRef()
  const [apiData, setApiData] = useState(null)
  const userToken = getCookie("token")
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [Listof, setList] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [noteAdd, setNote] = useState([])

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: userToken, // 토큰을 Authorization 헤더에 추가
      }
      const response = await axios.get(
        `${basicURL}/api/v2/managers/rt?startDate=${datepick.start}&endDate=${datepick.end}&status=APPROVAL`,
        {
          headers,
        },
      )
      const data = await response.data.data
      setApiData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [datepick])

  useEffect(() => {}, [apiData])
  const columns = [
    { field: "id", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    { field: "lv", headerName: "Lv", flex: 1.33, headerAlign: "center", align: "center" },
    { field: "username", headerName: "아이디", flex: 6.67, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", flex: 6.67, headerAlign: "center", align: "center" },
    { field: "ownerName", headerName: "예금주", flex: 2.67, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "연락처", flex: 6.67, headerAlign: "center", align: "center" },
    {
      field: "distributor",
      headerName: "총판",
      maxWidth: 100,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 5.0,
    },
    {
      field: "market",
      headerName: "매장",
      maxWidth: 100,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 5.0,
    },
    {
      field: "rechargeAmount",
      headerName: "충전금액",
      maxWidth: 160,
      minWidth: 160,
      headerAlign: "center",
      align: "center",
      flex: 5.0,
      valueGetter: (params) => addCommasToNumber(params.row.rechargeAmount),
    },
    {
      field: "createdAt",
      headerName: "신청일",
      headerAlign: "center",
      align: "center",
      flex: 6.1,
      valueGetter: (params) => fetchDate(params.row.createdAt),
    },
    {
      field: "processedAt",
      headerName: "확인일",
      headerAlign: "center",
      align: "center",
      flex: 6.1,
      valueGetter: (params) => fetchDate(params.row.processedAt),
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.status === "APPROVAL") {
          return <div style={{ color: "#0000FF" }}>승인</div>
        }
        if (params.row.status === "WAITING") {
          return <div>대기</div>
        }
      },
    },
    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 1,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const { ids, getUserIds } = useStore()
        const handleClick = (event) => {
          event.preventDefault()
          event.stopPropagation()
          getUserIds(params.row.user.id)
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
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
    {
      field: "note",
      headerName: "쪽지1",
      flex: 1,
      sortable: false,
      renderHeader: (params) => {
        const handleAll = (event) => {
          event.stopPropagation()
          const newWhole = !noteWhole
          setWhole(newWhole)

          if (newWhole) {
            const startIdx = page * pageSize
            const endIdx = startIdx + pageSize
            const currentPageRowIds = Listof.slice(startIdx, Math.min(endIdx, Listof.length))
              .map((row) => row.id)
              .filter((id) => !isNaN(id)) // 숫자가 아닌 ID를 필터링합니다.

            setNote(currentPageRowIds)
          } else {
            setNote([])
          }
        }

        return (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            쪽지
            <input type="checkbox" style={{ width: "17px" }} checked={noteWhole} onClick={handleAll} />
          </div>
        )
      },
      renderCell: (params) => {
        if (!params.row.id) {
          return null
        }
        const handleClick = (event, ids) => {
          event.stopPropagation()

          const currentIndex = noteAdd.indexOf(params.row.user.id)
          const newChecked = [...noteAdd]
          if (currentIndex === -1) {
            newChecked.push(params.row.user.id)
            setNote(...noteAdd, ids)
          } else {
            newChecked.splice(currentIndex, 1)
          }

          setNote(newChecked)
        }

        return (
          <input
            id={params.row.id}
            type="checkbox"
            checked={noteAdd.includes(params.row.user.id) > 0 ? true : false}
            onClick={(event) => handleClick(event)}
            style={{ width: "15px", height: "15px", magin: "0" }}
          />
        )
      },
    },
  ]
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
  const handleSelection = (ids) => {
    // 선택된 필드의 모든 값 가져옴
    const temp = ids.map((v) => apiRef.current.getRow(v))
    setSelectedIds(temp)
  }
  return (
    <>
      <CustomHeader
        text={
          <div>
            정산관리&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>
            &nbsp;입금 상세 정보
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "center" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              text={"시작일자 :"}
              getDate={handleStartDateChange}
            />
          </div>
          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "center" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              text={"종료일자 :"}
              getDate={handleEndDateChange}
            />
          </div>
        </div>
      </CustomBar>
      <div>
        {apiData && (
          <DataGridPremium
            className={styles.gridmaincustom}
            // onPageSizeChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",

              "& .MuiDataGrid-main > div:nth-child(3)": {
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
            }}
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
                paginationModel: { page: 0, pageSize: 20 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            apiRef={apiRef}
            pagination
            autoPageSize={false}
            checkboxSelection
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
