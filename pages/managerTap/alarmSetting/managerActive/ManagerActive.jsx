// 머니사용로그
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./ManagerActive.module.css"
import CustomButton from "@components/customButton/CustomButton"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import DayTransform from "@utils/DayTransform"
import { getCookie } from "cookies-next"
import { getUserHistory } from "@utils/user/getUserHistory"
import { useRouter } from "next/router"
export default function ManagerActive() {
  //데이터 불러올때
  const router = useRouter()
  const { LoginTryList, callUserList } = getUserHistory()
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const { sendRequest } = useAxiosRequest()
  const [total, setTotal] = useState(0)
  const [datas, setData] = useState()
  const mytoken = getCookie("token")

  function Iprequest(date) {
    const method = "GET"
    const url = `api/v2/managers/audit-log`
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
        setData(responseData.data)
      }
    })
  }

  useEffect(() => {
    if (router.isReady && !datas) {
      Iprequest()
    }
    const toggleData = () => {
      Iprequest()
    }

    const intervalId = setInterval(toggleData, 100000) // 5초마다 toggleData 실행
    return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [datepick.start, router.isReady])
  const [fileName, setFileName] = useState("")

  function saveToServer(file) {
    console.log(file)
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("audio/")) {
        alert("오디오 파일만 업로드할 수 있습니다.")
        reject("Invalid file type.")
        return
      }

      const fd = new FormData()
      fd.append("upload", file)
      const xhr = new XMLHttpRequest()

      xhr.open("POST", "/api/media", true)
      xhr.onload = () => {
        if (xhr.status === 201) {
          const { url } = JSON.parse(xhr.responseText)
          console.log(url)
          resolve(url)
        } else {
          reject("File upload failed.")
        }
      }
      xhr.onerror = () => reject("XMLHttpRequest error.")
      xhr.send(fd)
    })
  }

  const handleFileChange = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    const file = event.target.files[0]
    if (file) {
      saveToServer(file)
        .then((url) => {
          const newData = datas.map((data, index) => {
            if (data.id === params.row.id) {
              return { ...data, fileName: file.name, targetId: url }
            }
            return data
          })
          console.log(newData)
          setData(newData)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const handleDelFileChange = (params) => {
    const newData = datas.map((data, index) => {
      if (data.id === params.row.id) {
        return { ...data, fileName: file.name, targetId: "" }
      }
      return data
    })
    console.log(newData)
    setData(newData)
  }

  const uploadToMain = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const columns = [
    {
      field: "id",
      headerName: "No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "알람이름",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "details",
      headerName: "알람숫자",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "미처리숫자",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "adminUsername",
      headerName: "기능",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            style={{
              backgroundColor: "#3342C9",
              color: "white",
              fontSize: "12px",
              width: "50%",
              borderRadius: "4px",
              height: "30px",
            }}
            onClick={uploadToMain}
          >
            등록
          </button>
        )
      },
    },
    {
      field: "targetId",
      headerName: "사운드",
      flex: 3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }} title="파일명은 15자를 넘지않게 해주세요">
            <span>{params.formattedValue}</span>
            <div className={styles.fileHandle}>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, params)}
                style={{ display: "none" }}
                id={`file-input-${params.row.id}`} // params.id 대신 params.row.id를 사용
              />
              <div className={styles.fileHandleButtons}>
                <label htmlFor={`file-input-${params.row.id}`} style={{ cursor: "pointer" }}>
                  {fileName || "파일 선택"}
                </label>
                <button type="button" onClick={() => handleDelFileChange(params)} hidden={!params.row.targetId}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  const filteredColumns = columns.filter((column) => column.field !== "id")

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"사이트 알람 관리 목록 (전체 : 16)"}
        customStyle={{ height: "38px", width: "100%", backgroundColor: "#181D4B", margin: 0 }}
      />

      <div className={styles.tableContainer}>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--cell": {
              color: "green",
            },
            "& .super-app.negative": {
              color: "red",
            },
            "& .super-app.positive": {
              color: "blue",
            },
          }}
        >
          <CustomTable
            columns={filteredColumns}
            rows={datas ? datas : []}
            SoltedModel={[{ field: "timestamp", sort: "desc" }]}
            heights={40}
            fontsizesHead={15}
            fontsizesCell={12}
            checkbox={false}
          />
        </Box>
      </div>
    </div>
  )
}
