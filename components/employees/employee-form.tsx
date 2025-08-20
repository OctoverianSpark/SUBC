'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createEmployee } from '@/app/employees/actions'

export default function EmployeeForm () {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)
    try {
      await createEmployee(form)
      setSuccess('Employee registered successfully!')
      setForm({ firstName: '', lastName: '', address: '', city: '' })
    } catch (err: any) {
      setError(err?.message || 'Error registering employee')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Register Employee</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                id='firstName'
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input id='city' value={form.city} onChange={handleChange} />
            </div>
          </div>
          <Button type='submit' disabled={submitting}>
            {submitting ? 'Registering...' : 'Register Employee'}
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
