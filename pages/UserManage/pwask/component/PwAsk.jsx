import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./PwAsk.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { useLoginInquiryAPI } from "@utils/loginInquiry/useLoginInquiryAPI"
import { fetchDate } from "@utils/DayTransform"
// 비밀번호 문의

const renderCellInput = {
  width: "90%",
}

const renderCellButtonContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
const renderCellButtonInner = {
  width: "70%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}
const renderCellText = {
  width: "48%",
  textAlign: "center",
}
const renderCellButton = {
  width: "48%",
  backgroundColor: "red",
  color: "white",
  cursor: "pointer",
  height: "90%",
  border: "none",
  borderRadius: "4px",
}

export default function PwAsk() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")
  const { loginInquiryList, getLoginInquiryList, patchLoginInquiryList } = useLoginInquiryAPI()
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  useEffect(() => {
    getLoginInquiryList()
  }, [])

  const statFn = (status) => {
    switch (status) {
      case "PROCESSED":
        return "처리됨"

      case "WAITING":
        return "대기"
    }
  }
  const handleClick = (event, params) => {
    // /api/v2/managers/login-inquiry/{articleId}/complete
    event.preventDefault()
    const method = "PUT"
    const url = `/api/v2/managers/login-inquiry/${params.id}/complete`
    const headers =
      { "Content-Type": "application/json", Authorization: getCookie("token") } /
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
          setDatas(responseData.data.data)
          toast.success("해제하였습니다.")
          // router.reload()
          reQuestJson()
        }
      })
  }

  const columns = [
    { field: "username", headerName: "ID", flex: 1, align: "center" },
    // { field: "ownername", headerName: "이름(예금주)", flex: 1, align: "center" },
    {
      field: "ip",
      headerName: "IP",
      flex: 1,
      align: "center",
    },
    {
      field: "phone",
      headerName: "전화번호",
      flex: 1,
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "날짜",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <div>{fetchDate(params.row.createdAt)}</div>
      },
    },
    {
      field: "adminMemo",
      headerName: "메모",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const [inputValue, setInputValue] = useState(params.row.adminMemo)
        const onChangeInputValue = (event) => {
          const {
            target: { value },
          } = event
          setInputValue(value)
        }
        const handleEnterKeyPress = (event) => {
          if (event.key === "Enter") {
            patchLoginInquiryList(params.row.id, inputValue)
          }
        }
        return (
          <div>
            <input
              style={renderCellInput}
              type="text"
              value={inputValue}
              onChange={onChangeInputValue}
              onKeyDown={handleEnterKeyPress}
            />
            <button>메모 등록</button>
          </div>
        )
      },
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={renderCellButtonContainer}>
            <div style={renderCellButtonInner}>
              <div style={renderCellText}>{statFn(params.row.status)}</div>
              <button
                onClick={(event) => handleClick(event, params)}
                style={renderCellButton}
                className="table-cells-muis-btns-common"
              >
                번호 삭제
              </button>
            </div>
          </div>
        )
      },
    },
  ]
  const [datdas, setDatas] = useState([])
  function reQuestJson() {
    const method = "GET"
    const url = "/api/v2/managers"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의해 주세요")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        return setDatas(responseData.data.data)
      }
    })
  }
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  useEffect(() => {
    reQuestJson()
  }, [])
  const [ips, setIps] = useState({
    first: "",
    second: "",
    third: "",
    forth: "",
    memo: "",
  })

  function handleInput(event, idx) {
    const vals = event.target.value
    if (idx === 1) {
      setIps({ ...ips, first: vals })
    }
    if (idx === 2) {
      setIps({ ...ips, second: vals })
    }
    if (idx === 3) {
      setIps({ ...ips, third: vals })
    }
    if (idx === 4) {
      setIps({ ...ips, forth: vals })
    }
    if (idx === 5) {
      setIps({ ...ips, memo: vals })
    }
  }
  function sendIps() {
    const method = "POST"
    const url = "api/v2/managers/ip"
    const body = { ipContent: `${ips.first}:${ips.second}:${ips.third}:${ips.forth}`, note: ips.memo, enabled: false }
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("서버 반응이 없습니다")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록하였습니다.", {
          onClose: () => reQuestJson(),
        })
      }
    })
  }
  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"비밀번호 문의 목록"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
        />
        {/* <CustomBar customStyle={{ padding: "0.260vw 0" }}>
          <div style={{ width: "16%", height: "100%" }}>
            <DatePickerComponent
              text={"시작일자 :"}
              getDate={handleStartDateChange}
              customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
            />
          </div>
          &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
          <div style={{ width: "16%", height: "100%" }}>
            <DatePickerComponent
              text={"종료일자 :"}
              getDate={handleEndDateChange}
              customStyle={{ justifyContent: "space-around" }}
            />
          </div>
        </CustomBar> */}

        <div className={styles.tableContainer}>
          <CustomTable columns={columns} rows={loginInquiryList ? loginInquiryList : []} checkbox={false} />
        </div>
      </div>
    </>
  )
}
