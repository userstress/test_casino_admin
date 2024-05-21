import React from "react"
import Layout from "@components/Layout"
import UserInfoList from "./table/CurrentUser"

export default function index() {
  return <UserInfoList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
