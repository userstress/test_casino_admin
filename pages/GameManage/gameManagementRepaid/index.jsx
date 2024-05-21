import Layout from "@components/Layout"
import GameManagementRepaidList from "./gameManagementRepaidList/GameManagementRepaidList"
export default function index() {
  return <GameManagementRepaidList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
