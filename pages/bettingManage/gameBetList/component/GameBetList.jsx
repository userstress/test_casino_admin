import React, { useEffect, useState } from "react"
import styles from "./GameBetList.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import CustomSelect from "@components/customselect/CustomSelect"
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
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import colorSx from "@components/ColorRowSx"

function GameBetList() {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [datdas, setData] = useState([
    {
      id: 123,
      type: "승무패",
      type2: "승무패",
      cancleBet: false,
      username: "dnddlek",
      nickname: "웅이다",
      fixtureStartDate: "2024-01-27:0:00",
      ips: "2001:4430:5045:2722:",
      betBalance: 100000,
      transactionId: 123645,
      category: "Ice Hockey",
      league: "NHL",
      location: "미국",
      homeTeam: "시애틀 크라켄",
      awayTeam: "캐롤라이나 하이웨이즈",
      winRate: 2.75,
      winRate: 1.75,
      drawRate: 3,
      winbetCount: 1,
      loseBetCount: 3,
      drawBetCount: 1,
      winTotalPrice: 5000,
      drawTotalPrice: 5000,
      loseTotalPrice: 25000,
      totalBetCount: 5,
      status: "진행",
    },
    {
      id: 1243,
      type: "핸디캡",
      type2: "핸디캡",
      cancleBet: false,
      username: "dnddlek",
      nickname: "웅다",
      fixtureStartDate: "2024-01-27:22:00",
      ips: "2001:4430:5045:2722:",
      betBalance: 50000,
      transactionId: 1253645,
      category: "Ice Hockey",
      league: "NHL",
      location: "미국",
      homeTeam: "시애틀 크라켄",
      awayTeam: "캐롤라이나 하이웨이즈",
      winRate: 1.75,
      loseRate: 1.1,
      drawRate: 3,
      winbetCount: 1,
      loseBetCount: 3,
      drawBetCount: 1,
      winTotalPrice: 5000,
      drawTotalPrice: 5000,
      loseTotalPrice: 25000,
      totalBetCount: 5,
      status: "마감",
    },
    {
      id: 4562,
      type: "언오버",
      type2: "언오버",
      cancleBet: false,
      username: "dnddlek",
      nickname: "웅다",
      fixtureStartDate: "2024-01-27:23:00",
      ips: "2001:4430:5045:2722:",
      betBalance: 50000,
      transactionId: 1253645,
      category: "Football",
      league: "NHL",
      location: "스페인",
      homeTeam: "스페인1",
      awayTeam: "스페인2",
      winRate: 1.75,
      loseRate: 2.3,
      winbetCount: 3,
      loseBetCount: 1,
      drawBetCount: 1,
      winTotalPrice: 25000,
      drawTotalPrice: 5000,
      loseTotalPrice: 5000,
      totalBetCount: 5,
      status: "마감",
    },
  ])
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const columns = [
    {
      field: "type",
      headerName: "게임종류",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
        }

        return (
          <div className={styles.cancleBtnBox}>
            <select className={styles.cancleBtn} onClick={handleCanclebet}>
              <option name="" value={params.formattedValue} id="">
                {params.formattedValue}
              </option>
            </select>
          </div>
        )
      },
    },
    {
      field: "type2",
      headerName: "게임타입",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
        }

        return (
          <div className={styles.cancleBtnBox}>
            <select className={styles.cancleBtn} onClick={handleCanclebet}>
              <option name="" value={params.formattedValue} id="">
                {params.formattedValue}
              </option>
            </select>
          </div>
        )
      },
    },
    { field: "fixtureStartDate", headerName: "게임시간", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "location",
      renderHeader: (params) => (
        <div className={styles.columnBox3Stack}>
          <div>종목</div>
          <div>나라명</div>
          <div>리그명</div>
        </div>
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
        }

        return (
          <div className={styles.inputBox3Stack}>
            <input inputsT="category" defaultValue={params.row.category} />
            <input inputsT="location" defaultValue={params.formattedValue} />
            <input inputsT="league" defaultValue={params.row.league} />
          </div>
        )
      },
    },
    {
      field: "homeTeam",
      headerName: "홈팀",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
        }

        return (
          <div className={styles.inputBox3Stack}>
            <input inputsT="location" defaultValue={params.formattedValue} />
          </div>
        )
      },
    },
    {
      field: "winRate",
      headerName: "승/오버",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const totals = params.row.winbetCount + params.row.loseBetCount + params.row.drawBetCount
        const winratiso = (params.row.winbetCount / totals) * 100
        const ifWinHigh =
          params.row.winbetCount > params.row.loseBetCount && params.row.winbetCount > params.row.drawBetCount
        return (
          <div className={styles.numberPannel}>
            <input type="text" defaultValue={params.formattedValue} />
            <div
              className={styles.ratioBox}
              style={{ width: "100%", backgroundColor: ifWinHigh ? "#FF0000" : "#FFA700" }}
            >
              <span className={styles.pannelCount}>{winratiso}%</span>
              <span className={styles.pannelCount}>{params?.row?.winbetCount}명</span>
              <span className={styles.pannelCount}>{params?.row?.winTotalPrice}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "drawRate",
      headerName: "무/기준점",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const totals = params.row.winbetCount + params.row.loseBetCount + params.row.drawBetCount
        const drawbetCount = (params.row.drawBetCount / totals) * 100
        const ifDrawHigh =
          params.row.drawBetCount > params.row.loseBetCount && params.row.drawBetCount > params.row.winbetCount
        return (
          <div className={styles.numberPannel}>
            <input type="text" defaultValue={params.formattedValue ? params.formattedValue : 0} />
            <div
              className={styles.ratioBox}
              style={{ width: "100%", backgroundColor: ifDrawHigh ? "#FF0000" : "#FFA700" }}
            >
              <span className={styles.pannelCount}>{drawbetCount}%</span>
              <span className={styles.pannelCount}>{params?.row?.drawBetCount}명</span>
              <span className={styles.pannelCount}>{params?.row?.drawTotalPrice}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "loseRate",
      headerName: "패/언더",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const totals = params.row.winbetCount + params.row.loseBetCount + params.row.drawBetCount
        const loseratiso = (params.row.loseBetCount / totals) * 100
        const ifLoseHigh =
          params.row.loseBetCount > params.row.winbetCount && params.row.loseBetCount > params.row.drawBetCount
        return (
          <div className={styles.numberPannel}>
            <input type="text" defaultValue={params.formattedValue} />
            <div
              className={styles.ratioBox}
              style={{ width: "100%", backgroundColor: ifLoseHigh ? "#FF0000" : "#FFA700" }}
            >
              <span className={styles.pannelCount}>{loseratiso}%</span>
              <span className={styles.pannelCount}>{params?.row?.winbetCount}명</span>
              <span className={styles.pannelCount}>{params?.row?.winTotalPrice}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "awayTeam",
      headerName: "어웨이팀",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
        }

        return (
          <div className={styles.inputBox3Stack}>
            <input inputsT="location" defaultValue={params.formattedValue} />
          </div>
        )
      },
    },
    {
      field: "totalBetCount",
      headerName: "총베팅",

      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: (params) => {
        return <div>{params.formattedValue}명</div>
      },
    },
    {
      field: "betBalance",
      headerName: "수정/마감/삭제",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.inputBox3Stack}>
            <button
              style={{
                backgroundColor: "blue",
                border: "none",
                borderRadius: "5px",
                color: "white",
                marginBottom: "5px",
              }}
            >
              수정
            </button>
            <button
              style={{
                backgroundColor: "orange",
                border: "none",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              마감
            </button>
            <button
              style={{
                backgroundColor: "red",
                border: "none",
                borderRadius: "5px",
                color: "white",
              }}
            >
              삭제
            </button>
          </div>
        )
      },
    },

    {
      field: "processTime",
      headerName: "추가 문구 색",

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "foler",
      headerName: "베팅",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.inputBox3Stack}>
            <button
              style={{
                border: "solid 1px #808080",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              내역
            </button>
            <button
              style={{
                border: "solid 1px #808080",
                borderRadius: "5px",
              }}
            >
              기준
            </button>
          </div>
        )
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const statcolor = params.formattedValue === "마감" ? true : false
        return (
          <div>
            <button
              style={{
                backgroundColor: statcolor ? "red" : "blue",
                border: "none",
                borderRadius: "5px",
                color: "white",
              }}
            >
              {params.formattedValue}
            </button>
          </div>
        )
      },
    },
  ]

  React.useEffect(() => {}, [datdas])

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
  const getRowClassName = (params) => {
    // row 객체의 type 속성에 따라 클래스 이름을 반환합니다.
    if (params.row.type === "승무패") {
      return "isWin"
    } else if (params.row.type === "핸디캡" || params.row.type === "언오버") {
      return "isH"
    }

    return ""
  }

  const [selectComplex, setComplex] = useState({ type: "all", category: "all", leagueCate: "all" })

  useEffect(() => {}, [])

  // 여기부분은 협의가 필요한듯?
  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"게임별 베팅 목록 (전체: 58)"}
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
            <select name="" id="">
              <option value="">전체</option>
            </select>
          </div>
          <div className={styles.centerBox}>
            <select name="" id="">
              <option value="">전체</option>
            </select>
            <span>이 이상은 백이랑 협의 후 진행</span>
          </div>
          <div className={styles.centerBox}>
            <select name="" id="">
              <option value="">전체</option>
            </select>
          </div>
        </CustomBar>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}
          <DataGridPremium
            disableColumnResize={true}
            disableRowSelectionOnClick
            columns={columns}
            rows={datdas}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={80} // 행 높이를 10%로 설정
            columnHeaderHeight={80} // 헤더 높이를 5%로 설정
            autoHeight={true}
            sx={colorSx}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            getRowClassName={getRowClassName}
            disableColumnReorder
          />
        </div>
      </div>
    </>
  )
}

export default GameBetList
