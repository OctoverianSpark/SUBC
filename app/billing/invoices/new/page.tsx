// app/billing/invoices/new/page.tsx
export const runtime = 'nodejs'

import { requireAuthOrRedirect } from '@/lib/cookies'
import NewInvoiceFormClient from './NewInvoiceFormClient'
import { projectDb } from '@/lib/db'

export default async function NewInvoicePage () {
  await requireAuthOrRedirect()

  const projects = await projectDb.findAll({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return <NewInvoiceFormClient projects={projects} />
}
