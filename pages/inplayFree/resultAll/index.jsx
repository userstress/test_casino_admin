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
    { field: "startDate", headerName: "시간", flex: 1, headerAlign: "center", align: "center" },
    { field: "sportName", headerName: "종목", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "leagueName", headerName: "리그", flex: 1, headerAlign: "center", align: "center" },
    { field: "homeName", headerName: "홈/오버", flex: 1, headerAlign: "center", align: "center" },
    { field: "drawline", headerName: "vs", flex: 1, headerAlign: "center", align: "center" },
    { field: "awayName", headerName: "어웨이/언더", flex: 1, headerAlign: "center", align: "center" },
    { field: "score", headerName: "스코어", flex: 1, headerAlign: "center", align: "center" },
    { field: "marketName", headerName: "마켓명", flex: 1, headerAlign: "center", align: "center" },
    { field: "line", headerName: "기준점", flex: 1, headerAlign: "center", align: "center" },
    { field: "betResult", headerName: "결과", flex: 1, headerAlign: "center", align: "center" },
    { field: "winPrice", headerName: "당첨금", flex: 1, headerAlign: "center", align: "center" },
    { field: "processedAt", headerName: "처리일자", flex: 1, headerAlign: "center", align: "center" },
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

  // const callResults = (data) => {
  //   console.log("data", data)
  //   axios
  //     .post("/api/proxy/getResults", data)
  //     .then(async (res) => {
  //       console.log("res", res.data.data)
  //     })
  //     .catch((error) => {
  //       console.error("Error while making the request:", error)
  //     })
  // }

  function moveToDetailLog() {
    window.open("/matchInvolvedUser/2", "내역", "width=1024, height=860")
  }

  return (
    <>
      <CustomHeader
        text={
          <div>
            게임관리&nbsp;{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>{" "}
            &nbsp;베팅 리스트
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", width: "14vw", justifyContent: "space-around" }}
            textStyle={{ textAlign: "center" }}
            text={"시작일자 :"}
          />
        </div>
      </CustomBar>
      <>
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
