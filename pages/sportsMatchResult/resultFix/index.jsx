import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import CustomSelect from "@components/customselect/CustomSelect"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import ArrayToMap, { handleMapChange, mapOfMapsToArray } from "@utils/ArrayToMap"
import DayTransform from "@utils/DayTransform"

const basicURL = process.env.NEXT_PUBLIC_API_URL

const columnHeaderStyle = {
  lineHeight: "1.5",
  width: "90%",
}

function index() {
  const router = useRouter()
  const [list, setList] = useState()
  const [tableDataTrans, setTransData] = useState(new Map())

  const { sendRequest } = useAxiosRequest()
  const userToken = getCookie("token")
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [selectionModel, setSelectionModel] = useState([])
  const { t: tDefault } = useTranslation()
  const [searchType, setType] = useState(4)
  const [isLoading, setLoading] = useState(false)

  function handleInputCell(val) {
    // console.log(mapOfMapsToArray(val))
    setList(mapOfMapsToArray(val))
    setTransData(val)
    // console.log(list)
  }

  function handleSelectCell(event, params, Trans, isEnum) {
    let vals
    const matchId = params.row.matchId

    if (!isEnum) {
      vals = event.target.value
      console.log(event.target.value)
    } else {
      vals = event
    }

    let updatedTrans = Trans // Trans 참조 복사

    console.log(vals)

    if (vals === "PLAY") {
      updatedTrans = handleMapChange(matchId, "status", "2", updatedTrans)
      updatedTrans = handleMapChange(matchId, "loseOrUnderSettlement", "null", updatedTrans)
      updatedTrans = handleMapChange(matchId, "winOrOverSettlement", "null", updatedTrans)
      updatedTrans = handleMapChange(matchId, "drawOrBaseLineSettlement", "null", updatedTrans)
      console.log("경기중 처리")
    }

    /**
     * 경기 취소 상태
     */
    if (vals === "4") {
      updatedTrans = handleMapChange(matchId, "status", "4", updatedTrans)
      console.log(" 경기 취소")
    }
    /**
     *
     */
    // 값에 따른 조건별 처리
    if (vals === "can" || vals === "7") {
      updatedTrans = handleMapChange(matchId, "status", "7", updatedTrans)
      updatedTrans = handleMapChange(matchId, "loseOrUnderSettlement", "3", updatedTrans)
      updatedTrans = handleMapChange(matchId, "winOrOverSettlement", "3", updatedTrans)
      updatedTrans = handleMapChange(matchId, "drawOrBaseLineSettlement", "3", updatedTrans)
      console.log(" 적특 처리")
    }
    // 홈 승 처리
    /**
     *
     */
    if (vals === params.row.winBetName) {
      updatedTrans = handleMapChange(matchId, "loseOrUnderSettlement", "1", updatedTrans)
      updatedTrans = handleMapChange(matchId, "winOrOverSettlement", "2", updatedTrans)
      updatedTrans = handleMapChange(matchId, "drawOrBaseLineSettlement", "1", updatedTrans)
      console.log(" 홈승 처리")
    }
    // 원정승 처리
    /**
     *
     */
    if (vals === params.row.loseBetName) {
      updatedTrans = handleMapChange(matchId, "loseOrUnderSettlement", "2", updatedTrans)
      updatedTrans = handleMapChange(matchId, "winOrOverSettlement", "1", updatedTrans)
      updatedTrans = handleMapChange(matchId, "drawOrBaseLineSettlement", "1", updatedTrans)
      console.log(" 원정승 처리")
    }
    // 무승부 처리
    /**
     *
     */
    if (vals === params.row.drawBetName) {
      updatedTrans = handleMapChange(matchId, "loseOrUnderSettlement", "1", updatedTrans)
      updatedTrans = handleMapChange(matchId, "winOrOverSettlement", "1", updatedTrans)
      updatedTrans = handleMapChange(matchId, "drawOrBaseLineSettlement", "2", updatedTrans)
      console.log(" 무승부 처리")
    }

    // 업데이트된 Map을 배열로 변환
    const updatedArray = mapOfMapsToArray(updatedTrans)

    setList(updatedArray)
    setTransData(updatedTrans)
  }

  function parseDate(dateString) {
    // 문자열에서 각 부분을 추출합니다.
    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    const hour = dateString.substring(8, 10)
    const minute = dateString.substring(10, 12)
    const second = dateString.substring(12, 14)

    // Date 객체를 생성합니다.
    return new Date(year, month - 1, day, hour, minute, second)
  }
  function formatDate(date) {
    // Date 객체를 문자열로 변환합니다.
    const twoDigits = (num) => (num < 10 ? "0" + num : num)

    const year = date.getFullYear()
    const month = twoDigits(date.getMonth() + 1)
    const day = twoDigits(date.getDate())
    const hours = twoDigits(date.getHours())
    const minutes = twoDigits(date.getMinutes())
    const seconds = twoDigits(date.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  async function requestList() {
    // setLoading(true)
    const method = "GET"
    const url = `${basicURL}/api/v2/result?type=${searchType}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        let result = responseData.data
        console.log("1")

        console.log(result)

        // 먼저 모든 startDate를 Date 객체로 변환하여 저장
        result = result
          .filter((item) => item.winOrOverIdx != null && item.matchId != null)
          .map((item) => {
            // parseDate 함수로 Date 객체를 생성하고, 이를 formatDate 함수로 변환합니다.
            const dateObject = parseDate(item.startDate)
            console.log(dateObject)
            return {
              ...item,
              startDate: formatDate(dateObject),
              matchId: item.winOrOverIdx.toString() + "_" + item.matchId.toString(),
            }
          })

        console.log("2")

        console.log(result)

        // parsedDate 속성을 기준으로 오름차순 정렬
        result.sort((a, b) => a.parsedDate - b.parsedDate)

        console.log("3")
        console.log(result)

        // 상태 설정 함수에 정렬된 배열을 전달
        setList(result)
        // setLoading(false)

        setTransData(ArrayToMap(result, "matchId")) //변환 데이터
      }
      return false
    })
  }

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const propagate = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  function sendFixData(event, params) {
    event.preventDefault()
    event.stopPropagation()

    const rows = params.row
    const method = "PATCH"
    const url = `/api/v2/edit/pre-match/update`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    const body = [
      {
        matchId: rows.matchId.split("_").slice(1).join("_"), // 언더바 뒤의 문자열만 추출
        marketName: rows.marketName,
        winOrOverIdx: rows.winOrOverIdx,
        winOrOverSettlement: rows.winOrOverSettlement,
        drawOrBaseLineIdx: rows.drawOrBaseLineIdx,
        drawOrBaseLineSettlement: rows.drawOrBaseLineSettlement,
        loseOrUnderIdx: rows.loseOrUnderIdx,
        loseOrUnderSettlement: rows.loseOrUnderSettlement,
        homeScore: rows.homeScore,
        awayScore: rows.awayScore,
        status: rows.status,
      },
    ]

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("변경되었습니다!")
        requestList()
      }
    })
  }

  const CustomSelect = (result) => {
    const status1 = result.row.status
    // result가 4 또는 7이 아니고, 0에서 9 사이의 숫자일 경우
    if (![4, 7].includes(status1) && status1 >= 0 && status1 <= 9) {
      return "2" // "정상" 옵션의 value
    }
    return result // 그 외의 경우는 result 값을 그대로 사용
  }

  function getDefaultBetResult(params) {
    let result

    if (params.row.result === params.row.winBetName) {
      result = "win"
    } else if (params.row.result === params.row.loseBetName) {
      result = "lose"
    } else if (params.row.result === params.row.drawBetName) {
      result = "draw"
    } else {
      result = "PLAY"
    }
    return result
  }

  function handleDetails(event, params) {
    event.preventDefault()
    window.open(
      `/userGameDetail/${params.row.matchId.split("_").slice(1).join("_")}`,
      "_blank",
      "width=1400,height=800",
    )
  }
  function formatDateTime(dateTimeStr) {
    // Replace 'T' with a space and remove 'Z'
    return dateTimeStr.replace("T", " ").replace("Z", "")
  }
  function handleOnchange(event, params, trans) {
    const targets = event.target.value
    let betName = event

    if (targets === "win") {
      betName = params.row.winBetName
    } else if (targets === "draw") {
      betName = params.row.drawBetName
    } else if (targets === "lose") {
      betName = params.row.loseBetName
    }

    if (targets === "win" || targets === "draw" || targets === "lose") {
      return handleSelectCell(betName, params, trans, true)
    }
    return handleSelectCell(event, params, trans, false)
  }

  const columns = [
    {
      field: "matchId",
      headerName: "경기번호",
      flex: 1.5,
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>고유번호</div>
          <div style={columnHeaderStyle}>게임종류</div>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            <div>{params.formattedValue.split("_").slice(1).join("_")}</div>
            <div>{tDefault(params.row.betType)}</div>
          </div>
        )
      },
    },
    {
      field: "marketName",
      headerName: "개임타입",
      flex: 1,
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>게임타입</div>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            <div>{tDefault(params.formattedValue)}</div>
          </div>
        )
      },
    },
    {
      field: "startDate",
      headerName: "게임시간",
      flex: 2.5,
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>게임시간</div>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px", textAlign: "center", width: "100%", textSize: "10px" }}>
            {params.formattedValue}
          </div>
        )
      },
    },
    {
      field: "sportsName",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>종목</div>
          <div style={columnHeaderStyle}>나라명</div>
          <div style={columnHeaderStyle}>리그명</div>
        </div>
      ),
      flex: 2.5,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px", textAlign: "center" }}>
            <div>{tDefault(params?.value)}</div>
            <div>{tDefault(params.row?.locationName)}</div>
            <div>{tDefault(params.row?.leagueName)}</div>
          </div>
        )
      },
    },
    {
      field: "homeName",
      headerName: "홈팀",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>홈팀</div>
        </div>
      ),
      flex: 2,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", textAlign: "center", border: "none", fontSize: "10px" }}>
            {tDefault(params.value)}
          </div>
        )
      },
    },
    {
      field: "winOrOver",
      headerName: "승/오버",
      flex: 2.5,
      renderCell: (params) => {
        return (
          <div className={styles.cells}>
            <input
              className={styles.ratioInput}
              defaultValue={params.row?.winOrOver}
              onClick={(event) => propagate(event)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "#FFA700" }}>
              <span>{params.row?.winOrOver} </span>
              <span>{params.row?.WinUserCount || 0}명</span>
              <span>{params.row?.totalWinBalance || 0}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "drawOrBaseLine",
      headerName: "무/기준점",
      flex: 2,
      renderCell: (params) => {
        return (
          <div className={styles.cells}>
            <input
              className={styles.ratioInput}
              defaultValue={params.row?.drawOrBaseLine}
              onClick={(event) => propagate(event)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "#FFA700" }}>
              <span>{params.row?.drawOrBaseLine} </span>
              <span>{params.row?.WinUserCount || 0}명</span>
              <span>{params.row?.totalWinBalance || 0}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "loseOrUnder",
      headerName: "패/언더",
      flex: 2.5,
      renderCell: (params) => {
        return (
          <div className={styles.cells} onClick={propagate}>
            <input
              className={styles.ratioInput}
              defaultValue={params.row?.loseOrUnder}
              onClick={(event) => propagate(event)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "red" }}>
              <span>{params.row?.loseOrUnder ? `${params?.row?.loseOrUnder} ` : "0"}</span>
              <span>{params.row?.WinUserCount || 0}명</span>
              <span>{params.row?.totalWinBalance || 0}원</span>
            </div>
          </div>
        )
      },
    },
    {
      field: "awayName",
      headerName: "어웨이팀",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>어웨이팀</div>
        </div>
      ),
      flex: 2,
      renderCell: (params) => {
        return (
          <div onClick={propagate} style={{ cursor: "pointer", textAlign: "center", border: "none", fontSize: "10px" }}>
            {tDefault(params.value)}
          </div>
        )
      },
    },

    {
      field: "totalBet",
      headerName: "총베팅",
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div onClick={propagate} style={{ cursor: "pointer", textAlign: "center", border: "none", fontSize: "10px" }}>
            {params.value}
          </div>
        )
      },
    },
    {
      field: "score",
      headerName: "스코어",
      renderHeader: (params) => (
        <div onClick={propagate}>
          <div style={columnHeaderStyle}>스코어</div>
        </div>
      ),
      flex: 2.3,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                onClick={propagate}
                onChange={(event) =>
                  handleInputCell(handleMapChange(params.row.matchId, "homeScore", event.target.value, tableDataTrans))
                }
                className={styles.scores}
                type="text"
                defaultValue={params.row.homeScore}
              />
              :{" "}
              <input
                onClick={propagate}
                onChange={(event) =>
                  handleInputCell(handleMapChange(params.row.matchId, "awayScore", event.target.value, tableDataTrans))
                }
                className={styles.scores}
                type="text"
                defaultValue={params.row.awayScore}
              />
            </div>
          </>
        )
      },
    },
    {
      field: "fix",
      headerName: "수정",
      flex: 1.3,
      renderCell: (params) => {
        return <button onClick={(event) => sendFixData(event, params)}>수정</button>
      },
    },
    {
      field: "restore",
      headerName: "복원",
      flex: 1.3,
      renderCell: (params) => {
        return <button onClick={propagate}>복원</button>
      },
    },
    {
      field: "result",
      headerName: "결과",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle} onClick={propagate}>
            결과
          </div>
        </div>
      ),
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <select
              onClick={propagate}
              // value={getDefaultBetResult(params)}
              defaultValue={getDefaultBetResult(params)}
              onChange={(event) => handleOnchange(event, params, tableDataTrans)}
            >
              <option value="PLAY">대기중 </option>
              <option value="win">승/오버</option>
              <option value="draw">무</option>
              <option value="lose">패/언더</option>
              <option value="can">적중특례</option>
              <option value="4">경기취소</option>
            </select>
          </>
        )
      },
    },
    {
      field: "status",
      headerName: "상태",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>상태</div>
        </div>
      ),
      flex: 2,
      renderCell: (params) => {
        return (
          <select
            defaultValue={CustomSelect(params)}
            onChange={(event) => handleOnchange(event, params, tableDataTrans)}
            onClick={(event) => propagate(event, params)}
          >
            <option value="2">정상</option>
            <option value="7">적중특례</option>
            <option value="4">경기취소</option>
          </select>
        )
      },
    },
    {
      field: "betting",
      headerName: "베팅",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>베팅</div>
        </div>
      ),
      flex: 0.5,
      renderCell: (params) => {
        return (
          <button type="button" onClick={(event) => handleDetails(event, params)}>
            내역
          </button>
        )
      },
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

  const [selectedIds, setSelectedIds] = useState([])

  const handleSelection = (ids) => {
    const value = list.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
  }

  const apiRef = useGridApiRef()

  const handleCellClick = (e) => {}

  useEffect(() => {
    if (router.isReady) {
      requestList()
    }
  }, [router.isReady])

  useEffect(() => {
    requestList()
  }, [searchType])

  // useEffect(() => {}, [list])
  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>결과 수정</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "flex-start" }}>
        <select
          defaultValue="2"
          style={{ width: "100px", marginRight: "5px" }}
          onChange={(event) => setType(event.target.value)}
        >
          {/* <option value="1">인플레이</option>
          <option value="2">프리매치</option> */}
          <option value="4">크로스</option>
          <option value="5">승무패</option>
          <option value="6">핸디캡</option>
          <option value="7">스페셜</option>
          <option value="8">스페셜2</option>
        </select>
        {/* <CustomSelect
          customStyle={{ width: "100px", marginRight: "5px" }}
          optionArr={["전체", "농구", "축구", "탁구", "아이스하키", "핸드볼", "배구", "E게임"]}
        />
        <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["전체"]} /> */}

        {/* <div className={styles.buttonBox}>
          <button type="button" style={{ backgroundColor: "#3342C9", color: "white", border: "none" }}>
            체크 전체 수정
          </button>
          <button type="button" style={{ backgroundColor: "#FF0000", color: "white", border: "none" }}>
            체크 전체 복원
          </button>
        </div> */}
      </CustomBar>

      <div className={styles.tableContainer}>
        {list ? (
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
                overflow: "hidden",
              },
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={60} // 행 높이를 10%로 설정
            columnHeaderHeight={60} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={list}
            columns={newColumns}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
              sorting: {
                sortModel: [{ field: "startDate", sort: "desc" }],
              },
            }}
            getRowId={(row) => row.matchId}
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
        ) : (
          <span>데이터를 불러오는중입니다</span>
        )}
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

// handleSelectCell 설명
// 상태값 핸들해야함

// stsuts는 경기 결과 상태에 대한 값
// status는 경기 상태 이넘값을 참고하거나 반영하는 반영되는 값

// 1 2 3 7...
// 서버로 보낼때 betName을 result 파라미터로 전달해야함
// 결과로 이긴 betName값을 result 파라미터에 전달 해야함 (result를 받는건 추후 추가됨)
// 뷰단의 셀렉트는 result를 수정하는거임

// 배당상태 eum을 보여주는게 lsports기준 betSettlement api 문서임
// 거길 확인해서 상태값을  lose win draw의 결과 settlement를 정해줌

// 매치 상태값 변경시 초기 값은 경기상태 이넘이라는  서버에서 보내준 파라미터값을 참조해서 반영하고
// 운영자가 바꾸는 상태값은 Fixture/Scoreboard Status여기서 적특은 7번, 그냥 취소는 4번인대 이런 경우를 제외한 나머지는 진행중으로 표기

// 결과를 변경하는건 배당상태이넘을 변경한다는거고 그 의미는 배당 상태를 변경한다는거니까
// 이곳을 변경하게되면 reuslt값을 lstports의 배당결과 (Bet Settlement)를 정하는 상태값을 참고해서 서버에 넘겨주면된다
// 예를 들면 경기 취소,적특은 -1번 그외에는  원저잉 이기면 1 승쪽이 이기면 2 하면됨

// 결과취소,결과적특 => 정상 처리
