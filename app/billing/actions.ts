'use server'
import { billingDb } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createBilling(input: {
  projectId: number
  amount: number
  dueDate: Date | null
  paid: boolean,
  invoiceNumber: string
}) {
  await billingDb.create({
    projectId: input.projectId,
    amount: input.amount,
    dueDate: input.dueDate,
    paid: input.paid,
    invoiceNumber: input.invoiceNumber
  })
  revalidatePath('/billing')
}
