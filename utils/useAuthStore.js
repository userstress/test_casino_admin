import axios from "axios"
import { toast } from "react-toastify"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { deleteCookie } from "cookies-next"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export const useAuthStore = create(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      registrationError: null,
      errorMessage: null,
      status: "idle",
      userToken: null,
      // 초기 상태세팅
      initialSet: () =>
        set({
          user: null,
          registrationError: null,
          errorMessage: null,
          status: "idle",
        }),
      login: async (userData) => {
        if (userData.username === "") {
          set({ errorMessage: "아이디를 입력해주세요" })
          return
        } else if (userData.password === "") {
          set({ errorMessage: "비밀번호를 입력해주세요" })
          return
        }

        if (userData.username !== "" && userData.password !== "") {
          try {
            set({ status: "login start" })

            const loginPromise = axios.post(
              `${basicURL}/login`,
              {
                username: userData.username,
                password: userData.password,
              },
              { withCredentials: true },
            )

            toast.promise(loginPromise, {
              pending: "로그인 시도 중...",
              success: "로그인 성공!",
              error: "존재하지 않거나, 승인되지 않은 회원입니다.",
            })

            const response = await loginPromise
            const token = response.headers.authorization
            const data = await response.data

            if (data.role !== "ROLE_ADMIN") {
              toast.warning("로그아웃되었습니다")
              return get()
            }

            console.log("로그인 성공")

            set({ user: data, status: "login succeeded", userToken: token })

            document.cookie = `token=${token}; path=/; max-age=${43200};`
            document.cookie = `user=${JSON.stringify(data)}; path=/; max-age=${43200};`

            return "good"
          } catch (error) {
            set({
              status: "login failed",
              errorMessage: "존재하지 않거나, 승인되지 않은 회원입니다.",
            })
          }
        }
      },

      // 로그아웃 액션
      logout: () => {
        set({ user: null, status: "idle", userToken: null })
        deleteCookie("token")
        // document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
        // document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      },

      // 회원가입 액션
      register: async (userData) => {
        // 여기에서 실제 회원가입 로직을 수행하고, 성공하면 사용자 정보를 DB에 저장합니다.
        set({ status: "register start" })
        const response = await axios.post(`${basicURL}/api/v2/register/user`, {
          username: userData.username,
          password: userData.password,
          nickname: userData.nickname,
          name: userData.name,
          phone: userData.phone,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })

        if (response.status == 201) {
          set({ registrationError: null })
        } else {
          // 실패 시 registrationError를 설정합니다.
          set({
            registrationError: "register failed",
            errorMessage: response.data.fieldErrorList,
          })
        }

        set({ status: "register succeeded" })
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
