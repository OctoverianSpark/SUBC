import DashboardHeader from '@/components/dashboard/dashboard-header'
import EstimatesList, { Estimate } from '@/components/estimates/estimates-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { estimateDb, projectDb, userDb } from '@/lib/db'
import { getAuthUser, requireAuthOrRedirect } from '@/lib/cookies'

export default async function EstimatesPage () {
  await requireAuthOrRedirect()
  const user = await getAuthUser()
  let estimatesRaw = []
  if (user?.role === 'ADMIN' || user?.role === 'OWNER') {
    estimatesRaw = await estimateDb.findAll()
  } else if (user?.role === 'ESTIMATOR') {
    estimatesRaw = await estimateDb.findAll()
    estimatesRaw = estimatesRaw.filter((e: any) => e.estimatorId === user.id)
  } else {
    estimatesRaw = []
  }
  const [projects, users] = await Promise.all([
    projectDb.findAll(),
    userDb.findAll()
  ])
  const estimates = estimatesRaw.map((e: any) => ({
    ...e,
    createdAt:
      typeof e.createdAt === 'string' ? e.createdAt : e.createdAt.toISOString(),
    status: String(e.status)
  }))
  return (
    <div className='min-h-screen bg-background'>
      {/* Puedes mantener DashboardHeader si tienes usuario real, o eliminar demoUser */}
      {/* <DashboardHeader user={user} /> */}

      <main className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>
              Project Estimates
            </h1>
            <p className='text-muted-foreground mt-2'>
              Manage project cost estimates and proposals
            </p>
          </div>
          <Link href='/estimates/new'>
            <Button className='flex items-center space-x-2'>
              <Plus className='h-4 w-4' />
              <span>New Estimate</span>
            </Button>
          </Link>
        </div>

        <EstimatesList
          estimates={estimates}
          projects={projects.map((p: any) => ({ id: p.id, name: p.name }))}
          users={users.map((u: any) => ({ id: u.id, name: u.name }))}
        />
      </main>
    </div>
  )
}
