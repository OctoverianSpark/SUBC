'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'
import Link from 'next/link'
import { demoStorage, Project } from '@/lib/demo-storage'

export default function ProjectsPage () {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Project>>({})

  useEffect(() => {
    setProjects(demoStorage.getProjects())
  }, [])

  const handleDelete = (id: string) => {
    demoStorage.deleteProject(id)
    setProjects(demoStorage.getProjects())
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setEditData({ ...project })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      demoStorage.updateProject(editingId, {
        ...editData,
        budget: Number(editData.budget),
        team_size: Number(editData.team_size),
        completion: Number(editData.completion)
      })
      setProjects(demoStorage.getProjects())
      setEditingId(null)
      setEditData({})
      toast({
        title: 'Data Saved',
        description: 'Project changes have been saved.'
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
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
                  {editingId === project.id ? (
                    <>
                      <CardTitle className='text-xl'>
                        <input
                          className='border rounded px-2 py-1 w-full'
                          name='name'
                          value={editData.name || ''}
                          onChange={handleEditChange}
                        />
                      </CardTitle>
                      <div className='flex items-center text-slate-600 mt-2'>
                        <MapPin className='h-4 w-4 mr-1' />
                        <input
                          className='border rounded px-2 py-1'
                          name='location'
                          value={editData.location || ''}
                          onChange={handleEditChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <CardTitle className='text-xl'>{project.name}</CardTitle>
                      <div className='flex items-center text-slate-600 mt-2'>
                        <MapPin className='h-4 w-4 mr-1' />
                        {project.location}
                      </div>
                    </>
                  )}
                </div>
                <Badge
                  variant={
                    project.status === 'active' ? 'default' : 'secondary'
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 items-center'>
                <div className='flex items-center'>
                  <DollarSign className='h-4 w-4 mr-2 text-green-600' />
                  <div>
                    <div className='text-sm text-slate-600'>Budget</div>
                    {editingId === project.id ? (
                      <input
                        className='border rounded px-2 py-1 w-20'
                        name='budget'
                        type='number'
                        value={editData.budget || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <div className='font-semibold'>
                        ${project.budget.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex items-center'>
                  <Users className='h-4 w-4 mr-2 text-blue-600' />
                  <div>
                    <div className='text-sm text-slate-600'>Team Size</div>
                    {editingId === project.id ? (
                      <input
                        className='border rounded px-2 py-1 w-12'
                        name='team_size'
                        type='number'
                        value={editData.team_size || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <div className='font-semibold'>{project.team_size}</div>
                    )}
                  </div>
                </div>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-2 text-purple-600' />
                  <div>
                    <div className='text-sm text-slate-600'>Start Date</div>
                    {editingId === project.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='start_date'
                        type='date'
                        value={editData.start_date || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <div className='font-semibold'>
                        {new Date(project.start_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Progress</div>
                  <div className='flex items-center'>
                    <div className='flex-1 bg-slate-200 rounded-full h-2 mr-2'>
                      <div
                        className='bg-emerald-600 h-2 rounded-full'
                        style={{
                          width: `${
                            editingId === project.id
                              ? editData.completion || 0
                              : project.completion
                          }%`
                        }}
                      ></div>
                    </div>
                    {editingId === project.id ? (
                      <input
                        className='border rounded px-2 py-1 w-12'
                        name='completion'
                        type='number'
                        min={0}
                        max={100}
                        value={editData.completion || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <span className='text-sm font-semibold'>
                        {project.completion}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-2 mt-4'>
                {editingId === project.id ? (
                  <>
                    <Button
                      size='sm'
                      className='bg-emerald-600 hover:bg-emerald-700'
                      onClick={handleSave}
                    >
                      <Save className='h-4 w-4 mr-1' /> Save
                    </Button>
                    <Button size='sm' variant='outline' onClick={handleCancel}>
                      <X className='h-4 w-4 mr-1' /> Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className='h-4 w-4 mr-1' /> Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className='h-4 w-4 mr-1' /> Delete
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
