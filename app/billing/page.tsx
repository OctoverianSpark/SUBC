import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { requireAuthOrRedirect } from '@/lib/cookies'

export default async function BillingPage () {
  await requireAuthOrRedirect()

  // Mock data for now - replace with actual database query
  const invoices = [
    {
      id: 1,
      invoice_number: 'INV-2024-001',
      client: 'ABC Corporation',
      project: 'Downtown Office Complex',
      amount: 125000.0,
      status: 'paid',
      issue_date: '2024-01-15',
      due_date: '2024-02-15',
      paid_date: '2024-02-10'
    },
    {
      id: 2,
      invoice_number: 'INV-2024-002',
      client: 'XYZ Development',
      project: 'Residential Tower',
      amount: 85000.0,
      status: 'pending',
      issue_date: '2024-01-20',
      due_date: '2024-02-20',
      paid_date: null
    }
  ]

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Billing & Invoicing
          </h1>
          <p className='text-slate-600 mt-1'>Manage invoices and payments</p>
        </div>
        <Link href='/billing/invoices/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Plus className='h-4 w-4 mr-2' />
            Create Invoice
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <DollarSign className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Total Revenue
                </p>
                <p className='text-2xl font-bold'>$210,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <CheckCircle className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Paid Invoices
                </p>
                <p className='text-2xl font-bold'>15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <Clock className='h-8 w-8 text-orange-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>Pending</p>
                <p className='text-2xl font-bold'>8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <AlertCircle className='h-8 w-8 text-red-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>Overdue</p>
                <p className='text-2xl font-bold'>2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6'>
        {invoices.map(invoice => (
          <Card key={invoice.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-xl'>
                    {invoice.invoice_number}
                  </CardTitle>
                  <p className='text-slate-600 mt-1'>
                    {invoice.client} - {invoice.project}
                  </p>
                </div>
                <Badge
                  variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                >
                  {invoice.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div>
                  <div className='text-sm text-slate-600'>Amount</div>
                  <div className='font-semibold text-lg'>
                    ${invoice.amount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Issue Date</div>
                  <div className='font-semibold'>
                    {new Date(invoice.issue_date).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Due Date</div>
                  <div className='font-semibold'>
                    {new Date(invoice.due_date).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Paid Date</div>
                  <div className='font-semibold'>
                    {invoice.paid_date
                      ? new Date(invoice.paid_date).toLocaleDateString()
                      : 'Not paid'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
