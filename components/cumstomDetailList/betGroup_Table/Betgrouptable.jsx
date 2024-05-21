import React, { useState, useEffect } from "react"
import styles from "../DetailList.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import ListTableBetGroupId from "../component/ListTableBetGroupId"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import DayTransform from "@utils/DayTransform"
import flattenData from "../flattenData"
import axios from "axios"
import SwitchOrderStatus from "@utils/SwitchOrderStatus"

const basicURL = process.env.NEXT_PUBLIC_API_URL

/**
 * 베팅내역 복수 테이블
 * @param {*} param0
 * @returns
 */
function Betgrouptable({ betGroupId }) {
  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const [totalScore, setScores] = useState({
    totalBetAmount: 1,
    totalBetReward: 1,
    totalProfitAmount: 1,
    validBetAmount: 1,
    validWinningAmount: 1,
  })
  const [RowOriginal, setOriginal] = useState()

  const [rowArray, setRows] = useState([{ id: 112, idx: 123213, betType: "asdsad" }])

  const loadBet = (groupId) => {
    const method = "GET"
    const url = `${basicURL}/api/v2/users/orderHistory/get?page=1&size=10&betGroupId=${groupId}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    axios
      .request({
        method: method,
        url: url,
        headers: headers,
      })
      .then((response) => {
        const result = response.data.data

        const validResponses = flattenData(result)

        setRows(validResponses)
      })
      .catch((error) => {
        console.log(error)
        const errorStatus = error.response ? error.response.status : null
        if (errorStatus >= 500) {
          toast.success("500")
        } else if (errorStatus === 400) {
          toast.success("400")
        } else if (errorStatus === 403 || errorStatus === 401) {
          toast.warn("다시 로그인 해주세요", { onClose: () => router.push("/") })
        } else if (errorStatus === 404) {
          toast.success("서버를 찾을수없습니다")
        }
      })
  }

  function sendNoteAll() {
    const userIds = rowArray.flatMap((row) => (row.length > 0 ? row.userId : []))
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
        toast.warn("서버오류입니다")
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
        loadBet(betGroupId)
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
  useEffect(() => {
    loadBet(betGroupId)
  }, [])

  useEffect(() => {}, [rowArray])

  let totalOdds = 1

  rowArray.forEach((betHistory) => {
    // betHistory 객체가 유효한지 확인
    if (typeof betHistory === "object" && betHistory !== null) {
      // betHistory 객체에 price 속성이 있는지 확인하고, 유효한 값인 경우에만 곱셈 수행
      if (betHistory.hasOwnProperty("price")) {
        const price = parseFloat(betHistory?.price)
        // 유효한 가격인지 확인
        if (!isNaN(price) && isFinite(price)) {
          totalOdds *= price
        }
      }
    }
  })

  const lengthMultiplier = rowArray.length
  if (lengthMultiplier >= 3 && lengthMultiplier <= 4) {
    totalOdds *= 1.03
  } else if (lengthMultiplier >= 5 && lengthMultiplier <= 6) {
    totalOdds *= 1.05
  } else if (lengthMultiplier >= 7) {
    totalOdds *= 1.07
  }

  let resultText = SwitchOrderStatus(rowArray[0]?.orderResult || "WAITING")

  return (
    <>
      <section className={styles.sortNavBar}>
        <ul className={styles.navListBox}>
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
      {/* <section className={styles.titleof}>
        전체 베팅금액: {addCommasToNumber(Math.floor(rowArray[0].bet))} / 유효 베팅금액:{" "}
        {addCommasToNumber(Math.floor(totalOdds))} / 유효 당첨금액:
        {addCommasToNumber(Math.floor(totalOdds))} / 당첨 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalBetReward))}/ 손익 금액:{" "}
        {addCommasToNumber(Math.floor(totalScore.totalProfitAmount))}
      </section> */}
      {rowArray && rowArray.length > 0 && Object.keys(rowArray[0]).length > 3 ? (
        <section>
          <section key={rowArray[0].betGroupId} style={{ marginTop: "20px" }}>
            <ListTableBetGroupId rows={rowArray} />
            <div className={styles.detailBoxes}>
              유저아이디:{rowArray[0].username} / 닉네임: {rowArray[0].nickname} /
              {`베팅id :   [${rowArray[0].betGroupId}]`} 오더타입: {betTypeEnumRender2(rowArray[0].betFoldType)} /
              베팅시간:
              {`[${DayTransform(rowArray[0].betStartTime)}]`}
            </div>
            <div className={styles.detailBoxes2} style={{ backgroundColor: "#808080", padding: "5px 0" }}>
              배당률: {`[약 ${totalOdds.toFixed(2)}]`} / 베팅금액: {addCommasToNumber(rowArray[0]?.bet || 0)} / 당첨금:{" "}
              {`[${addCommasToNumber(totalOdds.toFixed(2) * rowArray[0].bet)}]`} / 결과 : {resultText} / &nbsp; 아이피 :{" "}
              {rowArray[0].betIp} &nbsp;
              <button type="button" onClick={() => sendNotesingle(rowArray[0].userId)}>
                쪽지
              </button>
              &nbsp; / &nbsp;
              <button
                type="button"
                style={{ color: "white", backgroundColor: "red", borderRadius: "4px", border: "none" }}
                onClick={(event) => handleCanclebet(event, rowArray[0].betGroupId)}
              >
                베팅취소
              </button>
            </div>
          </section>
        </section>
      ) : (
        "데이터가 없습니다"
      )}
    </>
  )
}

export default Betgrouptable
