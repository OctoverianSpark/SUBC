
// MOCK AUTH ACTIONS (no real authentication)

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")
  const password = formData.get("password")
  if (!email || !password) {
    return { error: "Email and password are required" }
  }
  // Always succeed for demo
  return { success: "Signed in (mock)!" }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")
  const password = formData.get("password")
  if (!email || !password) {
    return { error: "Email and password are required" }
  }
  // Always succeed for demo
  return { success: "Check your email to confirm your account (mock)." }
}

export async function signOut() {
  // No-op for demo
  return { success: "Signed out (mock)." }
}

export async function resendVerification(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")
  if (!email) {
    return { error: "Email is required" }
  }
  // Always succeed for demo
  return { success: "Verification email sent! (mock)" }
}
