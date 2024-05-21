import Layout from "@components/Layout"
import UsedPointLogList from "./userLoginHistory/userLoginHistory"

function index() {
  return <UsedPointLogList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
