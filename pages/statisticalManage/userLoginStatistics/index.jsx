import Layout from "@components/Layout"
import React from "react"
import UserLoginStatisticsList from "./userLoginStatisticsList/UserLoginStatisticsList"

export default function index() {
  return <UserLoginStatisticsList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
