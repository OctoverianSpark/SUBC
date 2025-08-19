'use client'

import { Bell, User, Settings, LogOut, RefreshCcw } from 'lucide-react'
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

// Import demoStorage for clearing demo data
import { demoStorage } from '@/lib/demo-storage'
export default function DashboardHeader () {
  // Handler for resetting demo data
  const handleResetDemoData = () => {
    demoStorage.clearAll()
    demoStorage.init()
    window.location.reload()
  }

  return (
    <header className='border-b bg-white px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Construction Manager
          </h1>
          <p className='text-sm text-gray-600'>Project Management Dashboard</p>
        </div>

        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <Button variant='ghost' size='icon' className='relative'>
            <Bell className='h-5 w-5' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs'
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium'>Master User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleResetDemoData}
                className='text-blue-600'
              >
                <RefreshCcw className='mr-2 h-4 w-4' />
                Reset Demo Data
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-600'>
                <LogOut className='mr-2 h-4 w-4' />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
