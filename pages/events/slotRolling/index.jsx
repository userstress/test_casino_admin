import React from "react"
import ReceiveList from "./ReceiveList/ReceiveList"
import Layout from "@components/Layout"

export default function index() {
  return <ReceiveList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
