import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import styles from "./index.module.css"
import "react-quill/dist/quill.snow.css"

import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import CustomButton from "@components/customButton/CustomButton"
import { getCookie } from "cookies-next"
import axios from "axios"
import { boardStore } from "@utils/boardStore/boardStore"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { datePickerTransMin } from "@utils/REST/LIST/datePickerTrans"
import { toast } from "react-toastify"
export default function index() {
  const { isEvent, boardType } = boardStore()
  const [boardInfo, setboardInfo] = useState({ type: "" }) // `isEvent`의 초기 상태

  const router = useRouter()
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
  const titleRef = useRef(null)
  const writerRef = useRef(null)
  const [boardStat, setStat] = useState({
    boardType: boardType.type,
    isExpose: true,
    isComment: true,
    viewCount: 0,
    commentAllowed: true,
  })

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

  useEffect(() => {}, [router.isReady, editorRef])
  useEffect(() => {
    if (boardType.type) {
      setboardInfo({ type: boardType.type })
    }
  }, [])

  useEffect(() => {}, [boardInfo, boardType])
  console.log(boardInfo)
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
            { color: [] },
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
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

  const sendToServer = async () => {
    const type = boardInfo.type

    const paper = {
      title: titleRef.current.value,
      content: sanitizeQuillContent(editorRef?.current?.value),
      isTop: type === "notice" ? true : false,
      viewStatus: boardStat.isExpose ? "노출" : "비노출", // 오타 수정: 'isExpose' -> 'isExpose'
      readCount: 0,
      commentAllowed: boardStat.commentAllowed,
    }

    if (!paper.title || !paper.content || paper.content.length === 0) {
      return toast.success("글과 제목을 입력해 주세요")
    }

    const token = getCookie("token") // 변수명 수정: 'too' -> 'token'으로 명확성 개선
    const headers = { "Content-Type": "application/json", Authorization: token }
    let urls
    switch (type) {
      case "notice":
        urls = `/api/v2/users/category/1/articles`
        break
      case "board":
        urls = `/api/v2/users/category/1/articles`
        break
      case "event":
        urls = `/api/v2/users/category/3/articles`
        break
      default:
        return // 잘못된 boardType이면 함수를 여기서 종료
    }

    try {
      const response = await axios.post(`https://dailymodelapp.com${urls}`, paper, { headers })

      // 성공적으로 데이터를 보내고 응답을 받았을 때 성공 메시지 표시
      toast.success("성공적으로 등록되었습니다!")

      return response.data
    } catch (error) {
      console.error("Error fetching data:", error)
      // 요청 실패 시, 실패 메시지 표시
      toast.success("데이터 등록을 처리중입니다")
    }
  }

  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTransMin(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTransMin(endDate) })
  }

  return (
    <div className={styles.customerServiceDetailTableWrapper}>
      <table className={styles.customerServiceDetailTable}>
        <colgroup>
          <col width={420}></col>
          <col width={580}></col>
          <col width={250}></col>
          <col width={414}></col>
        </colgroup>

        <thead>
          <tr>
            <th className={styles.title}>글쓰기 </th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>게시타입</td>
            <td>
              <select style={{ width: "40%" }} value={boardInfo.type ? boardInfo.type : "notice"}>
                <option value="notice">공지사항</option>
                <option value="board">게시판</option>
                <option value="event">이벤트</option>
              </select>
              <select
                style={{ width: "30%" }}
                onChange={(event) => setStat({ ...boardStat, isExpose: event.target.value })}
                value={boardStat.isExpose}
              >
                <option value="expose">노출</option>
                <option value="unexpose">비노출</option>
              </select>
              <select
                style={{ width: "30%" }}
                value={boardStat.commentAllowed}
                onChange={(event) => setStat({ ...boardStat, commentAllowed: event.target.value })}
              >
                <option value={true}>댓글허용</option>
                <option value={false}>댓글미허용</option>
              </select>
            </td>
            <td>작성자(닉네임)</td>
            <td>
              <input type="text" placeholder="관리자" defaultValue="관리자" ref={writerRef} />
            </td>
          </tr>
          <tr>
            <td>글제목</td>
            <td colSpan={3}>
              <input type="text" placeholder="글제목" ref={titleRef} />
            </td>
          </tr>
          <tr style={{ height: "200px" }}>
            <td>글내용 </td>
            <td colSpan={3}>
              <div>
                {typeof window !== "undefined" || typeof window !== "null" ? (
                  <Quill
                    className={styles.editors}
                    modules={editorModule}
                    resize
                    forwardedRef={editorRef}
                    theme="snow"
                  />
                ) : null}
              </div>
            </td>
          </tr>
          {/* <tr>
            <td>타이틀 이미지</td>
            <td colSpan={3}>
              <input type="text" placeholder="2689978902.jpg" value={"2689978902.jpg"} readOnly />
            </td>
          </tr> */}
        </tbody>
      </table>
      <section className={styles.widthSection}>
        <div className={styles.sections}>
          <div className={styles.sectionTitle}>등록일자 </div>
          <div className={styles.sectionContents}>
            <DatePickerComponent
              getDate={handleStartDateChange}
              customStyle={{ width: "100%", justifyContent: "flex-start" }}
              isMinit={true}
            />
          </div>
        </div>
        <div className={styles.sections}>
          <div className={styles.sectionTitle}>조회</div>
          <div className={styles.sectionContents}>
            <input type="number" onChange={(event) => setStat({ ...boardStat, viewCount: event.target.value })} />
          </div>
        </div>
      </section>

      <section
        className={styles.widthSection}
        style={{ margin: "10px 0", display: boardStat.boardType === "event" ? "content" : "none" }}
      >
        <div className={styles.sections}>
          <div className={styles.sectionTitle}>이벤트 시작일</div>
          <div className={styles.sectionContents}>
            <DatePickerComponent
              getDate={handleStartDateChange}
              customStyle={{ width: "100%", justifyContent: "flex-start" }}
              isMinit={true}
            />
          </div>
        </div>
        <div className={styles.sections}>
          <div className={styles.sectionTitle}>이벤트 종료일</div>
          <div className={styles.sectionContents}>
            <DatePickerComponent
              getDate={handleEndDateChange}
              customStyle={{ width: "100%", justifyContent: "flex-start" }}
              isMinit={true}
            />{" "}
          </div>
        </div>
      </section>

      {/* <table className={styles.customerServiceDetailTable}>
        <colgroup>
          <col width={420}></col>
          <col width={580}></col>
          <col width={250}></col>
          <col width={414}></col>
        </colgroup>

        <thead>
          <tr>
            <th className={styles.title}>댓글리스트</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>댓글작성자</td>
            <td>
              <input type="text" placeholder="" value={""} readOnly />
            </td>
            <td>댓글작성일</td>
            <td>
              <input type="text" placeholder="" value={"2023-10-01 19:21:16"} readOnly />
            </td>
          </tr>
          <tr>
            <td>댓글내용</td>
            <td colSpan={3}>
              <input type="text" placeholder="" value={""} readOnly />
            </td>
          </tr>
        </tbody>
      </table> */}
      <div className={styles.bottomBtnWrapper}>
        <div className={styles.templateBtnWrapper}>
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#696969",
              color: "white",
              marginRight: "3px",
            }}
            text={"[내반대템플릿]"}
          />
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#696969",
              color: "white",
              marginRight: "3px",
            }}
            text={"[연승템플릿]"}
          />
          <CustomButton
            customStyle={{ width: "120px", height: "22px", backgroundColor: "#696969", color: "white" }}
            text={"[연패템플릿]"}
          />
        </div>
        <div className={styles.saveBtnWrapper} style={{ marginTop: "10px" }}>
          <button
            style={{
              width: "150px",
              height: "30px",
              backgroundColor: "#808080",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            onClick={() => router.back()}
          >
            목록으로
          </button>

          <button
            style={{ width: "150px", height: "30px", backgroundColor: "#0000FF", color: "white", borderRadius: "5px" }}
            onClick={() => sendToServer(boardInfo.type)}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
