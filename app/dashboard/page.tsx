import DashboardHeader from '@/components/dashboard/dashboard-header'
import MetricsCards from '@/components/dashboard/metrics-cards'
import ProjectOverview from '@/components/dashboard/project-overview'
import QuickActions from '@/components/dashboard/quick-actions'
import RecentActivity from '@/components/dashboard/recent-activity'
import { getAuthUser, requireAuthOrRedirect } from '@/lib/cookies'
import { prisma, userDb } from '@/lib/db'

export default async function DashboardPage () {
  await requireAuthOrRedirect()

  const cookieUser = await getAuthUser()
  console.log(cookieUser)

  let user = null
  if (cookieUser) {
    user = await userDb.findById(cookieUser.id)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardHeader />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Welcome back, {user.name}
          </h1>
          <p className='text-gray-600 mt-2'>
            Here's what's happening with your construction projects today.
          </p>
        </div>

        {/* Metrics Overview */}
        <MetricsCards />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
          {/* Project Overview - Takes up 2 columns */}
          <div className='lg:col-span-2'>
            <ProjectOverview />
          </div>

          {/* Sidebar with Quick Actions and Recent Activity */}
          <div className='space-y-8'>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
