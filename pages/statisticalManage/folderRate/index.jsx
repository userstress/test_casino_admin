import Layout from "@components/Layout"
import ForderRate from "./ForderRate/ForderRate"

export default function index() {
  return <ForderRate />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
