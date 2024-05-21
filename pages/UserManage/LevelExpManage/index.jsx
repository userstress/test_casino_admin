import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import styles from "./index.module.css"
import { useState } from "react"
export default function index() {
  const maxValues = [2500, 20000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000]

  const [levels, setLevels] = useState(
    maxValues.map((max, index) => ({
      lv: index + 1,
      max: max,
    })),
  )
  const handleExpChange = (levelIndex, newValue) => {
    const updatedLevels = levels.map((level, index) => {
      if (index === levelIndex) {
        return { ...level, max: Number(newValue) }
      }
      return level
    })
    setLevels(updatedLevels)
  }
  const getExpRange = (index) => {
    // levels[index]가 정의되지 않은 경우 기본값을 처리
    if (levels[index] === undefined) {
      console.error("Invalid index:", index)
      return "0 ~ 0" // 기본값 또는 적절한 에러 처리
    }

    const minExp = index > 0 && levels[index - 1] ? levels[index - 1].max : 0
    const maxExp = levels[index].max // 이 시점에서 levels[index]는 undefined가 아님

    return `${minExp} ~ ${maxExp}`
  }

  return (
    <div>
      <CustomHeader text={`경험치 목록`} customStyle={{ height: "1.979vw", width: "100%" }} />
      <section className={styles.TableWrapper}>
        <div className={styles.TableBox}>
          <span>레벨</span>
          <span>EXP</span>
          <span>기능</span>
        </div>
        {levels.map((val, _index) => {
          return (
            <div className={styles.TableBox}>
              <span className={styles.levels}>{`${val.lv}Lv.`}</span>
              <span className={styles.inputs}>
                <input
                  type="text"
                  defaultValue={getExpRange(_index)}
                  onChange={(event) => handleExpChange(index, event.target.value)}
                />
                <p> &nbsp;Xp까지</p>
              </span>
              <span className={styles.buttons}>
                <button type="button" className={styles.saveBtn}>
                  저장
                </button>
              </span>
            </div>
          )
        })}
      </section>
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
