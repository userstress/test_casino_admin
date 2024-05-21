import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import Link from "next/link"

export default function FourthTab({ customColor, currentStat }) {
  return (
    <div className={styles.boxContainer} style={{ background: customColor }}>
      <ul>
        <li>
          <div>회원 보유 금액</div>
          <div>{addCommasToNumber(currentStat.totalSportsBalance || 0)}</div>
        </li>

        <li>
          <div>회원 보유 포인트</div>
          <div>{addCommasToNumber(currentStat.totalPoint || 0)}</div>
        </li>

        <li>
          <div>충전금 ({currentStat.todayRechargeCount || 0})건</div>
          <div>{addCommasToNumber(currentStat.todayRechargeSum || 0)}</div>
        </li>
        <li>
          <div>환전금 ({currentStat.todayExchangeCount || 0})건</div>
          <div>{addCommasToNumber(currentStat.todayExchangeSum || 0)}</div>
        </li>
        <li>
          <div>충전금 - 환전금</div>
          <div>{addCommasToNumber(currentStat.todayDifference || 0)}</div>
        </li>

        <li>
          <div>금일 베팅 금액</div>
          <div>{addCommasToNumber(currentStat.todayBetAmountSum || 0)}</div>
        </li>
        <li>
          <div>일 정산 금액</div>
          <div>{addCommasToNumber(currentStat.todayAdjustment || 0)}</div>
        </li>
      </ul>
    </div>
  )
}
