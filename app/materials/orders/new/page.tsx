'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { demoStorage } from '@/lib/demo-storage'
import { toast } from '@/hooks/use-toast'
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
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function NewOrderPage () {
  const router = useRouter()
  const [form, setForm] = useState({
    project: '',
    supplier: '',
    deliveryDate: ''
  })

  const handleChange = (e: any) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleProjectChange = (value: string) => {
    setForm(prev => ({ ...prev, project: value }))
  }
  const handleSupplierChange = (value: string) => {
    setForm(prev => ({ ...prev, supplier: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    demoStorage.addPurchaseOrder({
      orderNumber: `PO-${Date.now()}`,
      supplier: form.supplier,
      items: [],
      totalAmount: 0,
      status: 'pending',
      orderDate: new Date().toISOString().slice(0, 10),
      expectedDelivery: form.deliveryDate
    })
    toast({ title: 'Data Saved', description: 'Order has been created.' })
    router.push('/materials')
  }

  return (
    <div className='container mx-auto p-6 max-w-6xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/materials'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Materials
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            New Purchase Order
          </h1>
          <p className='text-slate-600 mt-1'>Create a new material order</p>
        </div>
      </div>

      <div className='grid gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='project'>Project</Label>
                  <Select
                    value={form.project}
                    onValueChange={handleProjectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select project' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='project1'>
                        Downtown Office Complex
                      </SelectItem>
                      <SelectItem value='project2'>
                        Residential Tower
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='supplier'>Supplier</Label>
                  <Select
                    value={form.supplier}
                    onValueChange={handleSupplierChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select supplier' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='abc'>ABC Building Supply</SelectItem>
                      <SelectItem value='steel'>Steel & More Inc.</SelectItem>
                      <SelectItem value='concrete'>
                        Concrete Solutions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='deliveryDate'>Delivery Date</Label>
                  <Input
                    id='deliveryDate'
                    type='date'
                    value={form.deliveryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flex justify-end gap-4 pt-6'>
                <Link href='/materials'>
                  <Button variant='outline'>Cancel</Button>
                </Link>
                <Button
                  className='bg-emerald-600 hover:bg-emerald-700'
                  type='submit'
                >
                  Create Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Order Items</CardTitle>
              <Button variant='outline' size='sm'>
                <Plus className='h-4 w-4 mr-2' />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='grid grid-cols-12 gap-4 items-end'>
                <div className='col-span-4 space-y-2'>
                  <Label>Material</Label>
                  <Input placeholder='Material name' />
                </div>
                <div className='col-span-2 space-y-2'>
                  <Label>Quantity</Label>
                  <Input type='number' placeholder='0' />
                </div>
                <div className='col-span-2 space-y-2'>
                  <Label>Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Unit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pcs'>Pieces</SelectItem>
                      <SelectItem value='sqft'>Sq Ft</SelectItem>
                      <SelectItem value='lbs'>Pounds</SelectItem>
                      <SelectItem value='tons'>Tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='col-span-2 space-y-2'>
                  <Label>Unit Price</Label>
                  <Input type='number' placeholder='0.00' />
                </div>
                <div className='col-span-2 space-y-2'>
                  <Label>Total</Label>
                  <Input readOnly placeholder='$0.00' className='bg-slate-50' />
                </div>
              </div>

              <div className='grid grid-cols-12 gap-4 items-end'>
                <div className='col-span-4'>
                  <Input placeholder='Material name' />
                </div>
                <div className='col-span-2'>
                  <Input type='number' placeholder='0' />
                </div>
                <div className='col-span-2'>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Unit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pcs'>Pieces</SelectItem>
                      <SelectItem value='sqft'>Sq Ft</SelectItem>
                      <SelectItem value='lbs'>Pounds</SelectItem>
                      <SelectItem value='tons'>Tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='col-span-2'>
                  <Input type='number' placeholder='0.00' />
                </div>
                <div className='col-span-1'>
                  <Input readOnly placeholder='$0.00' className='bg-slate-50' />
                </div>
                <div className='col-span-1'>
                  <Button variant='outline' size='sm'>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t'>
              <div className='flex justify-end'>
                <div className='w-64 space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span>$0.00</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className='flex justify-between font-bold text-lg'>
                    <span>Total:</span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end gap-4'>
          <Link href='/materials'>
            <Button variant='outline'>Cancel</Button>
          </Link>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            Create Order
          </Button>
        </div>
      </div>
    </div>
  )
}
