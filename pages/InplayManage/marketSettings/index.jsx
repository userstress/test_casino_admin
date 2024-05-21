import React from "react"
import Layout from "@components/Layout"
import MarketSettings from "./component/MarketSettings"
function index() {
  return (
    <div>
      <MarketSettings />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
