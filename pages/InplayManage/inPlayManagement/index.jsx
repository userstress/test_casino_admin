import React from "react"
import Layout from "@components/Layout"
import InPlayManagement from "./component/InPlayManagement"
function index() {
  return (
    <div>
      <InPlayManagement />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
