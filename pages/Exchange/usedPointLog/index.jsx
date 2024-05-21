import Layout from "@components/Layout"
import UsedPointLogList from "./usedPointLogList/UsedPointLogList"

function index() {
  return <UsedPointLogList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
