import React from "react"
import Layout from "@components/Layout"

export default function index() {
  return <div></div>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
