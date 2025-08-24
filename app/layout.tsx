import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { LogoutButton } from '@/components/ui/logout-button'
import { getAuthUser } from '@/lib/cookies'

export const metadata: Metadata = {
  title: 'Demo management App',
  description: 'App',
  generator: 'v0.app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = getAuthUser()
  return (
    <html lang='en'>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {user && (
          <nav className='w-full bg-gray-900 text-white px-6 py-3 flex gap-6 items-center shadow sticky top-0 z-50'>
            <a href='/dashboard' className='font-bold text-lg hover:underline'>
              Dashboard
            </a>
            <a href='/projects' className='hover:underline'>
              Projects
            </a>
            <a href='/estimates' className='hover:underline'>
              Estimates
            </a>
            <a href='/billing' className='hover:underline'>
              Billing
            </a>
            <a href='/employees' className='hover:underline'>
              Employees
            </a>
            <a href='/contracts' className='hover:underline'>
              Contracts
            </a>
            <LogoutButton className='ml-auto' />
          </nav>
        )}
        {children}
      </body>
    </html>
  )
}
