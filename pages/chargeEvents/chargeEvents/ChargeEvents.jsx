import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./ChargeEvents.module.css"
import { headers } from "next.config"

export default function AdminInfoList() {
  const heaerarr = [
    { pname: "No." },
    {
      pname: "조건1",
      pname2: "(미만 금액)",
    },
    {
      pname: "조건1",
      pname2: "(지급 포인트)",
    },
    {
      pname: "조건2",
      pname2: "(미만 금액)",
    },
    {
      pname: "조건2",
      pname2: "(지급 포인트)",
    },
    {
      pname: "조건3",
      pname2: "(미만 금액)",
    },
    {
      pname: "조건3",
      pname2: "(지급 포인트)",
    },
    {
      pname: "시작시간",
    },
    ,
    {
      pname: "종료시간",
    },
    ,
    {
      pname: "적용여부",
    },
    {
      pname: "기능",
    },
    {
      pname: "기능2",
    },
  ]
  const body1 = [
    { pname: "5" },
    {
      pname: "99,999",
    },
    {
      pname: "10,000",
    },
    {
      pname: "199,999",
    },
    {
      pname: "20,000",
    },
    {
      pname: "299,999",
    },
    {
      pname: "3,000",
    },
    {
      pname: "2023-10-03   14:00:00",
    },
    ,
    {
      pname: "2023-10-03   14:00:00",
    },
    {
      pname: "적용",
    },
    {
      buttons: (
        <button className={styles.saveChbtn} style={{ backgroundColor: "red" }} type="button">
          설정변경
        </button>
      ),
    },
    {
      buttons: (
        <button className={styles.saveChbtn} style={{ backgroundColor: "#0000FF" }} type="button">
          삭제
        </button>
      ),
    },
  ]
  const body2 = [
    { pname: "5" },
    {
      pname: "99,999",
    },
    {
      pname: "10,000",
    },
    {
      pname: "199,999",
    },
    {
      pname: "20,000",
    },
    {
      pname: "999,999",
    },
    {
      pname: "100,000",
    },
    {
      pname: "2023-10-03   14:00:00",
    },
    ,
    {
      pname: "2023-10-03   14:00:00",
    },
    {
      pname: "비적용",
    },
    {
      buttons: (
        <button className={styles.saveChbtn} style={{ backgroundColor: "red" }} type="button">
          설정변경
        </button>
      ),
    },
    {
      buttons: (
        <button className={styles.saveChbtn} style={{ backgroundColor: "#0000FF" }} type="button">
          삭제
        </button>
      ),
    },
  ]
  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"특수이벤트/돌발 충전 이벤트 (전체 : 2)"}
        customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
      />
      <div className={styles.tableContainer}>
        <section className={styles.gridbox}>
          <div className={styles.gridHeader}>
            {heaerarr.map((ar) => (
              <div className={styles.headerNode}>
                <p>{ar.pname}</p>
                {ar.pname2 ? <p className={styles.pname2}>{ar.pname2}</p> : null}
              </div>
            ))}
            {body1.map((ar) => (
              <div className={styles.headerNode}>
                {ar.pname ? <input className={styles.nodeInput} value={ar.pname} /> : null}
                {ar.buttons ? ar.buttons : null}
              </div>
            ))}
            {body2.map((ar) => (
              <div className={styles.headerNode}>
                {ar.pname ? <input className={styles.nodeInput} value={ar.pname} /> : null}
                {ar.buttons ? ar.buttons : null}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.colorRed}>*중복설정이 가능하오니, 중복이 없는지 체크해 주시기 바랍니다.</div>

        <section className={styles.tableBoxes}>
          <table className={styles.tableWrapper}>
            <thead>
              <tr>
                <th class="tg-0pky">조건1</th>
                <th class="tg-0pky">적용금액</th>
                <th className={styles.tableright}>0</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-0pky">조건2</td>
                <td class="tg-0pky">적용(미만)금액</td>
                <td class="tg-0pky">0</td>
              </tr>
              <tr>
                <td class="tg-0pky">조건3</td>
                <td class="tg-0pky">적용(미만)금액</td>
                <td class="tg-0pky">0</td>
              </tr>
              <tr>
                <td class="tg-0pky">시작시간</td>
                <td class="tg-0pky" colspan="2">
                  연도-월-일 --:--:--
                </td>
              </tr>
              <tr>
                <td class="tg-0pky">종료시간</td>
                <td class="tg-0pky" colspan="2">
                  연도-월-일 --:--:--
                </td>
              </tr>
              <tr className={styles.widthTableDataleft}>
                <td>적용여부</td>
                <td className={styles.widthTableData}>
                  <select className={styles.tableSelector}>
                    <option>적용</option>
                    <option>적용1</option>
                    <option>적용2</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <table className={styles.tableWarpper2}>
            <thead>
              <tr>
                <th>지급포인트</th>
                <th>0</th>
              </tr>
            </thead>
            <tbody className={styles.tableBodys}>
              <tr>
                <td>지급포인트</td>
                <td>0</td>
              </tr>
              <tr>
                <td>지급포인트</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </section>
        <button type="button" className={styles.onSubmitBtn}>
          등록
        </button>
      </div>
    </div>
  )
}
