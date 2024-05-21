import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"
import ComplexList from "@components/cumstomDetailList/ComplexList"
import ListTable from "@components/cumstomDetailList/component/ListTable"
import DetailList from "@components/cumstomDetailList/DetailList"

export default function index() {
  function lookingLog(event, params) {
    event.preventDefault()
    event.stopPropagation()
    window.open(`/userGameDetail/${params.row.id}`, "내역", "width=1024, height=860")

    console.log(params)
  }
  const columns = [
    { field: "betType", headerName: "타입", flex: 1, headerAlign: "center", align: "center" },
    { field: "startDate", headerName: "시간", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "sportsName", headerName: "종목", flex: 1, headerAlign: "center", align: "center" },
    { field: "leagueName", headerName: "리그", flex: 1, headerAlign: "center", align: "center" },
    { field: "homeName", headerName: "홈/언더", flex: 1, headerAlign: "center", align: "center" },
    { field: "drawline", headerName: "vs", flex: 1, headerAlign: "center", align: "center" },
    { field: "awayName", headerName: "어웨이/언더", flex: 1, headerAlign: "center", align: "center" },
    { field: "score", headerName: "스코어", flex: 1, headerAlign: "center", align: "center" },
    { field: "marketName", headerName: "결과", flex: 1, headerAlign: "center", align: "center" },
    { field: "line", headerName: "당첨금", flex: 1, headerAlign: "center", align: "center" },
    { field: "betResult", headerName: "처리일자", flex: 1, headerAlign: "center", align: "center" },
    { field: "winPrice", headerName: "처리자", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "logs",
      headerName: "내역",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            style={{
              width: "90%",
              backgroundColor: "#696969",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              height: "80%",
              border: "none",
            }}
            onClick={(event) => lookingLog(event, params)}
          >
            내역
          </button>
        )
      },
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = [{ matchId: 0 }]

  function moveToDetailLog() {
    window.open("/matchInvolvedUser/2", "내역", "width=1024, height=860")
  }

  return (
    <>
      <CustomHeader text={<div>정산 관리</div>} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", width: "14vw", justifyContent: "space-around" }}
            textStyle={{ textAlign: "center" }}
            text={"시작일자 :"}
          />
        </div>
        <section className={styles.boxContainer2}>
          <button type="button" className={styles.selBtn}>
            시간순
          </button>
          <button type="button" className={styles.selBtn}>
            베팅금순
          </button>
          <button type="button" className={styles.selBtn}>
            당첨순
          </button>
        </section>
      </CustomBar>
      <>
        <div style={{ float: "right" }}>총 베팅금 : 0원/ 당첨금 : 0원/ 낙첨 포인트 : 0원</div>
        <div className={styles.tableContainer}>
          <CustomTable columns={filteredColumns} rows={rows} checkbox={false} defaultIds="matchId" />
          <div style={{ widh: "100%", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              style={{ color: "white", backgroundColor: "#3342C9", width: "8vw", height: "28px" }}
              onClick={() => moveToDetailLog()}
            >
              상세 내역 보기
            </button>
          </div>
          {/* <ComplexList rowArray={[{ id: 0 }]} /> */}
        </div>
      </>
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
