import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
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
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import CustomButton from "@components/customButton/CustomButton"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const basicURL = process.env.NEXT_PUBLIC_API_URL

const columnHeaderStyle = {
  lineHeight: "1.5",
}

function index() {
  const router = useRouter()
  const page = 1
  const size = 10
  const [list, setList] = useState([])
  const { sendRequest } = useAxiosRequest()
  const userToken = getCookie("token")
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [pageSize, setPageSize] = useState(20)
  const [selectionModel, setSelectionModel] = useState([])
  const { t: tDefault } = useTranslation() // 기본 언어 (예: 한국어)

  function requestList() {
    const method = "GET"
    // const url = `https://dailymodelapp.com/api/v2/getSport/0`
    const url = `${basicURL}/api/v2/getSport/0`
    // const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, null, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data
        // startDateTime 속성을 기준으로 오름차순 정렬
        result.sort((a, b) => {
          // Date 객체로 변환하여 비교
          const dateA = new Date(a.startDateTime)
          const dateB = new Date(b.startDateTime)

          // dateA가 dateB보다 이전이면 -1을 반환하여 배열에서 앞으로 이동
          // dateA가 dateB와 같으면 0을 반환하여 위치 변경 없음
          // dateA가 dateB보다 이후면 1을 반환하여 배열에서 뒤로 이동
          return dateA - dateB
        })
        const filteredItems = result.filter((item) => {
          const parts = item.fixtureId.split("_")
          const marketId = parseInt(parts[1], 10)
          return marketId === 1 || marketId === 52
        })

        setList(filteredItems)
      }
      return false
    })
  }

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  // 아이템 변경 함수
  const handleChange = (fixtureId, fieldName, value) => {
    // console.log(11, fixtureId, fieldName, value)
    const foundItemIndex = list.findIndex((item) => item.fixtureId === fixtureId)
    const updatedItem = { ...list[foundItemIndex] }
    updatedItem[fieldName] = value

    const updatedItems = [...list] // 배열을 복사해서 수정된 항목을 새로운 배열에 추가
    updatedItems[foundItemIndex] = updatedItem // 수정된 항목으로 교체
    // console.log("updatedItems[foundItemIndex]", updatedItems[foundItemIndex])

    setList(updatedItems)
  }

  const columns = [
    {
      field: "fixtureId",
      headerName: "경기번호",
      flex: 2,
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>경기번호</div>
          <div style={columnHeaderStyle}>게임종류</div>
          <div style={columnHeaderStyle}>게임타입</div>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            <div>{params.value}</div>
            <div>{tDefault(params.row.type)}</div>
          </div>
        )
      },
    },

    {
      field: "startDateTime",
      headerName: "게임시간",
      flex: 2,
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>게임시간</div>
          <div style={columnHeaderStyle}>등록상태</div>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input
              style={{ cursor: "pointer", paddingRight: "4px", textAlign: "center" }}
              value={DayTransform(params.value)}
            ></input>
            <div style={{ fontSize: "12px" }}>
              {params.row.display === null
                ? "등록 대기"
                : params.row.display === true
                ? "등록"
                : params.row.display === false
                ? "거부"
                : "등록 대기"}
            </div>
          </div>
        )
      },
    },
    {
      field: "sport",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>종목</div>
          <div style={columnHeaderStyle}>나라명</div>
          <div style={columnHeaderStyle}>리그명</div>
        </div>
      ),
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px", textAlign: "center" }}>
            <div>{tDefault(params.value)}</div>
            <div>{tDefault(params.row.location)}</div>
            <div>{tDefault(params.row.league)}</div>
          </div>
        )
      },
    },
    {
      field: "home",
      headerName: "홈팀/홈팀추가문구",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>홈팀</div>
          <div style={columnHeaderStyle}>홈팀 추가 문구</div>
        </div>
      ),
      flex: 3,
      renderCell: (params) => {
        return <input style={{ cursor: "pointer", textAlign: "center" }} value={tDefault(params.value)} />
      },
    },
    {
      field: "winRate",
      headerName: "승/오버",
      flex: 1,
      renderCell: (params) => {
        return (
          <input
            style={{ cursor: "pointer", width: "70px", textAlign: "center" }}
            value={Math.round(params.value * 100) / 100}
            onChange={(e) => handleChange(params.row.fixtureId, "winRate", e.target.value)}
          />
        )
      },
    },
    {
      field: "drawRate",
      headerName: "무/기준점",
      flex: 1,
      renderCell: (params) => {
        return (
          <input
            style={{ cursor: "pointer", width: "70px", textAlign: "center" }}
            disabled={params.value == null}
            value={Math.round(params.value * 100) / 100 || "VS"}
            onChange={(e) => handleChange(params.row.fixtureId, "drawRate", e.target.value)}
          />
        )
      },
    },
    {
      field: "loseRate",
      headerName: "패/언더",
      flex: 1,
      renderCell: (params) => {
        return (
          <input
            style={{ cursor: "pointer", width: "70px", textAlign: "center" }}
            value={Math.round(params.value * 100) / 100}
            onChange={(e) => handleChange(params.row.fixtureId, "loseRate", e.target.value)}
          />
        )
      },
    },
    {
      field: "away",
      headerName: "어웨이팀/어웨이팀추가문구",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>어웨이팀</div>
          <div style={columnHeaderStyle}>어웨이팀추가문구</div>
          <div style={columnHeaderStyle}>리그명</div>
        </div>
      ),
      flex: 3,
      renderCell: (params) => {
        return <input style={{ cursor: "pointer", textAlign: "center" }} value={tDefault(params.value)} />
      },
    },
    {
      field: "111",
      headerName: "수정/마감/삭제",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>수정</div>
          <div style={columnHeaderStyle}>마감</div>
          <div style={columnHeaderStyle}>삭제</div>
        </div>
      ),
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <button
              className={styles.button}
              style={{ backgroundColor: "#0000FF", border: "2px solid #0000FF" }}
              onClick={() => handleModify(params.row.fixtureId)}
            >
              수정
            </button>
            <button className={styles.button} onClick={() => handleRegist(params.row.fixtureId)}>
              등록
            </button>
            <button className={styles.button} onClick={() => handleReject(params.row.fixtureId)}>
              거부
            </button>
          </>
        )
      },
    },
    {
      field: "222",
      headerName: "실시간변동/조합불가/추가문구색",
      renderHeader: (params) => (
        <div>
          <div style={columnHeaderStyle}>실시간 변동</div>
          <div style={columnHeaderStyle}>조합불가</div>
          <div style={columnHeaderStyle}>추가 문구 색</div>
        </div>
      ),
      flex: 3,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <button
                className={`${styles.button} ${
                  params.row.editable == null || params.row.editable ? styles.editable : ""
                }`}
                // disabled={params.row.editable == null || params.row.editable}
                onClick={() => handleEditable(params.row.fixtureId, true)}
              >
                자동
              </button>
              <button
                className={`${styles.button} ${params.row.editable === false ? styles.editable : ""}`}
                // disabled={params.row.editable === false}
                onClick={() => handleEditable(params.row.fixtureId, false)}
              >
                수동
              </button>
            </div>
            <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["NO", "YES"]} />
          </div>
        )
      },
    },
  ]

  // 경기정보수정(배당)
  const handleModify = (fixtureId) => {
    const parts = fixtureId.split("_") // 문자열을 '_'를 기준으로 분할
    // 분할된 부분 중에서 첫 번째 부분을 선택
    const realFixtureId = parseInt(parts[0], 10)

    const findItem = list.find((item) => item.fixtureId === fixtureId)

    const body = {
      fixtureId: realFixtureId,
      winRate: findItem.winRate,
      winRateBetId: findItem.winRateBetId,
      drawRate: findItem.drawRate,
      drawRateBetId: findItem.drawRateBetId,
      loseRate: findItem.loseRate,
      loseRateBetId: findItem.loseRateBetId,
    }
    // matchModify

    if (!confirm("게임 정보를 수정하시겠습니까?")) {
    } else {
      const method = "POST"
      const url = `https://dailymodelapp.com/api/v2/managers/matchModify`
      const headers = { Authorization: userToken }

      sendRequest(method, url, headers, body, (errorStatus, responseData) => {
        if (!errorStatus && responseData) {
          toast.success(responseData.data)
        }
        return false
      })
    }
  }

  // 경기 게시
  const handleRegist = (fixtureId) => {
    const parts = fixtureId.split("_") // 문자열을 '_'를 기준으로 분할
    // 분할된 부분 중에서 첫 번째 부분을 선택
    const realFixtureId = parseInt(parts[0], 10)

    if (!confirm("게임 등록으로 상태를 변경하시겠습니까?")) {
    } else {
      const method = "POST"
      const url = `https://dailymodelapp.com/api/v2/managers/matchRegistration/${realFixtureId}`
      const headers = { Authorization: userToken }

      sendRequest(method, url, headers, null, (errorStatus, responseData) => {
        if (!errorStatus && responseData) {
          toast.success(responseData.data)
        }
        return false
      })
    }
  }

  // 경기 게시 거부
  const handleReject = (fixtureId) => {
    const parts = fixtureId.split("_") // 문자열을 '_'를 기준으로 분할
    // 분할된 부분 중에서 첫 번째 부분을 선택
    const realFixtureId = parseInt(parts[0], 10)

    if (!confirm("등록 거부로 상태를 변경하시겠습니까?")) {
    } else {
      const method = "POST"
      const url = `https://dailymodelapp.com/api/v2/managers/matchReject/${realFixtureId}`
      const headers = { Authorization: userToken }

      sendRequest(method, url, headers, null, (errorStatus, responseData) => {
        if (!errorStatus && responseData) {
          toast.success(responseData.data)
        }
        return false
      })
    }
  }

  const handleEditable = (fixtureId, editable) => {
    const parts = fixtureId.split("_") // 문자열을 '_'를 기준으로 분할
    // 분할된 부분 중에서 첫 번째 부분을 선택
    const realFixtureId = parseInt(parts[0], 10)

    const body = {
      PackageId: 1865,
      UserName: "wdwd7942@gmail.com",
      Password: "Kt546855@",
      Suspensions: [
        {
          FixtureId: realFixtureId,
        },
      ],
    }
    // matchModify

    if (!confirm("실시간 변동 상태를 수정하시겠습니까?")) {
    } else {
      const method = "POST"
      const url = editable
        ? `https://stm-api.lsports.eu/Markets/ManualSuspension/Activate`
        : `https://stm-api.lsports.eu/Markets/ManualSuspension/Deactivate`
      // const headers = { Authorization: userToken }

      sendRequest(method, url, null, body, (errorStatus, responseData) => {
        if (!errorStatus && responseData.data.Body.Succeeded) {
          const body = {
            fixtureId: realFixtureId,
            editable: editable,
          }

          const method = "POST"
          const url = `https://dailymodelapp.com/api/v2/managers/editable`
          const headers = { Authorization: userToken }

          sendRequest(method, url, headers, body, (errorStatus, responseData) => {
            if (!errorStatus && responseData) {
              toast.success(responseData.data)
            }
            return false
          })
        }
        return false
      })
    }
  }

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
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }

  const apiRef = useGridApiRef()

  const handleCellClick = (e) => {}

  useEffect(() => {
    if (router.isReady) {
      requestList()
    }
    const toggleData = () => {
      requestList()
    }

    const intervalId = setInterval(toggleData, 5000) // 5초마다 toggleData 실행
    return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [router])

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>등록 대기 게임 관리</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "flex-start" }}>
        <CustomSelect
          customStyle={{ width: "100px", marginRight: "5px" }}
          optionArr={["전체", "승무패", "핸디캡", "스페셜", "스페셜2"]}
        />
        <CustomSelect
          customStyle={{ width: "100px", marginRight: "5px" }}
          optionArr={["전체", "농구", "축구", "탁구", "아이스하키", "핸드볼", "배구", "E게임"]}
        />
        <CustomSelect customStyle={{ width: "100px", marginRight: "5px" }} optionArr={["전체"]} />
      </CustomBar>
      <CustomBar customStyle={{ justifyContent: "space-between" }}>
        <div>삭제된 경기</div>
        <div style={{ height: "30px" }}>
          검색 :
          <CustomInput
            placeholder={"검색어를 입력하세요"}
            customStyle={{ width: "200px", heigth: "100%", backgroundColor: "#D9D9D9", marginRight: "5px" }}
          />
        </div>
        <CustomButton text={"조회하기"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"전체 등록"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"선택 항목 수정"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"선택 항목 등록"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton text={"선택 항목 거부"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
        <CustomButton
          text={"선택 항목 실시간 해제"}
          customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }}
        />
        <CustomButton text={"선택 항목 삭제"} customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }} />
      </CustomBar>

      <div className={styles.tableContainer}>
        {list && (
          <DataGridPremium
            className={styles.gridmaincustom}
            onPageSizeChange={handlePageSizeChange}
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
            rowHeight={44} // 행 높이를 10%로 설정
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
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            getRowId={(row) => row.fixtureId}
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
        )}
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
