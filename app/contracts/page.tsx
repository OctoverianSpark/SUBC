import DashboardHeader from '@/components/dashboard/dashboard-header'
import ContractsList from '@/components/contracts/contracts-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { contractDb } from '@/lib/db'

export default async function ContractsPage () {
  const contracts = await contractDb.findAll()

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>
              Contract Management
            </h1>
            <p className='text-muted-foreground mt-2'>
              Review the information managed in the project contracts
            </p>
          </div>
        </div>

        <ContractsList contracts={contracts} />
      </main>
    </div>
  )
}
