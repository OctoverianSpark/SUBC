'use client'

import { signOut } from '@/app/auth/login/actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React from 'react'

export function LogoutButton ({ className = '' }: { className?: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    await signOut()
    toast({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión correctamente.'
    })
    router.push('/auth/login')
  }

  return (
    <button
      className={`hover:underline bg-transparent border-none text-white cursor-pointer ${className}`}
      onClick={handleLogout}
      type='button'
    >
      Logout
    </button>
  )
}
