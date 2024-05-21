import Layout from "@components/Layout"
import TeamChangeList from "./teamChangeList/TeamChangeList"
export default function index() {
  return <TeamChangeList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
