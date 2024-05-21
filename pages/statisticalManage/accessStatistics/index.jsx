import Layout from "@components/Layout"
import React from "react"
import AccessStatisticsList from "./accessStatisticsList/AccessStatisticsList"

export default function index() {
  return <AccessStatisticsList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
