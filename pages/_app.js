import { useRouter } from "next/router"
import "../styles/globals.css"
import "../public/asset/font/fonts.css"
import "react-toastify/dist/ReactToastify.css"
import "react-quill/dist/quill.snow.css"
import { ToastContainer, toast } from "react-toastify"
import { useAuthStore } from "../utils/useAuthStore"
import { useUserDetailStore } from "../utils/useUserDetailStore.js"
import { returnReqObj } from "../utils/REST/returnReqObj.js"
import { useEffect } from "react"
import "../utils/locale/i18n"
import useSound from "use-sound"
import { getCookie } from "cookies-next"
import { AudioProvider } from "@utils/user/AudioContext"
import { QueryClient, QueryClientProvider } from "react-query"
import Head from "next/head"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const token = getCookie("token")
  const router = useRouter()
  const pathName = router.pathname
  const { status, user } = useAuthStore()
  const { getUserData } = useUserDetailStore()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true, // 윈도우에 포커스가 돌아왔을 때 자동으로 쿼리를 다시 패치
      },
    },
  })

  const fetchData = async () => {
    if (token) {
      const url = user && `${basicURL}/api/v2/users/${user.userId}/detail/info`
      await getUserData(url, returnReqObj("GET", undefined, token))
    }
  }

  useEffect(() => {
    if (pathName !== "/") {
      if (!token) {
        toast("로그아웃", { onClose: () => window.location.assign("/") })
      } else if (router.isReady && token) {
        fetchData()
      }
    }
  }, [pathName, status])
  //
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <ToastContainer
          position="top-center"
          // autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Component {...pageProps} />
      </AudioProvider>
    </QueryClientProvider>,
  )
}
