import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import React, { useEffect, useState } from "react"
import styles from "./LevelManagementList.module.css"
import { useGridApiRef } from "@mui/x-data-grid"
import axios from "axios"
import { getCookie } from "cookies-next"

//125 레벨별 관리
export default function LevelManagementList() {
  const [rows, setRows] = useState()
  const columns = [
    {
      field: "lv",
      headerName: "레벨",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        if (params.formattedValue) {
          return <div>{params.formattedValue}</div>
        }
        return <div>합계</div>
      },
    },
    {
      field: "정상",
      headerName: "정상",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    { field: "단폴", headerName: "단폴", width: 70, flex: 0.8, headerAlign: "center", align: "center", type: "number" },
    { field: "배당", headerName: "배당", width: 70, flex: 0.8, headerAlign: "center", align: "center", type: "number" },
    {
      field: "호원",
      headerName: "호원",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "불량",
      headerName: "불량",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "악의",
      headerName: "악의",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    { field: "정지", headerName: "정지", width: 70, flex: 0.8, headerAlign: "center", align: "center", type: "number" },
    {
      field: "하락탈퇴",
      headerName: "하락탈퇴",
      width: 80,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "탈퇴1",
      headerName: "탈퇴1",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "탈퇴2",
      headerName: "탈퇴2",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "탈퇴3",
      headerName: "탈퇴3",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "고액",
      headerName: "고액",
      width: 70,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
  ]

  const aggre = columns.reduce((acc, column) => {
    if (column.field) {
      acc[column.field] = "sum"
    }
    return acc
  })
  const updatedColumns = columns.map((column, index) => {
    if (index !== 0 && column.field) {
      return {
        ...column,
        renderCell: (params) => {
          return <div>{params.formattedValue}명</div>
        },
      }
    }
    return column
  })

  const apiRef = useGridApiRef()
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${getCookie("token")}`,
  }
  async function fetchLevelsData() {
    const baseUrl = "https://dailymodelapp.com/api/v2/admins/lv/list?level="
    let levelsData = []
    console.log(headers)

    try {
      for (let level = 1; level <= 10; level++) {
        const response = await axios.get(`${baseUrl}${level}`, { headers: headers })
        const data = response.data // 응답 데이터를 가져옵니다.

        // 응답 데이터에서 level 값을 키로 하여 해당 데이터를 변환하고 levelsData 배열에 추가합니다.
        // lv 파라미터를 추가하고, 해당 level에 대한 데이터를 복사합니다.
        const transformedData = { lv: level, ...data[level.toString()] }
        levelsData.push(transformedData)
      }
      setRows(levelsData) // 모든 요청이 성공적으로 완료된 후 배열을 반환합니다.
    } catch (error) {
      console.error("Error fetching data:", error)
      // 오류가 발생하면 빈 배열 또는 오류 메시지를 반환할 수 있습니다.
      return []
    }
  }

  useEffect(() => {
    fetchLevelsData()
  }, [])

  useEffect(() => {}, [rows])
  return (
    <>
      <CustomHeader text={"레벨 리스트"} customStyle={{ height: "38px", width: "100%" }} />
      <div className={styles.tableContainer}>
        <CustomTable
          refs={apiRef}
          columns={updatedColumns}
          rows={rows ? rows : []}
          checkbox={false}
          aggregations={aggre}
          defaultIds={"lv"}
        />
      </div>
    </>
  )
}
