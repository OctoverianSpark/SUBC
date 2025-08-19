'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { demoStorage } from '@/lib/demo-storage'
import { toast } from '@/hooks/use-toast'
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

export default function NewSubcontractorPage () {
  const router = useRouter()
  const [form, setForm] = useState({
    company: '',
    specialty: '',
    contact: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
    insuranceExpiry: ''
  })

  const handleChange = (e: any) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleSpecialtyChange = (value: string) => {
    setForm(prev => ({ ...prev, specialty: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    demoStorage.addSubcontractor({
      name: form.contact,
      company: form.company,
      email: form.email,
      phone: form.phone,
      specialties: form.specialty ? [form.specialty] : [],
      status: 'active',
      licenseNumber: form.licenseNumber,
      insuranceExpiry: form.insuranceExpiry,
      rating: 5
    })
    toast({ title: 'Data Saved', description: 'Subcontractor has been added.' })
    router.push('/subcontractors')
  }

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/subcontractors'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Subcontractors
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Add Subcontractor
          </h1>
          <p className='text-slate-600 mt-1'>Register a new subcontractor</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subcontractor Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company Name</Label>
                <Input
                  id='company'
                  placeholder='Enter company name'
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='specialty'>Trade/Specialty</Label>
                <Select
                  value={form.specialty}
                  onValueChange={handleSpecialtyChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select trade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='electrical'>Electrical</SelectItem>
                    <SelectItem value='plumbing'>Plumbing</SelectItem>
                    <SelectItem value='hvac'>HVAC</SelectItem>
                    <SelectItem value='concrete'>Concrete</SelectItem>
                    <SelectItem value='roofing'>Roofing</SelectItem>
                    <SelectItem value='flooring'>Flooring</SelectItem>
                    <SelectItem value='painting'>Painting</SelectItem>
                    <SelectItem value='landscaping'>Landscaping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='contact'>Contact Person</Label>
                <Input
                  id='contact'
                  placeholder='Primary contact name'
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  placeholder='(555) 123-4567'
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='contact@company.com'
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='website'>Website</Label>
                <Input
                  id='website'
                  placeholder='www.company.com'
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='address'>Business Address</Label>
              <Textarea
                id='address'
                placeholder='Full business address'
                rows={2}
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='licenseNumber'>License Number</Label>
                <Input
                  id='licenseNumber'
                  placeholder='License #'
                  value={form.licenseNumber}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='licenseExpiry'>License Expiry</Label>
                <Input
                  id='licenseExpiry'
                  type='date'
                  value={form.licenseExpiry}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='insuranceExpiry'>Insurance Expiry</Label>
                <Input
                  id='insuranceExpiry'
                  type='date'
                  value={form.insuranceExpiry}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex justify-end gap-4 pt-6'>
              <Link href='/subcontractors'>
                <Button variant='outline'>Cancel</Button>
              </Link>
              <Button
                className='bg-emerald-600 hover:bg-emerald-700'
                type='submit'
              >
                Add Subcontractor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
