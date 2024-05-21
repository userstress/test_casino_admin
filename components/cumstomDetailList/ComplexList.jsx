import React, { useState, useEffect } from "react"
import styles from "./DetailList.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import ListTable from "./component/ListTable"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"

const basicURL = process.env.NEXT_PUBLIC_API_URL

/**
 * 베팅내역 복수 테이블
 * @param {*} param0
 * @returns
 */
function ComplexList({ matchId }) {
  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const [totalScore, setScores] = useState({
    totalBetAmount: 0,
    totalBetReward: 0,
    totalProfitAmount: 0,
    validBetAmount: 0,
    validWinningAmount: 0,
  })
  const [RowOriginal, setOriginal] = useState()

  const [rowArray, setRows] = useState([{ id: 112, betType: "1" }])

  function sortAllByStartDate(data) {
    return data.sort((a, b) => {
      const aDate = a.betHistories.length > 0 ? new Date(a.betHistories[0].startDate).getTime() : 0
      const bDate = b.betHistories.length > 0 ? new Date(b.betHistories[0].startDate).getTime() : 0
      return aDate - bDate
    })
  }

  function sortAllByBet(data) {
    data.sort((a, b) => {
      const aBet = parseInt(a.betHistories.length > 0 ? a.betHistories[0].bet : 0)
      const bBet = parseInt(b.betHistories.length > 0 ? b.betHistories[0].bet : 0)
      return aBet - bBet
    })
  }

  function sortAllByOrderStatusHitFirst(data) {
    data.sort((a, b) => {
      const aValue = a.betHistories.length > 0 && a.betHistories[0].orderStatus === "HIT" ? 1 : 0
      const bValue = b.betHistories.length > 0 && b.betHistories[0].orderStatus === "HIT" ? 1 : 0
      return bValue - aValue // "HIT" 우선으로 정렬하려면, bValue에서 aValue를 빼야 함
    })
  }

  function sortAllByOrderStatusFailFirst(data) {
    data.sort((a, b) => {
      const aValue = a.betHistories.length > 0 && a.betHistories[0].orderStatus === "FAIL" ? 1 : 0
      const bValue = b.betHistories.length > 0 && b.betHistories[0].orderStatus === "FAIL" ? 1 : 0
      return bValue - aValue // "FAIL" 우선으로 정렬하려면, bValue에서 aValue를 빼야 함
    })
  }

  const loadBet = (matchIds) => {
    const method = "GET"
    const url = `/api/v2/managers/match/${matchIds}`
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
        const result = responseData.data
        const { totalBetAmount, totalBetReward, totalProfitAmount, validBetAmount, validWinningAmount } = result

        const sortedData = sortAllByStartDate(result.groupedBetHistories) // 정렬된 데이터
        setOriginal(sortedData) // 정렬된 데이터를 상태에 저장
        setRows(sortedData) // UI를 업데이트하기 위해 사용
        setScores({
          totalBetAmount,
          totalBetReward,
          totalProfitAmount,
          validBetAmount,
          validWinningAmount,
        })
      }
      return false
    })
  }

  useEffect(() => {
    loadBet(matchId)
  }, [])

  function sortingAll(mode) {
    let sorted

    if (mode === "전체") {
      return setRows([...RowOriginal])
    }

    if (mode === "베팅금순") {
      sorted = sortAllByBet([...RowOriginal]) // 깊은 복사를 통한 정렬
    }

    if (mode === "당첨") {
      sorted = sortAllByOrderStatusHitFirst([...RowOriginal])
    }
    if (mode === "미당첨") {
      sorted = sortAllByOrderStatusFailFirst([...RowOriginal])
    }
    setRows([...RowOriginal]) // UI 업데이트
  }

  function sendNoteAll() {
    const userIds = rowArray.flatMap((row) => (row.betHistories.length > 0 ? row.betHistories[0].userId : []))
    const uniqueUserIds = [...new Set(userIds)]
    window.open(`/sendingNote?userId=${uniqueUserIds}`, "쪽지", "width=1024, height=500")
  }

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
        toast.warn("내역이 없습니다")
      } else if (errorStatus === 400) {
        return toast.warn("잘못된 요청입니다.", {})
      } else if (errorStatus === 403 || errorStatus === 401) {
        return toast.warn("로그인을 다시 해 주세요", {
          onClose: () => router.push("/"),
        })
      } else if (errorStatus === 404) {
        return toast.warn("서버의 응답이 없습니다.", {})
      } else if (!errorStatus && responseData) {
        console.log("asdf")
        toast.success("베팅을 취소하였습니다", { onClose: () => loadBet(matchId) })
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

  return (
    <>
      <section className={styles.sortNavBar}>
        <ul className={styles.navListBox}>
          <li className={styles.navList} onClick={() => sortingAll("전체")}>
            전체
          </li>
          <li className={styles.navList} onClick={() => sortingAll("진행")}>
            진행
          </li>
          <li className={styles.navList} onClick={() => sortingAll("당첨")}>
            당첨
          </li>
          <li className={styles.navList} onClick={() => sortingAll("미당첨")}>
            미당첨
          </li>
          <li className={styles.navList} onClick={() => sortingAll("베팅금순")}>
            베팅금순
          </li>
          <li
            className={styles.navList}
            style={{ color: "white", fontSize: "16px", backgroundColor: "blue", borderRadius: "4px" }}
            onClick={() => sendNoteAll()}
          >
            아래 내역 전체 쪽지
          </li>
          <li
            className={styles.navList}
            style={{ color: "white", fontSize: "16px", backgroundColor: "red", borderRadius: "4px" }}
          >
            해당 내역 롤링 재반영
          </li>
        </ul>
      </section>
      <section className={styles.titleof}>
        전체 베팅금액: {addCommasToNumber(Math.floor(totalScore.totalBetAmount))} / 유효 베팅금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.validBetAmount))} / 유효 당첨금액:
        {addCommasToNumber(Math.floor(totalScore.validWinningAmount))} / 당첨 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalBetReward))}/ 손익 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalProfitAmount))}
      </section>
      <section>
        {rowArray && rowArray.length >= 1
          ? rowArray.map((row, index) => {
              // 배당률 초기 계산
              if (!Array.isArray(row.betHistories) || row.betHistories.length === 0) {
                console.error("betHistories is undefined, not an array, or empty", row)
                return null // 이 경우, 해당 row에 대한 렌더링을 건너뜁니다.
              }

              let totalOdds = row.betHistories.reduce((total, betHistory) => {
                return total * (parseFloat(betHistory.price) || 1)
              }, 1)
              const lengthMultiplier = row.betHistories.length
              if (lengthMultiplier >= 3 && lengthMultiplier <= 4) {
                totalOdds *= 1.03
              } else if (lengthMultiplier >= 5 && lengthMultiplier <= 6) {
                totalOdds *= 1.05
              } else if (lengthMultiplier >= 7) {
                totalOdds *= 1.07
              }
              // 결과 문자열 결정 로직
              let resultText = ""
              if (row.betHistories.some((betHistory) => betHistory.orderStatus === "CANCEL_HIT")) {
                resultText = "적특"
              } else if (row.betHistories.some((betHistory) => betHistory.orderStatus === "CANCEL")) {
                resultText = "베팅 취소(유저)"
              } else if (row.betHistories.every((betHistory) => betHistory.orderStatus === "WAITING")) {
                resultText = "대기"
              } else if (row.betHistories.every((betHistory) => betHistory.orderStatus === "HIT")) {
                resultText = "당첨"
              } else if (row.betHistories.some((betHistory) => betHistory.orderStatus === "FAIL")) {
                resultText = "낙첨"
              }

              return (
                <section key={`${index}_${row.betGroupId}`} style={{ marginTop: "20px" }}>
                  <ListTable rows={row.betHistories} />
                  <div className={styles.detailBoxes}>
                    유저아이디:{row?.betHistories[0]?.username} / 닉네임: {row?.betHistories[0]?.nickname} /
                    {`베팅id :   [${row.betGroupId}]`} / 오더타입:{" "}
                    {betTypeEnumRender2(row?.betHistories[0]?.betFoldType)} / 베팅시간:
                    {`[${DayTransform(row.betHistories[0]?.betStartTime)}]`}
                  </div>
                  <div lassName={styles.detailBoxes2} style={{ backgroundColor: "#808080", padding: "5px 0" }}>
                    배당률: {`[약 ${totalOdds.toFixed(2)}]`} / 베팅금:{" "}
                    {addCommasToNumber(row?.betHistories[0]?.bet || 0)} / 당첨금:{" "}
                    {`[${addCommasToNumber(Math.floor(totalOdds.toFixed(2) * row?.betHistories[0]?.bet))}]`} / 결과 :{" "}
                    {resultText} / &nbsp; 아이피 : {row?.betHistories[0]?.betIp} &nbsp;
                    <button type="button" onClick={() => sendNotesingle(row.betHistories[0].userId)}>
                      쪽지
                    </button>
                    &nbsp; / &nbsp;
                    <button
                      type="button"
                      style={{ color: "white", backgroundColor: "red", borderRadius: "4px", border: "none" }}
                      onClick={(event) => handleCanclebet(event, row.betGroupId)}
                    >
                      베팅취소
                    </button>
                  </div>
                </section>
              )
            })
          : "내역이 없습니다"}
      </section>
    </>
  )
}

export default ComplexList
