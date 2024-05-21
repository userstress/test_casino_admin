import Layout from "@components/Layout";
import ExpiredUserInfoList from "./expiredUserInfoList/ExpiredUserInfoList";

export default function index(){
    return <ExpiredUserInfoList/>
}

index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }
  