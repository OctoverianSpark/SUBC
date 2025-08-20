import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Plus,
  FileText,
  Users,
  Package,
  DollarSign,
  ClipboardCheck
} from 'lucide-react'
import Link from 'next/link'

export default function QuickActions () {
  const actions = [
    {
      title: 'New Project',
      description: 'Start a new construction project',
      icon: Plus,
      href: '/projects/new',
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      title: 'Create Estimate',
      description: 'Generate project estimate',
      icon: FileText,
      href: '/estimates/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add Employee',
      description: 'Register new employee',
      icon: Users,
      href: '/employees/new',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Create Invoice',
      description: 'Generate client invoice',
      icon: DollarSign,
      href: '/billing/invoices/new',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mx-auto max-w-md'>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 w-full'>
            {actions.map(action => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href} className='w-full'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-full w-full p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow bg-transparent min-h-0 min-w-0 border border-gray-200 shadow-sm rounded-lg overflow-hidden'
                    style={{
                      minWidth: 0,
                      minHeight: 0,
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}
                  >
                    <div
                      className={`p-2 rounded-md ${action.color} text-white mb-1`}
                    >
                      <Icon className='h-5 w-5' />
                    </div>
                    <div className='text-center w-full'>
                      <div className='font-semibold text-sm break-words'>
                        {action.title}
                      </div>
                      <div
                        className={'text-xs text-muted-foreground break-words'}
                      >
                        {action.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
