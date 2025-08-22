'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { createBilling } from '@/app/billing/actions'

type ProjectOpt = { id: number; name: string }
type Item = { id: string; description: string; quantity: number; rate: number }

export default function NewInvoiceFormClient ({
  projects
}: {
  projects: ProjectOpt[]
}) {
  const router = useRouter()

  const [projectId, setProjectId] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('') // opcional
  const [paid, setPaid] = useState<boolean>(false)
  const [invoiceNumber, setInvoiceNumber] = useState<string>('')

  const [items, setItems] = useState<Item[]>([
    { id: crypto.randomUUID(), description: '', quantity: 0, rate: 0 }
  ])

  const amount = useMemo(
    () =>
      items.reduce(
        (acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.rate) || 0),
        0
      ),
    [items]
  )

  const addItem = () =>
    setItems(prev => [
      ...prev,
      { id: crypto.randomUUID(), description: '', quantity: 0, rate: 0 }
    ])

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id))

  const updateItem = (id: string, patch: Partial<Item>) =>
    setItems(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const pid = parseInt(projectId, 10)
    if (!pid) return alert('Select a valid project')
    if (!invoiceNumber) return alert('You must provide an invoice number')
    if (amount <= 0) return alert('Amount must be greater than 0')

    await createBilling({
      projectId: pid,
      amount,
      dueDate: dueDate ? new Date(dueDate) : null,
      paid,
      invoiceNumber
    })

    router.push('/billing')
  }

  return (
    <div className='container mx-auto p-6 max-w-6xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/billing'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Billing
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Create Billing</h1>
          <p className='text-slate-600 mt-1'>Generate a new billing record</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className='grid gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Billing Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='project'>Project *</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select project' />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(p => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='due-date'>Due Date (optional)</Label>
                <Input
                  id='due-date'
                  type='date'
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='paid'>Paid *</Label>
                <div className='flex h-10 items-center gap-3'>
                  <Switch id='paid' checked={paid} onCheckedChange={setPaid} />
                  <span className='text-sm text-slate-600'>
                    {paid ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='invoiceNumber'>Invoice Number *</Label>
                <Input
                  id='invoiceNumber'
                  type='text'
                  placeholder='XXX-XXX-XXXX'
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Items</CardTitle>
              <Button
                variant='outline'
                size='sm'
                type='button'
                onClick={addItem}
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {items.map(it => {
                const line = (Number(it.quantity) || 0) * (Number(it.rate) || 0)
                return (
                  <div
                    key={it.id}
                    className='grid grid-cols-12 gap-4 items-end'
                  >
                    <div className='col-span-5 space-y-2'>
                      <Label>Description</Label>
                      <Input
                        placeholder='Work description'
                        value={it.description}
                        onChange={e =>
                          updateItem(it.id, { description: e.target.value })
                        }
                      />
                    </div>
                    <div className='col-span-2 space-y-2'>
                      <Label>Quantity</Label>
                      <Input
                        type='number'
                        min={0}
                        step='1'
                        placeholder='0'
                        value={it.quantity}
                        onChange={e =>
                          updateItem(it.id, {
                            quantity: Number(e.target.value) || 0
                          })
                        }
                      />
                    </div>
                    <div className='col-span-2 space-y-2'>
                      <Label>Rate</Label>
                      <Input
                        type='number'
                        min={0}
                        step='0.01'
                        placeholder='0.00'
                        value={it.rate}
                        onChange={e =>
                          updateItem(it.id, {
                            rate: Number(e.target.value) || 0
                          })
                        }
                      />
                    </div>
                    <div className='col-span-2 space-y-2'>
                      <Label>Line Amount</Label>
                      <Input
                        readOnly
                        value={`$${line.toFixed(2)}`}
                        className='bg-slate-50'
                      />
                    </div>
                    <div className='col-span-1 space-y-2'>
                      <Label>&nbsp;</Label>
                      <Button
                        variant='outline'
                        size='sm'
                        type='button'
                        onClick={() => removeItem(it.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='mt-6 pt-6 border-t'>
              <div className='flex justify-end'>
                <div className='w-64 space-y-2'>
                  <div className='flex justify-between font-bold text-lg'>
                    <span>Total (amount):</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end gap-4'>
          <Link href='/billing'>
            <Button variant='outline' type='button'>
              Cancel
            </Button>
          </Link>
          <Button className='bg-emerald-600 hover:bg-emerald-700' type='submit'>
            Create Billing
          </Button>
        </div>
      </form>
    </div>
  )
}
