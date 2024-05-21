import Layout from "@components/Layout"
import React from "react"
import PointTemplateList from "./moneyTemplateList/PointTemplateList"

export default function index() {
  return <PointTemplateList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
