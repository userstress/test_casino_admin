import Layout from "@components/Layout"
import UserLoginCounts from "./UserLoginCounts/UserLoginCounts"

function index() {
  return <UserLoginCounts />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
