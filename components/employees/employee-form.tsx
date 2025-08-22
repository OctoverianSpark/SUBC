'use client'
import { useState, useEffect } from 'react'
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
import { createEmployee } from '@/app/employees/actions'

interface EmployeeClassification {
  id: number
  name: string
}

interface EmployeeLevel {
  id: number
  name: string
}

interface User {
  id: number
  name: string
  email: string
}

export default function EmployeeForm () {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    classificationId: '',
    email: '',
    hireDate: '',
    levelId: '',
    phone: '',
    userId: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const [classifications, setClassifications] = useState<
    EmployeeClassification[]
  >([])
  const [levels, setLevels] = useState<EmployeeLevel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load dropdown data
  useEffect(() => {
    const loadData = async () => {
      try {
        // You'll need to create these API endpoints or server actions
        const [classRes, levelRes, userRes] = await Promise.all([
          fetch('/api/employee-classifications'),
          fetch('/api/employee-levels'),
          fetch('/api/users/available') // Users not already assigned to employees
        ])

        const [classData, levelData, userData] = await Promise.all([
          classRes.json(),
          levelRes.json(),
          userRes.json()
        ])

        setClassifications(classData)
        setLevels(levelData)
        setUsers(userData)
      } catch (err) {
        setError('Failed to load form data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      // Convert string IDs to numbers and prepare data
      const employeeData = {
        firstName: form.firstName,
        lastName: form.lastName,
        classificationId: parseInt(form.classificationId),
        email: form.email || null,
        hireDate: form.hireDate ? new Date(form.hireDate) : null,
        levelId: parseInt(form.levelId),
        phone: form.phone || null,
        userId: form.userId ? parseInt(form.userId) : null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        zip: form.zip || null
      }

      await createEmployee(employeeData)
      setSuccess('Employee registered successfully!')
      setForm({
        firstName: '',
        lastName: '',
        classificationId: '',
        email: '',
        hireDate: '',
        levelId: '',
        phone: '',
        userId: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      })
    } catch (err: any) {
      setError(err?.message || 'Error registering employee')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='text-center'>Loading form data...</div>
        </CardContent>
      </Card>
    )
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
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input id='phone' value={form.phone} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Employment Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label>Classification *</Label>
                <Select
                  value={form.classificationId}
                  onValueChange={value =>
                    handleSelectChange('classificationId', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select classification' />
                  </SelectTrigger>
                  <SelectContent>
                    {classifications.map(classification => (
                      <SelectItem
                        key={classification.id}
                        value={classification.id.toString()}
                      >
                        {classification.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Level *</Label>
                <Select
                  value={form.levelId}
                  onValueChange={value => handleSelectChange('levelId', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select level' />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level.id} value={level.id.toString()}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='hireDate'>Hire Date</Label>
                <Input
                  id='hireDate'
                  type='date'
                  value={form.hireDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Associated User Account (Optional)</Label>
              <Select
                value={form.userId}
                onValueChange={value => handleSelectChange('userId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select user account' />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input id='city' value={form.city} onChange={handleChange} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='state'>State</Label>
                  <Input
                    id='state'
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='zip'>ZIP Code</Label>
                  <Input id='zip' value={form.zip} onChange={handleChange} />
                </div>
              </div>
            </div>
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
