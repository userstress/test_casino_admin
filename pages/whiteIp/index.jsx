import React from "react"
import WhiteIp from "./component/WhiteIp"
import Layout from "@components/Layout"

export default function index() {
  return <WhiteIp />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
