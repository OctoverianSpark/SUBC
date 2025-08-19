'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Package,
  Truck,
  AlertTriangle,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'
import Link from 'next/link'
import { demoStorage, PurchaseOrder } from '@/lib/demo-storage'

export default function MaterialsPage () {
  const [orders, setOrders] = useState<PurchaseOrder[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<PurchaseOrder>>({})

  useEffect(() => {
    setOrders(demoStorage.getPurchaseOrders())
  }, [])

  const handleDelete = (id: string) => {
    demoStorage.deletePurchaseOrder(id)
    setOrders(demoStorage.getPurchaseOrders())
  }

  const handleEdit = (order: PurchaseOrder) => {
    setEditingId(order.id)
    setEditData({ ...order })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      demoStorage.updatePurchaseOrder(editingId, {
        ...editData,
        totalAmount: Number(editData.totalAmount)
      })
      setOrders(demoStorage.getPurchaseOrders())
      setEditingId(null)
      setEditData({})
      toast({
        title: 'Data Saved',
        description: 'Order changes have been saved.'
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
          <h1 className='text-3xl font-bold text-slate-900'>
            Materials Management
          </h1>
          <p className='text-slate-600 mt-1'>
            Track orders, deliveries, and inventory
          </p>
        </div>
        <Link href='/materials/orders/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Plus className='h-4 w-4 mr-2' />
            New Order
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <Package className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Active Orders
                </p>
                <p className='text-2xl font-bold'>{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <Truck className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>In Transit</p>
                <p className='text-2xl font-bold'>
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <AlertTriangle className='h-8 w-8 text-orange-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>Low Stock</p>
                <p className='text-2xl font-bold'>3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6'>
        {orders.map(order => (
          <Card key={order.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  {editingId === order.id ? (
                    <>
                      <CardTitle className='text-xl'>
                        <input
                          className='border rounded px-2 py-1 w-full'
                          name='orderNumber'
                          value={editData.orderNumber || ''}
                          onChange={handleEditChange}
                        />
                      </CardTitle>
                      <p className='text-slate-600 mt-1'>
                        <input
                          className='border rounded px-2 py-1'
                          name='supplier'
                          value={editData.supplier || ''}
                          onChange={handleEditChange}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <CardTitle className='text-xl'>
                        {order.orderNumber}
                      </CardTitle>
                      <p className='text-slate-600 mt-1'>{order.supplier}</p>
                    </>
                  )}
                </div>
                <Badge
                  variant={
                    order.status === 'delivered' ? 'default' : 'secondary'
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div>
                  <div className='text-sm text-slate-600'>Total Amount</div>
                  {editingId === order.id ? (
                    <input
                      className='border rounded px-2 py-1 w-24'
                      name='totalAmount'
                      type='number'
                      value={editData.totalAmount || ''}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <div className='font-semibold'>
                      ${order.totalAmount.toLocaleString()}
                    </div>
                  )}
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Items</div>
                  <div className='font-semibold'>
                    {order.items?.length || 0}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Order Date</div>
                  {editingId === order.id ? (
                    <input
                      className='border rounded px-2 py-1'
                      name='orderDate'
                      type='date'
                      value={editData.orderDate || ''}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <div className='font-semibold'>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Delivery Date</div>
                  {editingId === order.id ? (
                    <input
                      className='border rounded px-2 py-1'
                      name='expectedDelivery'
                      type='date'
                      value={editData.expectedDelivery || ''}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <div className='font-semibold'>
                      {new Date(order.expectedDelivery).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex gap-2 mt-4'>
                {editingId === order.id ? (
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
                      onClick={() => handleEdit(order)}
                    >
                      <Edit className='h-4 w-4 mr-1' /> Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(order.id)}
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
