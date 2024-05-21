import Layout from "@components/Layout"
import CancledGoal from "./cancledGoalList/CancledGoalList"
export default function index() {
  return <CancledGoal/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
