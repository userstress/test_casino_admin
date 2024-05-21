import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
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
import rendercellCopy from "@utils/Tables/rendercellCopy"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import CustomButton from "@components/customButton/CustomButton"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import ktimeTrans from "@utils/ktimetrans"

const basicURL = process.env.NEXT_PUBLIC_API_URL

const columnHeaderStyle = {
  lineHeight: "1.5",
}

function index() {
  const router = useRouter()
  const page = 1
  const size = 10
  const [list, setList] = useState([{ fixtureId: 0 }])
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
    { field: "22", headerName: "종목", flex: 1 },
    { field: "33", headerName: "국가", flex: 1 },
    { field: "44", headerName: "마켓", flex: 1 },
    { field: "55", headerName: "이벤트", flex: 1 },
    { field: "66", headerName: "리그명", flex: 2 },
    { field: "77", headerName: "경기시간", flex: 1 },
    { field: "88", headerName: "홈팀", flex: 1 },
    { field: "99", headerName: "홈배당", flex: 1 },
    { field: "111", headerName: "무배당", flex: 1 },
    { field: "222", headerName: "기준치", flex: 1 },
    { field: "333", headerName: "원정배당", flex: 1 },
    { field: "444", headerName: "원정팀", flex: 1 },
    { field: "555", headerName: "스코어", flex: 1 },
    { field: "666", headerName: "LIVE", flex: 1 },
    { field: "777", headerName: "오토", flex: 1 },
    { field: "888", headerName: "상태", flex: 1 },
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

  // useEffect(() => {
  //   if (router.isReady) {
  //     requestList()
  //   }
  //   const toggleData = () => {
  //     requestList()
  //   }

  //   const intervalId = setInterval(toggleData, 5000) // 5초마다 toggleData 실행
  //   return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  // }, [router])

  return (
    <>
      <CustomHeader
        text={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>게임관리 게임리스트</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
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

        <div className={styles.buttonBox}>
          <button type="button" style={{ backgroundColor: "#3342C9", color: "white", border: "none" }}>
            체크 전체 수정
          </button>
          <button type="button" style={{ backgroundColor: "#FF0000", color: "white", border: "none" }}>
            체크 전체 복원
          </button>
        </div>
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
