'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import {
  Eye,
  Download,
  DollarSign,
  ClipboardList,
  Building2,
  Shield,
  Scroll,
  Package
} from 'lucide-react'

export default function ContractsList ({ contracts }) {
  const [selectedContract, setSelectedContract] = useState<any | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  return (
    <div className='space-y-6'>
      {/* Contracts list */}
      <div className='space-y-4'>
        {contracts.map(contract => (
          <Card key={contract.id}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>
                {contract.name || `${contract.project?.name} Contract`}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setSelectedContract(contract)}
                >
                  <Eye className='h-4 w-4 mr-1' /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Dialog
        open={!!selectedContract}
        onOpenChange={() => setSelectedContract(null)}
      >
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>
              {selectedContract?.name ||
                `${selectedContract?.project?.name} Contract`}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-6 max-h-[70vh] overflow-y-auto pr-2'>
            {/* Basic Info */}
            <section>
              <h3 className='text-lg font-semibold mb-2 flex items-center'>
                <ClipboardList className='h-5 w-5 mr-2' /> Contract Info
              </h3>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(selectedContract?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated:</strong>{' '}
                {new Date(selectedContract?.updatedAt).toLocaleDateString()}
              </p>
            </section>

            {/* Project Info */}
            {selectedContract?.project && (
              <section>
                <h3 className='text-lg font-semibold mb-2 flex items-center'>
                  <Building2 className='h-5 w-5 mr-2' /> Project
                </h3>
                <p>
                  <strong>Name:</strong> {selectedContract.project.name}
                </p>
                <p>
                  <strong>Status: {selectedContract.project.status}</strong>
                </p>
              </section>
            )}

            {/* Bondings */}
            {selectedContract?.project?.bondings?.length > 0 && (
              <section>
                <h3 className='text-lg font-semibold mb-2 flex items-center'>
                  <Shield className='h-5 w-5 mr-2' /> Bondings
                </h3>
                <ul className='list-disc pl-5'>
                  {selectedContract.project.bondings.map((b: any) => (
                    <li key={b.id}>
                      {b.provider} – {formatCurrency(b.amount)} (Expires:{' '}
                      {new Date(b.deadline).toLocaleDateString()})
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Insurances */}
            {selectedContract?.project?.insurances?.length > 0 && (
              <section>
                <h3 className='text-lg font-semibold mb-2 flex items-center'>
                  <Shield className='h-5 w-5 mr-2' /> Insurances
                </h3>
                <ul className='list-disc pl-5'>
                  {selectedContract.project.insurances.map((i: any) => (
                    <li key={i.id}>
                      {i.provider} – {i.coverageType} (
                      {formatCurrency(i.coverageAmount)}) , Expires:{' '}
                      {new Date(i.expiryDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Licenses */}
            {selectedContract?.project?.licenses?.length > 0 && (
              <section>
                <h3 className='text-lg font-semibold mb-2 flex items-center'>
                  <Scroll className='h-5 w-5 mr-2' /> Licenses
                </h3>
                <ul className='list-disc pl-5'>
                  {selectedContract.project.licenses.map((l: any) => (
                    <li key={l.id}>
                      {l.type} – {l.number} (Expires:{' '}
                      {new Date(l.expiryDate).toLocaleDateString()})
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
