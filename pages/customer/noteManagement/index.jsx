import Layout from "@components/Layout"
import NoteManagementList from "./noteManagementList/NoteManagementList"
export default function index() {
  return <NoteManagementList/>
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
