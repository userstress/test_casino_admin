import Layout from "@components/Layout"
import UserInfoList from "./userInfoList/UserInfoList"

export default function index() {
  return <UserInfoList />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
