import { requireAuthOrRedirect } from '@/lib/cookies'
import { payrollDb } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function PayrollPage () {
  await requireAuthOrRedirect()
  const payrolls = await payrollDb.findAll()

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Payroll</h1>
          <Link href='/payroll/new'>
            <Button className='bg-emerald-600 hover:bg-emerald-700'>
              New Payroll
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Payroll History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm'>
                <thead>
                  <tr className='text-left text-gray-600'>
                    <th className='p-2'>Employee</th>
                    <th className='p-2'>Period</th>
                    <th className='p-2'>Hours</th>
                    <th className='p-2'>Gross</th>
                    <th className='p-2'>Deductions</th>
                    <th className='p-2'>Net</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map(payroll => (
                    <tr key={payroll.id} className='border-b'>
                      <td className='p-2'>
                        {payroll.employee
                          ? `${payroll.employee.firstName} ${payroll.employee.lastName}`
                          : '—'}
                      </td>
                      <td className='p-2'>
                        {new Date(payroll.periodStart).toLocaleDateString()} -{' '}
                        {new Date(payroll.periodEnd).toLocaleDateString()}
                      </td>
                      <td className='p-2'>{payroll.totalHours}</td>
                      <td className='p-2'>
                        ${(payroll.grossPay ?? 0).toFixed(2)}
                      </td>
                      <td className='p-2'>
                        ${(payroll.deductions ?? 0).toFixed(2)}
                      </td>
                      <td className='p-2 font-bold'>
                        ${(payroll.netPay ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
