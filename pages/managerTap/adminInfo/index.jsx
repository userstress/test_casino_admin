import Layout from "@components/Layout"
import React from "react"
import AdminInfoList from "./adminInfoList/AdminInfoList"

export default function index() {
  return <AdminInfoList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
