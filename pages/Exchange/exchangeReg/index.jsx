import Layout from "@components/Layout"
import ExchangeRegList from "./exchangeRegList/ExchangeRegList"

export default function index() {
  return <ExchangeRegList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
