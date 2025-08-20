'use client'

import { Bell, User, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { signOut } from '@/app/auth/login/actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// Eliminar el header/topbar de usuario y thumbnail
export default function DashboardHeader () {
  return null
}
