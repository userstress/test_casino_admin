import Layout from "@components/Layout"
import React from "react"
import AttendanceCheckList from "./attendanceCheckList/AttendanceCheckList"

export default function index() {
  return <AttendanceCheckList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
