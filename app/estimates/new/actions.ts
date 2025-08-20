'use server'
import { estimateDb } from '@/lib/db'

export async function createEstimate(data: { projectId: number, estimatorId?: number, amount: number, status: string }) {
  return estimateDb.create(data)
}
