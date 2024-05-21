import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import styles from "./index.module.css"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import { getCookie } from "cookies-next"

export default function index() {
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
    boardType: "",
    isExporse: true,
    isComment: true,
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
  const [boardInfo, setboardInfo] = useState({ type: "" }) // `isEvent`의 초기 상태

  useEffect(() => {}, [router.isReady, editorRef])

  useEffect(() => {
    if (router.isReady) {
      if (router.asPath.includes("new")) {
        return null
      } else {
        console.log(router.query.id)
        // request api
      }
    }
  }, [router.isReady])
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

  const sendToserver = async () => {
    const paper = {
      title: titleRef.current.value,
      content: sanitizeQuillContent(editorRef.current.value),
      writer: writerRef.current.value,
    }
    console.log(123213123123123) // 초기 로그 출력
    const too = getCookie("token")
    const headers = { Authorization: too }

    // try {
    //   // 각 상태에 대한 요청을 병렬적으로 실행
    //   const promises = statusOptions.map((status1) =>
    //     axios.get(`https://dailymodelapp.com/api/v2/managers/accounts?page=1&size=999&status=${status1}`, { headers }),
    //   )

    //   // Promise.all을 사용하여 모든 요청이 완료될 때까지 기다림
    //   const responses = await Promise.all(promises)

    //   // 모든 응답에서 데이터 추출 및 병합
    //   const allData = responses.reduce((acc, response) => acc.concat(response.data.data), [])
    //   console.log(allData)
    //   setRow(allData)

    //   return allData
    // } catch (error) {
    //   console.error("Error fetching data:", error)
    // }
  }

  const [overLevel, overLevelSet] = useState(1)

  const stylebtns = {
    width: "150px",
    height: "30px",
    fontSize: "13px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
            <th className={styles.title}>팝업</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>노출 유무</td>
            <td>
              <select
                style={{ width: "30%", display: "flex" }}
                onChange={(event) => setStat({ ...boardStat, isExporse: event.target.value })}
              >
                <option value="expose">노출</option>
                <option value="unexpose">비노출</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>팝업순위</td>
            <td>
              <input type="number" onChange={(event) => overLevelSet(event.target.value)} />
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
              <div
                wrapperStyle={{ height: "200px", backgroundColor: "#181D4B" }}
                editorStyle={{ height: "158px", border: "1px solid white" }}
                toolbarStyle={{ marginBottom: "0px", backgroundColor: "#181D4B", color: "black" }}
              >
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
            </td>
          </tr>
          <tr>
            <td>타이틀 이미지</td>
            <td colSpan={3}>
              <input type="text" placeholder="2689978902.jpg" value={"2689978902.jpg"} readOnly />
            </td>
          </tr>

          {/* <tr>
            <td>이벤트 시작일</td>
            <td>
              <DatePickerComponent
                getDate={handleStartDateChange}
                customStyle={{ width: "100%", justifyContent: "flex-start" }}
                isMinit={true}
              />
            </td>
            <td>이벤트 종료일</td>
            <td>
              <DatePickerComponent
                getDate={handleEndDateChange}
                customStyle={{ width: "100%", justifyContent: "flex-start" }}
                isMinit={true}
              />{" "}
            </td>
          </tr> */}
        </tbody>
      </table>
      <div className={styles.btnBoxflow}>
        <button style={stylebtns}>등록</button>
        <button style={stylebtns}>수정</button>
        <button style={stylebtns}>삭제</button>
        <button style={stylebtns} onClick={() => router.push("/customer/popup")}>
          목록으로
        </button>
      </div>
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
    </div>
  )
}
// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
