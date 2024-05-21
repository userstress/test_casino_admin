import Layout from "@components/Layout"
import GameManagementManualList from "./gameManagementManualList/GameManagementManualList"
export default function index() {
  return <GameManagementManualList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
