import Layout from "@components/Layout"
import WithdrawalRanking from "./WithdrawalRanking/WithdrawalRanking"

export default function index() {
  return <WithdrawalRanking />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
