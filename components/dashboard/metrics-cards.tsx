import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, DollarSign, Users, AlertTriangle } from 'lucide-react'
import { ProjectStatus, MaterialStatus } from '@prisma/client'
import { prisma } from '@/lib/db'

export default async function MetricsCards () {
  // KPI queries
  const activeProjects = await prisma.project.count({
    where: { status: ProjectStatus.IN_PROGRESS }
  })

  const totalRevenue = await prisma.billing.aggregate({
    _sum: { amount: true }
  })

  const activeWorkers = await prisma.employee.count()

  const pendingIssues = await prisma.materialRequest.count({
    where: { status: MaterialStatus.PENDING }
  })

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Projects</CardTitle>
          <Building2 className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{activeProjects}</div>
          <p className='text-xs text-muted-foreground'>
            Based on current projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${totalRevenue._sum.amount?.toLocaleString() ?? 0}
          </div>
          <p className='text-xs text-muted-foreground'>All billings recorded</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Workers</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{activeWorkers}</div>
          <p className='text-xs text-muted-foreground'>
            Employees registered in system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Pending Issues</CardTitle>
          <AlertTriangle className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{pendingIssues}</div>
          <p className='text-xs text-muted-foreground'>
            Pending material requests
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
