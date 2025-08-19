'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Eye,
  Edit,
  Download,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Save,
  Trash2,
  X
} from 'lucide-react'
import { demoStorage, Contract } from '@/lib/demo-storage'

export default function ContractsList () {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Contract>>({})

  useEffect(() => {
    setContracts(demoStorage.getContracts())
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-primary text-primary-foreground'
      case 'PENDING_SIGNATURE':
        return 'bg-secondary text-secondary-foreground'
      case 'UNDER_REVIEW':
        return 'bg-chart-4 text-white'
      case 'COMPLETED':
        return 'bg-accent text-accent-foreground'
      case 'CANCELLED':
        return 'bg-destructive text-destructive-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className='h-4 w-4' />
      case 'PENDING_SIGNATURE':
        return <Clock className='h-4 w-4' />
      case 'UNDER_REVIEW':
        return <AlertTriangle className='h-4 w-4' />
      case 'COMPLETED':
        return <CheckCircle className='h-4 w-4' />
      default:
        return <FileText className='h-4 w-4' />
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

  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const handleDelete = (id: string) => {
    demoStorage.deleteContract(id)
    setContracts(demoStorage.getContracts())
  }

  const handleEdit = (contract: Contract) => {
    setEditingId(contract.id)
    setEditData({ ...contract })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      demoStorage.updateContract(editingId, {
        ...editData,
        value: Number(editData.value),
        progress: Number(editData.progress)
      })
      setContracts(demoStorage.getContracts())
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
                    contracts.reduce((acc, c) => acc + (c.value || 0), 0)
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <CheckCircle className='h-5 w-5 text-primary' />
              <div>
                <p className='text-sm text-muted-foreground'>
                  Active Contracts
                </p>
                <p className='text-xl font-bold'>
                  {contracts.filter(c => c.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Clock className='h-5 w-5 text-secondary' />
              <div>
                <p className='text-sm text-muted-foreground'>Pending Review</p>
                <p className='text-xl font-bold'>
                  {contracts.filter(c => c.status === 'UNDER_REVIEW').length}
                </p>
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
                    contracts.filter(
                      c =>
                        new Date(c.startDate).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {contracts.map(contract => (
              <div
                key={contract.id}
                className='border border-border rounded-lg p-4 hover:shadow-sm transition-shadow'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    {editingId === contract.id ? (
                      <>
                        <input
                          className='border rounded px-2 py-1 mb-1 w-full font-semibold text-lg'
                          name='projectName'
                          value={editData.projectName || ''}
                          onChange={handleEditChange}
                        />
                        <input
                          className='border rounded px-2 py-1 mb-1 w-full text-sm'
                          name='contractNumber'
                          value={editData.contractNumber || ''}
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
                            name='type'
                            value={editData.type || ''}
                            onChange={handleEditChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className='font-semibold text-lg text-foreground'>
                          {contract.projectName}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          {contract.contractNumber}
                        </p>
                        <div className='flex items-center space-x-4 mt-2 text-sm text-muted-foreground'>
                          <span>Client: {contract.client}</span>
                          <span>Type: {contract.type}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Badge
                      className={`${getStatusColor(
                        contract.status
                      )} flex items-center space-x-1`}
                    >
                      {getStatusIcon(contract.status)}
                      <span>{formatStatus(contract.status)}</span>
                    </Badge>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Contract Value
                    </p>
                    {editingId === contract.id ? (
                      <input
                        className='border rounded px-2 py-1 w-24'
                        name='value'
                        type='number'
                        value={editData.value || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <p className='text-xl font-bold text-primary'>
                        {formatCurrency(contract.value)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Start Date</p>
                    {editingId === contract.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='startDate'
                        type='date'
                        value={editData.startDate || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <p className='font-medium'>
                        {new Date(contract.startDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>End Date</p>
                    {editingId === contract.id ? (
                      <input
                        className='border rounded px-2 py-1'
                        name='endDate'
                        type='date'
                        value={editData.endDate || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <p className='font-medium'>
                        {new Date(contract.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Progress</p>
                    {editingId === contract.id ? (
                      <input
                        className='border rounded px-2 py-1 w-16'
                        name='progress'
                        type='number'
                        min={0}
                        max={100}
                        value={editData.progress || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <p className='font-medium'>{contract.progress}%</p>
                    )}
                  </div>
                </div>

                {contract.signedDate && (
                  <div className='mb-4'>
                    <p className='text-sm text-muted-foreground'>
                      Signed on{' '}
                      {new Date(contract.signedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className='flex items-center space-x-2'>
                  <Button variant='outline' size='sm'>
                    <Eye className='h-4 w-4 mr-2' />
                    View
                  </Button>
                  {editingId === contract.id ? (
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
                      {contract.status !== 'COMPLETED' && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEdit(contract)}
                        >
                          <Edit className='h-4 w-4 mr-2' />
                          Edit
                        </Button>
                      )}
                      <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => handleDelete(contract.id)}
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
                  {contract.status === 'UNDER_REVIEW' && (
                    <Button size='sm' className='bg-primary'>
                      Approve
                    </Button>
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
