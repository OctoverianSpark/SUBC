'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { createProject } from './actions'

export default function NewProjectPage () {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    jobNumber: '',
    startDate: '',
    endDate: '',
    client: '',
    status: 'PLANNED'
  })

  const handleChange = (e: any) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleStatusChange = (value: string) => {
    setForm(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createProject({
      name: form.name,
      jobNumber: form.jobNumber,
      startDate: form.startDate
        ? new Date(form.startDate).toISOString()
        : undefined,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      status: form.status,
      client: form.client
    })
    toast({ title: 'Data Saved', description: 'Project has been created.' })
    router.push('/projects')
  }

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/projects'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Projects
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>New Project</h1>
          <p className='text-slate-600 mt-1'>
            Create a new construction project
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='name'>Project Name</Label>
              <Input
                id='name'
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='jobNumber'>Job Number</Label>
              <Input
                id='jobNumber'
                value={form.jobNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor='client'>Client</Label>
              <Input
                id='client'
                type='text'
                value={form.client}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <Label htmlFor='startDate'>Start Date</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className='flex-1'>
                <Label htmlFor='endDate'>End Date</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor='status'>Status</Label>
              <Select value={form.status} onValueChange={handleStatusChange}>
                <SelectTrigger id='status'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='PLANNED'>Planned</SelectItem>
                  <SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
                  <SelectItem value='COMPLETED'>Completed</SelectItem>
                  <SelectItem value='ON_HOLD'>On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type='submit' className='w-full'>
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
