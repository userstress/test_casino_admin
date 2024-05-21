import React from "react"
import Layout from "@components/Layout"
import GameBetList from "./component/GameBetList"
function index() {
  return (
    <div>
      <GameBetList />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
