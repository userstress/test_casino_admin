import Layout from "@components/Layout"
import React from "react"
import ChargeEvents from "./chargeEvents/ChargeEvents"

export default function index() {
  return <ChargeEvents />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
