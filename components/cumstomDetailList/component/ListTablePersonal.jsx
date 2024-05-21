import React, { useEffect } from "react"
import styles from "./ListTable.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import DayTransform from "@utils/DayTransform"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import SwitchOrderStatus from "@utils/SwitchOrderStatus"

const selectedYellowBox = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "yellow",
}

/**
 * 베팅내역을 위한 테이블
 * @param {*} param0
 * @returns
 */
function ListTablePersonal({ rows }) {
  const { t: tDefault } = useTranslation()
  const userToken = getCookie("token")

  function handleBetStatus(enums) {
    switch (enums) {
      case "WAITING":
        return "대기"
      case "CANCEL_HIT":
        return "적중특례"
      case "CANCEL":
        return "유저 취소"
      case "FAIL":
        return "낙첨"
      case "HIT":
        return "당첨"
    }
  }

  const openUserInfo = (event, ids) => {
    return window.open(`/userGameDetail/${ids}`, "유저 정보", "width=1400, height=800")
  }

  const addCol = [
    {
      field: "marketName",
      headerName: "타입",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => tDefault(params.row.marketName),
    },
    {
      field: "startDate",
      headerName: "시간",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => DayTransform(params.row.startDate),
    },
    {
      field: "sportName",
      headerName: "종목",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => tDefault(params.row.sportName),
    },
    {
      field: "leagueName",
      headerName: "리그",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => tDefault(params.row.leagueName),
    },
    {
      field: "homeName",
      headerName: "홈/오버",

      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.betTeam === params.row.homeName) {
          return <div style={selectedYellowBox}>{tDefault(params.row.homeName)}</div>
        } else {
          return <div>{tDefault(params.row.homeName)}</div>
        }
      },
    },
    {
      field: "drawRate",
      headerName: "VS",

      flex: 0.5,

      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue && params.formattedValue !== 0 ? params.formattedValue : "VS"
      },
    },
    {
      field: "awayName",
      headerName: "어웨이/언더",

      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.betTeam === params.row.awayName) {
          return <div style={selectedYellowBox}>{tDefault(params.row.awayName)}</div>
        } else {
          return <div>{tDefault(params.row.awayName)}</div>
        }
      },
    },
    {
      field: "price",
      headerName: "배당",

      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    {
      field: "betTeam",
      headerName: "선택",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        return tDefault(params.row.betTeam)
      },
    },
    {
      field: "score",
      headerName: "스코어",

      headerAlign: "center",
      align: "center",
      flex: 0.7,
      renderCell: (params) => {
        return `${params.row.homeScore} : ${params.row.awayScore}`
      },
    },
    {
      field: "reuslt",
      headerName: "결과",

      flex: 0.5,

      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return SwitchOrderStatus(params.formattedValue)
      },
    },
    {
      field: "processTime",
      headerName: "환수율",

      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "orderStatus",
      headerName: "당첨여부",

      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: (params) => {
        return <div style={{ color: "red" }}>{handleBetStatus(params.formattedValue)}</div>
      },
    },
    {
      field: "note",
      headerName: "내역",
      minWidth: 70,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          marginLeft: "1px",
          marginRight: "2px",
          textAlign: "center",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => openUserInfo(event, params.row.matchId)}>
              내역
            </button>
          </>
        )
      },
    },
  ]

  function calculateValue(num) {
    if (num >= 3 && num <= 5) {
      return (
        <span className={styles.folders}>
          <p>[3폴더 이상]</p>
          <p>1.03</p>
        </span>
      )
    }
    if (num > 5 && num <= 7) {
      return (
        <span className={styles.folders}>
          <p>[5폴더 이상]</p>
          <p>1.05</p>
        </span>
      )
    }
    if (num > 7) {
      return (
        <span className={styles.folders}>
          <p>[7폴더 이상]</p>
          <p>1.07</p>
        </span>
      )
    }
    return null // or any appropriate value for numbers less than 3
  }

  useEffect(() => {}, [rows])
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
        getRowId={(row) => row.matchId}
      />
      {rows && <div className={styles.Events}>{calculateValue(rows.length)}</div>}
    </section>
  )
}

export default ListTablePersonal
