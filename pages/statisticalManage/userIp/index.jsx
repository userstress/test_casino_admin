import Layout from "@components/Layout"
import React from "react"
import AdminIPList from "./adminIPList/AdminIPList"

export default function index() {
  return <AdminIPList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
