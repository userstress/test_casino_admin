import Layout from "@components/Layout"
import React, { useState } from "react"
import AttendanceCheckTypeCList from "./attendanceCheckTypeCList/AttendanceCheckTypeCList"

export default function index() {
  const [correct, setCorrect] = useState(false)

  return (
    <div>
      {!correct ? (
        <>
          <input type="text"></input>
          <button onClick={() => setCorrect(true)}>확인</button>
          <button>이전</button>
        </>
      ) : (
        <AttendanceCheckTypeCList />
      )}
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
