import { redirect } from "next/navigation"

export default async function Home() {
  // Demo mode - redirect directly to dashboard
  redirect("/dashboard")
}
