'use client'

import { employeeDb } from '@/lib/db'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import EditEmployeeModal from './employee-edit-modal'
import { deleteEmployee } from '@/app/employees/actions'

export default function EmployeeList ({
  employees
}: {
  employees: {
    id: number
    firstName: string
    lastName: string
    address: string
    city: string
  }[]
}) {
  const handleDelete = async (id: number) => {
    await deleteEmployee(id)
    // Optionally, refresh the list or show a success message
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {employees.map(employee => (
        <Card
          key={employee.id}
          className='p-4 flex justify-between items-center'
        >
          <div>
            <h2 className='text-lg font-semibold'>
              {employee.firstName} {employee.lastName}
            </h2>
            <p className='text-sm text-muted-foreground'>
              {employee.address}, {employee.city}
            </p>
          </div>
          <div className='flex space-x-2'>
            <EditEmployeeModal employee={employee} />
            <Button
              variant='destructive'
              onClick={() => handleDelete(employee.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
