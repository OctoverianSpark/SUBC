import { cookies } from 'next/headers'

export function setAuthCookie(user: { id: number, email: string, nombre: string, role: string }) {
  const cookieStore = cookies()
  cookieStore.set('auth_user', JSON.stringify({ id: user.id, email: user.email, nombre: user.nombre, role: user.role }), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 1 semana
  })
}

export function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.set('auth_user', '', { maxAge: 0, path: '/' })
}

export function getAuthUser() {
  const cookieStore = cookies()
  const value = cookieStore.get('auth_user')?.value
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function requireAuthOrRedirect() {
  const user = getAuthUser()
  if (!user) {
    // @ts-ignore
    if (typeof window === 'undefined') {
      // Server-side: redirect
      const { redirect } = require('next/navigation')
      redirect('/auth/login')
    } else {
      // Client-side: redirect
      window.location.href = '/auth/login'
    }
  }
  return user
}
