import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import styles from "./index.module.css"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import CustomButton from "@components/customButton/CustomButton"
import { getCookie } from "cookies-next"
import Link from "next/link"
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

      saveToServer(file)

      // file type is only image.
      // if (/^image\//.test(file.type)) {
      //   saveToServer(file)
      // } else {
      //   console.warn("You could only upload images.")
      // }
    }
  })

  useEffect(() => {}, [router.isReady, editorRef])
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

  const titleRef = useRef(null)
  const writerRef = useRef(null)
  const [boardStat, setStat] = useState({
    boardType: "",
    isExporse: true,
    isComment: true,
  })
  const sendToserver = async () => {
    const paper = {
      title: titleRef.current.value,
      content: editorRef.current.value,
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
            <th className={styles.title}>이벤트</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>게시타입</td>
            <td>
              <select
                style={{ width: "40%" }}
                onChange={(event) => setStat({ ...boardStat, boardType: event.target.value })}
              >
                <option value="notice">공지사항</option>
                <option value="board">게시판</option>
                <option value="event">이벤트</option>
              </select>
              <select
                style={{ width: "30%" }}
                onChange={(event) => setStat({ ...boardStat, isExporse: event.target.value })}
              >
                <option value="expose">노출</option>
                <option value="unexpose">비노출</option>
              </select>
              <select
                style={{ width: "30%" }}
                defaultValue="deCommenting"
                onChange={(event) => setStat({ ...boardStat, isComment: event.target.value })}
              >
                <option value="Commenting">댓글허용</option>
                <option value="deCommenting">댓글미허용</option>
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
            <td>글내용</td>
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
          <tr>
            <td>이벤트 시작일</td>
            <td>
              <input type="text" placeholder="2023-10-01 12:32:24" value={"2023-10-01 12:32:24"} readOnly />
            </td>
            <td>이벤트 종료일</td>
            <td>
              <input type="text" placeholder="2023-10-01 23:59:59" value={"2023-10-01 23:59:59"} readOnly />
            </td>
          </tr>
          <tr>
            <td>등록일자</td>
            <td>
              <input type="text" placeholder="2023-10-01 12:32:24" value={"2023-10-01 12:32:24"} readOnly />
            </td>
            <td>조회</td>
            <td>
              <input type="text" placeholder="24" value={24} readOnly />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.btnWrapper}>
        <CustomButton
          customStyle={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
          }}
          text={"수정하기"}
        />
        <CustomButton
          customStyle={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
          }}
          text={"삭제하기"}
        />
        <CustomButton
          customStyle={{ width: "120px", height: "22px", backgroundColor: "#696969", color: "white" }}
          text={"목록으로"}
        />
      </div>

      <table className={styles.customerServiceDetailTable}>
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
      </table>
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
        <div className={styles.saveBtnWrapper}>
          <button
            style={{ width: "150px", height: "30px", backgroundColor: "#0000FF", color: "white", borderRadius: "5px" }}
            onClick={() => sendToserver()}
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
