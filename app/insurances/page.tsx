import { requireAuthOrRedirect } from '@/lib/cookies'

export default async function InsurancesPage () {
  await requireAuthOrRedirect()
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Insurance Oversight
        </h1>
        <p className='text-gray-600'>Here you can manage project insurances.</p>
        {/* Insurance CRUD will be here */}
      </main>
    </div>
  )
}
