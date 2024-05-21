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
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import useDatepicker from "@utils/datepicker/useDatepicker"
import { useSlotProfitAPI } from "@utils/slotProfit/useSlotProfitAPI"

function index() {
  const { datepick, handleStartDateChange, handleEndDateChange } = useDatepicker()
  const { slotProfitList, getSlotProfitList } = useSlotProfitAPI()
  const columns = [
    { field: "id", headerName: "No.", flex: 1 },
    { field: "username", headerName: "닉네임", flex: 3 },
    {
      field: "betAmount",
      headerName: "베팅금",
      flex: 3,
      type: "number",
      align: "center",
      renderCell: (params) => params.formattedValue,
    },
    {
      field: "winAmount",
      headerName: "당첨금",
      flex: 3,
      type: "number",
      align: "center",
      renderCell: (params) => params.formattedValue,
    },
    {
      field: "total",
      headerName: "종합",
      flex: 3,
      type: "number",
      align: "center",
      renderCell: (params) => params.formattedValue,
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

  const apiRef = useGridApiRef()

  useEffect(() => {
    getSlotProfitList(datepick.start, datepick.end)
  }, [datepick])

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>슬롯 순이익 리스트 (전체 : 75)</div>
            <div style={{ display: "flex" }}>
              총합 - 베팅금 : 1,020,214,499원 당첨금 : 999,443,636원 합계 : 20,770,863원
            </div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxInner}>
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
          </div>

          <div className={styles.boxContainer3}>
            <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["아이디"]} />
            <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["전체", "라이브", "슬롯"]} />
            <CustomInput
              placeholder={"검색어를 입력하세요"}
              customStyle={{ width: "200px", backgroundColor: "#D9D9D9", marginRight: "5px" }}
            />
          </div>
          <button type="button" className={styles.submitBtn}>
            검색
          </button>
        </div>
      </CustomBar>

      <div className={styles.tableContainer}>
        {
          <DataGridPremium
            className={styles.gridmaincustom}
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
            rows={slotProfitList}
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
            disableColumnResize={true}
          />
        }
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
