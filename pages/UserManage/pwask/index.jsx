import React from "react"
import PwAsk from "./component/PwAsk"
import Layout from "@components/Layout"

export default function index() {
  return <PwAsk />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
