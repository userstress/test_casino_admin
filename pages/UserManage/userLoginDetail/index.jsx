import Layout from "@components/Layout"
import UserLoginDetail from "./userLoginDetail/UserLoginDetail"

function index() {
  return <UserLoginDetail />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
