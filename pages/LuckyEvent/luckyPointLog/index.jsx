import Layout from "@components/Layout"
import React from "react"
import LuckyPointLogList from "./luckyPointLogList/LuckyPointLogList"

export default function index() {
  return <LuckyPointLogList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
