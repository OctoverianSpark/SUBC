'use server'
import { projectDb } from '@/lib/db'

export async function createProject(data: { name: string, jobNumber: string, startDate?: string, endDate?: string, status: string }) {
  return projectDb.create(data)
}
