import DashboardHeader from '@/components/dashboard/dashboard-header'
import EstimateForm from '@/components/estimates/estimate-form'

export default function NewEstimatePage () {
  // No user logic, just static demo content
  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader user={null} />

      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>
            Create New Estimate
          </h1>
          <p className='text-muted-foreground mt-2'>
            Generate a detailed cost estimate for your construction project
          </p>
        </div>

        <EstimateForm />
      </main>
    </div>
  )
}
