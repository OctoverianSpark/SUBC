import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, File, Plus } from 'lucide-react'
import Link from 'next/link'
import { requireAuthOrRedirect } from '@/lib/cookies'
import { billingDb } from '@/lib/db'
import { log } from 'node:console'

function fmtDate (d: Date | string | null | undefined) {
  if (!d) return '—'
  const dt = typeof d === 'string' ? new Date(d) : d
  return isNaN(dt.getTime()) ? '—' : dt.toLocaleDateString()
}
const statusOf = (i: { paid?: boolean; dueDate?: Date | string | null }) => {
  const now = Date.now()
  const due = i.dueDate ? new Date(i.dueDate).getTime() : null
  if (i.paid) return 'Paid'
  if (due && due < now) return 'Overdue'
  return 'Pending'
}

export default async function BillingPage () {
  await requireAuthOrRedirect()

  // Esperado desde billingDb.findAll():
  // { id, invoice_number, client, project, status: 'paid'|'pending'|'overdue', amount, issue_date, due_date }
  const invoices = await billingDb.findAll()

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl flex items-center font-bold text-slate-900'>
            Billing
          </h1>
          <p className='text-slate-600 mt-1'>Manage invoices and payments</p>
        </div>
        <Link href='/billing/invoices/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Plus className='h-4 w-4 mr-2' />
            Create Billing
          </Button>
        </Link>
      </div>

      <div className='grid gap-6'>
        {invoices.map((invoice: any) => (
          <Card key={invoice.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-xl'>
                    {invoice.invoiceNumber}
                  </CardTitle>
                  <p className='text-slate-600 mt-1 text-2xl font-bold'>
                    {invoice.project.name || 'N/A'}
                  </p>
                </div>

                {/* Badge por status */}
                <Badge
                  variant={
                    statusOf(invoice) === 'paid'
                      ? 'default'
                      : statusOf(invoice) === 'overdue'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {statusOf(invoice)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div>
                  <div className='text-sm text-slate-600'>Amount</div>
                  <div className='font-semibold text-lg'>
                    ${Number(invoice.amount ?? 0).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className='text-sm text-slate-600'>Issued</div>
                  <div className='font-semibold'>
                    {fmtDate(invoice.issuedAt)}
                  </div>
                </div>

                <div>
                  <div className='text-sm text-slate-600'>Due</div>
                  <div className='font-semibold'>
                    {fmtDate(invoice.dueDate)}
                  </div>
                </div>

                <div>
                  <div className='text-sm text-slate-600'>Paid</div>
                  <div className='font-semibold'>
                    {invoice.status === 'paid' ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Botones de export si los tienes implementados */}
              <div className='mt-4 flex gap-2'>
                <Link href={`/billing/${invoice.id}/export/simple`}>
                  <Button variant='outline' size='sm'>
                    Export <Download />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
