import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./BlockIp.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
// 33번 ip 블럭 정보
// 기간별 조회 수정
export default function WhiteIp() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")

  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const handleClick2 = (event, params) => {
    event.preventDefault()
    const method = "DELETE"
    const url = `/api/v2/managers/ip/${params.id}`
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
        setDatas(responseData.data.data)
        toast.success("해제하였습니다.")
        router.reload()
      }
    })
  }
  const columns = [
    { field: "ipContent", headerName: "IP", flex: 1, align: "center" },
    { field: "status", headerName: "등록일", flex: 1, align: "center" },
    {
      field: "note",
      headerName: "비고",
      flex: 1,
      align: "center",
    },
    {
      field: "delete",
      headerName: "해제",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => handleClick2(event, params)}
            style={{
              backgroundColor: "#0000FF",
              width: "50px",
              margin: "0% auto",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
            className="table-cells-muis-btns-common"
          >
            해제
          </button>
        )
      },
    },
  ]

  const [datdas, setDatas] = useState([])
  function reQuestJson() {
    const method = "GET"
    const url = "/api/v2/managers/ips?page=1&size=100"
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
        setDatas(responseData.data.data)
        console.log(responseData.data.data)
        return console.log(responseData.data.data)
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
          text={"IP 블럭 관리"}
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
        <div className={styles.addWrapper}>
          <section className={styles.addIpBox}>
            <div className={styles.divBox}>
              <div>IP</div>
              <div>비고</div>
            </div>
            <div className={styles.inputBox}>
              <section className={styles.inputBox1}>
                <div className={styles.topbox}>
                  <input type="number" onChange={(event) => handleInput(event, 1)} maxlength={6} />
                  &nbsp;.&nbsp;
                  <input type="number" onChange={(event) => handleInput(event, 2)} maxlength={6} />
                  &nbsp;.&nbsp;
                  <input type="number" onChange={(event) => handleInput(event, 3)} maxlength={6} />
                  &nbsp;.&nbsp;
                  <input type="number" onChange={(event) => handleInput(event, 4)} maxlength="6" />
                  &nbsp;~&nbsp;
                  <input type="number" maxLength={6} />
                </div>
                <p className={styles.bottombox}>마지막칸은 pc등 연결된IP입력시에만 사용하세요</p>
              </section>
              <section className={styles.inputBox1}>
                <div className={styles.topbox2}>
                  <input type="text" className={styles.inputMemo} onChange={(event) => handleInput(event, 5)} />
                </div>
              </section>
            </div>
          </section>
        </div>
        <section className={styles.buttonBoxwrapper}>
          <button type="button" className={styles.buttonBox} onClick={() => sendIps()}>
            아이피 추가
          </button>
        </section>
        <div className={styles.tableContainer}>
          <CustomTable columns={columns} rows={datdas} checkbox={false} />
        </div>
      </div>
    </>
  )
}
