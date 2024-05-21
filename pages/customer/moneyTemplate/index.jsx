import Layout from "@components/Layout"
import React from "react"
import MoneyTemplateList from "./moneyTemplateList/MoneyTemplateList"

export default function index() {
  return <MoneyTemplateList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
