import React, { useEffect, useState } from "react"
import styles from "./TotalList.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

import { getCookie } from "cookies-next"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"

import DetailList from "@components/cumstomDetailList/DetailList"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import { useRouter } from "next/router"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import DayTransform from "@utils/DayTransform"
import ParsNumPrice from "@utils/allBetHistory/parseNumPrice"
import { toast } from "react-toastify"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"

function BetTransaction() {
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()
  const userToken = getCookie("token")
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const [pageSizes, setpageSize] = useState(20)
  const [apiData, setApiData] = useState()
  const [pages, setPage] = useState(0) // DataGrid의 page는 0부터 시작
  const [rowCount, setRowCount] = useState(20) // 총 데이터 개수
  const [isLoading, setLoading] = useState(false)
  const [isAll, setisAll] = useState(false)
  const { userIds, setUserId } = moneyLogStore()

  function changePage(pageSize, datepick) {
    console.log(datepick)

    setLoading(true)
    const method = "GET"

    const url = `https://dailymodelapp.com/api/v2/users/orderHistory/get?page=${
      pageSize ? pageSize + 1 : "1"
    }&size=20&startDate=${isAll ? "2024-03-01" : datepick?.end}&endDate=${datepick?.end}`
    const headers = { Authorization: userToken }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data.data

        // list의 0번째 객체만을 사용하여 새로운 객체를 생성합니다.
        const expandedBets = result.map((bet) => {
          // bet.list가 존재하고 길이가 0보다 큰 경우에만 처리합니다.
          if (bet.list && bet.list.length > 0) {
            const firstItem = bet.list[0] // list의 첫 번째 항목을 가져옵니다.
            return {
              ...bet, // 상위 객체의 모든 키와 값을 복사합니다.
              folderValue: bet.list.length, // 원래 list의 길이를 새로운 속성에 저장합니다.
              ...firstItem, // list 배열의 첫 번째 객체로부터 키와 값을 복사하여 결합합니다.
            }
          }
          return bet // list가 없거나 비어 있는 경우, 원본 bet 객체를 반환합니다.
        })

        setApiData(expandedBets) // 수정: expandedBets를 상태로 저장합니다.

        const totalElements = responseData?.data?.pageInfo?.totalElements
        const totalPages = responseData?.data?.pageInfo?.totalPages
        const currentPage = responseData?.data?.pageInfo?.page // 서버 페이지는 1부터 시작

        setPage(currentPage - 1) // DataGrid의 페이지는 0부터 시작하므로 조정
        setRowCount(totalElements)
        setpageSize(totalPages)
      }
      setLoading(false)

      return false
    })
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

  const openUserInfo = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    setUserId(params?.row?.userId)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }

  const columns = [
    { field: "betGroupId", headerName: "그룹번호", flex: 1, headerAlign: "center", align: "center" },
    { field: "username", headerName: "ID", flex: 1, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "betFoldType",
      headerName: "벳타입",
      flex: 0.7,
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

      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue > 0 ? addCommasToNumber(Math.floor(params.formattedValue)) : "0원"}</div>
      },
    },
    {
      field: "totalRate",
      headerName: "배당률",

      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: (params) => ParsNumPrice(Math.floor(params.row.totalRate)),
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

      flex: 0.5,
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
      field: "betIp",
      headerName: "IP",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "logBtn",
      headerName: "상세내역",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <DetailList transactionId={params.row.transactionId} />
      },
    },
    {
      field: "balance",
      headerName: "머니",
      flex: 0.5,
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
        const handlechVal = (event, count) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

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
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              쪽지
            </button>
          </>
        )
      },
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

  useEffect(() => {
    if (router.isReady && !apiData) {
      changePage(pages, datepick)
    }
    // const toggleData = () => {
    //   changePage(pages, datepick)
    // }

    // const intervalId = setInterval(toggleData, 100000) // 5초마다 toggleData 실행
    // return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [apiData, router.isReady])

  useEffect(() => {
    changePage(pages, datepick)
  }, [datepick.start, datepick.end, pages, isAll]) // `pages` 변경 시에도 호출되도록 의존성 배열에 추가

  useEffect(() => {}, [apiData])

  const handlePageChange = (newPage) => {
    setPage(newPage.page)
  }
  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"전체 베팅 목록 (전체: 36578)"}
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
            <input htmlFor="dayCheck" id="dayCheck" checked={isAll} type="checkbox" onClick={() => setisAll(!isAll)} />
            <label htmlFor="dayCheck">전체날짜</label>
            <DatePickerComponent
              getDate={handleEndDateChange}
              customStyle={{
                marginLeft: "10px",
                justifyContent: "space-around",
                width: "fit-content",
              }}
            />
          </div>
        </CustomBar>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}

          <DataGridPremium
            disableColumnResize={true}
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
            page={pages} // 현재 페이지 번호 (0부터 시작)
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
                fontsize: "13px",
                fontSize: "13px",
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
            autoPageSize={true}
          />
        </div>
      </div>
    </>
  )
}

export default BetTransaction
