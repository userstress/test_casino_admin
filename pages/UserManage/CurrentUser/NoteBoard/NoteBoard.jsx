import React, { useCallback, useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/router"
import styles from "./NoteBoard.module.css"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import { useCheckboxStore } from "@utils/boardStore/checkboxStore"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"

function NoteBoard({ users, settingId }) {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const router = useRouter()
  const editorRef = useRef(null)
  const titleRef = useRef(null)
  const writerRef = useRef(null)
  const [editorsVal, setEditor] = useState()
  const { checkboxes } = useCheckboxStore()
  const { sendRequest } = useAxiosRequest()
  const [isPop, setPop] = useState(true)

  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import("react-quill")
      const TempQuill = RQ.Quill

      const Font = await TempQuill.import("formats/font")
      Font.whitelist = ["nexon", "hakgyo", "jamsil", "scdream", "KBOGothic", "Gmarket", "ESAMANRU", "pretendard"] // allow ONLY these fonts and the default
      TempQuill.register(Font, true)

      return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
    },
    {
      ssr: false,
    },
  )

  const Quill = ReactQuill

  function insertToEditor(url) {
    const editor = editorRef.current.getEditor()
    const range = editor.getSelection()

    editor.insertEmbed(range.index, "image", url)
  }
  /*
   *이미지 api발신 함수.
   */
  function saveToServer(file) {
    const fd = new FormData()
    fd.append("upload", file)
    const xhr = new XMLHttpRequest()
    //
    xhr.open("POST", "/api/media", true)
    // next 서버 api전송문,
    xhr.onload = () => {
      if (xhr.status === 201) {
        // this is callback data: url
        const { url } = JSON.parse(xhr.responseText)
        insertToEditor(url)
      }
      if (xhr.status === 404) {
        insertToEditor("이미지 업로드에 실패하였습니다. 관리자에게 문의 해 주세요.")
      }
    }
    // 업로드 후 받아온걸 editor객체에 embeded로 삽입.
    xhr.send(fd)
    insertToEditor(file)
  }
  const imageHandler = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = () => {
      const file = input.files[0]

      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file)
      } else {
        console.warn("You could only upload images.")
      }
    }
  })
  const [boardInfo, setboardInfo] = useState({ type: "" }) // `isEvent`의 초기 상태

  const editorModule = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            {
              font: ["nexon", "hakgyo", "jamsil", "scdream", "KBOGothic", "Gmarket", "ESAMANRU", "pretendard"],
            },
            { align: ["", "right", "center"] },
          ],
          [
            { size: ["small", false, "large", "huge"] },
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            { color: [] },
            { background: [] },
            "link",
            "image",
            "video",
          ],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler],
  )

  /**
   *
   * @param {string} quillContent :sanitize 시키기전의 순수한 quill editor의 값
   * @returns irame 태그를 찾아서 title을 u+ 숫자 1~,,, 을 추가, u1,u2,u3....
   * title을 추가 한 후 해당 html 문자열을 리턴한다.
   */
  const sanitizeQuillContent = (quillContent) => {
    const tempContainer = document.createElement("div")
    tempContainer.innerHTML = DOMPurify.sanitize(quillContent, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allowfullscreen", "frameborder", "src"],
    })

    const iframes = tempContainer.getElementsByTagName("iframe")
    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i]
      iframe.setAttribute("title", `u${i + 1}`)
    }

    return tempContainer.innerHTML
  }

  function insideof(event) {
    console.log(event.target.innerText)
  }
  function changeRadio(event, text) {
    if (text === "persnal" || text === "board") {
      return setPop(false)
    } else {
      setPop(true)
    }
  }

  const currentUserRef = useRef(null)
  const allLevelsRef = useRef(null)
  const levelRefs = levels.map(() => useRef(null))

  const getUsersByLevel = (users, level) => {
    if (level === "all") {
      return users.map((user) => user.id)
    }
    return users.filter((user) => user.lv === level).map((user) => user.id)
  }
  // const getCurrentUserId = (users) => {
  //   return users.map((user) => user.id)
  // }

  const submitNote = () => {
    const too = getCookie("token")
    const headers = { Authorization: too }

    // 현재 유저와 레벨 체크박스의 상태 확인
    const isCurrentUserChecked = currentUserRef.current.checked
    const isAllLevelsChecked = allLevelsRef.current.checked

    // 선택된 레벨들 확인
    const selectedLevels = []
    levelRefs.forEach((ref, index) => {
      if (ref.current.checked) {
        selectedLevels.push(index + 1) // lv는 1부터 시작하므로 index + 1을 추가
      }
    })

    // 선택된 수신자 ID 배열 초기화
    let receiverIds = []

    // 선택된 체크박스에 따라 수신자 ID 배열 구성
    if (isCurrentUserChecked) {
      // 현재 유저 체크박스가 체크된 경우, 현재 유저 ID를 수신자 ID 배열에 추가
      receiverIds = getUsersByLevel(users, "all") // getCurrentUserId()는 현재 유저의 ID를 가져오는 함수라고 가정합니다.
    }

    if (isAllLevelsChecked) {
      // 전체 레벨 체크박스가 체크된 경우, 모든 레벨의 유저 ID를 수신자 ID 배열에 추가
      receiverIds = receiverIds.concat(users.map((user) => user.id)) // users는 사용자 객체 배열이라고 가정하고, id는 사용자의 고유 식별자입니다.
    } else {
      // 선택된 레벨 체크박스에 해당하는 유저 ID를 수신자 ID 배열에 추가
      selectedLevels.forEach((level) => {
        receiverIds = receiverIds.concat(getUsersByLevel(users, level)) // getUsersByLevel 함수로 해당 레벨의 유저 ID를 가져옵니다.
      })
    }

    // 수신자 ID 배열에서 중복 제거

    settingId.forEach((element) => {
      receiverIds.push(element)
    })
    receiverIds = Array.from(new Set(receiverIds))

    const promises = receiverIds.map((receiverId) => {
      return new Promise((resolve, reject) => {
        const paper = {
          title: titleRef.current.value,
          content: sanitizeQuillContent(editorRef.current.value),
          receiverId: receiverId,
          popup: isPop,
        }

        const method = "POST"
        const url = "/api/v2/managers/send"

        sendRequest(method, url, headers, paper, (errorStatus, responseData) => {
          if (errorStatus) {
            // 오류가 있으면 거부함
            reject(new Error("요청 처리 중 오류 발생"))
          } else {
            // 성공적으로 처리됨
            resolve(responseData)
          }
        })
      })
    })
    Promise.all(promises)
      .then((res) => {
        // 모든 요청이 성공적으로 완료된 후 실행될 코드
        console.log(res)
        toast.success("전송을 완료했습니다")
        router.reload()
      })
      .catch((error) => {
        // 하나라도 실패할 경우 실행될 코드
        console.error("에러 발생:", error.message)
      })
  }

  function selectAllRadio(event) {
    // event.target.checked의 현재 상태를 가져옵니다.
    const isChecked = event.target.checked

    // 모든 ref에 대해 현재 상태와 반대로 설정합니다.
    levelRefs.forEach((ref) => {
      ref.current.checked = isChecked // 모든 체크박스를 event.target의 checked 상태와 동일하게 설정
    })
  }

  return (
    <>
      <div>현재 접속자 & 전체 회원 쪽지 보내기</div>
      <div className={styles.BoardWrapper}>
        <section className={styles.boardFirst}>
          <div className={styles.Second1}>구분</div>
          <div className={styles.Second2}>제목</div>
          <div className={styles.Second3}>글쓴이</div>
          <div className={styles.Second4}>내용</div>
        </section>
        <section className={styles.boardSecond}>
          <div className={styles.Second1}>
            <span className={styles.buttonList}>
              <input id="currentUser" type="checkbox" ref={currentUserRef} />
              <label htmlFor="currentUser">현재 접속자</label>
            </span>
            <ul className={styles.buttonListUl}>
              <li className={styles.buttonListList}>
                <input
                  id="currentUser2"
                  type="checkbox"
                  ref={allLevelsRef}
                  onClick={(event) => selectAllRadio(event)}
                />
                <label htmlFor="currentUser2">전체 레벨</label>
              </li>
              {levels.map((num, index) => (
                <div key={index}>
                  <input id={`level${num}`} type="checkbox" ref={levelRefs[index]} />
                  <label htmlFor={`level${num}`}>{num}레벨</label>
                </div>
              ))}
            </ul>
          </div>

          <div className={styles.Second2}>
            <div className={styles.noteTitles}>
              <input type="text" ref={titleRef} />
            </div>
          </div>
          <div className={styles.Second3}>
            <div className={styles.noteTitles_Second3}>
              <input type="text" defaultValue="관리자" ref={writerRef} />
              <div className={styles.formRadio}>
                <input
                  type="radio"
                  id="option1"
                  name="option"
                  value="1"
                  onChange={(event) => changeRadio(event, "notice")}
                />
                <label htmlFor="option1">공지사항</label>
                <br />
                <input
                  type="radio"
                  id="option2"
                  name="option"
                  value="2"
                  onChange={(event) => changeRadio(event, "board")}
                />
                <label htmlFor="option2">일반</label>
                <br />
                <input
                  type="radio"
                  id="option3"
                  name="option"
                  value="3"
                  onChange={(event) => changeRadio(event, "persnal")}
                />
                <label htmlFor="option3">개인</label>
                <br />
              </div>
            </div>
          </div>
          <div className={styles.Second4}>
            {typeof window !== "undefined" || typeof window !== "null" ? (
              <Quill
                className={styles.editors}
                modules={editorModule}
                placeholder="내용을 입력해 주세요."
                resize
                forwardedRef={editorRef}
                theme="snow"
              />
            ) : null}
          </div>
        </section>
        <section className={styles.boardThird}>
          <div className={styles.mecros}>
            <ul className={styles.Ulists} onClick={(event) => insideof(event)}>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </section>
      </div>

      <div className={styles.submitBox}>
        <button
          onClick={() => {
            submitNote()
          }}
        >
          등록
        </button>
        <button onClick={() => router.back()}>취소</button>
      </div>
    </>
  )
}

export default NoteBoard
