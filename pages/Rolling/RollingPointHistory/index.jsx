import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import CustomTable from "@components/customTable/CustomTable"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import Layout from "@components/Layout"

export default function index() {
  const columns = [
    { field: "id", headerName: "No.", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "userid",
      headerName: "유저아이디",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "nickname", headerName: "닉네임", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "rollingPoint", headerName: "롤링 포인트금", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "content", headerName: "내용", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "rollingResult", headerName: "잔여 롤링 포인트", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "date", headerName: "충전/사용날짜", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "about", headerName: "더보기", flex: 0.8, headerAlign: "center", align: "center" },
  ]

  const rows = []
  return (
    <div>
      <CustomHeader
        text={
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div>전체 충환전 목록 (전체:1515)</div>
            <div>받은 롤링 포인트 : 0원&nbsp; 전환 롤링 포인트 : 0원</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"시작일자 :"}
        />
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"종료일자 :"}
        />
      </CustomBar>
      <CustomTable columns={columns} rows={rows} />
    </div>
  )
}
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
