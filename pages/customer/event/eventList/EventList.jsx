import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./EventList.module.css"
import { useRouter } from "next/router"
import { boardStore } from "@utils/boardStore/boardStore"

export default function EventList() {
  const router = useRouter()
  const { boardMove } = boardStore()

  function moveToFixPage(params) {
    const pageInfoes = {
      id: params.row.id,
      type: "event",
      contents: params.row.content,
      commentAllowed: params.row.commentAllorwed,
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
      flex: 2,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return <div onClick={() => moveToFixPage(params)}>{params.formattedValue}</div>
      },
    },
    { field: "writer", headerName: "작성자", flex: 1, headerAlign: "center", align: "center" },
    { field: "date", headerName: "작성일", flex: 1, headerAlign: "center", align: "center" },
    { field: "view", headerName: "조회", flex: 1, headerAlign: "center", align: "center" },
    { field: "reply", headerName: "댓글", flex: 1, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 2,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 3,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 4,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 5,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 6,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 7,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 8,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 9,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 10,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 11,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 12,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 13,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 14,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 15,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 16,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 17,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 18,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 19,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 20,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
    {
      id: 1,
      site: "관리자",
      title: "[일반] (NEW) 드림 게이킹,CQ9 카지노 (업데이트)",
      writer: "(관리자)",
      date: "2023-09-25   11:59:24",
      view: 23,
      reply: 1,
      state: "노출",
    },
  ]
  async function moveToEditor() {
    await boardMove({ id: 0, type: "event" }) // Zustand를 사용하여 상태 업데이트
    router.push("/customer/BoardEditor") // 페이지 이동
  }
  return (
    <>
      <CustomHeader text={"이벤트"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer1}>
          <div style={{ width: "3.1vw" }}>사이트 : </div>
          <CustomSelect customStyle={{ width: "10.417vw" }} optionArr={["모든 게시물", "공지사항", "이벤트"]} />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"시작일자 :"}
          />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"종료일자 :"}
          />
        </div>
        <div className={styles.boxContainer3}>
          <CustomSelect customStyle={{ width: "36%" }} optionArr={["닉네임(작성자)", "제목", "사이트"]} />
          <CustomInput customStyle={{ width: "53%", backgroundColor: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "10%", backgroundColor: "#D9D9D9" }} text={"검색"} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "10vw" }}>사이트명 전체 &nbsp; : &nbsp; ALL</div>
          <CustomButton customStyle={{ width: "4.427vw", backgroundColor: "#D9D9D9" }} text={"엑셀저장"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}>
          <div className={styles.footerFirstRowInner}>
            <CustomInput customStyle={{ width: "66%", backgroundColor: "white" }} />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"게시판 사용 제재"}
            />
          </div>
        </div>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <button
              style={{
                width: "33%",
                backgroundColor: "#3B4281",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => moveToEditor()}
            >
              등록
            </button>
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"비노출"}
            />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"완전삭제"}
            />
          </div>
          <div className={styles.footerSecondRowInput}>
            <CustomInput customStyle={{ width: "66%", backgroundColor: "white" }} />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"게시판 사용 해재"}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
