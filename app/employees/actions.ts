'use server'

import { revalidatePath } from 'next/cache'
import { employeeDb } from '@/lib/db'

// Crear empleado
export async function createEmployee(formData: FormData) {
  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
  }
  await employeeDb.create(data)
  revalidatePath('/employees')
}

// Editar empleado
export async function updateEmployee(id: number, formData: FormData) {
  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
  }
  await employeeDb.update(id, data)
  revalidatePath('/employees')
}

// Eliminar empleado
export async function deleteEmployee(id: number) {
  await employeeDb.delete(id)
  revalidatePath('/employees')
}