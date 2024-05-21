import Layout from "@components/Layout"
import ChargeRegList from "./chargeRegList/ChargeRegList";

export default function index() {
  return <ChargeRegList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
