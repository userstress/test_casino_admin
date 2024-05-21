import Layout from "@components/Layout"
import React from "react"
import HitRateUserList from "./hitRateUserList/HitRateUserList"

export default function index() {
  return <HitRateUserList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
