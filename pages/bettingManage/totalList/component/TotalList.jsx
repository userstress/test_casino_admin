import React, { useState, useEffect, useRef } from "react"
import styles from "./TotalList.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getCookie } from "cookies-next"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import DetailList from "@components/cumstomDetailList/DetailList"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import DayTransform from "@utils/DayTransform"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"
import { useQuery } from "react-query"
import { fetchOrders } from "../../../../utils/queryFetch/totalList/fetchTotalList"

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

function TotalList() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const userToken = getCookie("token")
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [apiData, setApiData] = useState()
  const [pages, setPage] = useState(0) // DataGrid의 page는 0부터 시작
  const [rowCount, setRowCount] = useState(20) // 총 데이터 개수
  const [isLoadings, setLoading] = useState(false)
  const [isAll, setisAll] = useState(true)
  const [displayedPage, setDisplayedPage] = useState(0)
  const [paginationModel, setModel] = useState({ page: 0, pageSize: 20 })
  const [Allwords, setAllwords] = useState({ bal: 0, reward: 0 })

  const [orderStatus, setOrderStatus] = useState("")
  const [matchStatus, setMatchStatus] = useState("")
  const [customSet, setCustom] = useState("")
  const [inputKeyword, setKeyword] = useState("")
  const { userIds, setUserId } = moneyLogStore()
  const [toggleData, setToggleData] = useState()
  const wordRef = useRef()

  const previousIsAll = usePrevious(isAll)

  /**
   *  날짜 핸들링
   * @param {*} event
   * @param {*} params
   * @returns
   */
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  /**
   * 이넘타입 변환
   * @param {*} event
   * @param {*} params
   * @returns
   */
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

  /**
   * 쪽지 핸들
   * @param {*} event
   * @param {*} params
   * @returns
   */
  const handlechVal = (event, params) => {
    return window.open(`/sendingNote?userId=${params?.row?.userId}`, "쪽지", "width=1024, height=500")
  }

  /**
   * 유저 정보 보기 핸들링
   * @param {*} event
   * @param {*} params
   * @returns
   */
  const openUserInfo = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    setUserId(params?.row?.userId)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }

  /**
   * 베팅 취소
   * @param {*} params
   */
  const cancelBet = (params) => {
    const method = "POST"
    const url = `/api/v2/users/cancelBets/${params}`
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
        toast.success("베팅이 취소되었습니다")
      }
      return false
    })
  }

  /**
   * 취소 행동 핸들링. 이벤트 전파 방지, confirm,취소 함수 호출
   * @param {*} event
   * @param {*} params
   */
  function handleCanclebet(event, params) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm("베팅을 취소(적특) 하시겠습니까?")) {
    } else {
      cancelBet(params.row.betGroupId)
    }
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
      field: "cancleBet",
      headerName: "베팅취소",
      maxWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.cancleBtnBox}>
            {!params.formattedValue ? (
              <button type="button" className={styles.cancleBtn} onClick={(event) => handleCanclebet(event, params)}>
                베팅취소
              </button>
            ) : null}
          </div>
        )
      },
    },
    { field: "betGroupId", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "username",
      headerName: "유저 아이디",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isred = params.row.result === "FAIL" ? "red" : "black"
        return <div style={{ color: isred, fontWeight: "400" }}>{params.formattedValue}</div>
      },
    },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "betFoldType",
      headerName: "벳타입",

      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return "콤보"
      },
    },
    {
      field: "betType",
      headerName: "타입",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return betTypeEnumRender(params.formattedValue)
      },
    },
    {
      field: "betStartTime",
      headerName: "베팅시간",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "bet",
      headerName: "베팅금",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue > 0 ? addCommasToNumber(params.formattedValue) : "0원"}</div>
      },
    },

    {
      field: "totalRate",
      headerName: "배당률",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const vals = Number(params.formattedValue)
        return <div>{params.formattedValue > 0 && typeof vals === "number" ? vals.toFixed(2) : "0"}</div>
      },
    },
    {
      field: "realProfit",
      headerName: "당첨금",

      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        let resulting
        const stat = params?.row?.orderResult
        if (stat === "HIT") {
          resulting = params.formattedValue
        }
        if (stat === "CANCEL_HIT") {
          resulting = params.row.bet
        }
        if (stat === "CANCEL") {
          resulting = params.row.bet
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
      headerAlign: "center",
      align: "center",
      flex: 0.7,
      renderCell: (params) => {
        // orderResult = 모든 베팅의 결과
        // orderStatus = 베팅박스 내부 단건의 결과

        const isCANCEL_HIT = params.formattedValue === "CANCEL_HIT"
        const isPROCESSING = params.formattedValue === "PROCESSING"
        const isWAITING = params.formattedValue === "WAITING"
        const isCANCEL = params.formattedValue === "CANCEL"
        const isHIT = params.formattedValue === "HIT"
        const isFAIL = params.formattedValue === "FAIL"

        if (isPROCESSING) {
          return <div style={{ color: "black", fontWeight: "400" }}>진행</div>
        } else if (isWAITING) {
          return <div>대기</div>
        } else if (isCANCEL_HIT) {
          return <div style={{ color: "red" }}>적중특례</div>
        } else if (isCANCEL) {
          return <div>취소</div>
        } else if (isHIT) {
          return <div>적중</div>
        } else if (isFAIL) {
          return <div style={{ color: "red" }}>낙첨</div>
        }

        // 여기서는 어떤 조건도 만족하지 않는 경우를 처리합니다.
        // 필요에 따라 다른 요소나 기본값을 반환할 수 있습니다.
        return <div>대기</div>
      },
    },
    {
      field: "processedAt",
      headerName: "처리일시",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "folderValue",
      headerName: "폴더",

      flex: 0.6,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "betStatus",
      headerName: "상태",

      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        const isDel = params.formattedValue === "삭제됨"

        return isDel ? (
          <div style={{ color: "red" }}>
            삭제됨
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
      field: "betIp",
      headerName: "IP",

      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "logBtn",
      headerName: "상세내역",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <DetailList
            scores={`${params?.row?.awayScore || "0"}:${params?.row?.homeScore || "0"}`}
            params2={params}
            betGroupId={params?.row?.betGroupId}
            betFoldType={params?.row?.betFoldType}
          />
        )
      },
    },
    {
      field: "balance",
      headerName: "머니",
      minWidth: 70,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
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
            <button onClick={(event) => openUserInfo(event, params)} style={inputSS}>
              머니
            </button>
          </>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      minWidth: 70,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
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
            <button style={inputSS} onClick={(event) => handlechVal(event, params)}>
              쪽지
            </button>
          </>
        )
      },
    },
  ]

  const folderCountConverter = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
  }

  useEffect(() => {
    console.log(`isAll: ${isAll}, previousIsAll: ${previousIsAll}`)
    if (isAll !== previousIsAll) {
      setPage(1)
    }
    // 조건에 따라 페이지를 리셋하거나 기타 로직 수행
  }, [isAll])

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
    ["orders", { isAll, pages, datepick, orderStatus, matchStatus, customSet, inputKeyword, previousIsAll }],
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
        setLoading(false)
      },
      onError: (error) => {
        console.error("Fetching error:", error)
      },
    },
  )

  const handlePageChange = (newPage) => {
    if (!isLoadings) {
      setPage(newPage.page + 1)
      setDisplayedPage(newPage.page) // UI에 표시될 페이지도 업데이트
    }
  }

  function setAllfn(allState) {
    setisAll(!allState)
    setDisplayedPage(0)
  }

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
          text={`전체 베팅 목록 (전체: ${rowCount ? rowCount : "데이터를 불러오는 중입니다"})`}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5", fontWeight: 500 }}
        >
          <div className={styles.TotalMoney}>
            <span>베팅금: {`${typeof Allwords.bal === "number" ? Allwords.bal : "데이터를 불러오는 중입니다"}`}</span>
            <span>
              당첨금: {`${typeof Allwords.reward === "number" ? Allwords.reward : "데이터를 불러오는 중입니다"}`}
            </span>
            <span>
              합계:
              {`${
                typeof Allwords.bal === "number" && typeof Allwords.reward === "number"
                  ? Number(Allwords.bal) - Number(Allwords.reward)
                  : "데이터를 불러오는 중입니다"
              }`}
            </span>
          </div>
        </CustomHeader>
        <section className={styles.barSection}>
          <div className={styles.centerBox}>
            <select name="" id="" onChange={(event) => setOrderStatus(event.target.value)} title="베팅 상태 설정입니다">
              <option value="">전체</option>
              <option value="WAITING">진행중</option>
              <option value="HIT">당첨</option>
              <option value="FAIL">미당첨</option>
              <option value="CANCEL_HIT">관리자 취소</option>
              <option value="CANCEL">베팅 취소</option>
            </select>
          </div>
          <div className={styles.centerBox}>
            <select
              name=""
              id=""
              onChange={(event) => setMatchStatus(event.target.value)}
              title="베팅 페이지 설정입니다"
            >
              <option value="">전체 게임</option>
              <option value="PRE_MATCH">프리매치</option>
              <option value="IN_PLAY">인플레이</option>
              <option value="CROSS">크로스</option>
              <option value="HANDICAP">핸디캡</option>
              <option value="W_D_L">승무패</option>
              <option value="SPECIAL_ONE">스페셜</option>
              <option value="SPECIAL_TWO">스페셜2</option>
              <option value="MINI_GAME">미니게임</option>
              <option value="GA_SANG">가상</option>
            </select>
          </div>
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
          <div className={styles.centerBox}>
            <input htmlFor="dayCheck" id="dayCheck" checked={isAll} type="checkbox" onClick={() => setAllfn(isAll)} />
            <label htmlFor="dayCheck">전체날짜</label>
            <DatePickerComponent
              getDate={handleStartDateChange}
              customStyle={{
                marginLeft: "10px",
                justifyContent: "space-around",
                width: "fit-content",
              }}
            />
          </div>
        </section>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}

          <DataGridPremium
            columns={columns}
            rows={apiData ? apiData : []}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={25} // 행 높이를 10%로 설정
            columnHeaderHeight={25} // 헤더 높이를 5%로 설정
            autoHeight={true}
            pagination
            pageSizeOptions={[20]}
            initialState={{
              sorting: {
                sortModel: [{ field: "betStartTime", sort: "desc" }],
              },
            }}
            // page={1} // 현재 페이지 번호 (0부터 시작)
            paginationModel={paginationModel}
            onPaginationModelChange={handlePageChange} // 페이지 변경 시 처리할 핸들러
            rowCount={rowCount} // 총 행의 개수 (서버로부터 받아옴)
            getRowId={(row) => row.betGroupId}
            paginationMode="server"
            loading={isLoading}
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
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            disableColumnResize={true}
            checkboxSelection={false}
            autoPageSize={true}
          />
        </div>
      </div>
    </>
  )
}

export default TotalList
