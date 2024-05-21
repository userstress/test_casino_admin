import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import Link from "next/link"

export default function FifthTab({ customColor, currentStat }) {
  return (
    <div className={styles.boxContainer} style={{ background: customColor }}>
      <ul>
        <Link href="/casinoManagement/depositRequest">
          <li>
            <div>카지노 ({currentStat.todayTransformToCasinoCount || 0})건</div>
            <div>{addCommasToNumber(currentStat.todayTransformToCasinoBalance || 0)}</div>
          </li>
        </Link>
        <Link href="/casinoManagement/withdrawalRequest">
          <li>
            <div>카지노 환전금 ({currentStat.todayTransformToSportsCount || 0})건</div>
            <div>{addCommasToNumber(currentStat.todayTransformToSportsBalance || 0)}</div>
          </li>
        </Link>
        <Link href="/casinoManagement/incomeList">
          <li>
            <div>카지노 충전금 - 환전금</div>
            <div>
              {addCommasToNumber(
                currentStat.todayTransformToCasinoBalance - currentStat.todayTransformToSportsBalance || 0,
              )}
            </div>
          </li>
        </Link>
      </ul>
    </div>
  )
}
