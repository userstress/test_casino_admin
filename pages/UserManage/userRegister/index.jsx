import styles from "./style/index.module.css"
import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomSignIn from "@components/customSignIn/CustomSignIn"
import { useState } from "react"

export default function index() {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    console.log(123)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      {/* <div className={styles.footerContainer}> */}
      {/* <CustomButton
        onClick={handleClickOpen}
        customStyle={{ width: "100%", height: "45%", backgroundColor: "#696969", color: "white" }}
        fontStyle={{ fontSize: "0.6vw" }}
        text={"회원등록"}
      /> */}
      <div className={styles.boxContainer}>
        <CustomSignIn />
      </div>
      {/* </div> */}
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
