'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'
import Link from 'next/link'
import { demoStorage, Subcontractor } from '@/lib/demo-storage'

export default function SubcontractorsPage () {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Subcontractor>>({})

  useEffect(() => {
    setSubcontractors(demoStorage.getSubcontractors())
  }, [])

  const handleDelete = (id: string) => {
    demoStorage.deleteSubcontractor(id)
    setSubcontractors(demoStorage.getSubcontractors())
  }

  const handleEdit = (sub: Subcontractor) => {
    setEditingId(sub.id)
    setEditData({ ...sub })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      demoStorage.updateSubcontractor(editingId, {
        ...editData,
        rating: Number(editData.rating)
      })
      setSubcontractors(demoStorage.getSubcontractors())
      setEditingId(null)
      setEditData({})
      toast({
        title: 'Data Saved',
        description: 'Subcontractor changes have been saved.'
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
          <h1 className='text-3xl font-bold text-slate-900'>Subcontractors</h1>
          <p className='text-slate-600 mt-1'>
            Manage your subcontractor network
          </p>
        </div>
        <Link href='/subcontractors/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Plus className='h-4 w-4 mr-2' />
            Add Subcontractor
          </Button>
        </Link>
      </div>

      <div className='grid gap-6'>
        {subcontractors.map(sub => (
          <Card key={sub.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  {editingId === sub.id ? (
                    <>
                      <CardTitle className='text-xl'>
                        <input
                          className='border rounded px-2 py-1 w-full'
                          name='name'
                          value={editData.name || ''}
                          onChange={handleEditChange}
                        />
                      </CardTitle>
                      <Badge variant='outline' className='mt-2'>
                        <input
                          className='border rounded px-2 py-1'
                          name='company'
                          value={editData.company || ''}
                          onChange={handleEditChange}
                        />
                      </Badge>
                    </>
                  ) : (
                    <>
                      <CardTitle className='text-xl'>{sub.name}</CardTitle>
                      <Badge variant='outline' className='mt-2'>
                        {sub.company}
                      </Badge>
                    </>
                  )}
                </div>
                <div className='flex gap-2'>
                  <Badge
                    variant={sub.licenseNumber ? 'default' : 'destructive'}
                  >
                    License: {sub.licenseNumber || 'N/A'}
                  </Badge>
                  <Badge
                    variant={sub.insuranceExpiry ? 'default' : 'secondary'}
                  >
                    Insurance: {sub.insuranceExpiry || 'N/A'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center'>
                    <MapPin className='h-4 w-4 mr-2 text-slate-600' />
                    {editingId === sub.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='email'
                        value={editData.email || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <span className='font-medium'>{sub.email}</span>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <Phone className='h-4 w-4 mr-2 text-slate-600' />
                    {editingId === sub.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='phone'
                        value={editData.phone || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <span>{sub.phone}</span>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <Mail className='h-4 w-4 mr-2 text-slate-600' />
                    {editingId === sub.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='specialties'
                        value={
                          editData.specialties
                            ? editData.specialties.join(', ')
                            : ''
                        }
                        onChange={e =>
                          setEditData(prev => ({
                            ...prev,
                            specialties: e.target.value
                              .split(',')
                              .map(s => s.trim())
                          }))
                        }
                      />
                    ) : (
                      <span>{sub.specialties?.join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-2 text-slate-600' />
                  <div>
                    <div className='text-sm text-slate-600'>Rating</div>
                    {editingId === sub.id ? (
                      <input
                        className='border rounded px-2 py-1 w-16'
                        name='rating'
                        type='number'
                        min={0}
                        max={5}
                        step={0.1}
                        value={editData.rating || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <div className='font-semibold'>{sub.rating}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-2 mt-4'>
                {editingId === sub.id ? (
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
                      onClick={() => handleEdit(sub)}
                    >
                      <Edit className='h-4 w-4 mr-1' /> Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(sub.id)}
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
