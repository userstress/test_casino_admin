import React, { useEffect, useState } from "react"
import styles from "./ListTableAbsolute.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { isSetEventBetPrice } from "@utils/allBetHistory/eventBetPrice"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import DayTransform from "@utils/DayTransform"
import axios from "axios"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import _ from "lodash"

const selectedYellowBox = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "yellow",
}

/**
 * 상세내역 버튼 및 테이블(일반테이블 보다 z값 높음)
 * @param {*} param0
 * @returns
 */
function ListTableAbsolute({ Cstyle, betGroupId, betFoldType, matchId, scores }) {
  const { sendRequest } = useAxiosRequest()
  const userToken = getCookie("token")
  const basicURL = process.env.NEXT_PUBLIC_API_URL
  const { t: tDefault } = useTranslation()
  const [data1, setData1] = useState()

  async function getAllBetHistory() {
    const headers = {
      accept: "application/json",
      Authorization: `${userToken}`,
      "Content-Type": "application/json",
    }
    const response = await axios.get(
      `${basicURL}/api/v2/users/orderHistory/get?page=1&size=30&betGroupId=${betGroupId}`,
      {
        headers: headers,
      },
    )

    const data = await response.data.data
    const groupedData = _.groupBy(data, "betGroupId")

    const foundGroup = groupedData[betGroupId]

    let flattenedData = []

    if (!_.isEmpty(foundGroup)) {
      flattenedData = _.flatMap(foundGroup, (groupItem) => {
        // list 속성을 평탄화하여 반환
        return groupItem.list.map((listItem) => ({
          ...groupItem,
          ...listItem,
        }))
      })
    }

    setData1(flattenedData)
    // 매치아이디 기준 데이터 패칭
  }
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

  const onClickCancleBet = (event, params) => {
    event.preventDefault()
    event.stopPropagation()

    const method = "POST"
    const url = `/api/v2/users/cancelBets/${params}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.success("처리 중입니다")
      } else if (errorStatus >= 400) {
        toast.success("처리 중입니다")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.success("처리 중입니다")
      } else if (errorStatus === 404) {
        toast.success("처리 중입니다")
      } else if (!errorStatus && responseData) {
        toast.success("베팅이 취소되었습니다")
        getAllBetHistory(betGroupId)
      }
      return false
    })
  }

  const handlechVal = (event, count) => {
    return window.open(`/userGameDetail/${count}`, "베팅내역", "width=1400, height=800")
  }

  const addCol = [
    {
      field: "marketName",
      headerName: "타입",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => tDefault(params.row.marketName),
    },
    {
      field: "betStartTime",
      headerName: "시간",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => DayTransform(params.row.betStartTime),
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
      flex: 1,
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
        if (params?.row?.marketName?.includes("X")) {
          return "vs"
        }
        if (params.formattedValue && params.formattedValue !== 0 && params.formattedValue !== "0") {
          return params?.formattedValue || "vs"
        }

        return "vs"
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
      field: "score",
      headerName: "스코어",

      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        if (!params?.row?.homeScore) {
          return ""
        }

        return `${params?.row?.homeScore} : ${params?.row?.awayScore}`
      },
    },
    {
      field: "price",
      headerName: "배당",

      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return `${params.formattedValue}`
      },
    },
    {
      field: "betTeam",
      headerName: "포지션",

      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return tDefault(params.formattedValue)
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
      field: "reuslt",
      headerName: "결과",

      flex: 0.5,

      headerAlign: "center",
      align: "center",
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
      field: "matchId",
      headerName: "경기번호",

      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "logBtn",
      headerName: "적특",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          marginLeft: "1px",
          marginRight: "2px",
          textAlign: "center",
          backgroundColor: "#00F",
          color: "white",
          border: "none",
        }
        return (
          <div className={styles.beNull}>
            <button style={inputSS} onClick={(event) => onClickCancleBet(event, params.row.betGroupId)}>
              적특
            </button>
          </div>
        )
      },
    },
    {
      field: "bet",
      headerName: "머니",
      minWidth: 130,
      maxWidth: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params.formattedValue)
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
            <button style={inputSS} onClick={(event) => handlechVal(event, matchId)}>
              내역
            </button>
          </>
        )
      },
    },
  ]
  useEffect(() => {
    // 여기서 api호출
    getAllBetHistory(betGroupId)
  }, [])
  return (
    <section className={styles.addedWrapper} style={{ position: "absolute", top: Cstyle.top, left: 0 }}>
      <DataGridPremium
        className={styles.gridmaincustom}
        // sx = datagrid 내부 요소들의 커스텀 스타일링
        sx={{
          width: "100%",
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
          ".MuiDataGrid-main > div:nth-child(3)": {
            display: "none",
          },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        rowHeight={22} // 행 높이를 10%로 설정
        columnHeaderHeight={22} // 헤더 높이를 5%로 설정
        autoHeight={true}
        rows={data1 ? data1 : []}
        columns={addCol}
        density="comfortable" //초기 설정 행간격 최대
        auto
        getRowId={(row) => row.idx}
      />
      <div className={styles.Events}>
        {isSetEventBetPrice(betFoldType) && (
          <span className={styles.folders}>
            <p>{isSetEventBetPrice(betFoldType).text}</p>
            <p>{isSetEventBetPrice(betFoldType).betPrice}</p>
          </span>
        )}
      </div>
    </section>
  )
}

export default ListTableAbsolute
