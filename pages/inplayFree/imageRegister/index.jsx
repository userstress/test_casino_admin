import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"
import styles from "./index.module.css"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export default function index() {
  const sportsName = [
    { title: "basketBall", contents: "" },
    { title: "baseball", contents: "" },
    { title: "football", contents: "" },
  ]
  // sportsName을 기반으로 각 종목명에 해당하는 입력값을 저장할 초기 상태 설정
  const [contents, setContents] = useState(sportsName)

  // 입력 필드에서 발생하는 변경사항을 처리하는 함수
  const handleTitleChange = (index, event) => {
    const newContents = [...contents] // 현재 contents 상태의 복사본을 생성
    newContents[index].title = event.target.value // 변경된 종목명을 해당 인덱스 위치에 할당
    setContents(newContents) // contents 상태 업데이트
  }
  const handleFileChange = (index, event) => {
    const newContents = [...contents] // 현재 contents 상태의 복사본을 생성
    newContents[index].contents = event.target.value // 변경된 종목명을 해당 인덱스 위치에 할당
    setContents(newContents) // contents 상태 업데이트
  }
  return (
    <>
      <CustomHeader
        text={<div>인플레이 & 프리매치 이미지 설정 목록</div>}
        customStyle={{ height: "1.979vw", width: "100%" }}
        id="headers"
      />
      <label htmlFor="headers" style={{ color: "#FF0000", fontSize: "10px", margin: "10px 0" }}>
        인플레이 화면에 노출되는 이미지를 설정하는 페이지입니다.
      </label>
      <div className={styles.tableContainer}>
        {sportsName.map((item, index) => (
          <section className={styles.inputWrapper} key={item.title}>
            <div className={styles.inputTitle}>
              종목명
              <input
                type="text"
                value={item.title} // 각 입력 필드의 값으로 contents 상태의 해당 값 사용
                onChange={(event) => handleTitleChange(index, event)} // 입력 필드가 변경될 때마다 handleTitleChange 호출
              />
            </div>
            <div className={styles.inputPhoto}>
              <div className={styles.photobox}>
                <img src={item.contents ? item.contents : ""} />
              </div>
              <div className={styles.inputbox}>
                <span className={styles.buttonText}>게시,수정자: 관리자</span>
                <span className={styles.buttonBox}>
                  <button type="button" className={styles.setButton} style={{ backgroundColor: "#3342C9" }}>
                    설정
                  </button>
                  <button type="button" className={styles.setButton} style={{ backgroundColor: "#FF0000" }}>
                    삭제
                  </button>
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className={styles.newInputBox}>
        <div>
          <input className={styles.newInput} type="text" placeholder="종목명을 입력해 주세요" />
          <input className={styles.newInput2} type="file" />
          <button type="button" className={styles.submitBtn}>
            등록
          </button>
        </div>
      </section>
      <div className={styles.photobox}>
        <img src="" className="" />
      </div>
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
