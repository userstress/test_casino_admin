// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ChargeRegList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { useState, useEffect, Ref, useRef } from "react"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import dateSortComparator from "@utils/REST/LIST/dateSort"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { addCommasToNumber, currencyFormatter } from "@utils/formatNumberWithCommas"
import { GetDataFn } from "@utils/REST/serviceLayer/getFetch"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import baseUrl from "@utils/REST/baseUrl"
import axios from "axios"
import { fetchDate } from "@utils/DayTransform"

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME

// 137 충전/환전 관리
export default function ChargeRegListCon() {
  const { sendRequest } = useAxiosRequest()
  const [noteAdd, setNote] = useState([])
  const [noteWhole, setWhole] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [Listof, setList] = useState([])
  const [levelBonusPoint, setLevelBonusPoint] = useState([])
  const [checklevels, setLevels] = useState(Array.from({ length: 10 }, (_, i) => ({ lv: i + 1, check: false })))
  const [onfftoggle, setToggle] = useState(false)
  const [checkList, setCheckList] = useState([])

  function chToggle() {
    if (onfftoggle) {
      if (confirm("모두 비활성화 하시겠습니까?")) {
        // 모든 checkbox가 true 가 되야함
        setLevels((levels) => levels.map((l) => ({ ...l, check: true })))
        setToggle(false)
        return setChargeBonusSet()
      } else {
        return null
      }
    }

    if (!onfftoggle) {
      if (confirm("모두 활성화 하시겠습니까?")) {
        // 모든 checkbox가 false 가 되야함
        setLevels((levels) => levels.map((l) => ({ ...l, check: false })))
        setToggle(true)
        return setChargeBonusSet()
      } else {
        return null
      }
    }
  }

  const fetchData = async () => {
    try {
      console.log("Starting fetchData...") // 시작 로그

      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION", "AUTO_APPROVAL", "TIMEOUT"]
      console.log("Base URL:", baseUrl) // URL 확인 로그

      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios
            .get(
              `${baseUrl}api/v2/managers/rt/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: getCookie("token"), // 'Bearer ' 접두어가 필요한 경우 추가
                },
              },
            )
            .then((response) => ({
              data: response.data,
              status, // 응답 객체에 status 추가
            })),
        ),
      )

      console.log("--------")
      console.log(responses)
      console.log("--------")
      // responses 배열은 이제 각 요소마다 status 값을 포함합니다.
      const apiDataCombined = responses.flatMap((response) =>
        response.data.map((item) => {
          const { id, ...walletWithoutId } = item.wallet // wallet에서 id 속성을 제외
          return {
            ...item,
            ...walletWithoutId, // id가 제외된 wallet 객체를 스프레드
            walletId: id, // 원래의 wallet.id를 walletId로 명시적으로 추가
            status: response.status, // 각 아이템에 status 값을 추가
            processedAt: item.processedAt,
          }
        }),
      )

      setList(apiDataCombined)
      if (optionData && options !== "all" && apiDataCombined) {
        changeOption(options, apiDataCombined)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // 서버상태에 따라 눈에 보이는 매충지급 상태 변경
  const updateLevelsFromApi = (apiDataArray) => {
    setLevels((currentLevels) =>
      currentLevels.map((level) => {
        // apiDataArray에서 현재 레벨(lv)과 일치하는 객체를 찾음
        const apiData = apiDataArray.find((data) => data.lv === level.lv)
        // 일치하는 객체가 있고, 그 객체의 bonusActive가 false라면 check를 true로 설정
        return apiData ? { ...level, check: !apiData.bonusActive } : level
      }),
    )

    // apiDataArray의 모든 항목이 bonusActive가 false인지 확인
    const allBonusActiveFalse = apiDataArray.every((data) => data.bonusActive === false)
    if (allBonusActiveFalse) {
      // 모든 bonusActive가 false라면 토글 상태를 변경
      setToggle(false)
    }
  }

  // 레벨 보너스 지급 설정값 호출
  const getAllBonus = () => {
    const method = "GET"
    const url = `/api/v2/managers/level-bonus-setting/all`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        setLevelBonusPoint(responseData.data)
        updateLevelsFromApi(responseData.data)
      }
      return false
    })
  }

  // 레벨별 매충 설정값 업데이트
  const setChargeBonusSet = () => {
    const method = "POST"
    const url = `/api/v2/managers/level-bonus-setting/update-bonus-activation`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    const body = checklevels.filter((cur) => cur.check === false).map((level) => level.lv)

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        toast.success("변경했습니다")
      } else {
        toast.success("변경하지못했습니다 관리자에게 문의 해 주세요")
      }
      return false
    })
  }

  // levels 상태 업데이트
  const settingCheck = (level) => {
    setLevels((levels) => levels.map((l) => (l.lv === level ? { ...l, check: !l.check } : l)))
  }

  // 날짜 업데이트
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  // 날짜 업데이트
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  // 테이블 값 변경
  const handleEditCellChange = (id, value) => {
    setList(Listof.map((row) => (row.id === id ? { ...row, bonus: value } : row)))
  }

  const columns = [
    { field: "lv", headerName: "Lv", minWidth: "40", maxWidth: "40", align: "center" },
    {
      field: "kwak",
      headerName: "관리자",
      flex: 1,

      align: "center",
      renderCell: (parmas) => {
        return SITE_NAME
      },
    },
    {
      field: "username",
      headerName: "아이디(닉네임)",
      flex: 1,

      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.formattedValue}({params.row.nickname})
          </div>
        )
      },
    },
    { field: "ownerName", headerName: "입금자", minWidth: "60", maxWidth: "60", align: "center" },
    {
      field: "rechargeAmount",
      headerName: "입금금액",
      flex: 1.5,
      minWidth: "100",
      type: "number",
      renderCell: (params) => {
        const money = Number(params.row.rechargeAmount)
        if (money < 100000) {
          return (
            <div
              style={{
                backgroundColor: "#FFA700",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  marginRight: "2px",
                  width: "90%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {currencyFormatter(money)}
              </div>
            </div>
          )
        }
        if (1000000 > money && money >= 100000) {
          return (
            <div
              style={{
                backgroundColor: "#008000",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  marginRight: "2px",
                  width: "90%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {currencyFormatter(money)}
              </div>
            </div>
          )
        }
        if (1000000 <= money) {
          return (
            <div
              style={{
                backgroundColor: "#E40505",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              <div
                type="text"
                style={{
                  lineHeight: "90%",
                  marginRight: "2px",
                  width: "90%",
                  height: "20px",
                  border: "solid 1px black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {currencyFormatter(money)}
              </div>
            </div>
          )
        }
      },
    },

    {
      field: "lastRechargedAt",
      headerName: "최근입금일",
      flex: 1.5,
      align: "center",
      renderCell: (params) => {
        return fetchDate(params.formattedValue)
      },
    },
    { field: "lastWithdrawalDate", headerName: "최근 출금일", flex: 1.5, align: "center" },

    {
      field: "balance",
      headerName: "보유머니",
      flex: 1.5,
      align: "center",
      renderCell: (params) => {
        return addCommasToNumber(params?.row?.wallet?.sportsBalance)
      },
    },
    { field: "betLeft", headerName: "남은베팅", flex: 1.5, align: "center" },

    {
      field: "bonus",
      headerName: "보너스",
      flex: 2.5,

      align: "center",
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const handlechVal = (event, count) => {
          event.stopPropagation()
          const numbers = Math.ceil((Number(params.row.amount) * count) / 100)
          handleEditCellChange(params.id, numbers)
        }
        const handleInputs1 = (event) => {
          let inputBonus = event.target.value
          inputBonus = Number(inputBonus)

          if (!isNaN(inputBonus)) {
            handleEditCellChange(params.id, inputBonus)
          } else {
            handleEditCellChange(params.id, 0)
          }
        }
        const inputSS = {
          width: "25px",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        if (!params.row.id) return null
        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              1%
            </button>
            <button style={inputSS} onClick={(event) => handlechVal(event, 2)}>
              2%
            </button>
            <button style={inputSS} onClick={(event) => handlechVal(event, 3)}>
              3%
            </button>
            <button style={inputSS} onClick={(event) => handlechVal(event, 5)}>
              5%
            </button>
            <button style={inputSS} onClick={(event) => handlechVal(event, 10)}>
              10%
            </button>
            <input type="text" style={{ width: "90px" }} value={params.formattedValue} onChange={handleInputs1} />
          </>
        )
      },
    },

    {
      field: "createdAt",
      headerName: "등록날짜",
      flex: 1.7,

      align: "center",
      sortComparator: dateSortComparator,
      sortable: true,
    },
    { field: "processedAt", headerName: "처리 날짜", flex: 1.7, align: "center" },
    {
      field: "status2",
      headerName: "처리상태",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        let show

        if (params.row.status.includes("APPROVAL")) {
          show = "완료"
        }
        if (params.row.status === "TIMEOUT") {
          show = "입금시간만료"
        }
        if (params.row.status === "CANCEL") {
          show = "취소"
        }
        if (params.row.status === "WAITING") {
          show = "대기"
        }
        if (params.row.status === "UNREAD") {
          show = "읽지 않음"
        }
        return show
      },
    },
    {
      field: "infoes",
      headerName: "회원",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const [bonusInputVal, setval] = useState()

        const handlechVal = (event, count) => {
          return window.open(`/getUserInfoes/${params.row.user.id}`, "유저 정보", "width=1500, height=900")
        }
        const inputSS = {
          width: "80%",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        if (!params.row.id) return null

        return (
          <>
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              정보
            </button>
          </>
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
        const [bonusInputVal, setval] = useState()

        const handlechVal = (event, count) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

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
            <button style={inputSS} onClick={(event) => handlechVal(event, 1)}>
              쪽지
            </button>
          </>
        )
      },
    },
    {
      field: "status",
      headerName: "자동 입금",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.formattedValue === "AUTO_APPROVAL" ? (
              <div style={{ color: "0000FF" }}>문자 확인</div>
            ) : (
              <div style={{ color: "red" }}>문자 미확인</div>
            )}
          </div>
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

  // 제목부분 클릭시 페이지 이동
  const handleCellClick = (e) => {
    if (e.field == "title") {
      // router.push(`/notice/${e.id}`)
    }
  }
  //페이지 크기 변경시 사이즈 업뎃
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }
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

  const apiRef = useGridApiRef()

  useEffect(() => {
    getAllBonus()
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [datepick, noteAdd])

  useEffect(() => {}, [Listof])

  return (
    <>
      <section className={styles.customBarInner}>
        <pannel className={styles.pannelWrapper}>
          <div className={styles.checkboxBoxTitle}>
            <span>매충 지급 설정</span>
            <button type="button" onClick={() => chToggle()} className={styles.toggleBtns}>
              지급 {onfftoggle ? "ON" : "OFF"}
            </button>
          </div>
          <div className={styles.checkboxPannel}>
            <figure className={styles.checkboxInv}>
              {checklevels &&
                checklevels.map(({ lv, check }) => (
                  <div key={lv}>
                    <input type="checkbox" id={`${lv}`} checked={check} onChange={() => settingCheck(lv)} />
                    <label htmlFor={`${lv}`}>레벨{lv}</label>
                  </div>
                ))}
            </figure>
            <button className={styles.sendLvSetting} onClick={() => setChargeBonusSet()}>
              적용
            </button>
          </div>
        </pannel>
      </section>
      <CustomBar>
        <div className={styles.buttonG02}>
          <div style={{ height: "100%" }}>
            <DatePickerComponent
              text={"시작일자 :"}
              getDate={handleStartDateChange}
              customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
            />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
          <div style={{ height: "100%" }}>
            <DatePickerComponent
              text={"종료일자 :"}
              getDate={handleEndDateChange}
              customStyle={{ justifyContent: "space-around" }}
            />
          </div>
        </div>
      </CustomBar>
      <CustomBar customStyle={{ padding: "0.260vw 0.156vw", justifyContent: "space-between" }}>
        <div className={styles.btnGroup1}>
          <div className={styles.btnheaders}>
            <button className={styles.buttonsto}>입금 처리</button>
            <button className={styles.buttonsto}>전체 대기 처리</button>
            <button className={styles.buttonsto}>입금 취소</button>
          </div>

          {/* <div className={styles.btnheaders}>
            <button className={styles.buttonsto}>자동 OFF</button>
            <button className={styles.buttonstoRed}>미확인</button>
          </div> */}
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <div className={styles.boxContainer}>
          {/* DataGrid Pro 쓰면 자동 컬럼 resize들어가서 일반 DataGrid */}
          <DataGridPremium
            className={styles.gridmaincustom}
            onPaginationModelChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",

              "& .MuiDataGrid-overlay": {
                zIndex: 1,
                position: "relative",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3A6287",
                color: "white",
                fontsize: "13px",
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
                padding: 0, // 빼면안됨 중앙정렬 안댐
                fontFamily: "SCDream",
                fontSize: "12px",
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
            rows={Listof || []}
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
            checkboxSelection
            onCellClick={(e) => handleCellClick(e)}
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
          />
        </div>
      </div>
    </>
  )
}
