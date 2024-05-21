import Layout from "@components/Layout"
import ManagerActive from "./managerActive/ManagerActive"

function index() {
  return <ManagerActive />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default index
