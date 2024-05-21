import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
import Link from "next/link"

import { useRouter } from "next/router"

export default function FirstTab({ customColor, currentStat }) {
  const router = useRouter()

  return (
    <div className={styles.boxContainer} style={{ background: customColor }}>
      <ul>
        <Link href="/Exchange/chargeReg">
          <li>
            <div>충전요청</div>
            <div>{currentStat ? currentStat.todayRechargeRequestCount || 0 : 0} 건</div>
          </li>
        </Link>
        <Link href="/Exchange/exchangeReg">
          <li>
            <div>환전요청</div>
            <div>{currentStat ? currentStat.todayExchangeRequestCount || 0 : 0} 건</div>
          </li>
        </Link>
        <Link href="/UserManage/userInfo">
          <li>
            <div>가입신청</div>
            <div>{(currentStat && currentStat.todayJoinRequestCount) || 0} 건</div>
          </li>
        </Link>
        <Link href="/customer/customerService">
          <li>
            <div>고객센터</div>
            <div>{currentStat.requestAnswerCount + currentStat.waitingAnswerCount || 0} 건</div>
          </li>
        </Link>
        <Link href="/customer/customerService">
          <li>
            <div>비번 찾기 문의</div>
            <div> {currentStat.totalLoginRequestCount} 건</div>
          </li>
        </Link>
        <Link href="/UserManage/changePW">
          <li>
            <div>비번 변경 문의</div>
            <div> {currentStat.totalPasswordRequestCount} 건</div>
          </li>
        </Link>
        {/* <li onClick={() => toast.success("9월 업데이트 예정 입니다")}>
          <div>관리자 공지사항</div>
          <div>0 건</div>
        </li>
        <li>
          <div>스포츠 등록 대기</div>
          <div>0 건</div>
        </li> */}
        <Link href="/monitoring/bettingMonitoring">
          <li>
            <div>베팅 모니터링</div>
            <div>{currentStat.inplayBetMonitoring} 건</div>
          </li>
        </Link>
        {/* 
        <li>
          <div>미니게임 결과 모니터링</div>
          <div>0 건</div>
        </li> */}
      </ul>
    </div>
  )
}
