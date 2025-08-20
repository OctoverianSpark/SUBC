import DashboardHeader from '@/components/dashboard/dashboard-header'
import ContractsList from '@/components/contracts/contracts-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ContractsPage () {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>
              Contract Management
            </h1>
            <p className='text-muted-foreground mt-2'>
              Review, approve, and manage project contracts
            </p>
          </div>
          <Link href='/contracts/new'>
            <Button className='flex items-center space-x-2'>
              <Plus className='h-4 w-4' />
              <span>New Contract</span>
            </Button>
          </Link>
        </div>

        <ContractsList />
      </main>
    </div>
  )
}
