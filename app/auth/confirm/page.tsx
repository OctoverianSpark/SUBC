import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: { token_hash?: string; type?: string; next?: string }
}) {
  const supabase = createClient()

  if (searchParams.token_hash && searchParams.type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: searchParams.token_hash,
      type: searchParams.type as any,
    })

    if (error) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <CardTitle className="text-red-700">Verification Failed</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                There was an error verifying your email. The link may have expired or already been used.
              </p>
              <Link
                href="/auth/signup"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Success - redirect to dashboard
    redirect(searchParams.next || "/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <CardTitle className="text-green-700">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
          <Link href="/auth/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
