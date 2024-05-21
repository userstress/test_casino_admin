import Layout from "@components/Layout"
import React from "react"
import LevelSetting from "./levelSetting/LevelSetting"

export default function index() {
  return <LevelSetting />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
