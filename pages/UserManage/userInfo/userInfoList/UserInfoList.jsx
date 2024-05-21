// 1.공지사항
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DayTransformMinit from "@utils/DayTransformMinit"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import { useEffect, useState } from "react"
import styles from "./UserInfoList.module.css"
import rendercellCopy from "@utils/Tables/rendercellCopy"
import { addCommasToNumber3, addCommasToNumber, addCommasToNumberCasino } from "@utils/formatNumberWithCommas"
import { useRouter } from "next/router"
import useStore from "@utils/zustand/store"
import { useAuthStore } from "@utils/useAuthStore"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import CustomButton from "@components/customButton/CustomButton"
import { toast } from "react-toastify"
import axios from "axios"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function UserInfoList() {
  const { sendRequest } = useAxiosRequest()
  const router = useRouter()
  const [selectionModel, setSelectionModel] = useState([])
  const [noteAdd, setNote] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(0)
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [isLoading, setIsloading] = useState(false)
  const { userIds, setUserId } = moneyLogStore()

  const handleNoteClick = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    window.open(`/sendingNote?userId=${params?.row?.id}`, "쪽지", "width=1024, height=500")
  }

  const handleMoneyBtn = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
    setUserId(params.row.id)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }
  const handdleMember = (event, params) => {
    event.stopPropagation()
    window.open(`/getUserInfoes/${params.row.id}`, "_blank", "width=1700,height=900")
  }
  const columns = [
    { field: "id", headerName: "No.", flex: 0.5 },
    { field: "lv", headerName: "Lv", flex: 0.5, align: "center" },
    { field: "username", headerName: "아이디", flex: 3, align: "center", renderCell: rendercellCopy() },
    { field: "nickname", headerName: "닉네임", flex: 2.9, align: "center" },
    { field: "referredBy", headerName: "총판", flex: 1.5 },
    { field: "store", headerName: "매장", flex: 1.5 },
    { field: "phone", headerName: "연락처", flex: 3.2, align: "center" },
    {
      field: "sportsBalance",
      headerName: "베팅머니",
      flex: 3,
      align: "right",
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params?.row?.wallet ? addCommasToNumber(params.row.wallet?.sportsBalance) : 0}
          </div>
        )
      },
    },
    {
      field: "point",
      type: "number",
      headerName: "포인트",
      flex: 3,
      align: "right",
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0} P
          </div>
        )
      },
    },
    {
      field: "casinoBalance",
      type: "number",
      headerName: "카지노머니",
      flex: 3,
      align: "right",
      renderCell: (params) => {
        console.log(params?.row?.wallet?.casinoBalance)
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params?.row?.wallet?.casinoBalance ? addCommasToNumber(params?.row?.wallet?.casinoBalance) : 0}
          </div>
        )
      },
    },
    {
      field: "deposit ",
      type: "number",
      headerName: "입금",
      flex: 2.3,
      align: "right",
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0}
          </div>
        )
      },
    },
    {
      field: "withdraw ",
      type: "number",
      headerName: "출금",
      flex: 2.3,
      align: "right",
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0}
          </div>
        )
      },
    },
    {
      field: "calculate",
      headerName: "정산",
      flex: 2.3,
      align: "center",
      renderCell: (params) => {
        return <div style={{ cursor: "pointer" }}>{params.value ? addCommasToNumber3(params.value) : 0}</div>
      },
    },
    {
      field: "visitCount",
      headerName: "로그인",
      flex: 2.3,
      align: "center",
      renderCell: (params) => {
        return <div style={{ cursor: "pointer" }}>{params.value ? addCommasToNumber3(params.value) : 0}</div>
      },
    },
    {
      field: "chargedCount",
      headerName: "충전횟수",
      flex: 1.6,
      align: "center",
      valueGetter: (params) => {
        return params.row?.wallet?.chargedCount ? params.row?.wallet?.chargedCount : "0"
      },
    },
    {
      field: "createdAt",
      headerName: "등록일",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "lastVisit",
      headerName: "마지막로그일",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "lastRechargedAt",
      headerName: "마지막충전일",
      flex: 3.8,
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    { field: "domain", headerName: "도메인", flex: 2, align: "center" },
    {
      field: "role",
      headerName: "상태",
      flex: 2.8,
      align: "center",
      renderCell: (params) => {
        return <div>{params.value === "ROLE_GUEST" ? "대기" : "정상"}</div>
      },
    },
    {
      field: "infobtn",
      headerName: "회원",
      flex: 1.17,
      align: "center",
      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }

        return (
          <>
            <button style={inputSS} onClick={(event) => handdleMember(event, params)}>
              회원
            </button>
          </>
        )
      },
    },
    {
      field: "moneyLog",
      headerName: "머니로그",
      flex: 1.16,
      marginRight: 2,

      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }

        return (
          <button type="button" onClick={(event) => handleMoneyBtn(event, params)} style={inputSS}>
            로그
          </button>
        )
      },
    },
    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 1,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            <button style={inputSS} onClick={(event) => handleNoteClick(event, params)}>
              쪽지
            </button>
          </>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지1",
      flex: 1,
      sortable: false,
      renderHeader: (params) => {
        const handleAll = (event) => {
          event.stopPropagation()
          const newWhole = !noteWhole
          setWhole(newWhole)

          if (newWhole) {
            const startIdx = page * pageSize
            const endIdx = startIdx + pageSize
            const currentPageRowIds = apiData
              .slice(startIdx, Math.min(endIdx, apiData.length))
              .map((row) => row.id)
              .filter((id) => !isNaN(id)) // 숫자가 아닌 ID를 필터링합니다.
            const uniqueArr = [...new Set(currentPageRowIds)]
            setNote(uniqueArr) //체크된 체크박스들의 유저 아이디 저장
          } else {
            setNote([])
          }
        }

        return (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            쪽지
            <input type="checkbox" style={{ width: "17px" }} checked={noteWhole} onClick={handleAll} />
          </div>
        )
      },
      renderCell: (params) => {
        if (!params.row.id) {
          return null
        }
        const handleClick = (event, ids) => {
          event.stopPropagation()

          const currentIndex = noteAdd.indexOf(params.row.id)
          const newChecked = [...noteAdd]
          if (currentIndex === -1) {
            newChecked.push(params.row.id)
            setNote(...noteAdd, ids)
          } else {
            newChecked.splice(currentIndex, 1)
          }

          setNote(newChecked)
        }
        return (
          <input
            id={params.row.id}
            type="checkbox"
            checked={noteAdd.includes(params.row.id) ? true : false}
            onClick={(event) => handleClick(event)}
            style={{ width: "15px", height: "15px", magin: "0" }}
          />
        )
      },
    },
  ]
  const newColumns = columns.map((col) => {
    return {
      ...col,
      headerAlign: "center",
    }
  })
  const [apiData, setApiData] = useState([])
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const userToken = getCookie("token")
  const [accountId, setAccoutid] = useState()

  async function callUserList() {
    setIsloading(true)
    const response = await axios.get(`${basicURL}/api/v2/managers/users`, {
      headers: {
        Authorization: userToken,
      },
    })
    const data = await response.data
    data.map((item) => {
      item.balance = item?.wallet?.balance
      item.point = item?.wallet?.point
      item.id = Number(item.id)
    })
    const temp = data.filter((item) => item.role === "ROLE_GUEST")
    setApiData(data)
    setIsloading(false)
  }

  // callUserList 함수가 비동기 함수인 경우
  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        callUserList()
      }
    }

    fetchData()
  }, [router, userToken])

  const [selectedIds, setSelectedIds] = useState([])
  const handleSelection = (ids) => {
    const value = apiData.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
    setAccoutid(value)
  }
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }
  const apiRef = useGridApiRef()

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  const setUserRoleUpdate = async () => {
    //대기처리
    if (confirm("선택한 유저를 승인처리 하시겠습니까?") && selectedIds && selectedIds.length > 0) {
      try {
        const headers = {
          headers: {
            Authorization: userToken, // 토큰을 Authorization 헤더에 추가
            // 필요한 경우 여기에 다른 헤더들을 추가할 수 있습니다.
          },
        }
        const promises = selectedIds.map((userId) => {
          const selectedRow = apiData.filter((user) => user.id === userId)
          const isAdmin = selectedRow[0].partnerType ? true : false
          const body = {
            id: userId,
            role: isAdmin ? "ROLE_ADMIN" : "ROLE_USER",
            enabled: true,
          }
          return axios.patch(`${basicURL}/api/v2/managers/users/${userId}/role`, body, headers)
        })
        await Promise.all(promises)

        toast.success("선택된 항목이 성공적으로 승인 처리 되었습니다")
        router.reload()
      } catch (error) {
        // 에러 처리
        toast.error("에러 발생: " + error.message)
      }
    }
  }
  const [bankNameof, setBname] = useState("")
  const [bankBnumber, setBnumber] = useState()
  const [buserName, setBusreName] = useState("")

  function handleChangeSelect(event) {
    const value = event.target.value
    setBname(value)
  }

  function handleBankNum(event) {
    const value = event.target.value
    setBnumber(value)
  }
  function handleBuserName(event) {
    const value = event.target.value
    setBusreName(value)
  }

  function approveAccountId(ids) {
    const method = "PATCH"
    const url = `/api/v2/managers/${ids}/account/approval`
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

  function SumbmitAccounts() {
    console.log(accountId)
    if (!accountId) {
      return toast("선택된 아이디가 없습니다")
    }
    if (accountId.length > 1) {
      return toast("한명씩 정보를 입력한 다음 등록해주세요")
    }
    const useId = accountId[0]?.id
    const method = "POST"
    const url = `/api/v2/users/${useId}/account`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    const body = {
      bank: bankNameof,
      owner: buserName,
      number: bankBnumber,
    }
    if (!bankNameof) {
      return toast("은행이름을 입력해주세요")
    }
    if (!buserName) {
      return toast("예금주를 입력해주세요")
    }

    if (!bankBnumber) {
      return toast("계좌번호를 입력해주세요")
    }
    if (confirm("선택된 계정을 등록하시겠습니까?")) {
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
          approveAccountId(useId)
        }
      })
    }
  }

  function moveNote(noteAdd2) {
    console.log(noteAdd2)

    if (accountId.length >= 1) {
      return toast("왼쪽 체크박스는 승인, 오른쪽 체크박스는 쪽지 전용 체크박스입니다")
    }
    if (noteAdd2 < 1) {
      return toast("쪽지를 보낼 대상을 오른쪽 체크박스에서 선택해 주세요")
    }
    window.open(`/sendingNote?userId=${noteAdd2}`, "쪽지", "width=1024, height=500")
  }
  return (
    <>
      <CustomHeader
        text={`회원관리-[총인원 : ${apiData?.length}명]`}
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0.156vw", justifyContent: "flex-start" }}>
        <div className={styles.btnGroup1}>
          <div className={styles.buttonBox}>
            <div style={{ height: "100%" }} onClick={setUserRoleUpdate}>
              <CustomButton
                text={"회원가입 승인"}
                customStyle={{ background: "#D9D9D9", width: "150px", height: "30px" }}
              />
            </div>
          </div>
          {/* <section className={styles.addAccounts}>
            <div style={{ color: "red" }}>자동충전 계정 신청</div>
            <div className={styles.smallBox}>
              <div className={styles.nameof}>은행명</div>
              <select name="" id="" onChange={(event) => handleChangeSelect(event, "SET_BANK_NAME")}>
                <option className={styles.whiteOption} value="" defaultValue="kb">
                  은행명 선택
                </option>
                <option className={styles.whiteOption} value="nh">
                  농협
                </option>
                <option className={styles.whiteOption} value="kb">
                  국민은행
                </option>
                <option className={styles.whiteOption} value="uri">
                  우리은행
                </option>
                <option className={styles.whiteOption} value="shinhan">
                  신한은행
                </option>
                <option className={styles.whiteOption} value="hana">
                  하나은행
                </option>
                <option className={styles.whiteOption} value="sc">
                  SC제일은행
                </option>
                <option className={styles.whiteOption} value="deagu">
                  대구은행
                </option>
                <option className={styles.whiteOption} value="busan">
                  부산은행
                </option>
                <option className={styles.whiteOption} value="gwangju">
                  광주은행
                </option>
                <option className={styles.whiteOption} value="jeju">
                  제주은행
                </option>
                <option className={styles.whiteOption} value="jeonbuk">
                  전북은행
                </option>
                <option className={styles.whiteOption} value="gyungnam">
                  경남은행
                </option>
                <option className={styles.whiteOption} value="post">
                  우체국
                </option>
                <option className={styles.whiteOption} value="suhyup">
                  수협
                </option>
                <option className={styles.whiteOption} value="seamaul">
                  새마을금고
                </option>
                <option className={styles.whiteOption} value="kakao">
                  카카오뱅크
                </option>
                <option className={styles.whiteOption} value="kdb">
                  KDB산업은행
                </option>
                <option className={styles.whiteOption} value="shinhyup">
                  신협
                </option>
                <option className={styles.whiteOption} value="city">
                  한국씨티은행
                </option>
              </select>
            </div>
            <div className={styles.smallBox}>
              <div>계좌번호</div>
              <input type="text" onChange={handleBankNum} />
              <span className={styles.colorRed}>*예)1234567</span>
            </div>
            <div className={styles.smallBox}>
              <div>예금주명</div>
              <input type="text" onInput={handleBuserName} />
              <span className={styles.colorRed}>*한명씩 체크해서 등록</span>
            </div>
            <button type="butotn" className={styles.sendAccountBtn} onClick={SumbmitAccounts}>
              등록
            </button>
          </section> */}
          <div className={styles.buttonBox}>
            <button
              style={{
                width: "100px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                justifyContent: "center",
                color: "black",
                border: "0",
                backgroundColor: "#D9D9D9",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={() => moveNote(noteAdd)}
            >
              쪽지 보내기
            </button>
          </div>
        </div>
      </CustomBar>
      {/* <section style={{ display: "flex", flexDirection: "column", fontSize: "10px", color: "#808080" }}>
        <span>왼쪽 체크박스는 회원가입 승인 관련, 자동충전 계좌 신청 관련입니다</span>
        <span>오른쪽 체크박스는 쪽지관련 기능입니다</span>
      </section> */}

      <div className={styles.tableContainer}>
        {apiData && (
          <DataGridPremium
            className={styles.gridmaincustom}
            onPageSizeChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3A6287",
                color: "white",
                fontsize: "12px",
                fontSize: "12px",
              },
              "& .MuiDataGrid-columnHeader": {
                textAlign: "center",
                padding: "0",
                justifyContent: "center",
                fontFamily: "SCDream",
              },
              "& .MuiButtonBase-root": {
                color: "black",
                fontFamily: "SCDream",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "10px", //커스텀 폰트 사이즈
                padding: 0, // 빼면안됨 중앙정렬 안댐
                fontFamily: "SCDream",
              },
              "& .MuiDataGrid-cellCheckbox": {
                paddingLeft: "0px",
              },
              ".MuiTablePagination-actions svg ": {
                color: "black",
                width: "10px",
              },
              ".MuiDataGrid-columnHeaderTitleContainer": {
                width: "100%",
                flex: "none !important", // flex: 1을 제거해야 중앙정렬 가능
              },
              ".MuiDataGrid-cell--textLeft": {
                justifyContent: "center",
              },
              ".MuiDataGrid-virtualScroller": {
                overflow: "hidden",
              },
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={22} // 행 높이를 10%로 설정
            columnHeaderHeight={22} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={apiData}
            columns={newColumns}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            apiRef={apiRef}
            pagination
            autoPageSize={false}
            checkboxSelection
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
            onRowSelectionModelChange={(params) => handleSelection(params)}
            selectionModel={selectionModel}
            disableColumnResize={true}
            loading={isLoading}
          />
        )}
      </div>
    </>
  )
}
