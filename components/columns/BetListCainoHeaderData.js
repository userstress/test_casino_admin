import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import { ktimeTrans2 } from "@utils/ktimetrans"
import { useAuthStore } from "@utils/useAuthStore"

export const columns = [
  { field: "id", headerName: "번호", flex: 1, headerAlign: "center", align: "center" },
  { field: "userName", headerName: "아이디", flex: 1.9, headerAlign: "center", align: "center" },
  { field: "prdName", headerName: "게임사", flex: 3, headerAlign: "center", align: "center" },
  {
    field: "txnId",
    headerName: "Trans ID",
    flex: 1.9,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return <span style={{ color: "#0000FF", cursor: "pointer" }}>상세</span>
    },
  },
  {
    field: "created_at",
    headerName: "시간",
    flex: 1.6,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      // return params.formattedValue
      return ktimeTrans2(params.formattedValue)
    },
  },
  {
    field: "type",
    headerName: "구분",
    flex: 1.41,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <span style={params.row.creditAmount > 0 ? { color: "#FF0000" } : { color: "#0000FF" }}>
          {params.row.creditAmount > 0 ? "당첨" : "미당첨"}
        </span>
      )
    },
  },
  {
    field: "amount",
    headerName: "베팅금액",
    flex: 1.72,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return <span>{addCommasToNumber(params.row.amount)}</span>
    },
  },
  {
    field: "creditAmount",
    headerName: "당첨금액",
    flex: 1.72,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <span style={params.row.creditAmount > params.row.amount ? { color: "#FF0000" } : { color: "" }}>
          {params.row.creditAmount > 0 ? addCommasToNumber(params.row.creditAmount) : "-"}
        </span>
      )
    },
  },
  {
    field: "balance",
    headerName: "잔여",
    flex: 1.72,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return <span>{addCommasToNumber(params.row.balance)}</span>
    },
  },
  {
    field: "rolling",
    headerName: "롤링지급",
    flex: 1.2,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const { user } = useAuthStore()

      const text = `[${params.row.txnId}] 베팅금액 : ${addCommasToNumber(params.row.amount)} `
      // \n[대본사] ${
      //   user.referrerBy
      // } 에게 ${params.row.amount * 0.034} 지급 \n총지급 롤링금 : ${params.row.amount * 0.034}원 (베팅금액의 3.40%)`
      return (
        <span style={{ color: "#000" }} onClick={() => alert(text)}>
          {"지급대기"}
        </span>
      )
    },
  },
]
