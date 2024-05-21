import Layout from "@components/Layout"
import ExpList from "./table/ExpList"

export default function index() {
  return <ExpList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
