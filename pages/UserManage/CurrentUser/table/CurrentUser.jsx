// 1.공지사항
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import { ktimeTransFour } from "@utils/ktimetrans"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import { useEffect, useState } from "react"
import styles from "./CurrentUser.module.css"
import rendercellCopy from "@utils/Tables/rendercellCopy"
import { addCommasToNumber3 } from "@utils/formatNumberWithCommas"
import { useRouter } from "next/router"
import useStore from "@utils/zustand/store"
import { useAuthStore } from "@utils/useAuthStore"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import NoteBoard from "../NoteBoard/NoteBoard"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { boardStore } from "@utils/boardStore/boardStore"

const basicURL = process.env.NEXT_PUBLIC_API_URL

const inputSS = {
  width: "80%",
  marginLeft: "1px",
  marginRight: "2px",
  fontSize: "10px",
  textAlign: "center",
  padding: "0",
  border: "none",
  height: "80%",
  borderRadius: "4px",
  color: "white",
}

export default function CurrentUser() {
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
  const mytoken = getCookie("token")
  const { SearchAway } = boardStore()
  const [noteSelectedList, setSelected] = useState([])

  const handleClickNote = (event, params) => {
    event.preventDefault()
    event.stopPropagation()

    window.open(`/sendingNote?userId=${params?.row?.id}`, "쪽지", "width=1024, height=500")
  }
  const handleClickBanned = (event) => {
    event.preventDefault()
    // 여기에 클릭 이벤트에 대한 로직을 추가
    // return router.push("/usedMoneyLog")
  }

  function reQuestJson() {
    const method = "GET"
    const url = "/api/v2/managers/active/find/all"
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
        setData(responseData.data)
      }
    })
  }

  function kickfn(event, params) {
    event.preventDefault()
    event.stopPropagation()

    const method = "PATCH"
    const url = `/api/v2/users/logoutUser/${params.row.id}`
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
        toast.warn("해당 유저가 로그아웃 되었습니다")
      }
    })
  }

  function sendIps(event, params) {
    event.preventDefault()
    event.stopPropagation()
    // 사용자로부터 메모 입력 받기
    const note = prompt("차단 사유를 입력해주세요:")

    // 사용자가 취소 버튼을 누른 경우, 함수 종료
    if (note === null) return

    const method = "POST"
    const url = "api/v2/managers/ip"
    // 입력 받은 note 값을 body에 추가
    const body = { ipContent: `${params.row.lastAccessedIp}`, note: note, enabled: false }
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
        toast.success("차단되었습니다", {
          onClose: () => reQuestJson(),
        })
      }
    })
  }

  async function awayBoards(event, params) {
    event.preventDefault()
    event.stopPropagation()
    await SearchAway({ type: "nickname", value: params.row.nickname })
    router.push("/customer/board")
  }

  const columns = [
    { field: "id", headerName: "번호", flex: 0.5 },
    { field: "lv", headerName: "레벨", flex: 0.5, align: "center" },
    { field: "username", headerName: "아이디", flex: 2, align: "center", renderCell: rendercellCopy() },
    { field: "nickname", headerName: "닉네임", flex: 2, align: "center" },
    { field: "location", headerName: "현재위치", flex: 1.3 },
    {
      field: "sportsBalance",
      headerName: "보유머니",
      flex: 2.3,
      align: "right",
      // params: 해당 row레코드의 정보가 담김.
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0}원
          </div>
        )
      },
    },
    {
      field: "casinoBalance",
      headerName: "보유 카지노 머니",
      flex: 2.3,
      align: "right",
      // params: 해당 row레코드의 정보가 담김.
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer", paddingRight: "4px" }}>
            {params.value ? addCommasToNumber3(params.value) : 0}원
          </div>
        )
      },
    },
    {
      field: "point",
      type: "number",
      headerName: "포인트",
      flex: 2.1,
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
      field: "depositTotal",
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
      field: "withdrawTotal",
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
      field: "login",
      headerName: "로그인",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <div style={{ cursor: "pointer" }}>{params.value ? addCommasToNumber3(params.value) : 0}</div>
      },
    },
    {
      field: "lastAccessedIp",
      headerName: "IP",
      flex: 3,
      align: "center",
    },
    {
      field: "blockUser",
      headerName: "차단",
      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ ...inputSS, backgroundColor: "red", color: "white" }}
              onClick={(event) => sendIps(event, params)}
            >
              차단
            </button>
          </>
        )
      },
    },
    { field: "referredBy", headerName: "총판", flex: 1 },
    {
      field: "lastVisit",
      headerName: "로그인일시",
      flex: 2.5,
      renderCell: (params) => {
        return <div>{ktimeTransFour(params.formattedValue)}</div>
      },
    },
    {
      field: "lastRechargedAt",
      headerName: "최근입금일",
      flex: 2.5,
      renderCell: (params) => {
        return (
          <div>
            {params.formattedValue.includes("충전 기록") || !params.formattedValue
              ? "충전기록 없음"
              : ktimeTransFour(params.formattedValue)}
          </div>
        )
      },
    },
    { field: "lastAccessedCountry", headerName: "접속국가", flex: 1.5, align: "center" },
    {
      field: "sendNote",
      headerName: "쪽지",
      flex: 1,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ ...inputSS, backgroundColor: "#225F8B" }}
              onClick={(event) => handleClickNote(event, params)}
            >
              쪽지
            </button>
          </>
        )
      },
    },
    {
      field: "bettingLogs",
      headerName: "베팅",
      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ ...inputSS, backgroundColor: "#2F82FF" }}
              onClick={() => window.open(`/userBetDetailTable/${params.row.id}`, "_blank", "width=1450, height=800")}
            >
              베팅
            </button>
          </>
        )
      },
    },
    {
      field: "boardList",
      headerName: "게시글",
      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button style={{ ...inputSS, backgroundColor: "#5386B5" }} onClick={() => awayBoards(event, params)}>
              게시글
            </button>
          </>
        )
      },
    },
    {
      field: "extract",
      headerName: "튕김",
      flex: 1.16,
      marginRight: 2,

      renderCell: (params) => {
        return (
          <button
            type="button"
            onClick={(event) => kickfn(event, params)}
            style={{ ...inputSS, backgroundColor: "red", color: "white" }}
          >
            튕김
          </button>
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
  const [data, setData] = useState()

  const { userToken } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [accountId, setAccoutid] = useState()
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    if (router.isReady) {
      reQuestJson()
    }
  }, [router])

  const [selectedIds, setSelectedIds] = useState([])
  const handleSelection = (ids) => {
    const value = data.filter((data) => data.id === ids[0])
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
  return (
    <>
      <CustomHeader text={`회원관리 - 현재 접속자 & 메세지`} customStyle={{ height: "1.979vw", width: "100%" }} />

      <div className={styles.tableContainer}>
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
          rows={data ? data : []}
          columns={newColumns}
          slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
            sorting: {
              sortModel: [{ field: "lastVisit", sort: "desc" }],
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
        />
      </div>
      <NoteBoard users={data ? data : []} settingId={selectedIds} />
    </>
  )
}
