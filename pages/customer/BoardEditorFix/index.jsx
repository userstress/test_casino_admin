import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import styles from "./index.module.css"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import DOMPurify from "dompurify"
import CustomButton from "@components/customButton/CustomButton"
import { getCookie } from "cookies-next"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { datePickerTransMin } from "@utils/REST/LIST/datePickerTrans"
import { boardStore } from "@utils/boardStore/boardStore"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"
import { ktimeTrans2 } from "@utils/ktimetrans"
import axios from "axios"
import { useAuthStore } from "@utils/useAuthStore"

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
  const { sendRequest } = useAxiosRequest()

  const Quill = ReactQuill
  const { boardType, boardMove } = boardStore()

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
  const { user } = useAuthStore()
  const titleRef = useRef(null)
  const writerRef = useRef(null)
  const [boardStat, setStat] = useState({
    boardType: boardType.type,
    isExporse: true,
    readCount: boardType.readCount,
    commentAllowed: boardType.commentAllowed,
    viewStatus: boardType.viewStatus,
  })
  const [commentArray, setComment] = useState([])
  const comInputRef = useRef(null)
  const [articleInfo, setArticle] = useState({})

  function getList(ids) {
    const method = "GET"
    const url = `/api/v2/users/articles/${ids}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setArticle(responseData.data.data)
      }
    })
  }
  console.log(articleInfo)
  useEffect(() => {
    if (boardType.id !== 0) {
      getList(boardType.id)
    }
    setStat((prevState) => ({
      ...prevState,
      boardType: boardType.type, // 전역 상태의 최신값으로 boardType 업데이트
      readCount: boardType.readCount,
      commentAllowed: boardType.commentAllowed,
      viewStatus: boardType.viewStatus,
    }))
  }, [boardType.type, boardType.id])
  useEffect(() => {
    commentsRequest(boardType)
  }, [boardType])
  useEffect(() => {}, [commentArray, boardType.title])

  const sendToserver = async (event) => {
    const paper = {
      title: titleRef.current.value,
      content: editorRef.current.value,
      writer: writerRef.current.value,
      isTop: boardStat.boardType === "notice" ? true : false,
      readCount: Number(boardStat.readCount),
      commentAllowed: boardStat.commentAllowed === "true" ? true : false,
      viewStatus: boardStat.viewStatus,
    }
    const tokens = getCookie("token")
    const headers = {
      Authorization: tokens,
    }
    const borards = boardStat.boardType === "notice" || boardStat.boardType === "board" ? "1" : "3"

    try {
      // 여기서 paper를 데이터로 전달하고, 세 번째 인자로 headers를 포함한 설정 객체를 전달합니다.
      const response = await axios.patch(
        `https://dailymodelapp.com/api/v2/users/category/${borards}/${boardType.id}`,
        paper,
        { headers: headers },
      )

      toast.success("수정에 성공했습니다")

      // 성공 메시지를 출력하거나 다음 단계로 진행하는 코드를 여기에 추가하세요.
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.warn("전송에 실패하였습니다")
    }
  }

  const allowComment = async (values) => {
    const tokens = getCookie("token")
    const headers = {
      Authorization: tokens,
    }
    try {
      // 여기서 paper를 데이터로 전달하고, 세 번째 인자로 headers를 포함한 설정 객체를 전달합니다.
      const response = await axios.patch(
        `https://dailymodelapp.com/api/v2/managers/${boardType.id}/comment-allowed?commentAllowed=${values}`,
        null,
        { headers: headers },
      )

      const returnval = Boolean(values)
      if (!returnval || values === "false") {
        return toast.success("댓글을 미허용했습니다")
      }
      if (returnval) {
        return toast.success("댓글을 허용했습니다")
      }

      // 성공 메시지를 출력하거나 다음 단계로 진행하는 코드를 여기에 추가하세요.
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.warn("전송에 실패하였습니다")
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

  function commentsRequest(boardType) {
    const method = "GET"
    const url = `/api/v2/users/${boardType?.type === "event" ? "3" : boardType?.type === "service" ? "11" : "1"}/${
      boardType.id
    }/comments`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setComment(responseData.data.data)
      }
    })
  }

  const handleContentChange = (id, newContent) => {
    const updatedComments = commentArray.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: newContent }
      }
      return comment
    })
    setComment(updatedComments)
  }

  function sendingComment() {
    const method = "POST"
    const url = `/api/v2/users/${boardType.type === "event" ? "3" : boardType.type === "service" ? "11" : "1"}/${
      boardType.id
    }/comment`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    const body = {
      userId: user.userId,
      content: comInputRef.current.value,
    }
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("댓글을 작성했습니다", { onClose: () => commentsRequest(boardType) })
        if (comInputRef.current) {
          comInputRef.current.value = "" // input 내용을 빈 문자열로 설정
        }
      }
    })
  }

  function deletes() {
    const method = "DELETE"
    const url = `/api/v2/users/category/${
      boardType.type === "event" ? "3" : boardType.type === "service" ? "11" : "1"
    }/${boardType.id}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("삭제하였습니다", { onClose: () => router.back() })
      }
    })
  }

  function deleteComments(comment) {
    const method = "DELETE"
    const url = `/api/v2/users/${boardType.type === "board" ? "1" : "11"}/${boardType.id}/${comment.id}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("삭제하였습니다", { onClose: () => commentsRequest(boardType) })
      }
    })
  }
  function handleCome(event) {
    setStat({ ...boardStat, commentAllowed: event.target.value })
    allowComment(event.target.value)
  }

  function getBoardTypeName(boardType) {
    switch (boardType.type) {
      case 3:
        return "이벤트"
      case "notice":
        return "공지사항"
      case "board":
        return "게시판"
      default:
        return "알 수 없음"
    }
  }

  const typeDescriptions = {
    notice: "공지사항",
    board: "게시판",
    event: "이벤트",
    service: "서비스",
  }

  const displayValue = typeDescriptions[boardType.type] || "게시판"

  useEffect(() => {}, [articleInfo])
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
            <th className={styles.title}>{getBoardTypeName(boardType)}</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>게시타입</td>
            <td>
              <input
                style={{ width: "40%", border: "none", outline: "none" }}
                type="text"
                value={displayValue}
                readOnly // 입력 필드를 읽기 전용으로 설정
              />
              <select
                style={{ width: "30%" }}
                onChange={(event) => setStat({ ...boardStat, viewStatus: event.target.value })}
                defaultValue={boardStat.viewStatus}
                value={boardStat.viewStatus}
              >
                <option value="노출">노출</option>
                <option value="비노출">비노출</option>
              </select>
              <select
                style={{ width: "30%" }}
                defaultValue={boardStat.commentAllowed}
                value={boardStat.commentAllowed}
                onChange={(event) => handleCome(event)}
              >
                <option value={true}>댓글허용</option>
                <option value={false}>댓글미허용</option>
              </select>
            </td>
            <td>작성자(닉네임)</td>
            <td>
              <input
                type="text"
                placeholder="관리자"
                value={`${articleInfo?.writer?.nickname || ""} (${articleInfo?.writer?.username || ""})`}
                ref={writerRef}
              />
            </td>
          </tr>
          <tr>
            <td>글제목</td>
            <td colSpan={3}>
              <input type="text" placeholder="글제목" ref={titleRef} defaultValue={boardType.title} />
            </td>
          </tr>
          <tr style={{ height: "200px" }}>
            <td>글내용</td>
            <td colSpan={3}>
              <div
                wrapperstyle={{ height: "200px", backgroundColor: "#181D4B" }}
                editorstyle={{ height: "158px", border: "1px solid white" }}
                toolbarstyle={{ marginBottom: "0px", backgroundColor: "#181D4B", color: "black" }}
              >
                {typeof window !== "undefined" || typeof window !== "null" ? (
                  <Quill
                    className={styles.editors}
                    modules={editorModule}
                    resize
                    forwardedRef={editorRef}
                    theme="snow"
                    defaultValue={boardType.contents || ""}
                    readOnly={boardType.type === "service" ? true : false}
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
          {(boardType.type === "event" || boardStat.boardType === "event") && (
            <tr>
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
                />
              </td>
            </tr>
          )}
          <tr>
            <td>등록일자</td>
            <td>
              <input type="text" placeholder="2023-10-01 12:32:24" value={"2023-10-01 12:32:24"} readOnly />
            </td>
            <td>조회</td>
            <td>
              <input
                type="text"
                defaultValue={boardType.readCount}
                onChange={(event) => setStat({ ...boardStat, readCount: event.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.btnWrapper}>
        {boardType.type !== "service" ? (
          <button
            style={{
              width: "120px",
              height: "22px",
              backgroundColor: "#5386B5",
              color: "WHITE",
              marginRight: "3px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={(event) => {
              sendToserver(event)
            }}
            className={styles.buttonHover}
          >
            게시글 수정하기
          </button>
        ) : null}
        <button
          style={{
            width: "120px",
            height: "22px",
            backgroundColor: "#5386B5",
            color: "white",
            marginRight: "3px",
            borderRadius: "5px",
            border: "none",
          }}
          onClick={() => deletes()}
          className={styles.buttonHover}
        >
          삭제하기
        </button>
        <button
          style={{
            border: "none",
            borderRadius: "5px",
            width: "120px",
            height: "22px",
            backgroundColor: "#5386B5",
            color: "white",
          }}
          onClick={() => router.back()}
          className={styles.buttonHover}
        >
          목록으로
        </button>
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
      </table>

      {commentArray.length > 0 ? (
        commentArray.map((comment, _index) => (
          <article className={styles.commentsListof}>
            <section key={`${comment.id} ${_index}`} className={styles.commentParts}>
              <div className={styles.commentInfo}>
                <div className={styles.writers}>댓글작성자</div>
                <div className={styles.writersContents}>
                  <input type="text" defaultValue={comment.writer.username} disabled />
                </div>
                <div className={styles.writers}>댓글작성일</div>
                <div className={styles.writersContents}>
                  <input type="text" defaultValue={ktimeTrans2(comment?.createdAt)} readOnly />
                </div>
              </div>
              <div className={styles.commentInfo2}>
                <div className={styles.writers}>댓글내용</div>
                <div className={styles.writersContents}>
                  <input
                    type="text"
                    defaultValue={comment.content}
                    onChange={(e) => handleContentChange(comment.id, e.target.value)}
                  />
                </div>
              </div>
            </section>
            <div key={`${comment.id} ${_index}+400`} className={styles.buttonParts}>
              {boardType.type !== "service" ? (
                <button
                  style={{
                    width: "120px",
                    height: "22px",
                    backgroundColor: "#5386B5",
                    color: "WHITE",
                    marginRight: "3px",
                    borderRadius: "5px",
                    border: "none",
                  }}
                >
                  댓글 수정하기
                </button>
              ) : null}
              <button
                style={{
                  border: "none",
                  borderRadius: "5px",
                  width: "120px",
                  height: "22px",
                  backgroundColor: "#5386B5",
                  color: "white",
                }}
                onClick={() => deleteComments(comment)}
              >
                삭제하기
              </button>
            </div>
          </article>
        ))
      ) : (
        <article>
          <div>
            <span>댓글이 없습니다.</span>
          </div>
        </article>
      )}
      {boardType && boardType.type !== "notice" ? (
        <div className={styles.commentInput}>
          <div>
            <label htmlFor="inputCom">댓글 입력</label>
            <input id="inputCom" placeholder="댓글을 입력해주세요" style={{ marginLeft: "5px" }} ref={comInputRef} />
          </div>

          <div>
            <button type="button" onClick={() => sendingComment()}>
              댓글 작성
            </button>
          </div>
        </div>
      ) : (
        <span style={{ opacity: "0.7" }}>공지사항은 댓글을 작성 할수없습니다</span>
      )}
      {/* <div className={styles.bottomBtnWrapper}>
        <div className={styles.templateBtnWrapper}>
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#5386B5",
              color: "white",
              marginRight: "3px",
              fontSize: "13px",
            }}
            text={"[내반대템플릿]"}
          />
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#5386B5",
              color: "white",
              marginRight: "3px",
              fontSize: "13px",
            }}
            text={"[연승템플릿]"}
          />
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#5386B5",
              color: "white",
              fontSize: "13px",
            }}
            text={"[연패템플릿]"}
          />
        </div>
      </div> */}
    </div>
  )
}
// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
