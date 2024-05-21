import Layout from "@components/Layout"
import ManagerLogin from "./managerLogin/ManagerLogin"

function index() {
  return <ManagerLogin />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
