'use server'
import { getAuthUser } from '@/lib/cookies'
import { projectDb } from '@/lib/db'

export async function createProject(data: {
  name: string,
  jobNumber: string,
  startDate?: string,
  endDate?: string,
  status: string,
  client: string,
  user: number
}) {
  return projectDb.create({
    name: data.name,
    jobNumber: data.jobNumber,
    startDate: data.startDate ? new Date(data.startDate) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    status: data.status,
    client: data.client,
    userId: getAuthUser().id// 👈 aquí ya lo pasas como userId
  })
}
