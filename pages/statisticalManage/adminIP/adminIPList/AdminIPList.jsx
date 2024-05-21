import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./AdminIPList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { ktimeTrans2 } from "@utils/ktimetrans"

export default function AdminIPList() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [rows, setRows] = useState()
  const [currentFix, setFix] = useState("")
  const [isFix, setIsFix] = useState(false)

  const handleClick = (event, params) => {
    event.preventDefault()
    const method = "DELETE"
    const url = `/api/v2/admins/delete-approve-ip/${params.row.userId}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("삭제했습니다")
        takeList()
      }
    })
  }

  const submitChange = (id, updataIp) => {
    const method = "PATCH"
    const url = `/api/v2/admins/update-approve-ip/${id}?newApproveIp=${updataIp}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("변경되었습니다")
        takeList()
      }
    })
  }
  function fixHandler(event, params) {
    // isFix 상태가 true일 때, 즉 현재 수정 상태가 활성화되어 있을 때
    const id = params.row.id
    const useid = params.row.userId
    if (isFix) {
      // 현재 클릭된 id가 currentFix와 같다면, '전송' 로직 수행 후 수정 상태를 비활성화
      if (currentFix === String(id)) {
        // 전송 로직 호출 (여기서는 예시로만 표시)
        console.log("전송 로직 호출")
        console.log(params)
        submitChange(useid, params.row["접속가능 IP"])
        // 전송 후, 수정 가능 상태로 다시 설정
        setIsFix(false) // 수정 상태 비활성화
        setFix("")
      } else {
        setIsFix(false)
      }
    } else {
      // 수정 상태가 비활성화되어 있을 때, 현재 id로 수정 상태 활성화
      setFix(String(id))
      setIsFix(true) // 수정 상태 활성화
    }
  }

  const columns = [
    {
      field: "접속가능 IP",
      headerName: "IP",
      maxWidth: 500,
      flex: 0.8,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <input
            defaultValue={params.formattedValue}
            onChange={(event) => {
              // 새로운 값으로 rows 상태를 업데이트합니다.
              const updatedRows = rows.map((row) => {
                if (row.id === params.row.id) {
                  // 현재 행의 "접속가능 IP" 값을 업데이트합니다.
                  return { ...row, ["접속가능 IP"]: event.target.value }
                }
                return row
              })
              setRows(updatedRows)
            }}
            style={{ border: currentFix.includes(String(params.row.id)) ? "red solid 2px" : "black solid 1px" }}
            readOnly={currentFix.includes(String(params.row.id)) ? false : true}
          />
        )
      },
    },
    {
      field: "등록일",
      headerName: "등록일",
      maxWidth: 480,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans2(params.formattedValue)
      },
    },
    { field: "사용자", headerName: "사용자", maxWidth: 380, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "adminLoginAt", headerName: "사이트", maxWidth: 200, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "buttons",
      headerName: "등록",
      maxWidth: 140,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.buttonBox}>
            <button
              style={{
                backgroundColor: currentFix.includes(String(params.row.id)) ? "#0000FF" : "#228B22",
                width: "50px",
                height: "80%",
                margin: "0% 5px",
                color: "white",
                cursor: "pointer",
                height: "90%",
                lineHeight: "90%",
                border: "none",
                borderRadius: "4px",
              }}
              className="table-cells-muis-btns-common"
              onClick={(event) => fixHandler(event, params)}
            >
              {currentFix.includes(String(params.row.id)) ? "등록" : "수정"}
            </button>
            <button
              onClick={(event) => handleClick(event, params)}
              style={{
                backgroundColor: "#FF0000",
                width: "50px",
                height: "80%",

                margin: "0% 5px",
                color: "white",
                cursor: "pointer",
                height: "90%",
                lineHeight: "90%",
                border: "none",
                borderRadius: "4px",
              }}
              className="table-cells-muis-btns-common"
            >
              삭제
            </button>
          </div>
        )
      },
    },
  ]

  const takeList = () => {
    // event.preventDefault()
    const method = "GET"
    const url = `/api/v2/admins/approve-ips`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setRows(
          responseData.data.map((obj, index) => {
            return { ...obj, id: index }
          }),
        )
        // toast.success("삭제했습니다")
        // router.reload()
      }
    })
    return
  }

  useEffect(() => {
    takeList()
  }, [])
  useEffect(() => {}, [currentFix])
  // 리스트불러오기 작성해야함.

  const [inputs, setInputs] = useState({ username: "", ip: "" })

  function submitsBtn() {
    const method = "POST"
    const url = `/api/v2/register/admin`
    const body = {
      username: inputs.username,
      role: "ROLE_ADMIN",
      approveIp: inputs.ip,
    }

    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        return toast.success("삭제했습니다")
      }
    })
  }

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"관리자 IP 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />

      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          rows={rows ? rows : []}
          checkbox={false}
          SoltedModel={[{ field: "등록일", sort: "desc" }]}
        />
      </div>
    </div>
  )
}
