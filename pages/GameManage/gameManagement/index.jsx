import Layout from "@components/Layout"
import GameManagementList from "./gameManagementList/GameManagementList"
export default function index() {
  return <GameManagementList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
