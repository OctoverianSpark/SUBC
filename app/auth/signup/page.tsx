import SignUpForm from '@/components/auth/signup-form'

export default function SignUpPage () {
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Join our construction management platform
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
