import React from "react"
import Layout from "@components/Layout"
import PreMarketSettings from "./component/PreMarketSettings"
function index() {
  return (
    <div>
      <PreMarketSettings />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
