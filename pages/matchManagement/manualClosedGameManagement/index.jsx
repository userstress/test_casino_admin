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
import CustomButton from "@components/customButton/CustomButton"

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
    const url = `http://localhost:8080/sports`
    // const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, null, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data
        // setList(result)
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

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const columns = [
    { field: "22", headerName: "경기번호/게임종류/게임타입", flex: 3 },
    { field: "33", headerName: "게임시간/등록상태", flex: 3 },
    { field: "44", headerName: "종목/나라명/리그명", flex: 3 },
    { field: "55", headerName: "홈팀/홈팀추가문구", flex: 3 },
    { field: "66", headerName: "승/오버", flex: 1 },
    { field: "77", headerName: "무/기준점", flex: 3 },
    { field: "88", headerName: "패/언더", flex: 1 },
    { field: "99", headerName: "어웨이팀/어웨이팀추가문구", flex: 3 },
    { field: "999", headerName: "총베팅", flex: 3 },
    { field: "111", headerName: "수정/마감/삭제", flex: 3 },
    { field: "222", headerName: "실시간변동/조합불가/추가문구색", flex: 3 },
    { field: "333", headerName: "베팅", flex: 3 },
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
    const value = list.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
  }
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }

  const apiRef = useGridApiRef()

  const handleCellClick = (e) => {}

  useEffect(() => {
    requestList()
  }, [datepick])

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>마감된 게임 관리</div>
            <div>베팅금 : 2,797,959,236원 당첨금 : 2,618,744,021원 합계 : 179,215,215원</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <CustomSelect
          customStyle={{ width: "100px", marginRight: "5px" }}
          optionArr={["전체", "승무패", "핸디캡", "스페셜", "스페셜2"]}
        />
        <CustomSelect
          customStyle={{ width: "100px", marginRight: "5px" }}
          optionArr={["전체", "농구", "축구", "탁구", "아이스하키", "핸드볼", "배구", "E게임"]}
        />
        <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["전체"]} />
        <CustomButton text={"전체보기"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"인기순 보기"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <div>삭제된 경기</div>
        <div>프리매치 연동 경기만</div>
        검색 :
        <CustomInput
          placeholder={"검색어를 입력하세요"}
          customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
        />
        <CustomButton text={"조회하기"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"선택 항목 수정"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton
          text={"선택 항목 마감 및 수정"}
          customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }}
        />
        <CustomButton
          text={"선택 항목 실시간 해제"}
          customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }}
        />
        <CustomButton text={"선택 항목 삭제"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
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
            checkboxSelection={true}
            onCellClick={(e) => handleCellClick(e)}
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
