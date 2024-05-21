// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./BoardList.module.css"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import { boardStore } from "@utils/boardStore/boardStore"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import baseUrl from "@utils/REST/baseUrl"

export default function BoardList() {
  const router = useRouter()
  const { boardMove, searchModeObj, SearchAway } = boardStore()
  const { sendRequest } = useAxiosRequest()
  const [setParams1, setParams] = useState()
  const [data, setData] = useState()
  const [SearchMode, setSearchMode] = useState("nickname")
  const [searchVal, setsearchVal] = useState("")
  const mytoken = getCookie("token")
  const bannedRef = useRef(null)
  const bannedRef2 = useRef(null)
  const [isAllTime, setIsAllTime] = useState(true)

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

  function boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj) {
    const origin = `/api/v2/users/normal/articles/search?`
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

    console.log("datepick:")
    console.log(datepick)
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
        const flattenedArray = responseData.data.map((item) => {
          const { writer, category, ...rest } = item
          const { id, ...writerWithoutId } = writer
          const userId = id
          return { ...rest, ...writerWithoutId, userId, ...category }
        })
        setData(flattenedArray.reverse())
      }
    })
  }
  function moveToFixPage(params) {
    const pageInfoes = {
      id: params.row.id,
      type: "board",
      contents: params.row.content,
      title: params.row.title,
      viewCount: params.row.viewCount,
      commentAllowed: params.row.commentAllowed,
      viewStatus: params.row.viewStatus,
    }
    boardMove(pageInfoes)
    router.push("/customer/BoardEditorFix")
  }

  function convertToKoreanTime(dateStr) {
    if (!dateStr) {
      return "Invalid date"
    }

    // 'T'를 찾아서 있으면 유효한 ISO 8601 형식으로 간주합니다.
    const indexOfT = dateStr.indexOf("T")
    if (indexOfT !== -1) {
      // 'T'를 공백으로 대체합니다.
      dateStr = dateStr.replace("T", " ")
    } else {
      // 'T'가 없는 경우, 공백을 삽입하여 시간 형식을 완성합니다.
      dateStr += " 00:00:00"
    }

    // Date 객체를 생성합니다.
    const date = new Date(dateStr)

    // 날짜가 유효한지 확인합니다.
    if (isNaN(date.getTime())) {
      return "Invalid date"
    }

    // 한국 시간으로 변환합니다.
    date.setHours(date.getHours() + 18)

    // YYYY-MM-DD HH:mm:ss 형식으로 반환합니다.
    const koreanTime = date.toISOString().substring(0, 19).replace("T", " ")

    return koreanTime
  }

  const valueMapping = {
    허용: true,
    비허용: false,
  }

  const paramMapping = {
    "댓글허용 유무": "commentAllowed",
  }

  const colums = [
    { field: "id", headerName: "No.", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "title",
      headerName: "제목",
      flex: 2.5,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", textAlign: "center" }}
            className={styles.cursursTitle}
            onClick={() => moveToFixPage(params)}
          >
            {params.formattedValue}
          </div>
        )
      },
    },
    {
      field: "nickname",
      headerName: "작성자",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (typeof params.formattedValue === "object") {
          return params.formattedValue
        }
      },
    },
    {
      field: "createdAt",
      headerName: "작성일",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return convertToKoreanTime(params.formattedValue || params.row.createdAt)
      },
    },
    { field: "readCount", headerName: "조회", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "commentCount", headerName: "댓글", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "viewStatus", headerName: "상태", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "commentAllowed",
      headerName: "댓글허용 유무",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedValue ? "허용" : "비허용"
      },
    },
  ]

  async function moveToEditor() {
    await boardMove({ id: 0, type: "board" })
    router.push("/customer/BoardEditor") // 페이지 이동
  }

  useEffect(() => {
    boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)
  }, [SearchMode, isAllTime, datepick])

  useEffect(() => {}, [data])

  function handleErrors(errorStatus) {
    if (errorStatus >= 500) {
      toast.warn("중복된 회원정보 입니다.")
    } else if (errorStatus === 400) {
      toast.warn("올바르지 않은 입력 값입니다.")
    } else if (errorStatus === 403 || errorStatus === 401) {
      toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
    } else if (errorStatus === 404) {
      toast.error("서버 응답이 없습니다.")
    }
  }

  function sendRequestWithFetch(method, url, headers, body) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body), // body가 필요한 경우
    })
  }

  function changeViewStat() {
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    const requests = foundObjects.map((obj) => {
      const isView = obj.viewStatus === "노출"
      const url = `${baseUrl}api/v2/managers/${obj.id}/change/view-status?viewStatus=${isView ? "비노출" : "노출"}`
      const method = "PATCH"
      const headers = {
        "Content-Type": "application/json",
        Authorization: mytoken,
      }

      return sendRequestWithFetch(method, url, headers, null)
        .then((response) => response.json()) // JSON 응답을 파싱
        .then((data) => {
          if (!response.ok) {
            throw new Error(data.message || "Unknown error")
          }
          return data // 응답 데이터를 반환
        })
    })

    Promise.allSettled(requests).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error("Request failed with error:", result.reason)
        }
      })

      // 모든 요청이 처리된 후 추가 작업 실행
      boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)
      toast.success("변경했습니다")
    })
  }

  function deleteAll() {
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    const deletePromises = foundObjects.map((obj) => {
      const url = `${baseUrl}api/v2/users/category/1/${obj.id}`
      const headers = { "Content-Type": "application/json", Authorization: mytoken }

      return sendRequestWithFetch("DELETE", url, headers)
    })

    Promise.allSettled(deletePromises).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error("Request failed with error:", result.reason)
          toast.error(result.reason)
        } else {
          toast.success("삭제했습니다")
        }
      })

      // 모든 요청이 처리된 후 추가 작업 실행
      boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)
    })
  }

  function banUser(event, nickname) {
    const foundUser = data.find((item) => item.nickname === nickname)

    const method = "PATCH"
    const url = `/api/v2/admins/users/${foundUser.userId}`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const body = {
      canPost: false,
    }
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
        toast.success("게시판 사용을 금지시켯습니다")
      }
    })
  }
  function unbanUser(event, nickname) {
    const foundUser = data.find((item) => item.nickname === nickname)
    const method = "PATCH"
    const url = `/api/v2/admins/users/${foundUser.userId}`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const body = {
      canPost: true,
    }
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
        toast.success("게시판 사용 금지를 해제하였습니다")
      }
    })
  }

  function handleAlltime() {
    setIsAllTime(!isAllTime)
  }

  return (
    <>
      <CustomHeader text={"게시판"} customStyle={{ height: "1.979vw", width: "100%" }} />
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
            <option value="title">제목</option>
            <option value="content">내용</option>
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
          columns={colums}
          rows={data ? data : []}
          defaultIds="id"
          handleSelectionChange={(ids) => setParams(ids)}
          SoltedModel={[{ field: "createdAt", sort: "desc" }]}
          fontsizesCell="12px"
          pageSizese={[20]}
        />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}>
          <div className={styles.footerFirstRowInner}>
            <input style={{ width: "60%", backgroundColor: "white", borderRadius: "4px" }} ref={bannedRef} />
            <button
              style={{
                width: "33%",
                fontSize: "0.6vw",
                backgroundColor: "#3B4281",
                color: "white",
                borderRadius: "4px",
              }}
              onClick={(event) => banUser(event, bannedRef.current.value)}
              className={styles.butnns}
            >
              게시판 사용 제재
            </button>
          </div>
        </div>
        <div className={styles.footerFirstRowContainer} style={{ marginTop: "5px" }}>
          <div className={styles.footerFirstRowInner}>
            <input style={{ width: "60%", backgroundColor: "white", borderRadius: "4px" }} ref={bannedRef2} />
            <button
              style={{
                width: "33%",
                fontSize: "0.6vw",
                backgroundColor: "#AC2E2E",
                color: "white",
                borderRadius: "4px",
              }}
              onClick={() => unbanUser(event, bannedRef.current.value)}
              className={styles.butnns}
            >
              게시판 사용 해제
            </button>
          </div>
        </div>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <button
              style={{
                width: "23%",
                backgroundColor: "#3B4281",
                color: "white",
                border: "none",
                borderRadius: "4px",
                border: "none",
              }}
              onClick={() => moveToEditor()}
              className={styles.butnns}
            >
              등록
            </button>
            <button
              style={{
                width: "23%",
                fontSize: "0.6vw",
                backgroundColor: "#3B4281",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="한번에 한 글만 변경 가능"
              onClick={() => changeViewStat()}
              className={styles.butnns}
            >
              노출/비노출
            </button>
            <button
              className={styles.butnns}
              style={{ width: "23%", backgroundColor: "#ff0000", color: "white", border: "none", borderRadius: "4px" }}
              onClick={() => deleteAll()}
            >
              완전삭제
            </button>
            <button
              className={styles.butnns}
              style={{ width: "23%", backgroundColor: "#3B4281", color: "white", border: "none", borderRadius: "4px" }}
              onClick={() => boardRequest(SearchMode, searchVal, isAllTime, datepick, searchModeObj)}
            >
              목록
            </button>
          </div>
          {/* <div className={styles.footerSecondRowInput}>
            <CustomInput customStyle={{ width: "66%", backgroundColor: "white" }} />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"게시판 사용 해재"}
            />
          </div> */}
        </div>
        <div></div>
      </div>
    </>
  )
}
