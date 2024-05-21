import Layout from "@components/Layout"
import React from "react"
import LuckyPointTemplateList from "./moneyTemplateList/LuckyPointTemplateList"

export default function index() {
  return <LuckyPointTemplateList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
