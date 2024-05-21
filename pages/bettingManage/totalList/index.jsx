import React from "react"
import Layout from "@components/Layout"
import TotalList from "./component/TotalList"
function index() {
  return (
    <div>
      <TotalList />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
