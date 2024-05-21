import React, { useState, useEffect } from "react"
import styles from "./UserCancle.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import CustomSelect from "@components/customselect/CustomSelect"
import CustomTable from "../../../../components/customTable/CustomTable"
import { getCookie } from "cookies-next"
import { addCommasToNumber } from "@utils/formatNumberWithCommas"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"
import DetailList from "@components/cumstomDetailList/DetailList"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import DayTransform from "@utils/DayTransform"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

function UserCancle() {
  const router = useRouter()
  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const [apiData, setApiData] = useState()

  const formattedDate = today.toISOString().split("T")[0]
  const mytoken = getCookie("token")
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const columns = [
    {
      field: "cancleBet",
      headerName: "베팅취소",
      maxWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        function handleCanclebet(event) {
          event.preventDefault()
          event.stopPropagation()
          console.log(params)
          toast.success("처리 중입니다")
        }
        return (
          <div className={styles.cancleBtnBox}>
            {!params.formattedValue ? (
              <button type="button" className={styles.cancleBtn} onClick={handleCanclebet}>
                베팅취소
              </button>
            ) : null}
          </div>
        )
      },
    },
    {
      field: "betGroupId",
      headerName: "No.",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "username", headerName: "ID", flex: 1, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "betFoldType",
      headerName: "벳타입",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "betType",
      headerName: "타입",

      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "betStartTime",
      headerName: "베팅시간",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "betBalance",
      headerName: "베팅금",

      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.formattedValue > 0 ? addCommasToNumber(params.formattedValue) : "0원"}</div>
      },
    },
    {
      field: "betPrice",
      headerName: "배당률",

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "processTime",
      headerName: "당첨금",

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "foler",
      headerName: "결과",

      flex: 0.5,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "processedAt",
      headerName: "처리일시",

      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        return DayTransform(params.formattedValue)
      },
    },
    {
      field: "FOLD",
      headerName: "폴더",

      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orderStatus",
      headerName: "상태",

      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "IP",

      headerAlign: "center",
      align: "center",
      flex: 1.3,
    },
    {
      field: "logBtn",
      headerName: "상세내역",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <DetailList transactionId={params.row.transactionId} />
      },
    },
    {
      field: "balance",
      headerName: "머니",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // const handlechVal = (event, count) => {
        //   return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        // }

        const inputSS = {
          width: "30px",
          marginLeft: "1px",
          marginRight: "2px",
          fontSize: "10px",
          textAlign: "center",
          padding: "0",
        }
        return (
          <>
            {/* onClick={(event) => handlechVal(event, 1)} */}
            <button style={inputSS}>머니</button>
          </>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      minWidth: 70,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handlechVal = (event, count) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

        const inputSS = {
          width: "30px",
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
  ]

  React.useEffect(() => {}, [])

  function changePage() {
    const method = "GET"
    const url = `/api/v2/cancelledBets/user`
    const headers = { Authorization: userToken }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("잘못된 요청입니다.")
      } else if (errorStatus === 400) {
        return toast.warn("잘못된 요청입니다.", {})
      } else if (errorStatus === 403 || errorStatus === 401) {
        return toast.warn("로그인을 다시 해 주세요", {
          onClose: () => router.push("/"),
        })
      } else if (errorStatus === 404) {
        return toast.warn("서버의 응답이 없습니다.", {})
      } else if (!errorStatus && responseData) {
        setApiData(responseData.data)
        console.log(responseData.data)
      }

      return false
    })

    return null
  }
  useEffect(() => {
    if (router.isReady && !apiData) {
      changePage()
    }
    const toggleData = () => {
      changePage()
    }

    const intervalId = setInterval(toggleData, 10000) // 5초마다 toggleData 실행
    return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [datepick.start, apiData, router.isReady])

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
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"전체 유저 취소 베팅 목록 (전체 : 8532)"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5", fontWeight: 500 }}
        >
          <div className={styles.TotalMoney}>
            <span>베팅금: 2,816,258,336원</span>
            <span>당첨금: 2,710,256,336원</span>
            <span>합계: 106,002,000원</span>
          </div>
        </CustomHeader>
        <CustomBar
          customStyle={{ padding: "0.260vw 0", backgroundColor: "#E5E5E5", display: "flex", justifyContent: "center" }}
        >
          <div className={styles.centerBox}>
            <input htmlFor="dayCheck" id="dayCheck" type="checkbox" />
            <label htmlFor="dayCheck">전체날짜</label>
            <DatePickerComponent
              getDate={handleEndDateChange}
              customStyle={{
                marginLeft: "10px",
                justifyContent: "space-around",
                width: "fit-content",
              }}
            />
          </div>
        </CustomBar>

        <div className={styles.tableContainer}>
          {/* 이부분 상세내역있으면 무조건 복사해야함 */}
          <DataGridPremium
            columns={columns}
            rows={apiData ? apiData : []}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={25} // 행 높이를 10%로 설정
            columnHeaderHeight={25} // 헤더 높이를 5%로 설정
            autoHeight={true}
            disableColumnResize={true}
            sx={{
              width: "100%",

              "& .MuiDataGrid-overlay": {
                zIndex: 1,
                position: "relative",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3A6287",
                color: "white",
                fontsize: "11px",
                fontSize: "11px",
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
              ".MuiDataGrid-main": {
                overflow: "visible !important",
              },
              ".MuiDataGrid-main > div:nth-child(3)": {
                display: "none !important",
              },
              ".MuiDataGrid-virtualScroller": {
                overflow: "visible !important",
                overflowY: "visible !important",
              },
            }}
            slots={{ toolbar: CustomToolbar }} // 툴바 설정 필터 행간격 등
            getRowId={(row) => row.betGroupId}
          />
        </div>
      </div>
    </>
  )
}

export default UserCancle
