'use client'

import { updateEmployee } from '@/app/employees/actions'
import { useState } from 'react'

export default function EditEmployeeModal ({ employee }: { employee: any }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updateEmployee(employee.id, formData)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded'
      >
        Edit
      </button>

      {open && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-96'>
            <h2 className='text-lg font-bold mb-4'>Edit Employee</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* 👇 mandamos también el ID */}
              <input type='hidden' name='id' value={employee.id} />

              <div>
                <label className='block text-sm font-medium'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  defaultValue={employee.firstName}
                  className='w-full border rounded px-2 py-1'
                />
              </div>

              <div>
                <label className='block text-sm font-medium'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  defaultValue={employee.lastName}
                  className='w-full border rounded px-2 py-1'
                />
              </div>

              <div>
                <label className='block text-sm font-medium'>Address</label>
                <input
                  type='text'
                  name='address'
                  defaultValue={employee.address || ''}
                  className='w-full border rounded px-2 py-1'
                />
              </div>

              <div>
                <label className='block text-sm font-medium'>City</label>
                <input
                  type='text'
                  name='city'
                  defaultValue={employee.city || ''}
                  className='w-full border rounded px-2 py-1'
                />
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
