import Layout from "@components/Layout"
import InputDistributer from "./inputDistributer/InputDistributer"

export default function index() {
  return <InputDistributer />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
