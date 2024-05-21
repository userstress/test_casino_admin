import styles from "../commonStyle/CommonStyle.module.css"
import { toast } from "react-toastify"

export default function SeventhTab({ customColor }) {
  return (
    <div
      className={styles.boxContainer}
      style={{ background: customColor }}
      onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
    >
      <ul>
        <li>
          <div>카지노</div>
          <div>1건</div>
        </li>
        <li>
          <div>슬롯</div>
          <div>1건</div>
        </li>
        <li>
          <div>가상게임</div>
          <div>1건</div>
        </li>
        <li>
          <div>스키정</div>
          <div>1건</div>
        </li>
        <li>
          <div>애플베</div>
          <div>1건</div>
        </li>
        <li>
          <div>애플정</div>
          <div>1건</div>
        </li>
        <li>
          <div>토파베</div>
          <div>1건</div>
        </li>
        <li>
          <div>토파정</div>
          <div>1건</div>
        </li>
      </ul>
    </div>
  )
}
