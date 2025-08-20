import { employeeClassificationDb } from '@/lib/db'

export async function createEmployeeClassification(data: {
  employeeId: number
  classificationId: number
  startDate: string
  endDate?: string
}) {
  return employeeClassificationDb.create({
    employeeId: data.employeeId,
    classificationId: data.classificationId,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : undefined
  })
}
