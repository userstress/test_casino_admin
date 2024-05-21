import Layout from "@components/Layout"
import React, { useState } from "react"
import SettingList from "./settingList/SettingList"

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
        <SettingList />
      )}
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
