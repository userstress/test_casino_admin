import Layout from "@components/Layout"
import React from "react"
import RoulletteLogList from "./roulletteLogList/RoulletteLogList"

export default function index() {
  return <RoulletteLogList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
