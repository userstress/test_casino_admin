import React, { useState } from "react"
import styles from "./PreMarketSettings.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import CustomTable from "../../../../components/customTable/CustomTable"
import { getCookie } from "cookies-next"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import DetailList from "@components/cumstomDetailList/DetailList"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensityoptionor,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
function PreMarketSettings() {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [markets, setMarkets] = useState("main")
  const [expo, setexpo] = useState(false)

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const cellboxall = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
  const handleMarket = (event) => {
    // id값을 기준으로 리스트에서 객체를 찾은 다음 setstate해야함.
    const value = event.target.value
    setMarkets(value)
  }
  const handleExpose = (event) => {
    // id값을 기준으로 리스트에서 객체를 찾은 다음 setstate해야함.
    const value = event.target.value
    setexpo(value)
  }
  const handlePriority = (event) => {
    // id값을 기준으로 리스트에서 객체를 찾은 다음 setstate해야함.
    const value = event.target.value
    // setexpo(value)
  }
  const submitRow = (event) => {
    return console.log("submitrow")
  }
  const columns = [
    {
      field: "tid",
      headerName: "고유번호",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "marketName",
      headerName: "마켓명",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "marketNamek",
      headerName: "한글 마켓명",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={cellboxall}>{params.formattedValue}</div>
      },
    },
    {
      field: "expose",
      headerName: "노출장소",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <select defaultValue={markets} value={markets} onChange={handleMarket}>
              <option value="main">메인마켓</option>
              <option value="extra">추가베팅옵션</option>
              <option value="period">피리어드</option>
            </select>
          </div>
        )
      },
    },
    {
      field: "exposeInplay",
      headerName: "인플레이 노출",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <select defaultValue={expo} value={expo} onChange={handleExpose}>
              <option value="expose">노출</option>
              <option value="unexpose">비노출</option>
            </select>
          </div>
        )
      },
    },
    {
      field: "betName",
      headerName: "우선순위",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <input onInput={handlePriority} />
          </div>
        )
      },
    },
    {
      field: "betTime",
      headerName: "설명",

      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <input onInput={handlePriority} defaultValue={params.formattedValue ? params.formattedValue : ""} />
          </div>
        )
      },
    },
    {
      field: "betBalance",
      headerName: "설정",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            <button style={{ width: "80%" }} onClick={submitRow}>
              저장
            </button>
          </div>
        )
      },
    },
  ]

  React.useEffect(() => {}, [])

  const datdas = [
    {
      id: 123,
      cancleBet: false,
      username: "dnddlek",
      nickname: "웅이다",
      ips: "2001:4430:5045:2722:",
      betBalance: 100000,
      transactionId: 123645,
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

  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"프리매치 마켓 정보 목록 (전체 : 288)"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5", fontWeight: 500 }}
        >
          <div className={styles.TotalMoney}>
            <span>베팅금: 2,816,258,336원</span>
            <span>당첨금: 2,710,256,336원</span>
            <span>합계: 106,002,000원</span>
          </div>
        </CustomHeader>
        <CustomBar
          customStyle={{ padding: "0.260vw 0", backgroundColor: "#E5E5E5", display: "flex", justifyContent: "center" }}
        >
          <div className={styles.centerBox}>
            <label htmlFor="cateCheck">종목선택</label>
            <select id="cateCheck">
              <option value="FootBall">축구</option>
              <option value="FootBall">야구</option>
              <option value="FootBall">농구</option>
              <option value="FootBall">아이스하키</option>
              <option value="FootBall">배구</option>
              <option value="FootBall">테니스</option>
              <option value="FootBall">E스포츠</option>
              <option value="FootBall">탁구</option>
              <option value="FootBall">미식축구</option>
              <option value="FootBall">배드민턴</option>
              <option value="FootBall">야구</option>
              <option value="FootBall">MMA</option>
              <option value="FootBall">다트</option>
              <option value="FootBall">핸드볼</option>
              <option value="FootBall">럭비</option>
              <option value="FootBall">배구</option>
              <option value="FootBall">골프</option>
              <option value="FootBall">오지룰스</option>
              <option value="FootBall">Fomula 1</option>
              <option value="FootBall">컬링</option>
            </select>
          </div>
          <div className={styles.centerBox}>
            <select id="cateCheck">
              <option value="FootBall">메인마켓</option>
              <option value="FootBall">피리어드</option>
              <option value="FootBall">추가베팅옵션</option>
            </select>
          </div>
          <div className={styles.centerBox}>
            <select id="cateCheck">
              <option value="FootBall">전체</option>
              <option value="FootBall">노출</option>
              <option value="FootBall">비노출</option>
            </select>
          </div>
        </CustomBar>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}
          <DataGridPremium
            disableColumnResize={true}
            columns={columns}
            rows={datdas}
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

export default PreMarketSettings
