import Layout from "@components/Layout"
import DepositCalList from "./depositCalList/DepositCalList"

export default function index() {
  return <DepositCalList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
