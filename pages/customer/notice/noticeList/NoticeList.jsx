// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./NoticeList.module.css"
import { useRouter } from "next/router"
import { boardStore } from "@utils/boardStore/boardStore"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { ktimeTrans2 } from "@utils/ktimetrans"
import { toast } from "react-toastify"

export default function NoticeList() {
  const router = useRouter()
  const { setIsNotice, boardMove } = boardStore()
  const { sendRequest } = useAxiosRequest()
  const [setParams1, setParams] = useState()

  const [data, setData] = useState()
  const mytoken = getCookie("token")

  function noticeRequest() {
    const method = "GET"
    const url = `/api/v2/top-articles`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }

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
        setData(responseData.data)
      }
    })
  }

  function moveToFixPage(params) {
    const pageInfoes = {
      id: params.row.id,
      type: "notice",
      contents: params.row.content,
      title: params.row.title,
      isTop: true,
      readCount: params.row.readCount,
      commentAllowed: params.row.commentAllowed,
    }
    boardMove(pageInfoes)
    router.push("/customer/BoardEditorFix")
  }

  const columns = [
    { field: "id", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "title",
      headerName: "제목",
      flex: 5,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div className={styles.boardTitle} onClick={() => moveToFixPage(params)}>
            {params.formattedValue}
          </div>
        )
      },
    },
    {
      field: "writer",
      headerName: "작성자",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>{`${params?.row?.writer?.username}(${
            params?.row?.writer?.role === "ROLE_ADMIN" ? "운영자" : "유저"
          })`}</div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "작성일",
      flex: 2.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans2(params.formattedValue)
      },
    },
    { field: "readCount", headerName: "조회수", flex: 1, headerAlign: "center", align: "center" },
    { field: "commentCount", headerName: "댓글", flex: 1, headerAlign: "center", align: "center" },
    { field: "viewStatus", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
  ]

  async function moveToEditor() {
    await boardMove({ id: 0, type: "notice", isTop: true })
    router.push("/customer/BoardEditor") // 페이지 이동
  }

  useEffect(() => {
    noticeRequest()
  }, [])

  function changeViewStat() {
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    foundObjects.forEach((obj) => {
      // 각 객체에 대해 개별적으로 URL 설정
      const url = `/api/v2/managers/${obj.id}/change/view-status?viewStatus=${
        obj.viewStatus === "비노출" ? "노출" : "비노출"
      }`
      const method = "PATCH"
      const headers = { "Content-Type": "application/json", Authorization: mytoken }

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
          toast.success("변경했습니다", { onClose: () => noticeRequest() })
        }
      })
    })
  }
  function deleteAll() {
    const foundObjects = data.filter((object) => setParams1.includes(object.id))

    foundObjects.forEach((obj) => {
      // 각 객체에 대해 개별적으로 URL 설정
      const url = `/api/v2/users/category/1/${obj.id}`
      const method = "DELETE"
      const headers = { "Content-Type": "application/json", Authorization: mytoken }

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
          toast.success("삭제했습니다", { onClose: () => noticeRequest() })
        }
      })
    })
  }

  return (
    <>
      <CustomHeader text={"공지사항"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer1}>
          <div style={{ width: "3.1vw" }}>사이트: </div>
          <CustomSelect customStyle={{ width: "10.417vw" }} optionArr={["모든 게시물", "공지사항", "이벤트"]} />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"시작일자:"}
          />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"종료일자:"}
          />
        </div>
        <div className={styles.boxContainer3}>
          <CustomSelect customStyle={{ width: "36%" }} optionArr={["닉네임(작성자)", "제목", "사이트"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "10%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "10vw" }}>사이트명 전체 &nbsp; : &nbsp; ALL</div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          fontsizesCell="12px"
          rows={data ? data : []}
          handleSelectionChange={(params) => setParams(params)}
        />
      </div>
      <div className={styles.footerContainer}>
        {/* <div className={styles.footerFirstRowContainer}>
          <div className={styles.footerFirstRowInner}>
            <CustomInput customStyle={{ width: "66%", backgroundColor: "white" }} />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"게시판 사용 제재"}
            />
          </div>
        </div> */}
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <button
              style={{ width: "33%", backgroundColor: "#3B4281", color: "white", border: "none", borderRadius: "4px" }}
              onClick={() => moveToEditor()}
            >
              등록
            </button>
            <button
              style={{
                width: "33%",
                fontSize: "0.6vw",
                backgroundColor: "#3B4281",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="한번에 한 글만 변경 가능"
              onClick={() => changeViewStat()}
            >
              노출/비노출
            </button>
            <button
              style={{ width: "33%", backgroundColor: "#ff0000", color: "white", border: "none", borderRadius: "4px" }}
              onClick={() => deleteAll()}
            >
              완전삭제
            </button>
          </div>
          {/* <div className={styles.footerSecondRowInput}>
            <CustomInput customStyle={{ width: "66%", backgroundColor: "white" }} />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"게시판 사용 해재"}
            />
          </div> */}
        </div>
        <div></div>
      </div>
    </>
  )
}
