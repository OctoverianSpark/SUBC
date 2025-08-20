'use server'
import { estimateDb } from '@/lib/db'

export async function deleteEstimate(id: number) {
  return estimateDb.delete(id)
}

export async function updateEstimate(id: number, data: any) {
  return estimateDb.update(id, data)
}
