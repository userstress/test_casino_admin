import Layout from "@components/Layout"
import BettingAnalysis from "./bettingAnalysis/BettingAnalysis"

export default function index() {
  return <BettingAnalysis />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
