'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createEmployee } from '@/app/employees/actions'
import { classificationDb } from '@/lib/db'

interface EmployeeClassification {
  id: number
  name: string
}

export default function EmployeeForm ({
  classifications
}: {
  classifications: EmployeeClassification[]
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    classificationIds: [] as string[]
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const toggleClassification = (id: number) => {
    const key = id.toString()
    setForm(prev => {
      const exists = prev.classificationIds.includes(key)
      return {
        ...prev,
        classificationIds: exists
          ? prev.classificationIds.filter(v => v !== key)
          : [...prev.classificationIds, key]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const employeeData = {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address || null,
        city: form.city || null,
        classificationIds: form.classificationIds.map(v => parseInt(v, 10))
      }

      await createEmployee(employeeData)
      setSuccess('Employee registered successfully!')
      setForm({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        classificationIds: []
      })
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
        <CardContent className='space-y-6'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Basic Information</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last Name *</Label>
                <Input
                  id='lastName'
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Address Information</h3>
            <div className='grid grid-cols-1 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input id='city' value={form.city} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Classifications (multi-select) */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Classifications</h3>
            {classifications.length === 0 ? (
              <div className='text-sm text-muted-foreground'>
                No classifications available.
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {classifications.map(c => {
                  const checked = form.classificationIds.includes(
                    c.id.toString()
                  )
                  return (
                    <label
                      key={c.id}
                      className='flex items-center gap-3 p-3 border rounded-lg cursor-pointer'
                    >
                      <input
                        type='checkbox'
                        className='h-4 w-4'
                        checked={checked}
                        onChange={() => toggleClassification(c.id)}
                      />
                      <span className='text-sm'>{c.name}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>

          <Button type='submit' disabled={submitting} className='w-full'>
            {submitting ? 'Registering...' : 'Register Employee'}
          </Button>

          {success && (
            <div className='text-green-600 text-sm bg-green-50 p-3 rounded-md'>
              {success}
            </div>
          )}
          {error && (
            <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}
