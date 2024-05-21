import React, { useState, useEffect } from "react"
import styles from "./DetailList.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import ListTablePersonal from "./component/ListTablePersonal"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"
import _ from "lodash"
import flattenData from "./flattenData"
import Pagination from "react-js-pagination"
import SwitchOrderStatus from "@utils/SwitchOrderStatus"
import { useRouter } from "next/router"
import LoadingComponent from "./loadingBox/LoadingComponent"

const basicURL = process.env.NEXT_PUBLIC_API_URL

/**
 * 베팅내역 복수 테이블
 * @param {*} param0
 * @returns
 */
function UserDetailComplexList({ userId }) {
  const router = useRouter()

  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const [totalScore, setScores] = useState({
    totalBetAmount: 1,
    totalBetReward: 1,
    totalProfitAmount: 1,
    validBetAmount: 1,
    validWinningAmount: 1,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState({
    page: 1,
    size: 20,
    totalElements: 4,
    totalPages: 1,
  })
  const [rowArray, setRows] = useState([{ id: 112, betType: "ass" }])
  const [sortOption, setOptions] = useState("all")
  const [sortOption2, setOptions2] = useState(null)
  const [isloading, setLoading] = useState(false)

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const loadBet = (currentPage, isBetPrice = false) => {
    const method = "GET"
    const urlParams = new URLSearchParams()
    urlParams.append("page", currentPage)
    urlParams.append("size", 20)
    urlParams.append("userId", userId)

    if (sortOption !== "all") {
      if (sortOption.length > 2) {
        urlParams.append("orderStatus", sortOption)
      } else if (isBetPrice) {
        urlParams.append("orderBy", sortOption2)
      }
    }

    const url = `/api/v2/users/orderHistory/get?${urlParams.toString()}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    setLoading(true)
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
        const result = responseData.data.data
        setTotalPage(responseData.data.pageInfo)
        const validResponses = flattenData(result)

        const combinedData = validResponses.reduce((acc, item) => {
          return acc.concat(item)
        }, [])
        const groupedData = Object.values(_.groupBy(combinedData, "betGroupId"))

        const resultData = groupedData.sort((a, b) => new Date(b[0].betStartTime) - new Date(a[0].betStartTime))
        setRows(resultData)
      }
      setLoading(false)
      return false
    })
  }

  useEffect(() => {
    loadBet(1)
  }, [])
  useEffect(() => {
    loadBet(currentPage, sortOption2 !== null ? true : false)
  }, [currentPage, sortOption2, sortOption])

  function sendNotesingle(ids) {
    window.open(`/sendingNote?userId=${ids}`, "쪽지", "width=1024, height=500")
  }

  function betTypeEnumRender2(enums) {
    switch (enums) {
      case "SINGLE_FOLDER":
        return "단건"
      case "THREE_FOLDER":
        return "콤보"
      case "SEVEN_FOLDER":
        return "콤보"
    }
  }
  function deleteBet(groupId) {
    const method = "POST"
    const url = `/api/v2/users/cancelBets/${groupId}`
    const headers = { Authorization: userToken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.success("처리 중입니다")
      } else if (errorStatus === 400) {
        return toast.warn("잘못된 요청입니다.", {})
      } else if (errorStatus === 403 || errorStatus === 401) {
        return toast.warn("로그인을 다시 해 주세요", {
          onClose: () => router.push("/"),
        })
      } else if (errorStatus === 404) {
        return toast.warn("서버의 응답이 없습니다.", {})
      } else if (!errorStatus && responseData) {
        toast.success("베팅을 취소하였습니다")
        loadBet(1)
      }

      return false
    })

    return null
  }

  function handleCanclebet(event, ids) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm("베팅을 취소(적특) 하시겠습니까?")) {
    } else {
      deleteBet(ids)
    }
  }

  function sortUpDown() {
    setOptions("")
    setOptions2(!sortOption2 ? 1 : sortOption2 === 2 ? null : 2)
    loadBet(1, true)
  }
  function sortStatus(params) {
    setOptions2(null)
    switch (params) {
      case "all":
        setOptions("all")
        loadBet(1, true)
        break
      case "HIT":
        setOptions("HIT")
        break
      case "FAIL":
        setOptions("FAIL")
        break
      case "WAITING":
        setOptions("WAITING")
        break
      default:
        null
    }
  }

  console.log(sortOption)
  return (
    <>
      <section className={styles.sortNavBar}>
        <ul className={styles.navListBox}>
          <li
            className={styles.navList}
            style={{ color: sortOption === "all" ? "red" : "black" }}
            onClick={() => sortStatus("all")}
          >
            전체
          </li>
          <li
            className={styles.navList}
            style={{ color: sortOption === "WAITING" ? "red" : "black" }}
            onClick={() => sortStatus("WAITING")}
          >
            진행
          </li>
          <li
            className={styles.navList}
            style={{ color: sortOption === "HIT" ? "red" : "black" }}
            onClick={() => sortStatus("HIT")}
          >
            당첨
          </li>
          <li
            className={styles.navList}
            style={{ color: sortOption === "FAIL" ? "red" : "black" }}
            onClick={() => sortStatus("FAIL")}
          >
            미당첨
          </li>
          <li
            className={styles.navList}
            style={{ color: sortOption2 === 1 || sortOption2 === 2 ? "red" : "black" }}
            onClick={() => {
              sortUpDown()
            }}
          >
            베팅금순 {sortOption2 === 1 ? "↑" : !sortOption2 ? null : "↓"}
          </li>

          <li
            className={styles.navList}
            style={{ color: "white", fontSize: "16px", backgroundColor: "red", borderRadius: "4px" }}
          >
            해당 내역 롤링 재반영
          </li>
        </ul>
      </section>
      {/* <section className={styles.titleof}>
        전체 베팅금액: {addCommasToNumber(Math.floor(totalScore.totalBetAmount))} / 유효 베팅금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.validBetAmount))} / 유효 당첨금액:
        {addCommasToNumber(Math.floor(totalScore.validWinningAmount))} / 당첨 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalBetReward))}/ 손익 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalProfitAmount))}
      </section> */}
      {!isloading ? (
        <section>
          {rowArray &&
            rowArray.map((row, index) => {
              // 배당률 초기 계산
              if (!Array.isArray(row) || row.length === 0) {
                console.error("betHistories is undefined, not an array, or empty", row)
                return null // 이 경우, 해당 row에 대한 렌더링을 건너뜁니다.
              }
              let totalOdds = row.reduce((total, betHistory) => {
                return total * (parseFloat(betHistory.price) || 1)
              }, 1)

              const lengthMultiplier = row.length
              if (lengthMultiplier >= 3 && lengthMultiplier <= 4) {
                totalOdds *= 1.03
              } else if (lengthMultiplier >= 5 && lengthMultiplier <= 6) {
                totalOdds *= 1.05
              } else if (lengthMultiplier >= 7) {
                totalOdds *= 1.07
              }

              let orderResultS = SwitchOrderStatus(row[0].orderResult || row[0].orderStatus)

              return (
                <section key={`${index}_${row.betGroupId}`} style={{ marginTop: "20px" }}>
                  <ListTablePersonal rows={row} />
                  <div className={styles.detailBoxes}>
                    유저아이디:{row[0]?.username} / 닉네임: {row[0].nickname} /{`베팅id :   [${row[0].betGroupId}]`}{" "}
                    오더타입: {betTypeEnumRender2(row[0]?.betFoldType)} / 베팅시간:
                    {`[${DayTransform(row[0].betStartTime)}]`}
                  </div>
                  <div lassName={styles.detailBoxes2} style={{ backgroundColor: "#808080", padding: "5px 0" }}>
                    배당률: {`[약 ${totalOdds.toFixed(2)}]`} / 베팅금액: {addCommasToNumber(row[0]?.bet || 0)} / 당첨금:{" "}
                    {`[${addCommasToNumber(Math.floor(totalOdds.toFixed(2) * row[0]?.bet))}]`} / 결과 : {orderResultS} /
                    &nbsp; 아이피 : {row.betIp} &nbsp;
                    <button type="button" onClick={() => sendNotesingle(router.query.userId)}>
                      쪽지
                    </button>
                    &nbsp; / &nbsp;
                    <button
                      type="button"
                      style={{ color: "white", backgroundColor: "red", borderRadius: "4px", border: "none" }}
                      onClick={(event) => handleCanclebet(event, row[0].betGroupId)}
                    >
                      베팅취소
                    </button>
                  </div>
                </section>
              )
            })}

          <div className={styles.paginateBox}>
            <Pagination
              activePage={totalPage?.page}
              itemsCountPerPage={totalPage?.size}
              totalItemsCount={totalPage?.totalElements ? totalPage?.totalElements : 1}
              pageRangeDisplayed={totalPage?.totalPages}
              onChange={handlePageChange}
              activeClass="isActiveLink"
              itemClass="inActivate"
              activeLinkClass="redLink"
            />
          </div>
        </section>
      ) : (
        <LoadingComponent />
      )}
    </>
  )
}

export default UserDetailComplexList
