import { requireAuthOrRedirect } from '@/lib/cookies'

export default async function BondingsPage () {
  await requireAuthOrRedirect()
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Bonding Management
        </h1>
        <p className='text-gray-600'>Here you can manage project bonds.</p>
        {/* Bonding CRUD will be here */}
      </main>
    </div>
  )
}
