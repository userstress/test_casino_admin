import React, { useEffect, useState } from "react"
import styles from "./AdminInfo.module.css"
import { getUserList } from "@utils/user/getUserList"
import { useAuthStore } from "@utils/useAuthStore"
import { getAllUserRS } from "@utils/user/getAllUserRS"
import { getAllExchangeReq } from "@utils/user/getAllExchangeReq"
import { useRouter } from "next/router"
import Link from "next/link"

export default function AdminInfo({ currentStat }) {
  const { userToken, user } = useAuthStore()
  const [username, setname] = useState()

  const router = useRouter()

  useEffect(() => {
    if (router.isReady && user?.usename) {
      setname(user.usename)
    }
  }, [router.isReady])

  useEffect(() => {}, [username])

  return (
    <div style={{ padding: 0, border: "none", marginBottom: "3px", width: "100%" }} className={styles.boxContainer}>
      <Link href="/Exchange/chargeReg">
        <ul className={styles.first}>
          <li className={styles.category} style={{ backgroundColor: "#AC2E2E", color: "white" }}>
            충전
          </li>
          <li>요청 : {currentStat && currentStat.rechargeUnreadCount}</li>
          <li>대기 : {currentStat && currentStat.rechargeWaitingCount}</li>
          <li>완료 : {currentStat && currentStat.rechargeApprovalCount}</li>
        </ul>
      </Link>
      <Link href="/Exchange/exchangeReg">
        <ul className={styles.second}>
          <li className={styles.category} style={{ color: "white", backgroundColor: "#2E4AAC" }}>
            환전
          </li>
          <li>요청 : {currentStat && currentStat.exchangeUnreadCount}</li>
          <li>대기 : {currentStat && currentStat.exchangeWaitingCount}</li>
          <li>완료 : {currentStat && currentStat.exchangeApprovalCount}</li>
        </ul>
      </Link>
      <Link href="/customer/customerService">
        <ul className={styles.third}>
          <li style={{ color: "white" }}>문의</li>
          <li>요청 : {currentStat.requestAnswerCount}</li>
          <li>대기 : {currentStat.waitingAnswerCount}</li>
        </ul>
      </Link>
      <Link href="/UserManage/userInfo">
        <ul className={styles.fourth}>
          <li style={{ color: "white" }}>회원</li>
          <li>{currentStat.userCount}명</li>
          <li>대기 : {currentStat && currentStat.guestCount}명</li>
          <li>{currentStat && currentStat.referredByOldGuestUser}</li>
        </ul>
      </Link>
      <ul className={styles.fifth}>
        <li className={styles.category} style={{ color: "white", backgroundColor: "#964242" }}>
          초과베팅
        </li>
        <li>{currentStat && currentStat.oldestExceedingBetUsername}</li>
      </ul>
      <ul className={styles.fifth}>
        <li className={styles.category} style={{ color: "white", backgroundColor: "#964242" }}>
          주시베팅
        </li>
        <li>{currentStat && currentStat.oldestMonitoringBetUsername}</li>
      </ul>
      {/* <ul className={styles.sixth}>
        <li style={{ color: "white", backgroundColor: "#494296" }}>지인 정산 요청</li>
        <li>&nbsp;</li>
      </ul> */}
    </div>
  )
}
