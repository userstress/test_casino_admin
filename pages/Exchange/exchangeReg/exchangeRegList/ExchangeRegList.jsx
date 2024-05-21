import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ExchangeRegList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { useState, useEffect, Ref, useRef } from "react"
import useStore from "@utils/zustand/store"
import { addCommasToNumber, currencyFormatter } from "@utils/formatNumberWithCommas"
import { toast } from "react-toastify"
import { useAuthStore } from "@utils/useAuthStore"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import axios from "axios"
import { ktimeTdeleteSecond } from "@utils/ktimetrans"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"

const basicURL = process.env.NEXT_PUBLIC_API_URL

const tableSx = {
  width: "100%",

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
    overflow: "hidden",
  },
  ".MuiDataGrid-main > div:nth-child(3)": {
    display: "none",
  },
}

export default function ExchangeRegList() {
  const apiRef = useGridApiRef()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const { userToken } = useAuthStore()
  const [noteAdd, setNote] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [Listof, setList] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { sendRequest } = useAxiosRequest()
  const [waitCount, setWC] = useState(0)
  const [AllCount, setAc] = useState(0)
  const [allWaitingList, setAllWaitingList] = useState([])
  const [apiData, setApiData] = useState(null)
  const [optionData, setOptionData] = useState(null)
  const [unReadCount, setUC] = useState(0)

  const [selectedIds, setSelectedIds] = useState([])
  const router = useRouter()
  const { userIds, setUserId } = moneyLogStore()
  const [options, setOptions] = useState("all")

  const clearSelection = () => {
    setSelectedIds([])
    // 선택 해제 후 추가적으로 실행할 로직 (선택적)
  }

  function addHoursAndFormat(dateStr, hoursToAdd) {
    // 날짜와 시간을 분리
    if (!dateStr) {
      return ""
    }
    let [datePart, timePart] = dateStr.split(" T ")
    let [hour, minute, second] = timePart.split(":")

    // 시간을 숫자로 변환하고 시간을 추가
    hour = parseInt(hour, 10) + hoursToAdd

    // 시간이 24시를 넘어가면 날짜 조정
    if (hour >= 24) {
      hour -= 24
      // ISO 날짜 포맷을 사용해서 날짜를 하루 더함
      const fullDate = new Date(datePart)
      fullDate.setDate(fullDate.getDate() + 1)
      datePart = fullDate.toISOString().split("T")[0]
    }

    // 시간, 분, 초를 두 자리 문자열로 조정
    hour = hour.toString().padStart(2, "0")
    minute = minute.padStart(2, "0")
    second = second.padStart(2, "0")

    // 최종적으로 변환된 문자열 반환
    return `${datePart} ${hour}:${minute}:${second}`
  }

  const handleSelection = (ids) => {
    // 선택된 필드의 모든 값 가져옴
    const temp = ids.map((v) => apiRef.current.getRow(v))
    setSelectedIds(temp)
  }

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token"),
    },
  }

  const handleBettingBtn = (event, params) => {
    event.stopPropagation()
    return window.open(`/userBetDetailTable/${params?.row?.userId}`, "_blank", "width=1400,height=800")
  }
  const handleMoneyBtn = (event, params) => {
    event.stopPropagation()
    setUserId(params?.row?.userId)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }
  const handdleMember = (event, params) => {
    event.stopPropagation()
    window.open(`/getUserInfoes/${params.row.userId}`, "_blank", "width=1700,height=900")
  }
  const columns = [
    {
      field: "lv",
      headerName: "Lv",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return params.row.lv
      },
    },
    { field: "username", headerName: "아이디", flex: 4, align: "center" },
    {
      field: "nickname",
      headerName: "신청자",
      flex: 2.33,
      align: "center",
      rencerCell: (params) => {
        return <div>{params.wallet.ownerName}(이름)</div>
      },
    },
    {
      field: "exchangeAmount",
      headerName: "입금금액",
      flex: 4.0,
      headerAlign: "right",
      type: "number",
      renderCell: (params) => {
        const money = Number(params.row.exchangeAmount)
        if (money < 100000) {
          return (
            <div
              style={{
                backgroundColor: "#FF0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  width: "95%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "0 1%",
                }}
              >
                {currencyFormatter(money)} 원
              </div>
            </div>
          )
        }
        if (1000000 > money && money >= 100000) {
          return (
            <div
              style={{
                backgroundColor: "#008000",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  width: "95%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "0 1%",
                }}
              >
                {currencyFormatter(money)} 원
              </div>
            </div>
          )
        }
        if (1000000 <= money) {
          return (
            <div
              style={{
                backgroundColor: "#E40505",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  width: "95%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "0 1%",
                }}
              >
                {currencyFormatter(money)} 원
              </div>
            </div>
          )
        }
      },
    },
    {
      field: "ownerName",
      valueGetter: (params) => params.row.wallet.ownerName,
      headerName: "예금주",
      flex: 2,
      align: "center",
    },
    {
      field: "bankName",
      valueGetter: (params) => params.row.wallet.bankName,
      headerName: "은행",
      flex: 4.33,
      align: "center",
    },
    {
      field: "number",
      valueGetter: (params) => params.row.wallet.number,
      headerName: "계좌번호",
      flex: 6.67,
      align: "center",
    },
    { field: "site", headerName: "사이트", flex: 4, align: "center" },
    {
      field: "status",
      headerName: "상태",
      flex: 1.17,
      align: "center",
      renderCell: (params) => {
        if (params.row.status === "APPROVAL") {
          return <div>승인</div>
        }
        if (params.row.status === "WAITING") {
          return <div>대기</div>
        }
        if (params.row.status === "UNREAD") {
          return <div>안읽음</div>
        }
        if (params.row.status === "CANCELLATION") {
          return <div>취소</div>
        }
      },
    },
    {
      field: "infobtn",
      headerName: "회원",
      flex: 1.17,
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }

        return (
          <>
            <button style={inputSS} onClick={(event) => handdleMember(event, params)}>
              회원
            </button>
          </>
        )
      },
    },
    {
      field: "betbtn",
      headerName: "베팅",
      flex: 1.17,
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }

        return (
          <>
            <button style={inputSS} onClick={(event) => handleBettingBtn(event, params)}>
              베팅
            </button>
          </>
        )
      },
    },
    {
      field: "moneybtn",
      headerName: "머니",
      flex: 1.17,
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }

        return (
          <>
            <button style={inputSS} onClick={(event) => handleMoneyBtn(event, params)}>
              머니
            </button>
          </>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "등록날짜",
      flex: 4,
      align: "center",
      valueGetter: (params) => ktimeTdeleteSecond(params.row.createdAt, 9),
    },
    { field: "ip", headerName: "IP", flex: 4, align: "center" },
    {
      field: "processedAt",
      headerName: "처리날짜",
      flex: 4,
      align: "center",

      valueGetter: (params) => addHoursAndFormat(params.row.processedAt, 9),
    },
    { field: "domain", headerName: "도메인", flex: 1.17, align: "center" },
    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 2,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const { ids, getUserIds } = useStore()
        const handleClick = (event) => {
          event.preventDefault()
          event.stopPropagation()
          getUserIds(params.row.userId)
          window.open("/sendingNote", "쪽지", "width=1024, height=500")
        }

        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => handleClick(event)}>
              쪽지
            </button>
          </>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지1",
      flex: 1,
      sortable: false,
      renderHeader: (params) => {
        const handleAll = (event) => {
          event.stopPropagation()
          const newWhole = !noteWhole
          setWhole(newWhole)

          if (newWhole) {
            const startIdx = page * pageSize
            const endIdx = startIdx + pageSize
            const currentPageRowIds = Listof.slice(startIdx, Math.min(endIdx, Listof.length))
              .map((row) => row.id)
              .filter((id) => !isNaN(id)) // 숫자가 아닌 ID를 필터링합니다.

            setNote(currentPageRowIds)
          } else {
            setNote([])
          }
        }

        return (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            쪽지
            <input type="checkbox" style={{ width: "17px" }} checked={noteWhole} onClick={handleAll} />
          </div>
        )
      },
      renderCell: (params) => {
        if (!params.row.id) {
          return null
        }
        const handleClick = (event, ids) => {
          event.stopPropagation()

          const currentIndex = noteAdd.indexOf(params.row.userId)
          const newChecked = [...noteAdd]
          if (currentIndex === -1) {
            newChecked.push(params.row.userId)
            setNote(...noteAdd, ids)
          } else {
            newChecked.splice(currentIndex, 1)
          }

          setNote(newChecked)
        }

        return (
          <input
            id={params.row.id}
            type="checkbox"
            checked={noteAdd.includes(params.row.userId) > 0 ? true : false}
            onClick={(event) => handleClick(event)}
            style={{ width: "15px", height: "15px", magin: "0" }}
          />
        )
      },
    },
  ]
  function changeOption(value, totalList) {
    if (value === "all") {
      setOptionData(null)
      setOptions("all")
    } else {
      setOptions(value)
      setOptionData(totalList.filter((row) => row.status === value))
    }
  }
  const fetchData = async () => {
    //리스트 불러옴

    try {
      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION"]
      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios.get(
            `${basicURL}/api/v2/managers/et/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
            headers,
          ),
        ),
      )
      // 0 =승인
      // 1 = 안읽음
      // 2 = 대기
      // 3 = 취소
      const apiDataCombined = [...responses[0].data, ...responses[1].data, ...responses[2].data, ...responses[3].data]
      setApiData(apiDataCombined)
      setAllWaitingList(responses[1].data)
      setWC(responses[2].data.length)
      setAc(apiDataCombined.length)
      setUC(responses[1].data.length)

      if (optionData && options !== "all" && apiDataCombined) {
        changeOption(options, apiDataCombined)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const setExchangeApproval = async () => {
    // 환전처리
    if (selectedIds) {
      const filtered = apiData
        .filter((row) => selectedIds.some((selectedId) => row.id === selectedId.id))
        .map((row) => row.id)

      console.log(filtered)
      const url = `${basicURL}/api/v2/managers/exchange/approval?transactionIds=${filtered.join(",")}`
      const headers = {
        headers: {
          Authorization: userToken,
          // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
        },
      }

      axios
        .patch(url, {}, headers)
        .then(() => {
          // 요청 성공 처리
          toast.success("성공적으로 환전 처리 하였습니다.")
          fetchData()
          clearSelection()
          router.reload()
        })
        .catch((error) => {
          // 에러 처리
          // 이전과 동일한 에러 처리 로직을 사용할 수 있습니다.
        })
    }
  }
  const setWaitingStatus = async () => {
    //선택한 필드 대기처리
    if (selectedIds && selectedIds.length > 0) {
      try {
        const headers = {
          headers: {
            Authorization: userToken, // 토큰을 Authorization 헤더에 추가
            // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
          },
        }

        const promises = selectedIds.map((transactionID) =>
          axios.patch(
            `${basicURL}/api/v2/managers/exchange/status-to-waiting?transactionId=${transactionID.id}`,
            {},
            headers,
          ),
        )

        await Promise.all(promises)

        toast.success("선택된 항목이 대기처리 되었습니다.")
        clearSelection()
        router.reload()
        fetchData()
      } catch (error) {
        // 에러 처리
        toast.error("이미 처리된 항목입니다")
      }
    }
  }
  const setWaitingStatusAll = async () => {
    // 읽지 않은 모든 필드 대기처리
    console.log(allWaitingList)

    if (allWaitingList.length < 1) {
      toast.error("이미 처리된 항목입니다")
    }
    if (allWaitingList && allWaitingList.length > 0) {
      try {
        const promises = allWaitingList.map((transactionID) =>
          axios.patch(
            `${basicURL}/api/v2/managers/exchange/status-to-waiting?transactionId=${transactionID.id}`,
            {},
            headers,
          ),
        )

        await Promise.all(promises)

        toast.success("전체 항목들이 성공적으로 대기처리 되었습니다.")
        router.reload()

        fetchData()
        clearSelection()
      } catch (error) {
        // 에러 처리
        toast.error("이미 처리된 항목입니다")
      }
    }
  }
  const setRechargeCancle = async () => {
    //취소 처리
    if (selectedIds) {
      for (const transactionID of selectedIds) {
        if (transactionID.status === "APPROVAL" || transactionID.status === "CANCELLATION") {
          return toast.warn("이미 승인,취소 처리된 항목입니다")
        }
        try {
          const url = `${basicURL}/api/v2/managers/${transactionID.userId}/exchange/cancel?transactionId=${transactionID.id}`
          await axios.patch(url, {}, headers)
          // 요청 성공 처리

          toast.success("성공적으로 취소처리 하였습니다.")
          router.reload()

          fetchData()
          clearSelection()
        } catch (error) {
          // 에러 처리
          toast.error(error)
        }
      }
    }
  }
  useEffect(() => {}, [apiData, allWaitingList])
  useEffect(() => {
    fetchData()
  }, [noteAdd, datepick.start, datepick.end])
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
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

  const [selectionModel, setSelectionModel] = useState([{ id: "", balance: "" }])
  const totalRechargeAmount = apiData
    ? apiData.reduce((acc, obj) => {
        return acc + (obj.exchangeAmount || 0)
      }, 0)
    : 0

  return (
    <>
      <CustomHeader text={"환전관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0", justifyContent: "center", borderRadius: "5px" }}>
        <div className={styles.customBarInner}>
          <DatePickerComponent
            text={"시작일자:"}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
            textStyle={{ width: "100px" }}
            getDate={handleStartDateChange}
          />

          <DatePickerComponent
            text={"종료일자:"}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
            textStyle={{ width: "100px" }}
            getDate={handleEndDateChange}
          />
          <div style={{ width: "300px" }}>
            상태값 : {AllCount} (신청) / {waitCount} (대기) / {unReadCount} (안읽음)
          </div>

          {/* "APPROVAL", "UNREAD", "WAITING", "CANCELLATION" */}
          <select
            defaultValue="all"
            style={{ height: "100%" }}
            value={options}
            onChange={(event) => changeOption(event.target.value, apiData)}
          >
            <option value="all">전체</option>
            <option value="UNREAD">읽지않음</option>
            <option value="APPROVAL">승인</option>
            <option value="WAITING">대기</option>
            <option value="CANCELLATION">취소</option>
          </select>
        </div>
      </CustomBar>
      <CustomBar
        customStyle={{
          width: "100%",
          padding: "0.260vw 0.156vw",
          justifyContent: "space-between",
          borderRadius: "5px",
        }}
      >
        <div className={styles.btnGroup1}>
          <button
            style={{
              background: "#FFA700",
              color: "white",
              width: "70px",
              height: "100%",
              padding: "0",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={setExchangeApproval}
          >
            환전 처리
          </button>
          <button
            style={{
              background: "#3B4281",
              color: "white",
              width: "70px",
              height: "100%",
              padding: "0",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={setWaitingStatus}
          >
            대기 처리
          </button>
          <button
            style={{
              background: "#3B4281",
              color: "white",
              width: "100px",
              height: "100%",
              padding: "0",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={setWaitingStatusAll}
          >
            전체 대기 처리
          </button>
        </div>
        <div className={styles.totalAmount}>합계{addCommasToNumber(totalRechargeAmount)}</div>

        <div className={styles.btnGroup2} onClick={setRechargeCancle}>
          <CustomButton
            text={"환전취소"}
            customStyle={{ width: "100%", background: "#AC2E2E", color: "white", borderRadius: "5px" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <div className={styles.boxContainer}>
          {/* DataGrid Pro 쓰면 자동 컬럼 resize들어가서 일반 DataGrid */}
          {apiData && (
            <DataGridPremium
              className={styles.gridmaincustom}
              onPageSizeChange={handlePageSizeChange}
              // sx = datagrid 내부 요소들의 커스텀 스타일링
              sx={tableSx}
              showCellVerticalBorder
              showColumnVerticalBorder
              rowHeight={22} // 행 높이를 10%로 설정
              columnHeaderHeight={22} // 헤더 높이를 5%로 설정
              autoHeight={true}
              rows={optionData ? optionData : apiData || []}
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
              apiRef={apiRef}
              pagination
              autoPageSize={false}
              checkboxSelection
              localeText={localizedTextsMap}
              density="comfortable" //초기 설정 행간격 최대
              auto
              onRowSelectionModelChange={(params) => handleSelection(params)}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel)
              }}
              selectionModel={selectionModel}
              disableColumnResize={true}
            />
          )}
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowInput}>
            {/* <button style={{ fontSize: "0.6vw", width: "33%", backgroundColor: "#696969", color: "white" }}>
              삭제
            </button> */}
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
