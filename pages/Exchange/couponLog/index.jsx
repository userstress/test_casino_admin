import Layout from "@components/Layout"
import CouponLogList from "./couponLogList/CouponLogList"
export default function index() {
  return <CouponLogList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
