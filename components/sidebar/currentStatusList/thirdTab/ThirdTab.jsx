import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
export default function ThirdTab({ customColor, currentStat }) {
  return (
    <div
      className={styles.boxContainer}
      style={{ background: customColor }}
      onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
    >
      <ul>
        <li>
          <div>센터 사이트 잔고</div>
          <div>{addCommasToNumber(currentStat.centerSiteBalance || "0 원")}</div>
        </li>
      </ul>
    </div>
  )
}
