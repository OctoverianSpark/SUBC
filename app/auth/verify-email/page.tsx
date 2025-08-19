import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import ResendVerificationForm from '@/components/auth/resend-verification-form'

export default function VerifyEmailPage () {
  // No user logic, just static demo content
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4'>
      <Card className='max-w-md w-full'>
        <CardHeader className='text-center'>
          <Mail className='mx-auto h-12 w-12 text-blue-500 mb-4' />
          <CardTitle>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-gray-600 text-center'>
            We sent a verification link to your email. Please check your inbox
            and click the link to verify your account.
          </p>

          <div className='border-t pt-4'>
            <p className='text-sm text-gray-500 text-center mb-4'>
              Didn't receive the email?
            </p>
            <ResendVerificationForm email='demo@example.com' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
