// 머니사용로그
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./UsedMoneyLogList.module.css"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { currencyFormatter } from "@utils/formatNumberWithCommas"
import { Box } from "@mui/material"
import clsx from "clsx"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import { ktimeTdeleteSecond } from "@utils/ktimetrans"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"

export default function UsedMoneyLogList() {
  const router = useRouter()
  const userToken = getCookie("token")
  const [listdata, setList] = useState(null)
  const [allMoney, setAll] = useState({ used: 0, hit: 0 })
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { userIds, setUserId } = moneyLogStore()
  const [curCategory, setCategory] = useState("전체")
  const regex = /(\d+)(?=\()/
  const originDate = "2024-03-01"
  const [names, setnames] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAll, setIsAll] = useState(true)

  function showFn(event, params) {
    event.preventDefault()
    event.stopPropagation()
    const bigos = params?.row?.bigo
    const match = bigos?.match(regex)

    if (bigos.includes("SPORTS")) {
      window.open(`/userBetGroupTable/${match[0]}`, "베팅내역", "width=1400, height=800")
    } else {
      toast.success("현재 스포츠 내역만 지원 합니다")
    }
  }

  const columns = [
    { field: "id", headerName: "No.", maxWidth: 152, flex: 1, headerAlign: "center", align: "center" },
    { field: "username", headerName: "아이디", maxWidth: 404, flex: 1, headerAlign: "center", align: "left" },
    {
      field: "usedSportsBalance",
      headerName: "사용머니",
      flex: 1,
      cellClassName: (params) => {
        if (Number(params.value) == null) {
          return ""
        }

        return clsx("super-app", {
          negative: Number(params.value) < 0,
          positive: Number(params.value) > 0,
        })
      },
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.formattedValue > 0 ? "+" : ""}
            {currencyFormatter(params.formattedValue)} 원
          </div>
        )
      },
    },
    {
      field: "finalSportsBalance",
      headerName: "최종머니",
      flex: 1,
      cellClassName: "super-app-theme--cell",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{currencyFormatter(params.formattedValue)} 원</div>
      },
    },
    { field: "category", headerName: "내역", maxWidth: 102, flex: 1, headerAlign: "center", align: "center" },
    { field: "bigo", headerName: "비고", maxWidth: 405, flex: 1, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트", maxWidth: 102, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "날짜",
      maxWidth: 222,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{ktimeTdeleteSecond(params.formattedValue, 9)}</div>
      },
    },
    {
      field: "detail",
      headerName: "베팅상세",
      maxWidth: 102,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            type="button"
            onClick={(event) => showFn(event, params)}
            style={{ backgroundColor: "#2F82FF", color: "white", border: "none", borderRadius: "4px" }}
          >
            베팅상세
          </button>
        )
      },
    },
  ]
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const categoryRow = [
    "전체",
    "충전",
    "환전",
    "베팅차감",
    "당첨",
    "포인트전환",
    "머니수동지급",
    "머니수동차감",
    "회수",
    "머니쿠폰",
  ]

  async function fetchDataForCategory(category, userIds, isSearch) {
    let ides
    if (userIds === 0) {
      ides = null

      return toast("no userId")
    } else {
      ides = userIds
    }

    const baseUrl = "https://dailymodelapp.com/api/v2/managers/money-log"
    const params = new URLSearchParams()

    params.append("userId", userIds)

    if (isSearch) {
      params.append("category", category)
    }

    // Adjust the start date based on whether a userId was provided
    const startDate = userIds ? originDate : datepick.start
    params.append("startDate", isAll ? originDate : datepick.start)
    params.append("endDate", datepick.end)

    const url = `${baseUrl}?${params.toString()}`
    try {
      const response = await axios.get(
        url,

        {
          headers: {
            Authorization: userToken,
          },
        },
      )
      // response.data에서 객체 배열의 각 객체에 reason 파라미터 추가
      const updatedData = response.data.map((item) => ({
        ...item, // 기존 객체 복사
        reason: category, // 현재 요청에 사용된 category 값으로 reason 설정
      }))
      if (router.asPath === "/Exchange/personalMoneyLog") {
        setnames(updatedData[0].username)
      }
      return updatedData // 수정된 데이터 반환
    } catch (error) {
      console.error("Error fetching data for category:", category, error)
      return null // 오류 발생 시 null 반환
    }
  }

  async function checkUserName(curCategory) {
    let allData = []
    let data
    // categoryRow의 각 항목에 대해 반복하며 데이터 요청

    if (curCategory === "전체") {
      data = await fetchDataForCategory(null, userIds, false)
    } else {
      data = await fetchDataForCategory(curCategory, userIds, true)
    }

    // 결과 로깅
    setLoading(true)
    setList(data)
    setLoading(false)
    if (data) {
      const result = data.reduce(
        (acc, cur) => {
          if (cur.usedSportsBalance < 0) {
            acc.used += cur.usedSportsBalance // 음수일 경우 음수 합산
          } else {
            acc.hit += cur.usedSportsBalance // 양수일 경우 양수 합산
          }

          return acc
        },
        { used: 0, hit: 0 },
      )
      setAll(result)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      checkUserName(curCategory)
    }
    const toggleData = () => {
      checkUserName(curCategory)
    }

    const intervalId = setInterval(toggleData, 5000)

    // 클린업 함수에서 intervalId를 사용
    return () => clearInterval(intervalId)
  }, [router.isReady, datepick, curCategory, isAll])

  useEffect(() => {}, [curCategory, listdata, isAll])

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={
          <div>
            머니로그 상세&nbsp;{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>{" "}
            &nbsp; {names || ""}
          </div>
        }
        customStyle={{
          height: "38px",
          width: "100%",
          backgroundColor: "#181D4B",
          margin: 0,
          display: "flex",
          alignItems: "center",
        }}
      />
      <CustomBar>
        <button
          type="button"
          onClick={() => checkUserName(curCategory)}
          style={{ width: "5vw", height: "100%", border: "none", backgroundColor: "rgb(217, 217, 217)" }}
          className={styles.refreshBtn}
        >
          새로고침
        </button>
        <div className={styles.checkboxes}>
          <label htmlFor="전체날짜">전체날짜</label>
          <input type="checkbox" id="전체날짜" checked={isAll} onChange={() => setIsAll(!isAll)} />
        </div>
        <div className={styles.boxContainer1}>
          <DatePickerComponent getDate={handleStartDateChange} className={styles.customCalendar} text={"시작일자 :"} />
          <DatePickerComponent getDate={handleEndDateChange} className={styles.customCalendar} text={"종료일자 :"} />
        </div>

        <section className={styles.totalmoney}>
          <div style={{ height: "100%" }}>
            <label style={{ fontSize: "11px", marginRight: "10px" }} htmlFor="usedmoney">
              유저 사용내역
            </label>
            <input
              id="usedmoney"
              value={currencyFormatter(allMoney.hit * -1)}
              style={{ width: "70%", height: "100%", backgroundColor: "#D9D9D9", textAlign: "right" }}
              readOnly
            />
          </div>
          <div style={{ height: "100%" }}>
            <label style={{ fontSize: "11px", marginRight: "10px" }} htmlFor="usedmoney">
              유저 당첨내역
            </label>
            <input
              id="winmoney"
              value={currencyFormatter(allMoney.used * -1)}
              style={{ width: "70%", height: "100%", backgroundColor: "#D9D9D9", textAlign: "right" }}
              readOnly
            />
          </div>
        </section>
        <section className={styles.totalmoney2}>
          <label htmlFor="usedmoney">카테고리</label>
          <select name="" id="" onChange={(event) => setCategory(event.target.value)}>
            {categoryRow.map((state) => {
              return <option value={state}>{state}</option>
            })}
          </select>
        </section>
      </CustomBar>

      <div className={styles.tableContainer}>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--cell": {
              color: "green",
            },
            "& .super-app.negative": {
              color: "red",
            },
            "& .super-app.positive": {
              color: "blue",
            },
          }}
        >
          <CustomTable
            columns={columns}
            rows={listdata ? listdata : []}
            checkbox={false}
            SoltedModel={[
              {
                field: "id",
                sort: "desc",
              },
            ]}
            fontsizesCell="11px"
            pageSizeOptionses={[20]}
            isloadings={loading}
          />
        </Box>
      </div>
    </div>
  )
}
