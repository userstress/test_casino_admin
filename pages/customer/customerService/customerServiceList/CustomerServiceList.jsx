// 1.공지사항
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./CustomerServiceList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useState, useEffect, useRef } from "react"
import { getCookie } from "cookies-next"
import { ktimeTrans2 } from "@utils/ktimetrans"
import { toast } from "react-toastify"
import { boardStore } from "@utils/boardStore/boardStore"
import { useRouter } from "next/router"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"

export default function CustomerServiceList() {
  const { sendRequest } = useAxiosRequest()
  const [setParams1, setParams] = useState()
  const { boardMove, searchModeObj, SearchAway } = boardStore()
  const router = useRouter()
  const mytoken = getCookie("token")

  const [data, setData] = useState()
  const [SearchMode, setSearchMode] = useState("nickname")
  const [searchVal, setsearchVal] = useState("")
  const bannedRef = useRef(null)
  const bannedRef2 = useRef(null)
  const [isAllTime, setIsAllTime] = useState(true)
  const { userIds, setUserId } = moneyLogStore()

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  function moveToBoard(event, params) {
    const pageInfoes = {
      id: params.row.id,
      type: "service",
      contents: params.row.content,
      title: params.row.title,
      isTop: true,
      readCount: params.row.readCount,
      commentAllowed: params.row.commentAllowed,
    }
    boardMove(pageInfoes)
    router.push("/customer/BoardEditorFix")
  }

  const handleMoneyBtn = (event, params) => {
    event.preventDefault()
    event.stopPropagation()

    console.log(params?.row?.userId)
    setUserId(params?.row?.userId)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }

  const columns = [
    { field: "domain", headerName: "증권사", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "title",
      headerName: "제목",
      flex: 4,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.boardTitle} onClick={() => moveToBoard(event, params)}>
            {`${params.formattedValue}`}{" "}
          </div>
        )
      },
    },
    { field: "lv", headerName: "레벨", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "userGubunEnum", headerName: "상태", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "username", headerName: "작성자", flex: 1.5, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트", flex: 1, headerAlign: "center", align: "center" },
    { field: "readCount", headerName: "조회수", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "작성일",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div style={{ width: "100%", textAlign: "center" }}>{ktimeTrans2(params.formattedValue)}</div>
      },
    },
    {
      field: "answerStatus",
      headerName: "답변",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue
      },
    },
    { field: "login", headerName: "로그인", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "moneyLog",
      headerName: "머니로그",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        // userId가 있을 경우 버튼을 렌더링합니다.
        params?.row?.userId ? (
          <button className={styles.MlogBtn} onClick={(event) => handleMoneyBtn(event, params)}>
            머니로그
          </button>
        ) : null,
    },
  ]

  function boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj) {
    const origin = `/api/v2/users/customer-center/articles/search?`
    const params = new URLSearchParams()

    if (
      searchModeObj?.val &&
      searchModeObj?.val !== "undefined" &&
      searchModeObj?.type &&
      searchModeObj?.type !== "undefined"
    ) {
      params.append(searchModeObj?.type, searchModeObj?.val)
    } else {
      if (SearchMode !== "" && searchVal && SearchMode && SearchMode !== "") {
        params.append(SearchMode, searchVal)
      }
    }
    SearchAway({ type: "", val: "" })

    if (isAllTime) {
      params.set("startDate", "2024-03-01")
    } else {
      params.set("startDate", datepick.start)
    }

    params.append("endDate", datepick.end)

    const method = "GET"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const url = origin + params.toString()

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
        console.log(responseData.data)
        const flattenedArray = responseData.data.map((item) => {
          const { writer = {}, category, ...rest } = item
          const { id, ...writerWithoutId } = writer?.id ? writer : {}
          const userId = id ?? null
          return {
            ...rest,
            ...writerWithoutId,
            userId,
            ...category,
          }
        })
        setData(flattenedArray.reverse())
        console.log(flattenedArray)
      }
    })
  }

  useEffect(() => {
    boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)
  }, [SearchMode, isAllTime, datepick])

  useEffect(() => {}, [data])

  function deleteAll() {
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    foundObjects.forEach((obj) => {
      // 각 객체에 대해 개별적으로 URL 설정
      const url = `/api/v2/users/category/1/${obj.id}`
      const method = "DELETE"
      const headers = { "Content-Type": "application/json", Authorization: mytoken }

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
          toast.success("삭제했습니다")
          customerList()
        }
      })
    })
  }

  function changeViewStat() {
    // foundObjects를 필터링하는 로직이 먼저 있어야 함
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    foundObjects.forEach((obj) => {
      // 각 객체에 대해 개별적으로 URL 설정
      const url = `/api/v2/managers/${obj.id}/change/view-status?viewStatus=${
        obj.viewStatus === "비노출" ? "노출" : "비노출"
      }`
      const method = "PATCH"
      const headers = { "Content-Type": "application/json", Authorization: mytoken }

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
          toast.success("숨김으로 변경되었습니다")
          customerList()
        }
      })
    })
  }

  function handleAlltime() {
    setIsAllTime(!isAllTime)
  }

  return (
    <>
      <CustomHeader text={"고객센터 관리"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "space-between" }}>
        <div className={styles.boxContainer1}>
          <CustomBar style={{ width: "10.417vw" }} text={["게시판"]} />
        </div>
        <div className={styles.boxContainer2}>
          <div className={styles.checkSub}>
            <label htmlFor="alltime">전체 기간</label>
            <input type="checkbox" checked={isAllTime} onChange={() => handleAlltime()} />
          </div>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"시작일자 :"}
            getDate={handleStartDateChange}
          />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"종료일자 :"}
            getDate={handleEndDateChange}
          />
        </div>
        <div className={styles.boxContainer3}>
          <select
            style={{ width: "20%" }}
            defaultValue="nickname"
            onChange={(event) => setSearchMode(event.target.value)}
          >
            <option value="">전체</option>
            <option value="nickname">닉네임</option>
          </select>
          <input
            style={{ width: "53%", backgroundColor: "#D9D9D9", border: "none" }}
            onChange={(event) => setsearchVal(event.target.value)}
          />
          <button
            style={{ width: "10%", backgroundColor: "#D9D9D9", border: "none" }}
            onClick={() => boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)}
          >
            검색
          </button>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          rows={data ? data : []}
          SoltedModel={[{ field: "createdAt", sort: "desc" }]}
          handleSelectionChange={(params) => setParams(params)}
          fontsizesCell="12px"
        />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}></div>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            {/* <button
              style={{ width: "49%", backgroundColor: "#3B4281", color: "white", border: "none" }}
              onClick={() => changeViewStat()}
            >
              숨김
            </button> */}
            <button
              style={{ width: "49%", backgroundColor: "#AC2E2E", color: "white", border: "none" }}
              onClick={() => deleteAll()}
            >
              삭제
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
