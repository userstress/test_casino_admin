import Layout from "@components/Layout"
import React from "react"
import MoneyExChangeSetting from "./moneyExChangeSetting/MoneyExChangeSetting"

export default function index() {
  return <MoneyExChangeSetting />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
