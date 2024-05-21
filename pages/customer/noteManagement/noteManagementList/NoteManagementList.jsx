import { useEffect, useState } from "react"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./NoteManagementList.module.css"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { getCookie } from "cookies-next"
import axios from "axios"
import baseUrl from "@utils/REST/baseUrl"
import { ktimeTransThird } from "@utils/ktimetrans"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function NoteManagementList() {
  const [rows, setApiData] = useState()
  const [selected, setSelected] = useState()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const userToken = getCookie("token")
  const router = useRouter()

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const headers = {
    Authorization: userToken, // 토큰을 Authorization 헤더에 추가
  }

  const fetchData = async () => {
    try {
      const responses = await axios.get(
        `${baseUrl}api/v2/managers/all?startDate=${datepick.start}&endDate=${datepick.end}`,
        {
          headers: headers, // headers 객체를 요청에 직접 추가
        },
      )

      const apiDataCombined = responses.data

      setApiData(apiDataCombined)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [datepick.start, datepick.end])

  useEffect(() => {}, [rows])
  const deleteSeleted = (gubun) => {
    console.log(selected)

    let addedString
    if (gubun === "선택됨") {
      addedString = selected.map((id) => `messageIds=${id}`).join("&")
    } else if (gubun === "전체 삭제") {
      addedString = rows.map((cell) => `messageIds=${cell?.row?.id}`).join("&")
    }

    axios
      .patch(`${baseUrl}api/v2/managers/messages?${addedString}`, null, {
        headers: headers,
      })
      .then((response) => {
        setSelected(null) // 선택된 아이템 클리어
        toast.success("삭제했습니다")
        // setTimeout을 사용하여 fetchData를 1초 후에 호출
        setTimeout(() => {
          fetchData() // 데이터 다시 불러오기
        }, 1000) // 1000ms = 1초
      })
      .catch((error) => {
        toast.warn("삭제에 실패하였습니다")
      })
  }

  function moveTonote(ids) {
    return router.push(`/customer/noteManagement/detail/${ids}`)
  }

  const columns = [
    {
      field: "title",
      headerName: "제목",
      flex: 4.08,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => moveTonote(params.row.id)}
          >
            {params.formattedValue}
          </div>
        )
      },
    },
    {
      field: "receiverUsername",
      headerName: "받은 사람",
      flex: 4.08,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return `${params.row?.receiverUsername}(${params.row?.receiverNickname})`
      },
    },
    { field: "site", headerName: "사이트", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "작성일",
      flex: 2.05,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTransThird(params.formattedValue)
      },
    },
    {
      field: "readDate",
      headerName: "읽은 날짜",
      flex: 2.05,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return `${params.formattedValue ? ktimeTransThird(params.formattedValue) : ""}`
      },
    },
    {
      field: "read",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        const result = params.formattedValue

        if (!result) return "읽지않음"
        if (result) {
          return "읽음"
        }
        if (result === "deleted") {
          return "삭제됨"
        }
        return "처리되지않음"
      },
    },
  ]

  function handleSel(targetId) {
    setSelected(targetId)
  }

  return (
    <>
      <CustomHeader text={"쪽지관리"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar customStyle={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer2}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "3.8vw", textAlign: "center" }}
              text={"시작일자 :"}
              getDate={handleStartDateChange}
            />
          </div>
          <div className={styles.boxContainer2}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "3.8vw", textAlign: "center" }}
              text={"종료일자 :"}
              getDate={handleEndDateChange}
            />
          </div>
          {/* <div className={styles.boxContainer3}>
            <select style={{ width: "5.208vw" }}>
              <option value="/api/v2/managers/{userId}/messages">닉네임</option>
              <option value="/api/v2/managers/{userId}/messages">아이디</option>
              <option value="/api/v2/managers/{userId}/messages">쪽지제목</option>
              <option value="/api/v2/managers/{userId}/messages">쪽지내용</option>
              <option value="/api/v2/managers/{userId}/messages">사이트명 </option>
            </select>
            <CustomInput customStyle={{ background: "#D9D9D9", width: "8.073vw" }} />
            <CustomButton customStyle={{ background: "#D9D9D9", width: "2.604vw" }} text={"검색"} />
          </div> */}
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable
          pageSizeOptionses={[20]}
          handleSelectionChange={handleSel}
          columns={columns}
          rows={rows ? rows : []}
        />
      </div>
      <div>
        <button
          style={{ backgroundColor: "rgb(255, 0, 0)", color: "white" }}
          className={styles.buttonDel}
          type="button"
          onClick={() => deleteSeleted("선택됨")}
        >
          삭제
        </button>
        <button
          style={{ backgroundColor: "rgb(255, 0, 0)", color: "white" }}
          className={styles.buttonDel}
          type="button"
          onClick={() => deleteSeleted("전체 삭제")}
        >
          전체 삭제
        </button>
      </div>
    </>
  )
}
