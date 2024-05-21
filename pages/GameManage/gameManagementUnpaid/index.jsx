import Layout from "@components/Layout"
import GameManagementUnpaidList from "./gameManagementUnpaidList/GameManagementUnpaidList"
export default function index() {
  return <GameManagementUnpaidList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
