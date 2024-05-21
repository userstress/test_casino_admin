import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import React, { useEffect, useState, useRef } from "react"
import styles from "./index.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import DetailList from "@components/cumstomDetailList/DetailList"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"
import _ from "lodash"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { fetchOrders } from "@utils/queryFetch/totalList/fetchTotalList"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

function index() {
  const router = useRouter()

  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [pageSizes, setpageSize] = useState(20)
  const [apiData, setApiData] = useState()
  const [pages, setPage] = useState(0) // DataGrid의 page는 0부터 시작
  const [rowCount, setRowCount] = useState(20) // 총 데이터 개수
  const [isAll, setIsAll] = useState(true)
  const [displayedPage, setDisplayedPage] = useState(0)
  const wordRef = useRef()
  const { userIds, setUserId } = moneyLogStore()

  const [orderStatus, setOrderStatus] = useState("")
  const [matchStatus, setMatchStatus] = useState("")
  const [customSet, setCustom] = useState("")
  const [inputKeyword, setKeyword] = useState("")
  const [paginationModel, setModel] = useState({ page: 0, pageSize: 20 })

  const previousIsAll = usePrevious(isAll)

  const folderCountConverter = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
  }

  function mapBets(bet) {
    if (bet.list && bet.list.length > 0) {
      const firstItem = bet.list[0]
      return {
        ...bet,
        folderValue: bet.list.length,
        ...firstItem,
      }
    }
    return bet
  }

  function processBets(data, orderStatus) {
    const filteredBets = orderStatus ? data.filter((bet) => bet.orderResult === orderStatus) : data
    return filteredBets.map(mapBets)
  }

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["orders", { isAll, pages, datepick, customSet, inputKeyword, previousIsAll }],
    fetchOrders,
    {
      enabled: true,
      keepPreviousData: false,
      refetchInterval: 5000,
      onSuccess: (responseData) => {
        console.log("API call successful")
        const result = responseData?.data
        if (!result || result.length === 0) {
          console.log("No data returned or data is empty")
          setApiData([])
          return
        }

        const expandedBets = processBets(result, orderStatus)
        setApiData(expandedBets)
        setRowCount(responseData?.pageInfo?.totalElements)
        setModel({
          page: responseData?.pageInfo?.page - 1,
          pageSize: 20,
        })
      },
      onError: (error) => {
        console.error("Fetching error:", error)
      },
    },
  )

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const columnsStylesButton = {
    fontSize: "10px",
    width: "80%",
    padding: "0",
    margin: "0",
    borderRadius: "4px",
    border: "none",
    color: "white",
    height: "20px",
  }

  const cancelBet = (params) => {
    const method = "POST"
    const url = `/api/v2/users/cancelBets/${params.id}`
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
      }
      return false
    })
  }
  function handleCanclebet(event, params) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm("베팅을 취소(적특) 하시겠습니까?")) {
    } else {
      cancelBet(params)
    }
  }
  function betTypeEnumRender(enums) {
    switch (enums) {
      case "IN_PLAY":
        return "인플레이"
      case "PRE_MATCH":
        return "프리매치"
      case "CROSS":
        return "크로스"
      case "HANDICAP":
        return "핸디캡"
      case "W_D_L":
        return "승무패"
      case "SPECIAL_ONE":
        return "스페셜"
      case "SPECIAL_TWO":
        return "스페셜2"
    }
  }
  function betTypeEnumRender2(enums) {
    switch (enums) {
      case "SINGLE_FOLDER":
        return "단건"
      case "THREE_FOLDER":
        return "콤보"
      case "SEVEN_FOLDER":
        return "콤보"
      case "FIVE_FOLDER":
        return "콤보"
    }
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
      default:
        return "대기"
    }
  }
  const handleUserLog = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    // 여기에 클릭 이벤트에 대한 로직을 추가
    return window.open(`/sendingNote?userId=${params.row.userId}`, "쪽지", "width=1024, height=500")
  }

  const openUserInfo = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    setUserId(params?.row?.userId)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }

  function restoreBet(event, params) {
    event.preventDefault()
    event.stopPropagation()

    if (!confirm("베팅을 복원 하시겠습니까?")) {
    } else {
      const method = "POST"
      const url = `api/v2/managers/restoreBets/${params?.row?.betGroupId}`
      const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

      sendRequest(method, url, headers, null, (errorStatus, responseData) => {
        if (errorStatus >= 500) {
          toast.success("관리자에게 문의해주세요")
        } else if (errorStatus >= 400) {
          toast.success("처리 중입니다")
        } else if (errorStatus === 403 || errorStatus === 401) {
          toast.success("로그인을 다시해주세요")
        } else if (errorStatus === 404) {
          toast.success("찾을수없는 주소입니다")
        } else if (!errorStatus && responseData) {
          toast.success("베팅이 복원되었습니다")
        }
        return false
      })
    }
  }

  const columns = [
    {
      field: "cancel123",
      headerName: "베팅취소",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <button
            type="button"
            style={{ ...columnsStylesButton, backgroundColor: "#696969" }}
            onClick={(event) => handleCanclebet(event, params)}
          >
            베팅취소
          </button>
        )
      },
    },
    {
      field: "betGroupId",
      headerName: "No.",
      flex: 3,
      renderCell: (params) => {
        return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "username",
      headerName: "ID",
      flex: 3,
    },
    { field: "nickname", headerName: "닉네임", flex: 3 },
    {
      field: "betFoldType",
      headerName: "벳타입",
      flex: 1.5,
      renderCell: (params) => {
        return betTypeEnumRender2(params.formattedValue)
      },
    },
    {
      field: "betType",
      headerName: "베팅타입",
      flex: 2,
      renderCell: (params) => {
        return betTypeEnumRender(params.formattedValue)
      },
    },
    {
      field: "betStartTime",
      headerName: "베팅시간",
      flex: 3.5,
      renderCell: (params) => {
        return <div>{DayTransform(params.formattedValue)}</div>
      },
    },
    {
      field: "bet",
      headerName: "베팅금",
      flex: 2.7,
      renderCell: (params) => {
        return <div>{addCommasToNumber(params.formattedValue)}</div>
      },
    },
    {
      field: "totalRate",
      headerName: "총 배당률",
      flex: 2,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        // const isHome =
        //   params.row.betTeam === params.row.homeName || params.row.betTeam === 1 || params.row.betTeam === "Under"
        // const isDraw = params.row.betTeam === "draw"

        // return <div>{isHome ? params.row.winRate : isDraw ? params.row.drawRate : params.row.loseRate}</div>
        return (
          <div
            style={{ marginRight: "5px" }}
            title={`${
              Number(params?.row?.eventRate) > 1 ? `이벤트 배율 ${Number(params?.row?.eventRate).toFixed(2)}포함` : ""
            }`}
          >
            {Number.parseFloat(params.formattedValue).toFixed(2)} 배
          </div>
        )
      },
    },
    {
      field: "realProfit",
      headerName: "당첨금",
      flex: 3,
      renderCell: (params) => {
        let resulting
        const stat = params?.row?.orderResult
        if (stat === "HIT") {
          resulting = params.formattedValue
        }
        if (stat === "CANCEL_HIT") {
          resulting = params?.row?.bet
        }
        if (stat === "CANCEL") {
          resulting = params?.row?.bet
        }
        if (stat === "FAIL") {
          resulting = 0
        }
        if (stat === "WAITING" || !stat) {
          resulting = params?.row?.expectedProfit
        }
        return <div>{addCommasToNumber(Math.floor(resulting))}</div>
      },
    },
    {
      field: "orderResult",
      headerName: "결과",
      flex: 2,
      renderCell: (params) => {
        const resultt = handleBetStatus(params.formattedValue)

        return (
          <div style={{ fontSize: "12px", color: resultt === "당첨" ? "green" : resultt === "낙첨" ? "red" : "black" }}>
            {resultt}
          </div>
        )
      },
    },
    {
      field: "folderValue",
      headerName: "폴더",
      flex: 1,
      renderCell: (params) => {
        return <div style={{ fontSize: "12px" }}>{params.formattedValue}</div>
      },
    },
    {
      field: "betStatus",
      headerName: "상태",
      flex: 3,
      renderCell: (params) => {
        const isDel = params.formattedValue === "삭제됨"

        return isDel ? (
          <div style={{ color: "red" }}>
            삭제됨{" "}
            <button
              style={{
                height: "22px",
                fontSize: "12px",
                marginLeft: "5px", // 복원 버튼과의 간격 추가
              }}
              onClick={(event) => restoreBet(event, params)}
            >
              복원
            </button>
          </div>
        ) : (
          <div>정상</div>
        )
      },
    },
    {
      field: "processedAt",
      headerName: "처리일시",
      flex: 3.2,
      renderCell: (params) => {
        return <div style={{ fontSize: "10px" }}>{DayTransform(params.formattedValue)}</div>
      },
    },
    // { field: "writers", headerName: "처리자", flex: 3 },
    { field: "gubun", headerName: "구분", flex: 3 },
    {
      field: "readStatus",
      headerName: "확인",
      flex: 1.5,
      renderCell: (params) => {
        return <div>{params.formattedValue || "미확인"}</div>
      },
    },
    {
      field: "detail",
      headerName: "상세내역",
      flex: 1.2,
      renderCell: (params) => {
        return (
          <DetailList
            params2={params}
            scores={`${params?.row?.homeScore}:${params?.row?.awayScore}`}
            betGroupId={params.row.betGroupId}
            betFoldType={params.row.betFoldType}
            // onClickFN={() => changePage(isAll)}
          />
        )
      },
    },
    {
      field: "money",
      headerName: "머니",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <button
            style={{ ...columnsStylesButton, backgroundColor: "#3D228B" }}
            onClick={(event) => openUserInfo(event, params)}
          >
            로그
          </button>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => handleUserLog(event, params)}
            style={{ ...columnsStylesButton, backgroundColor: "#225F8B" }}
          >
            쪽지
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
    setSelectedIds(ids)
  }

  //   const [pageInfo, setPageInfo] = useState()

  const apiRef = useGridApiRef()

  useEffect(() => {
    console.log(`isAll: ${isAll}, previousIsAll: ${previousIsAll}`)
    if (isAll !== previousIsAll) {
      setPage(1)
    }
    // 조건에 따라 페이지를 리셋하거나 기타 로직 수행
  }, [isAll])

  const handlePageChange = (newPage) => {
    if (!isLoading) {
      setPage(newPage.page + 1)
      setDisplayedPage(newPage.page) // UI에 표시될 페이지도 업데이트
    }
  }

  function setAllfn(allState) {
    setisAll(!allState)
    setDisplayedPage(0)
  }

  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>베팅 모니터링</div>
            {/* <button type="button" className={styles.submitBtn}>
              전부 확인
            </button> */}
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <section className={styles.barSection}>
        <div className={styles.boxContainer3}>
          <div className={styles.centerBox}>
            <select
              name=""
              id=""
              onChange={(event) => {
                setCustom(event.target.value)
              }}
              title="검색 상세설정 입니다"
            >
              <option value="">전체</option>
              <option value="username">아이디</option>
              <option value="nickname">닉네임</option>
              <option value="foldCount">폴더수</option>
              <option value="ip">아이피</option>
              <option value="betGroupId">그룹번호</option>
            </select>
            <input
              type="text"
              className={styles.searchInput}
              ref={wordRef}
              onChange={(event) => (event.target.value === "" ? setKeyword("") : null)}
            />
            <button className={styles.searchBtn} type="button" onClick={() => setKeyword(wordRef.current.value)}>
              검색
            </button>
          </div>
        </div>

        <div className={styles.boxContainer3}>
          <div>
            <label htmlFor="dayAll">전체날짜</label>
            <input type="checkbox" checked={isAll} onChange={(event) => setIsAll(event.currentTarget.checked)} />
          </div>

          <DatePickerComponent
            getDate={handleStartDateChange}
            customStyle={{
              marginLeft: "10px",
              justifyContent: "space-around",
              width: "fit-content",
            }}
          />
          {/* <button type="button" className={styles.submitBtn}>
              검색
            </button> */}
        </div>
      </section>

      <div className={styles.tableContainer}>
        <DataGridPremium
          className={styles.gridmaincustom}
          // sx = datagrid 내부 요소들의 커스텀 스타일링
          sx={{
            width: "100%",

            "& .MuiDataGrid-overlay": {
              zIndex: 1,
              position: "relative",
            },
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
            // ".MuiTablePagination-root": {
            //   zIndex: "99999999",
            // },
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
          showCellVerticalBorder
          showColumnVerticalBorder
          rowHeight={25} // 행 높이를 10%로 설정
          columnHeaderHeight={25} // 헤더 높이를 5%로 설정
          autoHeight={true}
          rows={apiData ? apiData : []}
          columns={newColumns}
          slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
          pagination
          pageSizeOptions={[20]}
          getRowId={(row) => row.betGroupId}
          paginationModel={paginationModel}
          initialState={{
            sorting: {
              sortModel: [{ field: "betStartTime", sort: "desc" }],
            },
          }}
          onPaginationModelChange={handlePageChange} // 페이지 변경 시 처리할 핸들러
          rowCount={rowCount} // 총 행의 개수 (서버로부터 받아옴)
          paginationMode="server"
          autoPageSize={true}
          onRowSelectionModelChange={(params) => handleSelection(params)}
          loading={isLoading}
          apiRef={apiRef}
          localeText={localizedTextsMap}
          density="comfortable" //초기 설정 행간격 최대
          disableColumnResize={true}
          checkboxSelection={false}
        />
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
