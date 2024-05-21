import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomBar from "@components/custombar/CustomBar"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import CustomSelect from "@components/customselect/CustomSelect"
import CustomInput from "@components/customInput/CustomInput"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { DataGridPremium } from "@mui/x-data-grid-premium"
import localizedTextsMap from "@utils/Tables/localizedTextsMap"
import CustomButton from "@components/customButton/CustomButton"
import { useTranslation } from "react-i18next"
import ArrayToMap, { handleMapChange, mapOfMapsToArray } from "@utils/ArrayToMap"
import { useRouter } from "next/router"
import { boardListofAll } from "@utils/states/resultStatus"

const columnHeaderStyle = {
  lineHeight: "5",
}

function index() {
  const [list, setList] = useState()
  const [tableDataTrans, setTransData] = useState(new Map())
  const router = useRouter()
  function handleInputCell(val) {
    setList(mapOfMapsToArray(val))
    setTransData(val)
  }

  const { sendRequest } = useAxiosRequest()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [pageSize, setPageSize] = useState(20)
  const [selectionModel, setSelectionModel] = useState([])
  const { t: tDefault } = useTranslation() // 기본 언어 (예: 한국어)
  const [searchState, setSearch] = useState({})

  function requestList() {
    const method = "GET"
    const url = `http://localhost:8080/getSport/0`
    // const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, null, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data
        // setList(result)
      }
      return false
    })
  }

  useEffect(() => {
    if (router.isReady) {
      setList([
        {
          id: 0,
          leagueName: "E-Soccer Battle (E) - 8 mins play",
          locationName: "International",
          sportsName: "Football",
          type: "1X2",
          startDate: "20240315183400",
          status: "3",
          homeName: "A.madrid (Sane4ek8) Esports",
          homeScore: 1,
          awayName: "Manchester United (BlackStar98)",
          awayScore: 2,
        },
      ])
      setTransData(
        ArrayToMap([
          {
            id: 0,
            leagueName: "E-Soccer Battle (E) - 8 mins play",
            locationName: "International",
            sportsName: "Football",
            type: "1X2",
            startDate: "20240315183400",
            status: "3",
            homeName: "A.madrid (Sane4ek8) Esports",
            homeScore: 1,
            awayName: "Manchester United (BlackStar98)",
            awayScore: 2,
          },
        ]),
      )
    }
  }, [router.isReady])

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const propagate = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const moveTo = (event, params) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const columns = [
    {
      field: "matchName",
      headerName: "게임종류",
      flex: 3,
      renderCell: (params) => {
        return (
          <select className={styles.cell} onClick={(event) => propagate(event)}>
            <option name="" id="" value="승무패">
              승무패
            </option>
            <option name="" id="" value="크로스">
              크로스
            </option>
            <option name="" id="" value="핸디캡">
              핸디캡
            </option>
            <option name="" id="" value="스페셜1">
              스페셜1
            </option>
            <option name="" id="" value="스페셜2">
              스페셜2
            </option>
          </select>
        )
      },
    },
    {
      field: "type",
      headerName: "게임타입",
      flex: 3,
      renderCell: (params) => {
        return (
          <select
            className={styles.cell}
            onClick={(event) => propagate(event)}
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "sports", event.target.value, tableDataTrans))
            }
          >
            <option name="" id="" value="1X2">
              승무패
            </option>
            <option name="" id="" value="12">
              승패
            </option>
            <option name="" id="" value="Handicap">
              핸디캡
            </option>
            <option name="" id="" value="Under/Over">
              언/오버
            </option>
          </select>
        )
      },
    },
    {
      field: "leagueName",
      flex: 3,
      renderHeader: (params) => (
        <div className={styles.columnBox3Stack}>
          <span>종목</span>
          <span>나라명</span>
          <span>리그명</span>
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className={styles.cells} style={{ textAlign: "center" }} onClick={(event) => propagate(event)}>
            <input
              defaultValue={tDefault(params.row.homeName)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "homeName", event.target.value, tableDataTrans))
              }
            />
            <input
              defaultValue={tDefault(params.row.sportsName)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "sportsName", event.target.value, tableDataTrans))
              }
            />
            <input
              defaultValue={tDefault(params.row.locationName)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "locationName", event.target.value, tableDataTrans))
              }
            />
          </div>
        )
      },
    },
    {
      field: "homeName",
      headerName: "홈팀",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={`${styles.cells} ${styles.flexboxes}`} style={{ textAlign: "center" }}>
            <input
              defaultValue={tDefault(params.row.homeName)}
              onClick={(event) => propagate(event)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "homeName", event.target.value, tableDataTrans))
              }
            />
          </div>
        )
      },
    },
    {
      field: "winRate",
      headerName: "승/오버",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={styles.cells}>
            <input
              className={styles.ratioInput}
              defaultValue="1.24"
              onClick={(event) => propagate(event)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "winRate", event.target.value, tableDataTrans))
              }
              // value={Math.round(params.value * 100) / 100}
              // onChange={(e) => handleChange(params.row.fixtureId, "winRate", e.target.value)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "#FFA700" }}>
              <span>20%</span>
              <span>1명</span>
              <span>5000원</span>
              {/* <span>{params.row.ratio}</span> */}
              {/* <span>{params.row.WinUserCount}명</span>
              <span>{params.row.totalWinBalance}원</span> */}
            </div>
          </div>
        )
      },
    },
    {
      field: "drawRate",
      headerName: "무/기준점",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={styles.cells}>
            <input
              className={styles.ratioInput}
              defaultValue="3.24"
              onClick={(event) => propagate(event)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "drawRate", event.target.value, tableDataTrans))
              }
              // value={Math.round(params.value * 100) / 100}
              // onChange={(e) => handleChange(params.row.fixtureId, "winRate", e.target.value)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "#FFA700" }}>
              <span>20%</span>
              <span>1명</span>
              <span>5000원</span>
              {/* <span>{params.row.ratio}</span> */}
              {/* <span>{params.row.WinUserCount}명</span>
            <span>{params.row.totalWinBalance}원</span> */}
            </div>
          </div>
        )
      },
    },
    {
      field: "loseRate",
      headerName: "패/언더",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={styles.cells} onClick={propagate}>
            <input
              className={styles.ratioInput}
              defaultValue="1.24"
              onClick={(event) => propagate(event)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "loseRate", event.target.value, tableDataTrans))
              }
              // value={Math.round(params.value * 100) / 100}
              // onChange={(e) => handleChange(params.row.fixtureId, "winRate", e.target.value)}
            />
            <div className={styles.inputRatio} style={{ backgroundColor: "red" }}>
              <span>20%</span>
              <span>1명</span>
              <span>5000원</span>
              {/* <span>{params.row.ratio}</span> */}
              {/* <span>{params.row.WinUserCount}명</span>
            <span>{params.row.totalWinBalance}원</span> */}
            </div>
          </div>
        )
      },
    },
    {
      field: "awayName",
      headerName: "어웨이팀",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={`${styles.cells} ${styles.flexboxes}`} style={{ textAlign: "center" }}>
            <input
              defaultValue={tDefault(params.row.awayName)}
              onClick={(event) => propagate(event)}
              onChange={(event) =>
                handleInputCell(handleMapChange(params.row.id, "awayName", event.target.value, tableDataTrans))
              }
            />
          </div>
        )
      },
    },
    {
      field: "totalBet",
      headerName: "총베팅",
      flex: 3,
      renderCell: (params) => {
        return (
          <div className={`${styles.cells} ${styles.flexboxes}`} style={{ textAlign: "center" }}>
            {`${tDefault("3")}명`}
          </div>
        )
      },
    },
    {
      field: "score",
      headerName: "스코어",
      flex: 3.3,
      renderCell: (params) => {
        return (
          <div className={`${styles.cells} ${styles.flexboxes}`} style={{ textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <input
                style={{ width: "40%" }}
                onChange={(event) =>
                  handleInputCell(handleMapChange(params.row.id, "homeScore", event.target.value, tableDataTrans))
                }
              />
              &nbsp; : &nbsp;
              <input
                style={{ width: "40%" }}
                onChange={(event) =>
                  handleInputCell(handleMapChange(params.row.id, "awayScore", event.target.value, tableDataTrans))
                }
              />
            </div>
          </div>
        )
      },
    },
    {
      field: "result",
      headerName: "결과",
      flex: 3,
      renderCell: (params) => {
        return (
          <select
            className={styles.cell}
            onClick={(event) => propagate(event)}
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "result", event.target.value, tableDataTrans))
            }
          >
            <option name="" id="" value="1X2">
              승/오버
            </option>
            <option name="" id="" value="12">
              패/언더
            </option>
            <option name="" id="" value="Handicap">
              무승부
            </option>
            <option name="" id="" value="Under/Over" style={{ color: "red" }}>
              적특
            </option>
          </select>
        )
      },
    },
    {
      field: "bet",
      headerName: "베팅",
      flex: 2,
      renderCell: (params) => {
        return (
          <div>
            <button style={{ width: "80px" }} type="button" onClick={(event) => moveTo(event, params)}>
              내역
            </button>
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

  const [selectedIds, setSelectedIds] = useState([])

  const handleSelection = (ids) => {
    const value = list.filter((data) => data.id === ids[0])
    setSelectedIds(ids)
  }
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
    setNote([])
    setWhole(false)
  }

  const apiRef = useGridApiRef()

  const handleCellClick = (e) => {}

  useEffect(() => {
    requestList()
  }, [datepick])

  console.log(list)
  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>게임 결과 등록 게임 관리 (수동 처리된 게임인 경우만 가능)</div>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center", alignItems: "center", marginLeft: "30px" }}>
        <select style={{ width: "100px", marginRight: "5px", textAlign: "center", marginLeft: "30px" }}>
          {boardListofAll.map((lists) => {
            return <option value={lists.parameters}>{lists.name}</option>
          })}
        </select>
        <select style={{ width: "100px", marginRight: "5px", textAlign: "center", marginLeft: "30px" }}>
          {["축구", "야구", "농구", "배구", "완료", "취소", "처리완료"].map((lists) => {
            return <option>{lists}</option>
          })}
          <option value=""></option>
        </select>
        <select style={{ width: "100px", marginRight: "5px", textAlign: "center", margin: "0 30px" }}>
          {["분데스리가", "EPL", "LA LIGA", "브라질", "완료", "취소", "처리완료"].map((lists) => {
            return <option>{lists}</option>
          })}
          <option value=""></option>
        </select>
        팀명 :
        <input placeholder={"검색어를 입력하세요"} style={{ width: "200px", marginLeft: "5px" }} />
        <button style={{ background: "#D9D9D9", border: "none", width: "150px", height: "30px", margin: "0 30px" }}>
          조회하기
        </button>
        <button style={{ background: "#D9D9D9", border: "none", width: "150px", height: "30px", marginRight: "30px" }}>
          전체보기
        </button>
        <button style={{ background: "#D9D9D9", border: "none", width: "150px", height: "30px", marginRight: "30px" }}>
          선택결과처리
        </button>
      </CustomBar>

      <div className={styles.tableContainer}>
        {list && (
          <DataGridPremium
            className={styles.gridmaincustom}
            onPageSizeChange={handlePageSizeChange}
            // sx = datagrid 내부 요소들의 커스텀 스타일링
            sx={{
              width: "100%",
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
                fontSize: "11px", //커스텀 폰트 사이즈
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
            rowHeight={60} // 행 높이를 10%로 설정
            columnHeaderHeight={60} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={list}
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
            checkboxSelection={true}
            onCellClick={(e) => handleCellClick(e)}
            localeText={localizedTextsMap}
            density="comfortable" //초기 설정 행간격 최대
            auto
            onRowSelectionModelChange={(params) => handleSelection(params)}
            selectionModel={selectionModel}
            disableColumnResize={true}
          />
        )}
      </div>
    </>
  )
}

export default index

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
