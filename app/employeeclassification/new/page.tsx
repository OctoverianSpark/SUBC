import { requireAuthOrRedirect } from '@/lib/cookies'
import EmployeeClassificationForm from '@/components/employees/employee-classification-form'
import { employeeDb, classificationDb } from '@/lib/db'

export default async function NewEmployeeClassificationPage () {
  await requireAuthOrRedirect()
  const [employees, classifications] = await Promise.all([
    employeeDb.findAll(),
    classificationDb.findAll()
  ])
  return (
    <div className='container mx-auto p-6 max-w-2xl'>
      <h1 className='text-3xl font-bold mb-6'>
        Assign Employee Classification
      </h1>
      <EmployeeClassificationForm
        employees={employees}
        classifications={classifications}
      />
    </div>
  )
}
