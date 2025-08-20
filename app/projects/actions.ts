'use server'
import { projectDb } from '@/lib/db'

export async function deleteProject(id: number) {
  return projectDb.delete(id)
}

export async function updateProject(id: number, data: any) {
  // Convierte fechas a ISO si existen
  const updateData = { ...data }
  if (updateData.startDate) updateData.startDate = new Date(updateData.startDate).toISOString()
  if (updateData.endDate) updateData.endDate = new Date(updateData.endDate).toISOString()
  return projectDb.update(id, updateData)
}
