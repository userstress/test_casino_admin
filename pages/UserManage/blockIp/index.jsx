import React from "react"
import BlockIp from "./component/BlockIp"
import Layout from "@components/Layout"

export default function index() {
  return <BlockIp />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
