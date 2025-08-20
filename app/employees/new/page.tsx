import { requireAuthOrRedirect } from '@/lib/cookies'
import EmployeeForm from '@/components/employees/employee-form'

export default async function NewEmployeePage () {
  await requireAuthOrRedirect()
  return (
    <div className='container mx-auto p-6 max-w-2xl'>
      <h1 className='text-3xl font-bold mb-6'>Register New Employee</h1>
      <EmployeeForm />
    </div>
  )
}
