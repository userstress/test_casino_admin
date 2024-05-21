// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ChargeRegList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { useState, useEffect, Ref, useRef, useMemo } from "react"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { currencyFormatter } from "@utils/formatNumberWithCommas"
import useStore from "@utils/zustand/store"
import { toast } from "react-toastify"
import { useAuthStore } from "@utils/useAuthStore"
import axios from "axios"
import DayTransform, { fetchDate } from "@utils/DayTransform"
import { useRouter } from "next/router"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import { getCookie } from "cookies-next"
const basicURL = process.env.NEXT_PUBLIC_API_URL

const inputSS = {
  width: "80%",
  marginLeft: "1px",
  marginRight: "2px",
  fontSize: "10px",
  textAlign: "center",
  padding: "0",
}

const sxstyle = {
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
}

const buttonStyle = {
  width: "100px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  justifyContent: "center",
  color: "black",
  border: "0",
  backgroundColor: "#D9D9D9",
  fontSize: "15px",
  cursor: "pointer",
}

export default function ChargeRegList() {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const userToken = getCookie("token")
  const [noteAdd, setNote] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const { sendRequest } = useAxiosRequest()
  const [waitCount, setWC] = useState(0)
  const [unReadCount, setUC] = useState(0)

  const [AllCount, setAc] = useState(0)
  const [apiData, setApiData] = useState(null)
  const [allWaitingList, setAllWaitingList] = useState([])
  const [optionData, setOptionData] = useState(null)
  const [options, setOptions] = useState("all")

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  function convertKoreanCurrencyToNumber(koreanCurrency) {
    if (!koreanCurrency) {
      return 0
    }
    return parseInt(koreanCurrency.replace(/,/g, ""), 10)
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: userToken && userToken,
  }
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
    try {
      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION", "AUTO_APPROVAL", "TIMEOUT"]

      const headers = {
        Authorization: `${userToken}`, // 토큰을 Authorization 헤더에 추가
      }

      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios.get(
            `${basicURL}/api/v2/managers/rt/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
            {
              headers,
            },
          ),
        ),
      )
      const apiDataCombined = [
        ...responses[0].data,
        ...responses[1].data,
        ...responses[2].data,
        ...responses[3].data,
        ...responses[4].data,
        ...responses[5].data,
      ]
      setApiData(apiDataCombined)
      setAllWaitingList(responses[1].data) //안읽은 상태인 목록들
      setWC(responses[2].data.length)
      setUC(responses[1].data.length)
      setAc(apiDataCombined.length)

      console.log(options)
      if (optionData && options !== "all" && apiDataCombined) {
        changeOption(options, apiDataCombined)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    // requestList()
    fetchData()
  }, [noteAdd, datepick.start, datepick.end])

  const [selectedIds, setSelectedIds] = useState([])

  const totalRechargeAmount = useMemo(() => {
    return selectedIds.reduce((acc, obj) => {
      if (obj.status === "APPROVAL") {
        return acc + (obj.rechargeAmount || 0)
      }
      return acc
    }, 0)
  }, [selectedIds])

  const handleSelection = (ids) => {
    // 선택된 필드의 모든 값 가져옴
    const temp = ids.map((v) => apiRef.current.getRow(v))
    setSelectedIds(temp)
  }

  const setRechargeCancle = async () => {
    //취소 처리
    // const bonus =
    if (selectedIds) {
      for (const transactionID of selectedIds) {
        if (transactionID.status !== "WAITING" && transactionID.status !== "UNREAD") {
          // status가 WAITING 또는 UNREAD가 아닐 때 실행됩니다.
          return toast.error("이미 처리된 신청입니다")
        }

        try {
          const url = `${basicURL}/api/v2/managers/${transactionID.userId}/cancel?transactionId=${transactionID.id}`
          const headers = {
            headers: {
              Authorization: userToken,
            },
          }
          await axios.patch(url, {}, headers)
          // 요청 성공 처리
          toast.success("성공적으로 취소처리 하였습니다.", { onClose: () => fetchData() })
        } catch (error) {
          // 에러 처리
          toast.error("취소처리 하지 못했습니다")
        }
      }
    }
  }

  const setRechargeApproval = async () => {
    // 입금처리
    if (selectedIds) {
      for (const transactionID of selectedIds) {
        try {
          const url = `${basicURL}/api/v2/managers/approval?transactionIds=${transactionID.id}`
          const headers = {
            Authorization: userToken, // 토큰을 Authorization 헤더에 추가
            // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
          }
          console.log(apiData.filter((item) => item.id === transactionID.id))
          const filtered = apiData.find((item) => item.id === transactionID.id)
          const body = {
            userBalance: filtered.rechargeAmount,
            bonus: filtered.bonus,
          }
          await axios.patch(url, body, { headers }) // 요청 성공 처리
          toast.success("성공적으로 입금처리 하였습니다.")
          router.reload()

          fetchData()
        } catch (error) {
          // 에러 처리
          if (error.response && error.response.status === 500) {
            // 500 에러일 경우
            toast.error("대기상태가 아닌 입금요청은 입금처리 할 수 없습니다.")
          } else {
            // 그 외의 에러
            toast.error("오류가 발생했습니다.")
          }
        }
      }
    }
  }
  const setWaitingStatus = async () => {
    //대기처리
    if (selectedIds && selectedIds.length > 0) {
      try {
        const headers = {
          headers: {
            Authorization: userToken, // 토큰을 Authorization 헤더에 추가
            // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
          },
        }

        const promises = selectedIds.map((transactionID) =>
          axios.patch(`${basicURL}/api/v2/managers/status-to-waiting?transactionId=${transactionID.id}`, {}, headers),
        )

        await Promise.all(promises)

        toast.success("선택된 항목이 대기처리 되었습니다.")
        router.reload()

        fetchData()
      } catch (error) {
        // 에러 처리
        toast.error("에러 발생: " + error.message)
      }
    }
  }
  const setWaitingStatusAll = async () => {
    // 읽지 않은 모든 필드 대기처리
    if (allWaitingList && allWaitingList.length > 0) {
      try {
        const headers = {
          headers: {
            Authorization: userToken, // 토큰을 Authorization 헤더에 추가
            // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
          },
        }

        const promises = allWaitingList.map((transactionID) =>
          axios.patch(`${basicURL}/api/v2/managers/status-to-waiting?transactionId=${transactionID.id}`, {}, headers),
        )

        await Promise.all(promises)

        toast.success("전체 항목들이 성공적으로 대기처리 되었습니다.")

        router.reload()
        fetchData()
      } catch (error) {
        // 에러 처리
        toast.error("에러 발생: " + error.message)
      }
    }
  }

  const handleEditCellChange = (id, value) => {
    setApiData(apiData.map((row) => (row.id === id ? { ...row, bonus: value } : row)))
  }

  const parseNumber = (str) => {
    return parseInt(str.replace(/,/g, ""), 10)
  }

  function removeCommasFromNumber(numberWithCommas) {
    // 입력값이 문자열이나 숫자가 아니라면 그대로 반환
    if (typeof numberWithCommas !== "string" && typeof numberWithCommas !== "number") {
      return numberWithCommas
    }

    // 쉼표를 제거하고 문자열을 숫자로 변환
    let number = parseFloat(numberWithCommas.replace(/,/g, ""))

    // 결과 반환
    return number
  }

  function addCommasToNumber(number) {
    // 숫자를 문자열로 변환
    let numStr = number.toString()

    // 소수점 부분과 정수 부분을 구분
    let parts = numStr.split(".")
    let integerPart = parts[0]
    let decimalPart = parts.length > 1 ? "." + parts[1] : ""

    // 정수 부분에 쉼표 추가
    let integerWithCommas = ""
    for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        // 매 3자리마다 쉼표 추가
        integerWithCommas = "," + integerWithCommas
      }
      integerWithCommas = integerPart[i] + integerWithCommas
    }

    // 결과 반환
    return integerWithCommas + decimalPart
  }

  const handleInputs1 = (event, params) => {
    event.stopPropagation()

    const { value } = event.target

    const formattedValue = removeCommasFromNumber(value)

    console.log(formattedValue)

    if (!isNaN(formattedValue)) {
      handleEditCellChange(params.id, formattedValue)
    } else {
      handleEditCellChange(params.id, 0)
    }
  }

  const handlechVal = (event, params) => {
    event.stopPropagation()
    window.open(`/getUserInfoes/${params?.row?.userId || 0}`, "유저 정보", "width=1450,height=1000")
  }
  const handleCalc = (event, count, params) => {
    event.preventDefault()
    event.stopPropagation()
    const numbers = Math.ceil((Number(params.row.rechargeAmount) * count) / 100)
    handleEditCellChange(params.id, numbers)
  }

  const columns = [
    { field: "gubun", headerName: "입금구분", flex: 1, headerAlign: "center" },
    { field: "lv", headerName: "Lv", flex: 1, headerAlign: "center" },
    { field: "username", headerName: "아이디", flex: 4, headerAlign: "center" },
    {
      field: "ownerName",
      headerName: "입금자",
      flex: 1.71,
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.wallet.ownerName
      },
    },
    {
      field: "rechargeAmount",
      headerName: "입금금액",
      flex: 3.5,
      headerAlign: "right",
      type: "number",
      renderCell: (params) => {
        const money = Number(params.row.rechargeAmount)
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
      field: "lastRechargedAt",
      headerName: "최근입금일",
      flex: 3.43,
      align: "center",
      renderCell: (params) => {
        return DayTransform(params.row.wallet.lastRechargedAt)
      },
    },
    {
      field: "infoes",
      headerName: "회원",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        if (!params.row.id) return null
        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, params)}>
              정보
            </button>
          </>
        )
      },
    },
    {
      field: "bonus",
      headerName: "보너스",
      flex: 7,
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          width: "15%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        if (!params.row.id) return null
        return (
          <>
            <button style={inputSS} onClick={(event) => handleCalc(event, 1, params)}>
              1%
            </button>
            <button style={inputSS} onClick={(event) => handleCalc(event, 2, params)}>
              2%
            </button>
            <button style={inputSS} onClick={(event) => handleCalc(event, 3, params)}>
              3%
            </button>
            <button style={inputSS} onClick={(event) => handleCalc(event, 5, params)}>
              5%
            </button>
            <button style={inputSS} onClick={(event) => handleCalc(event, 10, params)}>
              10%
            </button>
            <input
              key={params.row.id}
              type="currency"
              style={{ width: "30%", fontSize: "10px" }}
              value={addCommasToNumber(params.formattedValue)}
              onChange={(event) => handleInputs1(event, params)}
              onClick={(event) => event.stopPropagation()}
              // focused={params.formattedValue && true}
            />
          </>
        )
      },
    },

    {
      field: "createdAt",
      headerName: "등록날짜",
      flex: 3.43,
      align: "center",
      // sortComparator: dateSortComparator,
      sortable: true,
      valueGetter: (params) => fetchDate(params.row.createdAt),
    },
    { field: "ip", headerName: "IP", flex: 3.43, align: "center" },
    {
      field: "processedAt",
      headerName: "처리날짜",
      flex: 3.43,
      align: "center",
      sortable: true,
      valueGetter: (params) => fetchDate(params.row.processedAt),
    },
    { field: "site", headerName: "사이트", flex: 3.43, align: "center" },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
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

        if (params.row.status === "AUTO_APPROVAL") {
          return <div>자동승인</div>
        }
        if (params.row.status === "TIMEOUT") {
          return <div>시간초과</div>
        }
      },
    },
    { field: "domain", headerName: "도메인", minWidth: "100", maxWidth: "100", align: "center" },
    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 1,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const { ids, getUserIds } = useStore()

        const handleClick = (event) => {
          event.preventDefault()
          event.stopPropagation()
          getUserIds(params.row.userId)
          window.open(`/sendingNote?userId=${params.row.userId}`, "쪽지", "width=1024, height=500")
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
            const currentPageRowIds = apiData
              .slice(startIdx, Math.min(endIdx, apiData.length))
              .map((row) => row.userId)
              .filter((id) => !isNaN(id)) // 숫자가 아닌 ID를 필터링합니다.
            const uniqueArr = [...new Set(currentPageRowIds)]
            setNote(uniqueArr) //체크된 체크박스들의 유저 아이디 저장
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
            checked={noteAdd.includes(params.row.userId) ? true : false}
            onClick={(event) => handleClick(event)}
            style={{ width: "15px", height: "15px", magin: "0" }}
          />
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

  //페이지 크기 변경시 사이즈 업뎃
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
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

  const apiRef = useGridApiRef()

  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <CustomHeader text={"충전관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0", justifyContent: "center" }}>
        <div className={styles.customBarInner}>
          <DatePickerComponent
            text={"시작일자:"}
            getDate={handleStartDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
          <DatePickerComponent
            text={"종료일자:"}
            getDate={handleEndDateChange}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
          />
          <div style={{ width: "300px", marginLeft: "20px" }}>
            상태값 : {AllCount} (신청) / {waitCount} (대기) / {unReadCount} (안읽음)
          </div>

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
            <option value="AUTO_APPROVAL">자동충전 승인</option>
            <option value="TIMEOUT">시간초과</option>
          </select>
        </div>
      </CustomBar>
      <CustomBar customStyle={{ padding: "0.260vw 0.156vw", justifyContent: "flex-start" }}>
        <div className={styles.btnGroup1}>
          <div className={styles.buttonBox}>
            <div style={{ height: "100%" }} onClick={setRechargeApproval}>
              <CustomButton text={"입금 처리"} customStyle={{ background: "#D9D9D9" }} />
            </div>
            <div style={{ height: "100%" }} onClick={setWaitingStatus}>
              <CustomButton text={"대기 처리"} customStyle={{ background: "#D9D9D9" }} />
            </div>
            <div style={{ height: "100%" }} onClick={setWaitingStatusAll}>
              <CustomButton text={"전체 대기 처리"} customStyle={{ background: "#D9D9D9", width: "130px" }} />
            </div>
          </div>
          <div className={styles.totalAmount}>입금된 금액 합계 {addCommasToNumber(totalRechargeAmount)}</div>

          <div className={styles.buttonBox2} onClick={setRechargeCancle}>
            <CustomButton text={"입금취소"} customStyle={{ background: "#D9D9D9" }} />
          </div>

          <div className={styles.buttonBox}>
            <button
              style={buttonStyle}
              onClick={() => window.open(`/sendingNote?userId=${noteAdd}`, "쪽지", "width=1024, height=500")}
            >
              쪽지 보내기
            </button>
            {/* <CustomButton text={"삭제"} customStyle={{ background: "#D9D9D9" }} /> */}
          </div>
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
              sx={sxstyle}
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
              selectionModel={selectionModel}
              disableColumnResize={true}
            />
          )}
        </div>
      </div>
    </>
  )
}
