import React, { useState } from "react"
import styles from "./SubscribeManage.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import { getCookie } from "cookies-next"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensityoptionor,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import { useAutoSubscribe } from "@utils/autoSubscribe/useAutoSubscribe"
import DayTransformMinit from "@utils/DayTransformMinit"

function SubscribeManage() {
  const { autoSubscribeList, getAutoSubscribe, patchAutoSubscribe } = useAutoSubscribe()
  const cellboxall = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  const columns = [
    {
      field: "leagueId",
      headerName: "리그번호",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sportName",
      headerName: "종목",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "locationName",
      headerName: "나라",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "리그",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "leagueNameKOR",
      headerName: "리그 한글 ",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "subscribeStatus",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const [selectValue, setSelectValue] = useState(params.value)
        const onChangeSelectValue = (event) => {
          const {
            target: { value },
          } = event
          setSelectValue(value)
          params.row.subscribeStatus = value
        }
        return (
          <div style={cellboxall}>
            <select value={selectValue === "구독 중" ? "구독 중" : "구독 중지"} onChange={onChangeSelectValue}>
              <option style={{ color: "green", fontWeight: "100" }} value="구독 중">
                구독 중
              </option>
              <option style={{ color: "red", fontWeight: "100" }} value="구독 중지">
                구독 중지
              </option>
            </select>
          </div>
        )
      },
    },
    {
      field: "betTime",
      headerName: "비고",

      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <button style={{ width: "50%" }} onClick={() => patchAutoSubscribe(params.row)}>
              저장
            </button>
          </div>
        )
      },
    },
    {
      field: "processedAt",
      headerName: "등록일",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={cellboxall}>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
  ]

  React.useEffect(() => {
    getAutoSubscribe()
  }, [])


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
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"인플레이 리그 자동 구독 목록 (하위 외 경기는 자동으로 구독됩니다. (전체 : 404)"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5", fontWeight: 500 }}
        >
          <div className={styles.TotalMoney}>
            <span>베팅금: 2,816,258,336원</span>
            <span>당첨금: 2,710,256,336원</span>
            <span>합계: 106,002,000원</span>
          </div>
        </CustomHeader>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}
          <DataGridPremium
            disableColumnResize={true}
            columns={columns}
            rows={autoSubscribeList}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={30} // 행 높이를 10%로 설정
            columnHeaderHeight={30} // 헤더 높이를 5%로 설정
            autoHeight={true}
            sx={{
              width: "100%",

              "& .MuiDataGrid-overlay": {
                zIndex: 1,
                position: "relative",
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
            }}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
          />
        </div>
      </div>
    </>
  )
}

export default SubscribeManage