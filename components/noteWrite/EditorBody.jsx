/* eslint-disable no-plusplus */
/* eslint-disable react/no-danger */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
/* eslint-disable import/no-unresolved */
import React, { useState, useRef, useMemo, useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./EditorBody.module.css"
import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import "react-quill/dist/quill.snow.css"

/**
 *
 * @param {*sendNotes} 상태 전달 받을 hook
 * @returns 저장 버튼을 누르면 재렌더링 되면서 에디터가 다시 그려짐, 상위 컴포넌트에서 상태를 전달 받자마자 즉시 원하는 동작을 수행 해야함.
 */
export default function EditorBody({ sendNotes }) {
  const router = useRouter()
  const [localIds, setLocalIds] = useState([]) // 로컬 컴포넌트 상태로 ids 관리
  const noteRef = useRef(null)
  useEffect(() => {
    if (router.isReady) {
      const tempArr =
        router.query.userId &&
        router.query.userId.split(",").map((item) => {
          return Number(item)
        })
      setLocalIds(tempArr)
    }
  }, [router])
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
  const editorRef = useRef(null)

  //  이미지 핸들러가 없으면 로컬에 저장해서 에디터에 보이고, 있으면 핸들러가 지정한 장소에서 불러오는대
  // 아래 url을 받아오는 항목이없을 경우, img를 받아올 곳이 없으므로, 메모리에서 사라짐.

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
  function submitting(event) {
    event.preventDefault()
    for (const userid of localIds) {
      sendNotes(sanitizeQuillContent(noteRef.current.value), userid)
    }
  }
  return (
    <>
      <div className={styles.writeBoxWrapper}>
        {/* {typeof window !== "undefined" || typeof window !== "null" ? (
          <Quill
            className={styles.editors}
            modules={editorModule}
            placeholder="내용을 입력해 주세요."
            resize
            forwardedRef={editorRef}
            theme="snow"
          />
        ) : null} */}
        <textarea className={styles.editors} placeholder="입력해주세요" ref={noteRef} />
        <button onClick={(event) => submitting(event)} className={styles.saveBtn}>
          쪽지 보내기
        </button>
      </div>
    </>
  )
}
