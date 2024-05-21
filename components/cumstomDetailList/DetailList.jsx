import React, { useState, useEffect, useRef } from "react"
import styles from "./DetailList.module.css"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"

const ListTableAbsolute = React.lazy(() => import("./component/ListTableAbsolute"))

/**
 * 일반 상세보기
 * @param {*} param0
 * @returns
 */

function DetailList({ betGroupId, betFoldType, params2, scores, onClickFN }) {
  const [show, setShow] = useState(false)
  const buttonRef = useRef(null)
  const { sendRequest } = useAxiosRequest()

  const [buttonPosition, setButtonPosition] = useState({})

  function getAbsolutePosition(element) {
    let top = 0
    let left = 0

    while (element) {
      top += element.offsetTop || 0
      left += element.offsetLeft || 0
      element = element.offsetParent
    }

    return { top, left }
  }

  const showExtraList = () => {
    const button = buttonRef.current
    if (button) {
      // 버튼의 문서에서의 절대 위치를 계산
      const position = getAbsolutePosition(button)

      // 팝업 테이블의 위치를 설정 (버튼의 아래쪽에 위치시킴)
      setButtonPosition({
        top: position.top + button.offsetHeight - 260,
        left: 0,
      })

      setShow(!show)
    }

    // setTimeout(onClickFN, 1000)
  }
  useEffect(() => {}, [buttonPosition, show])

  return (
    <>
      <div key={betGroupId} ref={buttonRef} className={styles.ArrowBtn} onClick={showExtraList}>
        <FontAwesomeIcon icon={faSquareCaretDown} style={{ color: "#696969" }} />
      </div>
      {show && (
        <React.Suspense fallback={<div>로드중..</div>}>
          <ListTableAbsolute
            Cstyle={buttonPosition}
            betGroupId={betGroupId}
            betFoldType={betFoldType}
            matchId={params2.row.matchId}
            scores={scores}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default DetailList
