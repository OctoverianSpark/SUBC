'use server'

import { revalidatePath } from 'next/cache'
import { classificationDb, employeeDb } from '@/lib/db'
import { Employee } from '@prisma/client'



export async function getClassifications(){
  return await classificationDb.findAll()
}

export async function createEmployee(data: {
  firstName: string
  lastName: string
  address: string | null
  city: string | null
  classificationIds: number[]
}) {
  const { classificationIds, ...rest } = data
  const ids = Array.from(new Set(classificationIds)).filter(Number.isInteger)

  // 👉 pasa campos planos + classificationIds (NO "classifications")
  return employeeDb.create({
    ...rest,
    classificationIds: ids
  })
}
// Eliminar empleado
export async function deleteEmployee(id: number) {
  await employeeDb.delete(id)
  revalidatePath('/employees')
}