import React from "react"
import Layout from "@components/Layout"
import PreSubscribeManage from "./component/PreSubscribeManage"
function index() {
  return (
    <div>
      <PreSubscribeManage />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
