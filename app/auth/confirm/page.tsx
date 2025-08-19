// Removed Supabase imports and usage
// ...existing code...
// Removed Supabase imports and usage
// Removed Supabase imports and usage
// Removed Supabase imports and usage
// Removed Supabase imports and usage
// Removed Supabase imports and usage
// Removed Supabase imports and usage
// Removed Supabase imports and usage

export default async function ConfirmPage ({
  searchParams
}: {
  searchParams: { token_hash?: string; type?: string; next?: string }
}) {
  if (searchParams.token_hash && searchParams.type) {
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4'>
      <Card className='max-w-md w-full'>
        <CardHeader className='text-center'>
          <CheckCircle className='mx-auto h-12 w-12 text-green-500 mb-4' />
          <CardTitle className='text-green-700'>Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className='text-center space-y-4'>
          <p className='text-gray-600'>
            We've sent you a verification link. Please check your email and
            click the link to verify your account.
          </p>
          <Link
            href='/auth/login'
            className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
