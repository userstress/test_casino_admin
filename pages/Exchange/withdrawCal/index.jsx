import Layout from "@components/Layout"
import WithdrawCalList from "./withdrawCalList/WithdrawCalList"


export default function index(){
    return <WithdrawCalList/>
}

index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }
  