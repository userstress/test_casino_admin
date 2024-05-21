import Layout from "@components/Layout"
import DifferStatics from "./differStatics/DifferStatics"

export default function index() {
  return <DifferStatics />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
