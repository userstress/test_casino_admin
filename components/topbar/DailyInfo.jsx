import React, { useEffect } from "react"
import styles from "./DailyInfo.module.css"
import { getAllUserRS } from "@utils/user/getAllUserRS"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import { getAllExchangeReq } from "@utils/user/getAllExchangeReq"
import { getAllMoneyLog } from "@utils/user/getAllMoneyLog"
import { getUserList } from "@utils/user/getUserList"
import { toast } from "react-toastify"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function DailyInfo({ setCurStat, curFn, totals }) {
  const router = useRouter()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const token = getCookie("token")
  const { getAllRechargedList, getAllWaitingList, getAllUnreadList, allRechargedAmount, allRechargedList } =
    getAllUserRS()
  const {
    allExchangedAmount,
    getAllExchangedList,
    getAllUnreadExchangeReq,
    getAllWaitingExchangeReq,
    allExchangedList,
  } = getAllExchangeReq()
  const { allMoneyLogList, getAllMoneyLogList } = getAllMoneyLog()

  useEffect(() => {
    if (router.isReady && token) {
      console.log(token)
      getAllRechargedList(formattedDate, formattedDate)
      getAllExchangedList(formattedDate, formattedDate)
      getAllMoneyLogList(formattedDate, formattedDate)
    }
  }, [router.isReady])

  const onClickReload = () => {
    // 새로고침
    getAllRechargedList(formattedDate, formattedDate)
    getAllWaitingList(formattedDate, formattedDate)
    getAllUnreadList(formattedDate, formattedDate)
    getAllExchangedList(formattedDate, formattedDate)
    getAllUnreadExchangeReq(formattedDate, formattedDate)
    getAllWaitingExchangeReq(formattedDate, formattedDate)
    getAllMoneyLogList(formattedDate, formattedDate)
    curFn()
    toast.success("새로고침")
  }

  return (
    <div
      style={{ width: "100%", padding: 0, border: "none", fontWeight: 700, marginBottom: "3px" }}
      className={styles.sectionContainer}
    >
      <ul className={styles.todayCharge}>
        <li>오늘의 입금액 (실시간)</li>
        <li>{allMoneyLogList && addCommasToNumber(allRechargedList.length > 0 ? allRechargedAmount : 0)}</li>
      </ul>
      <ul className={styles.todayCharge}>
        <li>오늘의 출금액 (실시간)</li>
        <li>{allExchangedList && addCommasToNumber(allExchangedList.length > 0 ? allExchangedAmount : 0)}</li>
      </ul>
      <ul className={styles.todayCharge}>
        <li>회원 보유 총금액 (현재)</li>
        <li>{addCommasToNumber(totals.totalSportsBalance || 0)}</li>
      </ul>
      <ul className={styles.todayCharge}>
        <li>총판 보유 총금액 (현재)</li>
        <li>0원</li>
      </ul>

      <ul className={styles.reloadBtn} onClick={onClickReload}>
        <li>새로고침</li>
      </ul>
    </div>
  )
}
