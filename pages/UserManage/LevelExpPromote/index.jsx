import Layout from "@components/Layout"
import LevelExpPromote from "./table/LevelExpPromote"

export default function index() {
  return <LevelExpPromote />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
