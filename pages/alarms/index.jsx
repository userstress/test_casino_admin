import Layout from "@components/Layout"
import React from "react"
import Alarms from "./component/Alarms"

export default function index() {
  return <Alarms />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
