import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import CustomSelect from "@components/customselect/CustomSelect"
import CustomInput from "@components/customInput/CustomInput"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import DetailList from "@components/cumstomDetailList/DetailList"
import { ktimeTransThird } from "@utils/ktimetrans"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

function index() {
  const page = 1
  const size = 10
  const [list, setList] = useState([])
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [pageSize, setPageSize] = useState(20)
  const [selectionModel, setSelectionModel] = useState([])

  function requestList() {
    const method = "GET"
    const url = `https://dailymodelapp.com/api/v2/managers/bets/end?startDate=${datepick.start}&endDate=${datepick.end}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data
        setList(result)
      }
      return false
    })
  }

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const handlechVal = (event, params) => {
    return window.open(`/sendingNote?userId=${params.row.userId}`, "쪽지", "width=1024, height=500")
  }
  const columnsStylesButton = {
    fontSize: "10px",
    width: "99%",
    padding: "0",
    margin: "0",
    borderRadius: "4px",
    border: "none",
    color: "white",
    height: "20px",
  }
  const cancelBet = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const columns = [
    {
      field: "matchId",
      headerName: "경기번호",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "베팅시간",
      flex: 3.4,
      renderCell: (params) => {
        console.log(params) // Temporarily log params to inspect them
        return <div>{ktimeTransThird(params.formattedValue)}</div>
      },
    },
    {
      field: "sportsName",
      headerName: "스포츠",
      flex: 3,
    },
    { field: "locationName", headerName: "나라", flex: 3 },
    { field: "leagueName", headerName: "리그", flex: 3 },
    { field: "bettype", headerName: "홈 VS 원정 팀", flex: 3 },
    {
      field: "status",
      headerName: "내용",
      flex: 3.4,
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "bet",
      headerName: "대기베팅금",
      flex: 2.7,
      renderCell: (params) => {
        console.log(params) // Temporarily log params to inspect them
        return <div>{addCommasToNumber(params.formattedValue)}</div>
      },
    },
    { field: "orderStatus", headerName: "확인", flex: 3 },

    { field: "writers", headerName: "처리자", flex: 3 },
    { field: "gubun", headerName: "구분", flex: 3 },
    { field: "check", headerName: "확인", flex: 1.5 },
    {
      field: "money",
      headerName: "내역",
      flex: 1.5,
      renderCell: (params) => {
        return <button style={{ ...columnsStylesButton, backgroundColor: "#3D228B" }}>내역</button>
      },
    },
    {
      field: "marketDetail",
      headerName: "하부마켓",
      flex: 1.5,
      renderCell: (params) => {
        return <button style={{ ...columnsStylesButton, backgroundColor: "#3D228B" }}>더보기 ▼</button>
      },
    },
    {
      field: "startDate",
      headerName: "일시",
      flex: 3.4,
      renderCell: (params) => {
        console.log(params) // Temporarily log params to inspect them
        return <div>{ktimeTransThird(params.formattedValue)}</div>
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

  const [selectedIds, setSelectedIds] = useState([])
  const handleSelection = (ids) => {
    setSelectedIds(ids)
  }
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }

  const apiRef = useGridApiRef()

  useEffect(() => {
    requestList()
  }, [datepick])

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>인플레이 모니터링 (전체 : )</div>
            <div type="button" className={styles.submitBtn}>
              베팅금 : 2,797,959,236원 당첨금 : 2,618,744,021원 합계 : 179,215,215원
            </div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer3}>
            <CustomSelect
              customStyle={{ width: "100px", marginRight: "5px" }}
              optionArr={["전체", "모니터링 체크", "양방 체크", "고액베팅", "환수율", "인플레이 이상 체크"]}
            />
            <CustomSelect
              customStyle={{ width: "100px", marginRight: "5px" }}
              optionArr={["아이디", "닉네임", "폴더수", "아이피"]}
            />
            <CustomInput
              placeholder={"검색어를 입력하세요"}
              customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
            />
          </div>

          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              //   text={"종료일자 :"}
              getDate={handleStartDateChange}
            />
            <div>&nbsp;&nbsp;&nbsp;~&nbsp;</div>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              //   text={"시작일자 :"}
              getDate={handleEndDateChange}
            />
            <button type="button" className={styles.submitBtn}>
              검색
            </button>
          </div>
        </div>
      </CustomBar>

      <div className={styles.tableContainer}>
        {list && (
          <DataGridPremium
            className={styles.gridmaincustom}
            onPageSizeChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3A6287",
                color: "white",
                fontSize: "10px",
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
            rows={list}
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
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
            onRowSelectionModelChange={(params) => handleSelection(params)}
            selectionModel={selectionModel}
            disableColumnResize={true}
            checkboxSelection={false}
          />
        )}
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
