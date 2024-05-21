import React from "react"
import Layout from "@components/Layout"
import SubscribeManage from "./component/SubscribeManage"
function index() {
  return (
    <div>
      <SubscribeManage />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
