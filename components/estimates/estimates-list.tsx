'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Eye,
  Edit,
  Download,
  DollarSign,
  Calendar,
  Building2,
  Save,
  Trash2,
  X
} from 'lucide-react'
import { demoStorage, Estimate } from '@/lib/demo-storage'

export default function EstimatesList () {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Estimate>>({})

  useEffect(() => {
    setEstimates(demoStorage.getEstimates())
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-primary text-primary-foreground'
      case 'PENDING':
        return 'bg-secondary text-secondary-foreground'
      case 'DRAFT':
        return 'bg-muted text-muted-foreground'
      case 'REJECTED':
        return 'bg-destructive text-destructive-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleDelete = (id: string) => {
    demoStorage.deleteEstimate(id)
    setEstimates(demoStorage.getEstimates())
  }

  const handleEdit = (estimate: Estimate) => {
    setEditingId(estimate.id)
    setEditData({ ...estimate })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      demoStorage.updateEstimate(editingId, {
        ...editData,
        totalAmount: Number(editData.totalAmount)
      })
      setEstimates(demoStorage.getEstimates())
      setEditingId(null)
      setEditData({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <DollarSign className='h-5 w-5 text-primary' />
              <div>
                <p className='text-sm text-muted-foreground'>Total Value</p>
                <p className='text-xl font-bold'>
                  {formatCurrency(
                    estimates.reduce((acc, e) => acc + (e.totalAmount || 0), 0)
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Building2 className='h-5 w-5 text-secondary' />
              <div>
                <p className='text-sm text-muted-foreground'>
                  Active Estimates
                </p>
                <p className='text-xl font-bold'>{estimates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Calendar className='h-5 w-5 text-accent' />
              <div>
                <p className='text-sm text-muted-foreground'>This Month</p>
                <p className='text-xl font-bold'>
                  {
                    estimates.filter(
                      e =>
                        new Date(e.createdDate).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Badge className='bg-primary text-primary-foreground'>
                Win Rate: 75%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estimates List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {estimates.map(estimate => (
              <div
                key={estimate.id}
                className='border border-border rounded-lg p-4 hover:shadow-sm transition-shadow'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    {editingId === estimate.id ? (
                      <>
                        <input
                          className='border rounded px-2 py-1 mb-1 w-full font-semibold text-lg'
                          name='projectName'
                          value={editData.projectName || ''}
                          onChange={handleEditChange}
                        />
                        <input
                          className='border rounded px-2 py-1 mb-1 w-full text-sm'
                          name='estimateNumber'
                          value={editData.estimateNumber || ''}
                          onChange={handleEditChange}
                        />
                        <div className='flex items-center space-x-4 mt-2 text-sm text-muted-foreground'>
                          <input
                            className='border rounded px-2 py-1'
                            name='client'
                            value={editData.client || ''}
                            onChange={handleEditChange}
                          />
                          <input
                            className='border rounded px-2 py-1'
                            name='category'
                            value={editData.category || ''}
                            onChange={handleEditChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className='font-semibold text-lg text-foreground'>
                          {estimate.projectName}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          {estimate.estimateNumber}
                        </p>
                        <div className='flex items-center space-x-4 mt-2 text-sm text-muted-foreground'>
                          <span>Client: {estimate.client}</span>
                          <span>Category: {estimate.category}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Badge className={getStatusColor(estimate.status)}>
                      {estimate.status}
                    </Badge>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Total Amount
                    </p>
                    {editingId === estimate.id ? (
                      <input
                        className='border rounded px-2 py-1 w-24'
                        name='totalAmount'
                        type='number'
                        value={editData.totalAmount || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <p className='text-xl font-bold text-primary'>
                        {formatCurrency(estimate.totalAmount)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Created</p>
                    <p className='font-medium'>
                      {new Date(estimate.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Valid Until</p>
                    <p className='font-medium'>
                      {new Date(estimate.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <Button variant='outline' size='sm'>
                    <Eye className='h-4 w-4 mr-2' />
                    View
                  </Button>
                  {editingId === estimate.id ? (
                    <>
                      <Button
                        size='sm'
                        className='bg-emerald-600 hover:bg-emerald-700'
                        onClick={handleSave}
                      >
                        <Save className='h-4 w-4 mr-1' /> Save
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleCancel}
                      >
                        <X className='h-4 w-4 mr-1' /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(estimate)}
                      >
                        <Edit className='h-4 w-4 mr-2' />
                        Edit
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => handleDelete(estimate.id)}
                      >
                        <Trash2 className='h-4 w-4 mr-2' />
                        Delete
                      </Button>
                    </>
                  )}
                  <Button variant='outline' size='sm'>
                    <Download className='h-4 w-4 mr-2' />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
