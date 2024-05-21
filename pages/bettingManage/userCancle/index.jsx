import React from "react"
import Layout from "@components/Layout"
import UserCancle from "./component/UserCancle"
function index() {
  return (
    <div>
      <UserCancle />
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
