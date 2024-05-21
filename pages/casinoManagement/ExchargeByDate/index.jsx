import Layout from "@components/Layout"
import ExchargeByDate from "./component/ExchargeByDate"
import CustomSignIn from "@components/customSignIn/CustomSignIn"
import { useState } from "react"

export default function index() {
  return (
    <>
      <ExchargeByDate />
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
