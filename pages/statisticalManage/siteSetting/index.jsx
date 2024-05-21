import Layout from "@components/Layout"
import React from "react"
import SettingList from "./settingList/SettingList"

export default function index() {
  return <SettingList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
