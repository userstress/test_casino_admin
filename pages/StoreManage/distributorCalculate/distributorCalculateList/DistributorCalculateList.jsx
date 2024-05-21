import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./DistributorCalculateList.module.css"
import { useGridApiRef } from "@mui/x-data-grid"
import { useRouter } from "next/router"
import Link from "next/link"
export default function DistributorCalculateList() {
  const headStylesP = { margin: "0", padding: "0", lineHeight: "100%", letterSpacing: "-1px" }
  const headStylesDiv = { display: "flex", flexDirection: "column", letterSpacing: "0px" }

  const columns = [
    { field: "id", headerName: "총판", maxWidth: 40, minWidth: 40, headerAlign: "center", align: "center" },
    {
      field: "no",
      headerName: "입금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "pwd",
      headerName: "출금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "writer",
      headerName: "입출차액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "fee",
      headerName: "배팅액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "hdFee",
      headerName: "적중액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "bdFee",
      headerName: "낙첨액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "storeNum",
      headerName: "배팅차액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "normal",
      headerName: "홀덤입금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤</p>
            <p style={headStylesP}>입금액</p>
          </div>
        )
      },
    },
    {
      field: "evil",
      headerName: "홀덤출금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤</p>
            <p style={headStylesP}>출금액</p>
          </div>
        )
      },
    },
    {
      field: "bad",
      headerName: "홀덤입출차액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤</p>
            <p style={headStylesP}>입출차액</p>
          </div>
        )
      },
    },
    {
      field: "danpole",
      headerName: "홀덤배팅금",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤</p>
            <p style={headStylesP}>배팅금</p>
          </div>
        )
      },
    },
    {
      field: "dividend",
      headerName: "홀덤당첨금",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤</p>
            <p style={headStylesP}>당첨금</p>
          </div>
        )
      },
    },
    {
      field: "howon",
      headerName: "토너먼트입금",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>입금</p>
          </div>
        )
      },
    },
    {
      field: "stop",
      headerName: "토너먼트출금",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>출금</p>
          </div>
        )
      },
    },
    {
      field: "expired",
      headerName: "토너먼트입출차액",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>입출차액</p>
          </div>
        )
      },
    },
    {
      field: "expired1",
      headerName: "토너먼트상금",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>상금</p>
          </div>
        )
      },
    },
    {
      field: "expired2",
      headerName: "토너먼트참가비",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>참가비</p>
          </div>
        )
      },
    },
    {
      field: "expired3",
      headerName: "바둑이입금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이</p>
            <p style={headStylesP}>입금액</p>
          </div>
        )
      },
    },
    {
      field: "highPrice",
      headerName: "바둑이출금액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이</p>
            <p style={headStylesP}>출금액</p>
          </div>
        )
      },
    },
    {
      field: "allMember",
      headerName: "바둑이입출차액",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이</p>
            <p style={headStylesP}>입출차액</p>
          </div>
        )
      },
    },
    {
      field: "state1",
      headerName: "바둑이배팅금",
      maxWidth: 60,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>토너먼트</p>
            <p style={headStylesP}>참가비</p>
          </div>
        )
      },
    },
    {
      field: "state2",
      headerName: "바둑이당첨금",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이</p>
            <p style={headStylesP}>당첨금</p>
          </div>
        )
      },
    },
    {
      field: "state3",
      headerName: "입출-홀바입출",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>입출</p>
            <p style={headStylesP}>홀바입출</p>
          </div>
        )
      },
    },
    {
      field: "state4",
      headerName: "총판수수료율",
      maxWidth: 40,
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>총판</p>
            <p style={headStylesP}>수수료율</p>
          </div>
        )
      },
    },
    {
      field: "state5",
      headerName: "홀덤커미션3%",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤커미션</p>
            <p style={headStylesP}>커미션3%</p>
          </div>
        )
      },
    },
    {
      field: "state6",
      headerName: "홀덤총판별수수료",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>홀덤총판별</p>
            <p style={headStylesP}>수수료</p>
          </div>
        )
      },
    },
    {
      field: "state7",
      headerName: "바둑이커미션3%",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이</p>
            <p style={headStylesP}>커미션3%</p>
          </div>
        )
      },
    },
    {
      field: "state8",
      headerName: "바둑이총판별수수료",
      maxWidth: 50,
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>바둑이총판별</p>
            <p style={headStylesP}>수수료</p>
          </div>
        )
      },
    },
    {
      field: "state9",
      headerName: "최종정산금",
      maxWidth: 70,
      minWidth: 70,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderHeader: (params) => {
        return (
          <div style={headStylesDiv}>
            <p style={headStylesP}>최종</p>
            <p style={headStylesP}>정산금</p>
          </div>
        )
      },
    },
  ]
  const rows = [
    {
      id: 1,
      no: 999999999,
      pwd: -100000,
      writer: 2000,
      fee: 15,
      hdFee: 10,
      bdFee: 10,
      storeNum: 1,
      normal: 2,
      evil: 3,
      bad: 3,
      danpole: 3,
      dividend: 3,
      howon: 3,
      stop: 3,
      expired: 3,
      expired1: 1000000,
      expired2: 1000000,
      expired3: 10000000,
      highPrice: 10000000,
      allMember: 10000000,
      state1: 10000000,
      state2: 10000000,
      state3: 10000000,
      state4: 10,
      state5: 10000000,
      state6: 10000000,
      state7: 10000000,
      state8: 10000000,
      state9: 10000000,
    },
    {
      id: 2,
      no: 999999999,
      pwd: 123,
      writer: 2000,
      fee: -15,
      hdFee: 10,
      bdFee: 10,
      storeNum: 1,
      normal: 2,
      evil: 3,
      bad: 3,
      danpole: 3,
      dividend: 3,
      howon: 3,
      stop: 3,
      expired: 3,
      expired1: 1000000,
      expired2: 1000000,
      expired3: 10000000,
      highPrice: 10000000,
      allMember: 10000000,
      state1: 10000000,
      state2: 10000000,
      state3: 10000000,
      state4: 10,
      state5: 10000000,
      state6: 10000000,
      state7: 10000000,
      state8: 10000000,
      state9: 1000000000,
    },
  ]
  const apiRef = useGridApiRef()
  const updatedAggres = columns.slice(1).reduce((acc, column) => {
    if (column.field) {
      acc[column.field] = "sum"
    }
    return acc
  }, {})
  console.log(updatedAggres)
  const router = useRouter()
  function startFn() {
    console.log("/DistributeManage/signIn")
    router.push("/DistributeManage/signIn")
  }
  return (
    <>
      <CustomHeader text={"총판별 정산"} customStyle={{ height: "38px", width: "100%" }} />
      <div className={styles.tableContainer}>
        <CustomTable
          aggregations={updatedAggres}
          aggregationFonts={"8px"}
          fontsizesCell={"8px"}
          columns={columns}
          rows={rows}
          checkbox={false}
        />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <button
              style={{ width: "70px", backgroundColor: "#3B4281", color: "white", fontSize: "0.6vw" }}
              onClick={startFn}
              className={styles.btns}
            >
              총판등록
            </button>
          </div>
          <div className={styles.footerSecondRowInput}>
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정상"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정지"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴1"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴2"}
            />
            <CustomButton
              customStyle={{ width: "70px", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴3"}
            />
          </div>
        </div>
      </div>
    </>
  )
}
