import { requireAuthOrRedirect } from '@/lib/cookies'

export default async function MaterialsDeliveryPage () {
  await requireAuthOrRedirect()
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Materials Delivery
        </h1>
        <p className='text-gray-600'>
          Here you can record the delivery of materials to the job site.
        </p>
        {/* Materials delivery CRUD will be here */}
      </main>
    </div>
  )
}
