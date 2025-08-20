'use client'

import { useState } from 'react'
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
import { Plus, Trash2, Calculator } from 'lucide-react'
import { createEstimate } from '@/app/estimates/new/actions'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface Project {
  id: number
  name: string
}
interface User {
  id: number
  name: string
}

interface EstimateFormProps {
  projects: Project[]
  users: User[]
}

export default function EstimateForm ({ projects, users }: EstimateFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    projectId: '', // Debe venir de un select real
    estimatorId: '', // Debe venir de un select real
    amount: '',
    status: 'IN_PROGRESS',
    validUntil: ''
  })
  const [previewOpen, setPreviewOpen] = useState(false)
  const [submitting, setSubmitting] = useState<'none' | 'draft' | 'estimate'>(
    'none'
  )
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ])

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }
    setLineItems([...lineItems, newItem])
  }

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id))
  }

  const updateLineItem = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setLineItems(
      lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
          }
          return updatedItem
        }
        return item
      })
    )
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0)
  const taxRate = 0.08 // 8% tax
  const tax = subtotal * taxRate
  const total = subtotal + tax

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Manejo de cambios para campos principales
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  // Guardar estimado (draft o final)
  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
      | undefined,
    statusOverride?: string
  ) => {
    e?.preventDefault?.()
    setSuccess(null)
    setError(null)
    // Validación básica
    if (!form.projectId || !form.amount) {
      setError('Debes seleccionar un proyecto y un monto')
      return
    }
    setSubmitting(statusOverride === 'DRAFT' ? 'draft' : 'estimate')
    try {
      await createEstimate({
        projectId: Number(form.projectId),
        estimatorId: form.estimatorId ? Number(form.estimatorId) : undefined,
        amount: parseFloat(form.amount),
        status: statusOverride || form.status
        // Puedes agregar más campos fieles al modelo aquí
      })
      setSuccess(
        statusOverride === 'DRAFT' ? 'Borrador guardado' : 'Estimado generado'
      )
      setTimeout(() => router.push('/estimates'), 1000)
    } catch (err: any) {
      setError(err?.message || JSON.stringify(err))
      // eslint-disable-next-line no-console
      console.error('Error al guardar estimado:', err)
    } finally {
      setSubmitting('none')
    }
  }

  // Mostrar nombre en vez de ID en el preview
  const projectName =
    projects.find(p => String(p.id) === form.projectId)?.name || form.projectId
  const estimatorName =
    users.find(u => String(u.id) === form.estimatorId)?.name || form.estimatorId

  return (
    <form onSubmit={e => handleSubmit(e)} className='space-y-6'>
      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='projectId'>Project</Label>
              <Select
                value={form.projectId}
                onValueChange={v => setForm(f => ({ ...f, projectId: v }))}
                required
              >
                <SelectTrigger id='projectId'>
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
              <Label htmlFor='estimatorId'>Estimator</Label>
              <Select
                value={form.estimatorId}
                onValueChange={v => setForm(f => ({ ...f, estimatorId: v }))}
              >
                <SelectTrigger id='estimatorId'>
                  <SelectValue placeholder='Select estimator' />
                </SelectTrigger>
                <SelectContent>
                  {users.map(u => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                value={form.amount}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={form.status}
                onValueChange={v => setForm(f => ({ ...f, status: v }))}
              >
                <SelectTrigger id='status'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='IN PROGRESS'>In Progress</SelectItem>
                  <SelectItem value='SUBMITTED'>Submitted</SelectItem>
                  <SelectItem value='AWARDED'>Awarded</SelectItem>
                  <SelectItem value='REJECTED'>Rejected</SelectItem>
                  <SelectItem value='DRAFT'>Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Cost Breakdown</CardTitle>
            <Button onClick={addLineItem} variant='outline' size='sm'>
              <Plus className='h-4 w-4 mr-2' />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {/* Header */}
            <div className='grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2'>
              <div className='col-span-5'>Description</div>
              <div className='col-span-2'>Quantity</div>
              <div className='col-span-2'>Unit Price</div>
              <div className='col-span-2'>Total</div>
              <div className='col-span-1'>Action</div>
            </div>

            {/* Line Items */}
            {lineItems.map(item => (
              <div
                key={item.id}
                className='grid grid-cols-12 gap-4 items-center'
              >
                <div className='col-span-5'>
                  <Input
                    placeholder='Item description'
                    value={item.description}
                    onChange={e =>
                      updateLineItem(item.id, 'description', e.target.value)
                    }
                  />
                </div>
                <div className='col-span-2'>
                  <Input
                    type='number'
                    min='0'
                    step='0.01'
                    value={item.quantity}
                    onChange={e =>
                      updateLineItem(
                        item.id,
                        'quantity',
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className='col-span-2'>
                  <Input
                    type='number'
                    min='0'
                    step='0.01'
                    value={item.unitPrice}
                    onChange={e =>
                      updateLineItem(
                        item.id,
                        'unitPrice',
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className='col-span-2'>
                  <div className='text-right font-medium'>
                    {formatCurrency(item.total)}
                  </div>
                </div>
                <div className='col-span-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length === 1}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className='border-t pt-4 mt-6'>
            <div className='space-y-2 max-w-sm ml-auto'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Subtotal:</span>
                <span className='font-medium'>{formatCurrency(subtotal)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Tax (8%):</span>
                <span className='font-medium'>{formatCurrency(tax)}</span>
              </div>
              <div className='flex justify-between text-lg font-bold border-t pt-2'>
                <span>Total:</span>
                <span className='text-primary'>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='terms'>Terms & Conditions</Label>
            <Textarea
              id='terms'
              placeholder='Payment terms, project timeline, warranty information, etc.'
              rows={4}
              defaultValue='Payment: 30% deposit, 40% at 50% completion, 30% upon completion.
Timeline: Project completion within 120 days of contract signing.
Warranty: 1-year warranty on all workmanship and materials.'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='notes'>Additional Notes</Label>
            <Textarea
              id='notes'
              placeholder='Any additional notes or special considerations'
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className='flex items-center justify-end space-x-4'>
        <Button
          type='button'
          variant='outline'
          disabled={submitting !== 'none'}
          onClick={e => handleSubmit(e, 'DRAFT')}
        >
          {submitting === 'draft' ? 'Guardando...' : 'Save as Draft'}
        </Button>
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogTrigger asChild>
            <Button type='button' variant='outline'>
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Estimate Preview</DialogTitle>
            </DialogHeader>
            <div className='space-y-2'>
              <div>
                <b>Project:</b> {projectName}
              </div>
              <div>
                <b>Estimator:</b> {estimatorName}
              </div>
              <div>
                <b>Amount:</b> ${form.amount}
              </div>
              <div>
                <b>Status:</b> {form.status}
              </div>
              {/* Puedes mostrar line items y otros campos aquí */}
            </div>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Button
          type='button'
          className='flex items-center space-x-2'
          disabled={submitting !== 'none'}
          onClick={e => handleSubmit(e, 'SUBMITTED')}
        >
          {submitting === 'estimate' ? 'Generando...' : 'Generate Estimate'}
        </Button>
      </div>
      {success && <div className='text-green-600 text-sm mt-2'>{success}</div>}
      {error && <div className='text-red-600 text-sm mt-2'>{error}</div>}
    </form>
  )
}
