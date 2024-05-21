import Layout from "@components/Layout";
import Index from "./[id]"

export default function index(){
    return <Index></Index> 
}

index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }
  