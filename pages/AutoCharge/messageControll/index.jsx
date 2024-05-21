import Layout from "@components/Layout"
import ChargeRegListCon from "./chargeRegList/ChargeRegListCon"

export default function index() {
  return <ChargeRegListCon />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
