import { useState } from "react"
import styles from "./MoneyExChangeSetting.module.css"

export default function MoneyExChangeSetting() {
  const [levelObj, setLvObj] = useState([
    { lv: 1, value: 0 },
    { lv: 2, value: 0 },
    { lv: 3, value: 0 },
    { lv: 4, value: 0 },
    { lv: 5, value: 0 },
    { lv: 6, value: 0 },
    { lv: 7, value: 0 },
    { lv: 8, value: 0 },
    { lv: 9, value: 0 },
    { lv: 10, value: 0 },
  ])
  const handleLevelChange = (level, newValue) => {
    const updatedLevels = levelObj.map((obj) => {
      if (obj.lv === level) {
        return { ...obj, value: Number(newValue) } // Ensure newValue is treated as a number
      }
      return obj
    })
    setLevelObj(updatedLevels)
  }

  return (
    <div className={styles.boxContainer}>
      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            아이디
          </span>
          <input id="idinput" className={styles.mainInput} />
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="prevpw" className={styles.mainLabels}>
            기존 비밀번호
          </span>
          <input id="prevpw" className={styles.mainInput} />
        </div>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="newpw" className={styles.mainLabels}>
            새 비밀번호
          </span>
          <input id="newpw" className={styles.mainInput} />
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="newpwcon" className={styles.mainLabels}>
            새 비밀번호 확인
          </span>
          <input id="newpwcon" className={styles.mainInput} />
        </div>
        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>

      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            윈드 이벤트 포인트
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="윈드point" />
            <label htmlFor="윈드point">미사용중</label>
          </div>
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            레인 이벤트 포인트
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="레인point" />
            <label htmlFor="레인point">미사용중</label>
          </div>
        </div>

        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>

      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="윈드firstpoint" className={styles.mainLabels}>
            윈드 첫충전 추가 포인트
          </span>
          <input id="idinput" className={styles.mainInput} />
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="레인firstpoint" className={styles.mainLabels}>
            레인 첫충전 추가 포인트
          </span>
          <input id="레인firstpoint" className={styles.mainInput} />
        </div>
        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>

      <form>
        <div className={styles.subInputBoxs}>
          <span htmlFor="윈드firstpoint" className={styles.subLabels}>
            윈드 첫충전 추가 포인트
          </span>
        </div>
        <section className={styles.sectionBox}>
          {levelObj.map((obj) => (
            <div key={obj.lv} className={styles.rowInputBoxs}>
              <label htmlFor={`${obj.lv}레벨`} className={styles.rowLabels}>
                {obj.lv}레벨
              </label>
              <input
                id={`${obj.lv}레벨`}
                type="number" // Assuming the value is a number
                value={obj.value}
                onChange={(e) => handleLevelChange(obj.lv, e.target.value)}
                className={styles.rowInput}
              />
            </div>
          ))}
        </section>

        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>

      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            환전 처리 버튼 사용
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="환전 처리 버튼 사용" />
            <label htmlFor="환전 처리 버튼 사용">미사용중</label>
          </div>
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            은행 점검 사용
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="은행 점검 사용" />
            <label htmlFor="은행 점검 사용">미사용중</label>
          </div>
        </div>

        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>
      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            검수 버튼 사용
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="검수 버튼 사용" />
            <label htmlFor="검수 버튼 사용">미사용중</label>
          </div>
        </div>

        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>

      <form>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            일반충전
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="일반충전" />
            <label htmlFor="일반충전">미사용중</label>
          </div>
        </div>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            비트5
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="비트5" />
            <label htmlFor="비트5">미사용중</label>
          </div>
        </div>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            원피
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="원피" />
            <label htmlFor="원피">미사용중</label>
          </div>
        </div>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            원데이
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="원데이" />
            <label htmlFor="원데이">미사용중</label>
          </div>
        </div>

        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            코인웨이브
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="코인웨이브" />
            <label htmlFor="코인웨이브">미사용중</label>
          </div>
        </div>
        <div className={styles.mainInputBoxs}>
          <span htmlFor="idinput" className={styles.mainLabels}>
            가상화폐
          </span>
          <div className={styles.mainCheckbox}>
            <input type="checkbox" id="가상화폐" />
            <label htmlFor="가상화폐">미사용중</label>
          </div>
        </div>

        <div className={styles.confirmbox}>
          <button type="button" className={styles.confirmboxBtn}>
            {" "}
            수정{" "}
          </button>
        </div>
      </form>
    </div>
  )
}
