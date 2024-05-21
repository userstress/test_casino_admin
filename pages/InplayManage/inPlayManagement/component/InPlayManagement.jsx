import React, { useState, useEffect } from "react"
import styles from "./InPlayManagement.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import CustomTable from "../../../../components/customTable/CustomTable"
import { getCookie } from "cookies-next"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { sortGamesByLeagueCount, sortGamesBySportsCount } from "@utils/sortGamesByLeague"
import { useTranslation } from "react-i18next"
import ToggleButtons from "@components/customToggleBtns/ToggleButtons"
import { Button } from "@mui/material"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { DayTransformMinitUTC } from "@utils/DayTransformMinit"
import ktimeTrans from "@utils/ktimetrans"

function InPlayManagement() {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [markets, setMarkets] = useState("main")
  const [expo, setexpo] = useState(false)
  const { sendRequest } = useAxiosRequest()
  const [Leagues, setLeague] = useState("all") //리그
  const [SportsType, setSportsType] = useState("all") //스포츠
  const [matchStat, setMatchStat] = useState("all") // 매치상태
  const [sortedList, setSortiedList] = useState([{ fixtureId: 0 }])
  const [original, setOrigianl] = useState()

  const [leagueSelected, setLeagueSelected] = useState([])
  const [sportsSelected, setSportsSelected] = useState([])
  const { t: tDefault } = useTranslation() // 기본 언어 (예: 한국어)

  function getMarketInfoes(datepick) {
    const method = "GET"
    const url = `in-fixtures?startDate=${datepick.start}&endDate=${datepick.end}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setOrigianl(responseData.data)
      }
      return false
    })
  }

  const setsLeague = (event) => {
    if (!event.target.value) {
      return null
    }
    const leagueVal = event.target.value
    setLeague(leagueVal)
  }
  const setsSports = (event) => {
    if (!event.target.value) {
      return null
    }
    const sport = event.target.value
    setSportsType(sport)
  }
  const setsStatus = (event) => {
    if (!event.target.value) {
      return null
    }
    const sport = event.target.value
    setMatchStat(sport)
  }

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
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

  const cellboxall = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
  const cellboxall2 = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
  const columns = [
    {
      field: "fixtureId",
      headerName: "번호",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fixtureStartDate",
      headerName: "경기시간",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={cellboxall2}>{ktimeTrans(params.row.fixtureStartDate)}</div>
      },
    },
    {
      field: "sportName",
      headerName: "스포츠",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "locationName",
      headerName: "나라",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "leagueName",
      headerName: "리그",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalBetCount",
      headerName: "베팅금",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "betTime",
      headerName: "홈VS원정",
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: (params) => {
        return (
          <div style={cellboxall2}>
            {params.row.homeParticipantName} &nbsp; <p style={{ color: "red", margin: "0", padding: "0" }}>VS</p>&nbsp;
            {params.row.awayParticipantName}
          </div>
        )
      },
    },
    {
      field: "betBal551",
      headerName: "스코어",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={cellboxall}>
            {params.row.scoreboardHomeResultValue}:{params.row.scoreboardAwayResultValue}
          </div>
        )
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const stat = params.row.status
        let cur
        if (stat === 9) {
          cur = "경기 시작 직전"
        }
        if (stat === 3) {
          cur = "경기 종료"
        }
        if (stat === 2) {
          cur = "경기 중"
        }
        if (stat === 1) {
          cur = "경기 시작 전"
        }
        return <div style={cellboxall}>{cur}</div>
      },
    },
    {
      field: "controll",
      headerName: "관리",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const stat = params.row.status
        if (stat === 1 || stat === 2) {
          return <ToggleButtons fixtures={params.row} status={"right"} />
        }
        if (stat === 3) {
          // onClick함수있어야함
          return (
            <Button variant="contained" sx={{ color: "white !important" }} color="info">
              결과 재반영
            </Button>
          )
        }

        return <ToggleButtons fixtures={params.row} status={"left"} />
      },
    },
    {
      field: "detail",
      headerName: "내역",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가
          return window.open("/userGameDetail/2", "내역", "width=1024, height=860")
        }
        return (
          <div style={cellboxall}>
            <button onClick={handleClick} style={{ cursor: "pointer", width: "2vw", height: "1vw", fontSize: "10px" }}>
              내역
            </button>
          </div>
        )
      },
    },
    {
      field: "secondMarket",
      headerName: "하부마켓",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={cellboxall}>업데이트중</div>
      },
    },
  ]

  /**
   *
   * @param {*} Leagues :리그
   * @param {*} SportsType  :스포츠명
   * @param {*} matchStat : 매치상태
   * @param {*} original : 원본 fixture array
   * @returns setList datagrid ROW
   */
  function sortCategory(Leagues, SportsType, matchStat, original) {
    if (!original) {
      return null
    }
    let filteredList = original
    if (Leagues !== "all" && Leagues) {
      filteredList = original.filter((market) => market.leagueName === Leagues)
    }

    if (SportsType !== "all" && SportsType) {
      filteredList = filteredList.filter((market) => market.sportName === SportsType)
    }

    //matchStat 관련 수정해야함
    const leagueSorted = sortGamesByLeagueCount(original)
    const sportSorted = sortGamesBySportsCount(original)
    setLeagueSelected(leagueSorted)
    setSportsSelected(sportSorted)

    if (matchStat === "all") {
      setSortiedList(filteredList)
    }
    if (matchStat === "pre") {
      filteredList = filteredList.filter((market) => market.status === 1 || market.status === 9)

      setSortiedList(filteredList)
    }
    if (matchStat === "playing") {
      filteredList = filteredList.filter((market) => market.status === 2)
      setSortiedList(filteredList)
    }
    if (matchStat === "ended") {
      filteredList = filteredList.filter((market) => market.status === 3)
      setSortiedList(filteredList)
    }
  }

  useEffect(() => {}, [sortedList])
  useEffect(() => {
    sortCategory(Leagues, SportsType, matchStat, original)
  }, [Leagues, SportsType, matchStat, original])

  useEffect(() => {
    getMarketInfoes(datepick)
  }, [datepick])
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
          text={"인플레이 경기 관리 (전체: 1603)"}
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
          <div style={{ width: "16%", height: "100%" }}>
            <DatePickerComponent
              text={"시작일자 :"}
              getDate={handleStartDateChange}
              customStyle={{ justifyContent: "space-around" }}
            />
          </div>
          &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
          <div style={{ width: "16%", height: "100%" }}>
            <DatePickerComponent
              text={"종료일자 :"}
              getDate={handleEndDateChange}
              customStyle={{ justifyContent: "space-around" }}
            />
          </div>
          <div className={styles.centerBox}>
            <select id="cateCheck" className={styles.selectBar} onChange={setsStatus}>
              <option value="all">전체</option>
              <option value="pre">시작전 경기</option>
              <option value="playing">진행중 경기</option>
              <option value="ended">종료 경기</option>
            </select>
          </div>
          <div className={styles.centerBox}>
            <label htmlFor="cateCheck">종목선택</label>
            <select id="cateCheck" className={styles.selectBar} onChange={setsSports}>
              <option value="all">전체</option>

              {sportsSelected.map((sports) => (
                <option value={sports.sport}>{`${sports.sport} ( ${sports.count} )`}</option>
              ))}
            </select>
          </div>
          <div className={styles.centerBox}>
            <select id="cateCheck" className={styles.selectBar} onChange={setsLeague}>
              <option value="all">전체</option>

              {leagueSelected.map((leaguear) => (
                <option value={leaguear.league}>{`${leaguear.league} ( ${leaguear.count} )`}</option>
              ))}
            </select>
          </div>
        </CustomBar>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}
          <DataGridPremium
            disableColumnResize={true}
            columns={columns}
            rows={sortedList ? sortedList : []}
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
            getRowId={(row) => row.fixtureId}
            pagination
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
              sorting: {
                sortModel: [{ field: "fixtureStartDate", sort: "desc" }],
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default InPlayManagement
