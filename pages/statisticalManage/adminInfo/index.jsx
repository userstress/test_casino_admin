import Layout from "@components/Layout"
import React from "react"
import AdminInfo from "./AdminInfo/AdminInfo"

export default function index() {
  return <AdminInfo />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
