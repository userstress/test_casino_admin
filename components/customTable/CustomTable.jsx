import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  DataGrid,
  GridRow,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { DataGridPro } from "@mui/x-data-grid-pro"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import styles from "./CustomTable.module.css"

/**
 *
 * @param {*columns  datagrid에 사용될 컬럼들
 * @param {*rows  datagrid에 사용될 row
 * @param {*fontsizesCell  fontsizesCell datagrid에 사용될 폰트 사이즈 string  ex) "11px"
 * @param {*headfontSizes  fontsizes datagr column에 사용될 폰트 사이즈 ex) "11px"
 * @param {*refs  fontsizes 컬럼 최하단 통계 표시를 위한 useGridApiRef() ref 객체 전달
 * @param {*aggregations  fontsizes 컬럼 최하단 통계 표시를 위한 컬럼 표시 전달 { 컬럼에 들어가는 데이터 파라미터 이름: "종류" }
 * ex) { chargedMoney: "sum" }
 * @returns DatagridTable 리턴
 */
export default function DataTable({
  columns,
  rows,
  checkbox = true,
  customWidth = "100%",
  fontsizesHead,
  fontsizesCell,
  headfontSizes,
  refs,
  aggregations,
  aggregationFonts,
  SoltedModel,
  handleSelectionChange,
  defaultIds,
  heights = 22,
  pageSizese = 20,
  pageSizeOptionses = [20],
  isslots = true,
  paginationAuto = true,
  isloadings,
}) {
  const newColumns = columns.map((col) => {
    return {
      ...col,
      headerAlign: "center",
    }
  })

  const router = useRouter()

  // 제목부분 클릭시 페이지 이동
  const handleCellClick = (e) => {
    if (e.field == "title") {
      // router.push(`/notice/${e.id}`)
    } else if (e.field == "txnId") {
      const data = {
        lang: "ko",
        prd_id: e.row.prd_id,
        txn_id: e.row.txnId,
      }

      axios
        .post("/api/proxy/getBetList", data)
        .then(async (res) => {
          // console.log("res", res.data.data)
          window.open(res.data.data, "거래 상세내역", "width=1200, height=700, top=10, left=10")
        })
        .catch((error) => {
          console.error("Error while making the request:", error)
        })
    }
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton onChange={(event) => console.log(event.target)} />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }
  const rowIdProps = defaultIds ? { getRowId: (row) => row[defaultIds] } : {}

  return (
    <div className={styles.boxContainer}>
      {/* DataGrid Pro 쓰면 자동 컬럼 resize들어가서 일반 DataGrid */}
      <DataGridPremium
        className={styles.gridmaincustom}
        disableColumnResize={true}
        groupingColDef={{
          leafField: "title",
        }}
        // sx = datagrid 내부 요소들의 커스텀 스타일링
        sx={{
          width: customWidth,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3A6287",
            color: "white",
            fontsize: headfontSizes ? headfontSizes : null,
            fontSize: fontsizesHead ? fontsizesHead : "11px",
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
            fontSize: fontsizesCell ? fontsizesCell : "10px", //커스텀 폰트 사이즈
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
          ".MuiDataGrid-aggregationColumnHeaderLabel": {
            display: "none",
          },
          ".MuiDataGrid-footerCell": {
            fontWeight: "500",
            fontSize: aggregationFonts ? aggregationFonts : "10px", // footerFontSize가 있으면 그 값을 사용, 없으면 "10px" 사용
          },
          // ".MuiDataGrid-footerContainer": {
          //   display: "none",
          // },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        rowHeight={heights} // 행 높이를 10%로 설정
        columnHeaderHeight={heights} // 헤더 높이를 5%로 설정
        autoHeight={true}
        rows={rows}
        columns={newColumns}
        slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSizese },
          },
          sorting: {
            sortModel: SoltedModel,
          },
        }}
        {...(aggregations ? { aggregationModel: aggregations } : {})}
        pageSizeOptions={pageSizeOptionses}
        pagination={paginationAuto}
        checkboxSelection={checkbox}
        onCellClick={(e) => handleCellClick(e)}
        localeText={localizedTextsMap}
        density="comfortable"
        {...(refs ? { apiRef: refs } : {})}
        {...(handleSelectionChange ? { onRowSelectionModelChange: handleSelectionChange } : {})}
        {...rowIdProps}
        loading={isloadings}
      />
    </div>
  )
}
