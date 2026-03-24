import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { getUserPlan } from "../app/dashboard/SubscriptionManagementCard"

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
  try {
    const status = await checkAuth()

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // ✅ NEW LAYER (plan check)
    const plan = await getUserPlan()

    const hasActivePlan =
      plan && new Date(plan.endingDate) > new Date()

    if (hasActivePlan) {
      router.push("/dashboard#portfolio")
    } else {
      router.push("/dashboard#plan")
    }

  } catch {
    router.push("/login")
  }
}