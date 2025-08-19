'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { demoStorage } from '@/lib/demo-storage'
import { toast } from '@/hooks/use-toast'

export default function NewProjectPage () {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    location: '',
    client: '',
    budget: '',
    start_date: '',
    end_date: ''
  })

  const handleChange = (e: any) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleTypeChange = (value: string) => {
    setForm(prev => ({ ...prev, type: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    demoStorage.addProject({
      name: form.name,
      location: form.location,
      status: 'planning',
      budget: Number(form.budget),
      team_size: 0,
      start_date: form.start_date,
      end_date: form.end_date,
      completion: 0,
      client: form.client,
      description: form.description
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
        <CardContent className='space-y-6'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Project Name</Label>
                <Input
                  id='name'
                  placeholder='Enter project name'
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='type'>Project Type</Label>
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select project type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='commercial'>Commercial</SelectItem>
                    <SelectItem value='residential'>Residential</SelectItem>
                    <SelectItem value='industrial'>Industrial</SelectItem>
                    <SelectItem value='infrastructure'>
                      Infrastructure
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Project description'
                rows={3}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  placeholder='Project address'
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='client'>Client</Label>
                <Input
                  id='client'
                  placeholder='Client name'
                  value={form.client}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='budget'>Budget</Label>
                <Input
                  id='budget'
                  type='number'
                  placeholder='0.00'
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='start_date'>Start Date</Label>
                <Input
                  id='start_date'
                  type='date'
                  value={form.start_date}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='end_date'>End Date</Label>
                <Input
                  id='end_date'
                  type='date'
                  value={form.end_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex justify-end gap-4 pt-6'>
              <Link href='/projects'>
                <Button variant='outline'>Cancel</Button>
              </Link>
              <Button
                className='bg-emerald-600 hover:bg-emerald-700'
                type='submit'
              >
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
