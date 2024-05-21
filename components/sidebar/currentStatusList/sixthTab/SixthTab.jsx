import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import Link from "next/link"

export default function SixthTab({ customColor, currentStat }) {
  return (
    <div className={styles.boxContainer} style={{ background: customColor }}>
      <ul>
        <Link href="/bettingManage/totalList">
          <li>
            <div>스포츠 프리매치 ({currentStat.prematchCount || 0})</div>
            <div>{addCommasToNumber(currentStat.prematchSum || 0)}</div>
          </li>
        </Link>
        <Link href="/bettingManage/totalList">
          <li>
            <div>스포츠 실시간 ({currentStat.inplayCount || 0})</div>
            <div>{addCommasToNumber(currentStat.inplaySum || 0)}</div>
          </li>
        </Link>
        <Link href="/bettingManage/totalList">
          <li>
            <div>스포츠 일반 ({currentStat.normalCount})</div>
            <div>{addCommasToNumber(currentStat.normalSum || 0)}</div>
          </li>
        </Link>
        <Link href="/bettingManage/totalList">
          <li>
            <div>스포츠 스페셜 ({currentStat.specialCount})</div>
            <div>{addCommasToNumber(currentStat.specialSum || 0)}</div>
          </li>
        </Link>
        <Link href="/bettingManage/totalList">
          <li>
            <div>스포츠 스페셜2 ({currentStat.special2Count})</div>
            <div>{addCommasToNumber(currentStat.special2Sum || 0)}</div>
          </li>
        </Link>
        <li>
          <div>남은 베팅 (합산)</div>
          <div>{addCommasToNumber(currentStat.leftBet || 0)}</div>
        </li>
        <li>
          <div>수동 지급 포인트</div>
          <div>0 P</div>
        </li>
        <li>
          <div>자동 지급 포인트</div>
          <div>0 P</div>
        </li>
        <li>
          <div>금일 첫충전 회원</div>
          <div>0 건</div>
        </li>
        <li>
          <div>금일 가입 회원</div>
          <div>0 건</div>
        </li>
      </ul>
    </div>
  )
}
