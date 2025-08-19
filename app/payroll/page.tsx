import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Users, DollarSign, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export default function PayrollPage () {
  // Mock data for now - replace with actual database query
  const payrollRuns = [
    {
      id: 1,
      period: 'January 2024',
      status: 'completed',
      total_amount: 125000.0,
      employee_count: 25,
      run_date: '2024-01-31',
      pay_date: '2024-02-02'
    },
    {
      id: 2,
      period: 'February 2024',
      status: 'pending',
      total_amount: 0,
      employee_count: 27,
      run_date: null,
      pay_date: '2024-03-01'
    }
  ]

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Payroll Management
          </h1>
          <p className='text-slate-600 mt-1'>
            Process payroll and manage employee payments
          </p>
        </div>
        <Link href='/payroll/run'>
          <Button className='bg-emerald-600 hover:bg-emerald-700'>
            <Play className='h-4 w-4 mr-2' />
            Run Payroll
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <Users className='h-8 w-8 text-blue-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Active Employees
                </p>
                <p className='text-2xl font-bold'>27</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <DollarSign className='h-8 w-8 text-green-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Monthly Payroll
                </p>
                <p className='text-2xl font-bold'>$125K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <Clock className='h-8 w-8 text-orange-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Hours This Week
                </p>
                <p className='text-2xl font-bold'>1,080</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center'>
              <FileText className='h-8 w-8 text-purple-600' />
              <div className='ml-4'>
                <p className='text-sm font-medium text-slate-600'>
                  Certified Reports
                </p>
                <p className='text-2xl font-bold'>12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6'>
        {payrollRuns.map(run => (
          <Card key={run.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-xl'>
                    Payroll - {run.period}
                  </CardTitle>
                  <p className='text-slate-600 mt-1'>
                    {run.employee_count} employees
                  </p>
                </div>
                <Badge
                  variant={run.status === 'completed' ? 'default' : 'secondary'}
                >
                  {run.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div>
                  <div className='text-sm text-slate-600'>Total Amount</div>
                  <div className='font-semibold text-lg'>
                    {run.total_amount > 0
                      ? `$${run.total_amount.toLocaleString()}`
                      : 'Pending'}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Employees</div>
                  <div className='font-semibold'>{run.employee_count}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Run Date</div>
                  <div className='font-semibold'>
                    {run.run_date
                      ? new Date(run.run_date).toLocaleDateString()
                      : 'Not run'}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Pay Date</div>
                  <div className='font-semibold'>
                    {new Date(run.pay_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
