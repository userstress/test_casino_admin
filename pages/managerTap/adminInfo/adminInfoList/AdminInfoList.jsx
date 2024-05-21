import React, { useState, useEffect } from "react"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import { FormLabel, FormHelperText } from "@mui/material"
import styles from "./AdminInfoList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { render } from "react-dom"
import { take } from "lodash"
import { ktimeTrans2 } from "@utils/ktimetrans"

export default function AdminInfoList() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [total, setTotal] = useState(0)
  const [datas, setRows] = useState()
  const [mirrorInfo, setMirrorInfo] = useState()

  const mytoken = getCookie("token")
  const [info, setInfoes] = useState({
    username: "",
    nickname: "",
    role: "",
    adminEnum: "",
    approveIp: "",
    blockedAdmin: false,
  })

  const handleSelectChange = (id, value) => {
    const updatedMirrorInfo = mirrorInfo.map((item) => (item.id === id ? { ...item, status: value } : item))
    setMirrorInfo(updatedMirrorInfo)
  }

  const handleInputChange = (id, field, value) => {
    const updatedMirrorInfo = mirrorInfo.map((item) => {
      if (item.id === id) {
        // 필드가 이미 존재하면 업데이트하고, 없으면 추가합니다.
        return { ...item, [field]: value }
      }
      return item
    })
    console.log(updatedMirrorInfo)
    // setMirrorInfo(updatedMirrorInfo)
  }

  const takeList = () => {
    const method = "GET"
    const url = `/api/v2/admins/all-admins`
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
        const rows1 = responseData.data.reverse()
        setRows(rows1)
        setMirrorInfo(rows1)
      }
    })
    return
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("등록")

    const method = "POST"
    const url = `/api/v2/register/admin`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const body = { ...info, phone: "010-9999-9999", name: "운영" }

    console.log(body)
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록에 성공했습니다.")
        takeList()
      }
    })
  }

  const patchAdmin = (event, id) => {
    const adminData = mirrorInfo.find((item) => item.id === id)
    if (!adminData) {
      toast.error("유효하지 않은 데이터입니다.")
      return
    }
    const method = "PATCH"
    const url = `/api/v2/admins/update-admins/${id}`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    console.log(adminData)

    const body = {
      approveIp: adminData.approveIp,
      isBlockedAdmin: adminData.isBlockedAdmin || false,
      password: adminData.password,
      blockedAdmin: adminData.blockedAdmin || false,
    }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록에 성공했습니다.")
        takeList()
      }
    })
  }

  const columns = [
    {
      field: "username",
      headerName: "아이디",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nickname",
      headerName: "닉네임",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "유형",
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        let resulting
        if (params.formattedValue === "ROLE_ADMIN") {
          resulting = "운영자"
        }
        if (params.formattedValue === "ROLE_USER") {
          resulting = "유저"
        }
        return resulting
      },
    },

    {
      field: "createdAt",
      headerName: "생성일",
      minWidth: 180,
      maxWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans2(params.formattedValue)
      },
    },
    {
      field: "visitCount",
      headerName: "로그인 시도 횟수",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const reset = (event) => {
          event.stopPropagation()
          event.preventDefault()
          console.log("Rest", params.row.id)
        }
        return (
          <div className={styles.textBoxs}>
            <span className={styles.tryText}>{params.formattedValue}</span>
            {/* <button className={styles.tryBtn} type="button" onClick={reset}>
              초기화
            </button> */}
          </div>
        )
      },
    },
    {
      field: "lastAccessedIp",
      headerName: "최근 아이피",
      minWidth: 180,
      maxWidth: 180,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastVisit",
      headerName: "최근 로그인",
      minWidth: 180,
      maxWidth: 180,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "approveIp",
      headerName: "접속 가능 아이피",
      minWidth: 180,
      maxWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <input
            key={params.id + params.value} // 입력이 변경될 때마다 key를 업데이트
            defaultValue={params.value}
            title="직접 타이핑으로 입력해주세요"
            onChange={(e) => handleInputChange(params.row.id, "approveIp", e.target.value)}
          />
        )
      },
    },
    {
      field: "adminEnum",
      headerName: "상태설정",
      minWidth: 100,
      maxWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.optionBox}>
            <select
              onChange={(e) => handleSelectChange(params.row.id, e.target.value)}
              className={styles.Select}
              defaultValue={params.formattedValue}
            >
              <option value="사용중" className={styles.options}>
                사용가능
              </option>
              <option value="사용불가" className={styles.options}>
                사용불가
              </option>
            </select>
          </div>
        )
      },
    },
    {
      field: "password",
      headerName: "비밀번호 변경",
      minWidth: 150,
      maxWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.pwBox}>
            <input
              onChange={(e) => handleInputChange(params.row.id, "password", e.target.value)}
              className={styles.pwchinput}
              type="text"
              placeholder="변경을 원하지 않을경우 공란"
            />
          </div>
        )
      },
    },
    {
      field: "saveBtn",
      headerName: "기능",
      maxWidth: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={styles.saveBtnBox}>
            <button type="button" className={styles.saveBtn} onClick={(event) => patchAdmin(event, params?.row?.id)}>
              저장
            </button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    takeList()
  }, [])
  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"관리자 계정 추가 (전체 : 9)"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          rows={datas ? datas : []}
          checkbox={false}
          fontsizesCell="10px"
          defaultIds="id"
          SoltedModel={[{ field: "createdAt", sort: "desc" }]}
        />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.adminAddBox}>
          <h3>관리자 계정 추가</h3>
          <form className={styles.accountPannel}>
            <div className={styles.pannels}>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminId">
                  아이디
                </FormLabel>
                <input
                  placeholder="아이디를 입력 해 주세요"
                  id="adminId"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, username: event.target.value })}
                />
                <FormHelperText sx={{ fontSize: "10px" }}>영문 대소문자 및 숫자 12자리 이하</FormHelperText>
              </div>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminpw">
                  비밀번호
                </FormLabel>
                <input
                  type="password"
                  placeholder="비밀번호를 입력 해 주세요"
                  id="adminpw"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, password: event.target.value })}
                />
                <FormHelperText sx={{ fontSize: "10px" }}>영문 대소문자 및 숫자 14자리 이하</FormHelperText>
                <FormHelperText sx={{ fontSize: "10px" }}>특수문자 !@#$%^&* 사용가능</FormHelperText>
              </div>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminnick">
                  닉네임
                </FormLabel>
                <input
                  type="text"
                  placeholder="닉네임을 입력 해 주세요"
                  id="adminnick"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, nickname: event.target.value })}
                />
                <FormHelperText sx={{ fontSize: "10px" }}>영문 대소문자 및 한글 7자리</FormHelperText>
              </div>
            </div>
            <div className={styles.pannels}>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminstat">
                  사용상태
                </FormLabel>
                <select
                  placeholder="Choose one…"
                  htmlFor="adminstat"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, adminEnum: event.target.value })}
                >
                  <option value="사용중">사용가능</option>
                  <option value="사용불가">사용불가</option>
                </select>
                <FormHelperText sx={{ fontSize: "10px" }}>&nbsp;</FormHelperText>
              </div>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminstat">
                  ROLE
                </FormLabel>
                <select
                  htmlFor="adminstat"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, role: event.target.value })}
                >
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select>
                <FormHelperText sx={{ fontSize: "10px" }}>&nbsp;</FormHelperText>
                <FormHelperText sx={{ fontSize: "10px" }}>&nbsp;</FormHelperText>
              </div>

              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="admiIp">
                  접속 가능 아이피
                </FormLabel>
                <input
                  type="text"
                  placeholder="아이피를 입력"
                  id="admiIp"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, approveIp: event.target.value })}
                />
                <FormHelperText sx={{ fontSize: "10px" }}>&nbsp;</FormHelperText>
              </div>
            </div>
            <div className={styles.pannels2}>
              <button className={styles.pannelbtn} onClick={(event) => handleSubmit(event)}>
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
