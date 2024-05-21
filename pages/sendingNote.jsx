import React, { useEffect, useState, useRef } from "react"
import EditorBody from "@components/noteWrite/EditorBody"
import styles from "./sendingNote.module.css"
import useStore from "@utils/zustand/store"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const basicURL = process.env.NEXT_PUBLIC_API_URL

function sendingNote() {
  const route = useRouter()
  // const [localIds, setLocalIds] = useState([]) // 로컬 컴포넌트 상태로 ids 관리
  const { ids, newIds } = useStore() // useStore에서 ids와 resetIds 함수 가져오기
  const titlese = useRef(null)
  const { sendRequest } = useAxiosRequest()

  const sendNotes = (contentVal, userid) => {
    const method = "POST"
    const url = `${basicURL}/api/v2/managers/send`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    const body = {
      // receiverId: localIds,
      receiverId: userid,
      title: titlese.current.value,
      content: contentVal,
      popup: true,
    }
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("글자 수는 255자 이하로 입력해주세요")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("전송완료", {
          onClose: () => window.close(),
        })
      }
      return false
    })
  }

  return (
    <div>
      <section className={styles.noteTextWrapper}>
        <div className={styles.noteTitle}>쪽지내용</div>
        <div>
          <div className={styles.titleBox}>
            <span className={styles.titleSpan}>제목:</span>
            <input className={styles.titleInputLine} ref={titlese} />
          </div>
          <EditorBody sendNotes={sendNotes} />
        </div>

        <div className={styles.noteTitle}>&nbsp;</div>
      </section>
    </div>
  )
}

export default sendingNote
