"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { resendVerification } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant="outline" className="w-full bg-transparent">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Resend Verification Email"
      )}
    </Button>
  )
}

interface ResendVerificationFormProps {
  email: string
}

export default function ResendVerificationForm({ email }: ResendVerificationFormProps) {
  const [state, formAction] = useActionState(resendVerification, null)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{state.error}</div>
      )}

      {state?.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
          {state.success}
        </div>
      )}

      <Input name="email" type="email" value={email} readOnly className="hidden" />
      <SubmitButton />
    </form>
  )
}
