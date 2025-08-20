'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createEmployeeClassification } from '@/app/employeeclassification/actions'

interface Employee {
  id: number
  firstName: string
  lastName: string
}
interface Classification {
  id: number
  name: string
}

interface EmployeeClassificationFormProps {
  employees: Employee[]
  classifications: Classification[]
}

export default function EmployeeClassificationForm ({
  employees,
  classifications
}: EmployeeClassificationFormProps) {
  const [form, setForm] = useState({
    employeeId: '',
    classificationId: '',
    startDate: '',
    endDate: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)
    try {
      await createEmployeeClassification({
        employeeId: Number(form.employeeId),
        classificationId: Number(form.classificationId),
        startDate: form.startDate,
        endDate: form.endDate || undefined
      })
      setSuccess('Classification assigned!')
      setForm({
        employeeId: '',
        classificationId: '',
        startDate: '',
        endDate: ''
      })
    } catch (err: any) {
      setError(err?.message || 'Error assigning classification')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Assign Employee Classification</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='employeeId'>Employee</Label>
              <select
                id='employeeId'
                value={form.employeeId}
                onChange={handleChange}
                required
                className='border rounded px-2 py-1 w-full'
              >
                <option value=''>Select employee</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.firstName} {e.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='classificationId'>Classification</Label>
              <select
                id='classificationId'
                value={form.classificationId}
                onChange={handleChange}
                required
                className='border rounded px-2 py-1 w-full'
              >
                <option value=''>Select classification</option>
                {classifications.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input
                id='startDate'
                type='date'
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='endDate'>End Date</Label>
              <Input
                id='endDate'
                type='date'
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button type='submit' disabled={submitting}>
            {submitting ? 'Assigning...' : 'Assign Classification'}
          </Button>
          {success && (
            <div className='text-green-600 text-sm mt-2'>{success}</div>
          )}
          {error && <div className='text-red-600 text-sm mt-2'>{error}</div>}
        </CardContent>
      </Card>
    </form>
  )
}
