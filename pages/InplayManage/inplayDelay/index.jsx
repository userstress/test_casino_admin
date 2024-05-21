import React from "react"
import InplayDelay from "./component/InplayDelay"
import Layout from "@components/Layout"

export default function index() {
  return <InplayDelay />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
