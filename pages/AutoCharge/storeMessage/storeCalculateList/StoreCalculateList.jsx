import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import styles from "./StoreCalculateList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { useState, useEffect, Ref, useRef } from "react"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import axios from "axios"
import { ktimeTrans123 } from "@utils/ktimetrans"

// const columns = [
//   { field: "auto_transaction_id", headerName: "No." },
//   { field: "site", headerName: "사이트", flex: 1, headerAlign: "center", align: "center" },
//   { field: "phone", headerName: "수신번호", flex: 1, headerAlign: "center", align: "center" },
//   { field: "type", headerName: "수신타입", flex: 1, headerAlign: "center", align: "center" },
//   { field: "gubun", headerName: "입출금", flex: 1, headerAlign: "center", align: "center" },
//   { field: "bank", headerName: "은행명", flex: 1, headerAlign: "center", align: "center" },
//   { field: "banknumber", headerName: "계좌번호", flex: 1, headerAlign: "center", align: "center" },
//   { field: "name", headerName: "입금명", flex: 1, headerAlign: "center", align: "center" },
//   { field: "deposit_time", headerName: "고객 입금 시간", flex: 1, headerAlign: "center", align: "center" },
//   { field: "reception_time", headerName: "문자 접수 시간", flex: 1, headerAlign: "center", align: "center" },
//   { field: "message", headerName: "메시지", flex: 1, headerAlign: "center", align: "center" },

//   {
//     field: "status",
//     headerName: "상태",
//     flex: 1,
//     headerAlign: "center",
//     align: "center",
//     renderCell: (params) => {
//       return params.formattedvalue
//     },
//   },
// ]
// 138 충전/환전 관리 (알림 그룹 설정)
export default function StoreCalculateList() {
  const { sendRequest } = useAxiosRequest()
  const userToken = getCookie("token")
  const basicURL = process.env.NEXT_PUBLIC_API_URL
  const [rows, setRow] = useState([])

  function stats12(stat) {
    switch (stat) {
      case "WAIT":
        return "대기"
      case "OK":
        return "승인"
    }
  }

  const filteredColumns = [
    { field: "id", headerName: "유저식별값", flex: 1, headerAlign: "center", align: "center" },
    { field: "bank", headerName: "은행명", flex: 1, headerAlign: "center", align: "center" },
    { field: "number", headerName: "계좌번호", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "신청 시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans123(params.formattedValue)
      },
    },
    {
      field: "status",
      headerName: "진행도",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const cur = stats12(params.formattedValue)

        return cur
      },
    },
  ]

  // const filteredColumns = columns.filter((column) => column.field !== "id")

  const fetchData2 = async () => {
    //리스트 불러옴
    try {
      const statusOptions = ["OK", "CANCEL", "TIMEOUT", "WAIT"]
      const headers = {
        Authorization: userToken, // 토큰을 Authorization 헤더에 추가
      }
      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios.get(`${basicURL}/api/v2/managers/accounts?page=1&size=20&status=${status}`, { headers: headers }),
        ),
      )
      return setRow([
        ...responses[0].data.data,
        ...responses[1].data.data,
        ...responses[2].data.data,
        ...responses[3].data.data,
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  function requestList(stauts2) {
    const method = "GET"
    const url = `api/v2/et/managers/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${stauts2}`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

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
        const result = responseData.data.data
          .filter((item) => item.status !== "APPROVAL") // 'APPROVAL' 상태가 아닌 요소만 필터링
          .map((item) => ({
            ...item,
            rechargeAmount: Number(item.rechargeAmount), // 필요한 변환 적용
          }))
        setList(result)
      }
      return false
    })
  }

  useEffect(() => {
    fetchData2()
  }, [])
  const [accountId, setAccoutid] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  const handleSelection = (ids) => {
    const value = rows && rows.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
    setAccoutid(value)
  }

  const handleSubmit = () => {
    const useId = accountId[0].id
    const method = "POST"
    const url = `/api/v2/managers/${useId}/account/approval`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

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
        toast.success("등록되었습니다")
      }
      return false
    })
  }
  return (
    <>
      <CustomHeader text={"자동 충전 대상 목록"} customStyle={{ height: "38px", maxWidth: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        {/* <section className={styles.addAccounts}>
          <div className={styles.titlebox}>정보</div>
          <div className={styles.smallBox}>
            <div>사이트</div>
            <select name="siteSet" id="siteSet" className={styles.forSelect}>
              <option value="1">도메인1</option>
              <option value="2">도메인2</option>
              <option value="3">도메인3</option>
            </select>
          </div>

          <button type="butotn" className={styles.sendAccountBtn}>
            등록
          </button>
        </section> */}
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable
          columns={filteredColumns}
          rows={rows}
          handleSelectionChange={(params) => handleSelection(params)}
          SoltedModel={[
            {
              field: "createdAt",
              sort: "desc",
            },
          ]}
        />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <label htmlFor="sumit">하나만 선택 후 승인</label>
            <button
              id="sumit"
              customStyle={{ fontSize: "0.6vw", width: "70px", backgroundColor: "#3B4281", color: "white" }}
              onClick={handleSubmit}
            >
              승인
            </button>
          </div>
          {/* <div className={styles.footerSecondRowInput}>
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
          </div> */}
        </div>
      </div>
    </>
  )
}
