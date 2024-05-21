import Layout from "@components/Layout"
import React from "react"
import ChangeLog from "./userInfoChangeLog/ChangeLog"

export default function index() {
  return <ChangeLog />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
