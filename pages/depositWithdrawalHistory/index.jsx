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
import rendercellCopy from "@utils/Tables/rendercellCopy"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"

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
    const url = `https://dailymodelapp.com/api/v2/managers/ct?page=${page}&size=${size}`
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

  const columns = [
    { field: "chongpan", headerName: "총판", flex: 1 },
    { field: "username", headerName: "ID", flex: 3, align: "center", renderCell: rendercellCopy() },
    { field: "nickname", headerName: "닉네임", flex: 2.9, align: "center" },
    {
      field: "type",
      headerName: "종류",
      flex: 2.8,
      align: "center",
      renderCell: (params) => {
        return <div>{params.value ? "환전" : "충전"}</div>
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 2.8,
      align: "center",
      renderCell: (params) => {
        return <div>{params.value ? "완료" : "대기"}</div>
      },
    },
    {
      field: "sportsBalance",
      type: "number",
      headerName: "신청금액",
      flex: 2.3,
      align: "right",
      // params: 해당 row레코드의 정보가 담김.
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0}
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "신청일시",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "lastRechargedAt",
      headerName: "처리일시",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "ip",
      headerName: "아이피",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{params}</div>
      },
    },
    {
      field: "memo",
      headerName: "메모",
      flex: 3.8,
      renderCell: (params) => {
        return <div>처리 후 카지노 잔고 : {params}</div>
      },
    },
    {
      field: "remain",
      headerName: "후잔고",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      flex: 3.8,
      renderCell: (params) => {
        return <div>쪽지</div>
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

  useEffect(() => {
    requestList()
  }, [datepick])

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>전체 베팅 목록 (전체 : 36578)</div>
            <div style={{ display: "flex" }}>
              <div>베팅금 : 2,816,258,336원</div>
              <div>당첨금 : 2,710,256,336원</div>
              <div> 합계 : 106,002,000원</div>
            </div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer3}>
            <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["전체", "충전", "환전"]} />
            <CustomSelect
              customStyle={{ width: "100px", marginRight: "5px" }}
              optionArr={["전체", "취소 제외 전체", "요청", "검수중", "완료", "취소", "처리완료"]}
            />
            <CustomSelect
              customStyle={{ width: "100px", marginRight: "5px" }}
              optionArr={["아이디", "닉네임", "아이피"]}
            />
            <CustomInput
              placeholder={"검색어를 입력하세요"}
              customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
            />

            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              //   text={"시작일자 :"}
              getDate={handleStartDateChange}
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;~&nbsp;</div>
          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              //   text={"종료일자 :"}
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

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
