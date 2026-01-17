import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export type AuthResult = "authenticated" | "unauthenticated"

export const checkAuth = async (): Promise<AuthResult> => {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_apiLink}auth/authenticate`,
      { withCredentials: true }
    )
    return "authenticated"
  } catch {
    return "unauthenticated"
  }
}

export const handleAuthRedirect = async (
    router: AppRouterInstance
  ) => {
    const status = await checkAuth()
    router.push(status === "authenticated" ? "/dashboard" : "/login")
  }