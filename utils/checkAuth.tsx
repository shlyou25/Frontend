import axios from "axios"

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
