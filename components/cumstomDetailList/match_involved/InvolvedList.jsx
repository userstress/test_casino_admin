import React from "react"
import styles from "./InvolvedList.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"

/**
 * 베팅내역을 위한 테이블
 * @param {*} param0
 * @returns
 */
function InvolvedList({ rows }) {
  const addCol = [
    {
      field: "username",
      headerName: "아이디",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "lv",
      headerName: "레벨",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "당첨여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fold",
      headerName: "폴더수",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "betMoney",
      headerName: "베팅금액",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "winprice",
      headerName: "당첨금액",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "losePoint",
      headerName: "낙첨포인트",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "refferer",
      headerName: "추천인",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "reffererPoint",
      headerName: "추천인포인트",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "note",
      headerName: "베팅내역보기",
      minWidth: 70,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handlechVal = (event, params) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

        const inputSS = {
          width: "30px",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              내역
            </button>
          </>
        )
      },
    },
  ]
  return (
    <section className={styles.addedWrapper}>
      <DataGridPremium
        className={styles.gridmaincustom}
        // sx = datagrid 내부 요소들의 커스텀 스타일링
        sx={{
          width: "100%",
          minHeight: "100px",
          ".MuiDataGrid-main > div:nth-child(3)": {
            display: "none",
          },
          ".MuiDataGrid-footerContainer": {
            display: "none",
          },
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
          ".MuiDataGrid-virtualScroller": {
            zIndex: "1000",
          },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        rowHeight={22} // 행 높이를 10%로 설정
        columnHeaderHeight={22} // 헤더 높이를 5%로 설정
        autoHeight={true}
        rows={rows ? rows : []}
        columns={addCol}
        density="comfortable" //초기 설정 행간격 최대
        auto
      />
      <div className={styles.Events}>
        <span className={styles.folders}>
          <p>[5폴더 이상]</p>
          <p>1.05</p>
        </span>
      </div>
    </section>
  )
}

export default InvolvedList
