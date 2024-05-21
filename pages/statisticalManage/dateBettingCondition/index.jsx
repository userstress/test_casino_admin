import Layout from "@components/Layout"
import DateBettingConditionList from "./dateBettingCondition/DateBettingConditionList"
export default function index() {
  return <DateBettingConditionList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
