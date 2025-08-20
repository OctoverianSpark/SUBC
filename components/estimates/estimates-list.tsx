'use client'

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
import { deleteEstimate, updateEstimate } from '@/app/estimates/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { downloadEstimatePDF } from './pdf-utils'

// El tipo Estimate debe corresponder al modelo Prisma
export type Estimate = {
  id: number
  projectId: number
  estimatorId?: number | null
  amount: number
  createdAt: string
  status: string
  // Puedes agregar más campos si el modelo lo requiere
  // projectName, estimateNumber, client, category, validUntil, etc. si existen
}

interface EstimatesListProps {
  estimates: Estimate[]
  projects?: { id: number; name: string }[]
  users?: { id: number; name: string }[]
}

export default function EstimatesList ({
  estimates,
  projects = [],
  users = []
}: EstimatesListProps) {
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

  const router = useRouter()
  const [editId, setEditId] = useState<number | null>(null)
  const [editAmount, setEditAmount] = useState('')
  const [editStatus, setEditStatus] = useState('')

  const handleDelete = async (id: number) => {
    await deleteEstimate(id)
    router.refresh()
  }

  const handleEdit = (estimate: Estimate) => {
    setEditId(estimate.id)
    setEditAmount(String(estimate.amount))
    setEditStatus(estimate.status)
  }

  const handleUpdate = async (id: number) => {
    await updateEstimate(id, { amount: Number(editAmount), status: editStatus })
    setEditId(null)
    router.refresh()
  }

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <DollarSign className='h-5 w-5 text-primary' />
              <div>
                <p className='text-sm text-muted-foreground'>Total Value</p>
                <p className='text-xl font-bold'>
                  {formatCurrency(
                    estimates.reduce((acc, e) => acc + (e.amount || 0), 0)
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
                        new Date(e.createdAt).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
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
                    <h3 className='font-semibold text-lg text-foreground'>
                      {projects.find(p => p.id === estimate.projectId)?.name ||
                        estimate.projectId}
                    </h3>
                    <div className='flex items-center space-x-4 mt-2 text-sm text-muted-foreground'>
                      <span>ID: {estimate.id}</span>
                      <span>
                        Estimator:{' '}
                        {users.find(u => u.id === estimate.estimatorId)?.name ||
                          estimate.estimatorId ||
                          'N/A'}
                      </span>
                    </div>
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
                    <p className='text-xl font-bold text-primary'>
                      {formatCurrency(estimate.amount)}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Created</p>
                    <p className='font-medium'>
                      {new Date(estimate.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  {editId === estimate.id ? (
                    <>
                      <input
                        type='number'
                        value={editAmount}
                        onChange={e => setEditAmount(e.target.value)}
                        className='border rounded px-2 py-1 w-24 mr-2'
                      />
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value)}
                        className='border rounded px-2 py-1 w-32 mr-2'
                      >
                        <option value='IN_PROGRESS'>In Progress</option>
                        <option value='SUBMITTED'>Submitted</option>
                        <option value='AWARDED'>Awarded</option>
                        <option value='REJECTED'>Rejected</option>
                        <option value='DRAFT'>Draft</option>
                      </select>
                      <Button
                        size='sm'
                        onClick={() => handleUpdate(estimate.id)}
                      >
                        <Save className='h-4 w-4 mr-1' /> Save
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setEditId(null)}
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
                        <Edit className='h-4 w-4 mr-2' /> Edit
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDelete(estimate.id)}
                      >
                        <Trash2 className='h-4 w-4 mr-2' /> Delete
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          const projectName =
                            projects.find(p => p.id === estimate.projectId)
                              ?.name || estimate.projectId
                          const estimatorName =
                            users.find(u => u.id === estimate.estimatorId)
                              ?.name ||
                            estimate.estimatorId ||
                            'N/A'
                          downloadEstimatePDF(
                            estimate,
                            projectName,
                            estimatorName
                          )
                        }}
                      >
                        <Download className='h-4 w-4 mr-2' /> Download
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
