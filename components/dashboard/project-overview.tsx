import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react'
import { projectDb } from '@/lib/db'
import { getAuthUser } from '@/lib/cookies'

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'planning':
      return 'bg-blue-100 text-blue-800'
    case 'in_progress':
      return 'bg-emerald-100 text-emerald-800'
    case 'on_hold':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case 'planning':
      return 'Planning'
    case 'in_progress':
      return 'In Progress'
    case 'on_hold':
      return 'On Hold'
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}

export default async function ProjectOverview () {
  const user = getAuthUser()
  let projects = await projectDb.findAll()
  let filteredProjects = projects
  if (user?.role === 'PROJECT_MANAGER') {
    filteredProjects = projects.filter(p => p.managerId === user.id)
  } else if (user?.role !== 'ADMIN' && user?.role !== 'OWNER') {
    filteredProjects = []
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-lg font-semibold'>Active Projects</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className='border rounded-lg p-4 hover:bg-gray-50 transition-colors'
          >
            <div className='flex items-start justify-between mb-3'>
              <div>
                <h3 className='font-medium text-gray-900'>{project.name}</h3>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
