import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"
import Layout from "@components/Layout"
import TypeBetAll from "./component/TypeBetAll"
export default function index() {
  return (
    <>
      <TypeBetAll />
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
