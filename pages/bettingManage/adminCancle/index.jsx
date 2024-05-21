import React from "react"
import Layout from "@components/Layout"
import AminCancle from "./component/AminCancle"
function index() {
  return (
    <div>
      <AminCancle />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
