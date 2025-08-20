'use server'

import { validateUser } from '@/lib/db'
import { setAuthCookie, clearAuthCookie } from '@/lib/cookies'

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")?.toString() || ""
  const password = formData.get("password")?.toString() || ""
  if (!email || !password) {
    return { error: "Email and password are required" }
  }
  const user = await validateUser(email, password)
  if (!user) {
    return { error: "Invalid email or password" }
  }
  await setAuthCookie({ id: user.id, email: user.email, nombre: user.name , role: user.role })
  return { success: `Welcome, ${user.name}!` }
}

export async function signOut() {
  await clearAuthCookie()
  return { success: 'Signed out.' }
}
