import Layout from "@components/Layout"
import React from "react"
import ReffererCode from "./reffererCode/ReffererCode"

export default function index() {
  return <ReffererCode />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
