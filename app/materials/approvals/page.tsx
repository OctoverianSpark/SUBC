import { requireAuthOrRedirect } from '@/lib/cookies'

export default async function MaterialsApprovalsPage () {
  await requireAuthOrRedirect()
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Materials Approval
        </h1>
        <p className='text-gray-600'>
          Here you can approve requested materials for projects.
        </p>
        {/* Materials approval CRUD will be here */}
        <div className='mt-8'>
          <p className='text-gray-500'>
            No approvals yet. Start by requesting materials.
          </p>
        </div>
      </main>
    </div>
  )
}
