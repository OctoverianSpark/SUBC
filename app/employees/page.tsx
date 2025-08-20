import { employeeDb } from '@/lib/db'
import EditEmployeeModal from '@/components/employees/employee-edit-modal'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteEmployee } from './actions'
import EmployeeList from '@/components/employees/employee-list'

export default async function EmployeesPage () {
  const employees = await employeeDb.findAll()

  const handleDelete = async (id: number) => {
    await deleteEmployee(id)
    // Optionally, you can add a toast notification or redirect after deletion
  }

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Employees</h1>

      <p className='text-gray-600 mb-4'>
        Manage your team members and their details.
      </p>

      {/* Employee List */}
      <div className='mb-6'>
        <Link href='/employees/new'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            Add New Employee
          </Button>
        </Link>
      </div>
      <EmployeeList employees={employees} />
    </div>
  )
}
