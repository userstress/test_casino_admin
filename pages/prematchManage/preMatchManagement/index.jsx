import React from "react"
import Layout from "@components/Layout"
import PreManagement from "./component/PreManagement"
function index() {
  return (
    <div>
      <PreManagement />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
