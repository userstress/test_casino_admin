import Layout from "@components/Layout"
import React from "react"
import ExpiredCouponLogList from "./expiredCouponLogList/ExpiredCouponLogList"

export default function index() {
  return <ExpiredCouponLogList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
