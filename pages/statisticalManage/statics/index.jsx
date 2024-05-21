import Layout from "@components/Layout"
import React from "react"
import Statics from "./statics/Statics"

export default function index() {
  return <Statics />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
