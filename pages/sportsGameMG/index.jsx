import Layout from "@components/Layout"
import SportsGameMGList from "./sportsGameMGList/SportsGameMGList"
export default function index(){
    return <SportsGameMGList/>
}

index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }
  