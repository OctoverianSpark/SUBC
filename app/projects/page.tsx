import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, Edit, Trash2, Save, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { projectDb } from '@/lib/db'
import { deleteProject, updateProject } from './actions'
import { revalidatePath } from 'next/cache'
import { getAuthUser } from '@/lib/cookies'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'

// Nuevo tipo Project para el frontend (puedes importar de @prisma/client si usas types compartidos)
type Project = {
  id: number
  jobNumber: string
  name: string
  managerId?: number
  startDate?: string
  endDate?: string
  status: string
}

export default async function ProjectsPage () {
  const user = await getAuthUser()

  let projects: Project[] = []
  if (user?.role === 'ADMIN' || user?.role === 'OWNER') {
    projects = (await projectDb.findAll()).map(p => ({
      ...p,
      managerId: p.managerId ?? undefined,
      startDate: p.startDate
        ? typeof p.startDate === 'string'
          ? p.startDate
          : p.startDate.toISOString()
        : undefined,
      endDate: p.endDate
        ? typeof p.endDate === 'string'
          ? p.endDate
          : p.endDate.toISOString()
        : undefined,
      status: String(p.status)
    }))
  } else if (user?.role === 'PROJECT_MANAGER') {
    projects = (await projectDb.findAll())
      .filter(p => p.managerId === user.id)
      .map(p => ({
        ...p,
        managerId: p.managerId ?? undefined,
        startDate: p.startDate
          ? typeof p.startDate === 'string'
            ? p.startDate
            : p.startDate.toISOString()
          : undefined,
        endDate: p.endDate
          ? typeof p.endDate === 'string'
            ? p.endDate
            : p.endDate.toISOString()
          : undefined,
        status: String(p.status)
      }))
  } else {
    projects = []
  }

  // Server actions para eliminar y actualizar
  async function handleDelete (formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    await deleteProject(id)
    revalidatePath('/projects')
  }

  async function handleUpdate (formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const jobNumber = formData.get('jobNumber') as string
    const startDate = formData.get('startDate') as string
    const endDate = formData.get('endDate') as string
    const status = formData.get('status') as string
    await updateProject(id, {
      name,
      jobNumber,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
      status
    })
    revalidatePath('/projects')
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Projects</h1>
          <p className='text-slate-600 mt-1'>
            Manage your construction projects
          </p>
        </div>
        <Link href='/projects/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Plus className='h-4 w-4 mr-2' />
            New Project
          </Button>
        </Link>
      </div>
      <div className='grid gap-6'>
        {projects.map(project => (
          <Card key={project.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-xl'>{project.name}</CardTitle>
                  <div className='flex items-center text-slate-600 mt-2'>
                    <span className='font-semibold mr-2'>Job #</span>
                    {project.jobNumber}
                  </div>
                  <div className='flex items-center text-slate-600 mt-2'>
                    <Calendar className='h-4 w-4 mr-1' />
                    {project.startDate
                      ? new Date(project.startDate).toLocaleDateString()
                      : 'N/A'}
                    <span className='mx-2'>to</span>
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : 'N/A'}
                  </div>
                  <div className='flex items-center text-slate-600 mt-2'>
                    <span className='font-semibold mr-2'>Status:</span>
                    <Badge>{project.status}</Badge>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size='sm' variant='outline'>
                        <Edit className='h-4 w-4 mr-1' /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-md'>
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                      </DialogHeader>
                      <form action={handleUpdate} className='space-y-3'>
                        <input type='hidden' name='id' value={project.id} />
                        <div>
                          <label className='block text-sm font-medium'>
                            Name
                          </label>
                          <input
                            name='name'
                            defaultValue={project.name}
                            className='border rounded px-2 py-1 w-full'
                            required
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium'>
                            Job Number
                          </label>
                          <input
                            name='jobNumber'
                            defaultValue={project.jobNumber}
                            className='border rounded px-2 py-1 w-full'
                            required
                          />
                        </div>
                        <div className='flex gap-2'>
                          <div className='flex-1'>
                            <label className='block text-sm font-medium'>
                              Start Date
                            </label>
                            <input
                              name='startDate'
                              type='date'
                              defaultValue={
                                project.startDate
                                  ? project.startDate.slice(0, 10)
                                  : ''
                              }
                              className='border rounded px-2 py-1 w-full'
                            />
                          </div>
                          <div className='flex-1'>
                            <label className='block text-sm font-medium'>
                              End Date
                            </label>
                            <input
                              name='endDate'
                              type='date'
                              defaultValue={
                                project.endDate
                                  ? project.endDate.slice(0, 10)
                                  : ''
                              }
                              className='border rounded px-2 py-1 w-full'
                            />
                          </div>
                        </div>
                        <div>
                          <label className='block text-sm font-medium'>
                            Status
                          </label>
                          <select
                            name='status'
                            defaultValue={project.status}
                            className='border rounded px-2 py-1 w-full'
                          >
                            <option value='PLANNED'>Planned</option>
                            <option value='IN_PROGRESS'>In Progress</option>
                            <option value='COMPLETED'>Completed</option>
                            <option value='ON_HOLD'>On Hold</option>
                          </select>
                        </div>
                        <div className='flex justify-end gap-2'>
                          <DialogClose asChild>
                            <Button type='button' variant='outline'>
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            type='submit'
                            className='bg-emerald-600 hover:bg-emerald-700'
                          >
                            <Save className='h-4 w-4 mr-1' /> Save
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Link href={'/projects/' + project.id}>
                    <Button size='sm' variant='outline'>
                      <ArrowRight className='h-4 w-4 mr-1' /> View
                    </Button>
                  </Link>
                  <form action={handleDelete} className='inline'>
                    <input type='hidden' name='id' value={project.id} />
                    <Button size='sm' variant='destructive' type='submit'>
                      <Trash2 className='h-4 w-4 mr-1' /> Delete
                    </Button>
                  </form>
                </div>
              </div>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  )
}
