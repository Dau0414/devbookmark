export const dynamic = "force-dynamic";
import { ChangePasswordForm } from '@/src/features/auth/components/change-password-form'
import React, { Suspense } from 'react'

const ChangePassword = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
      </Suspense>
    </div>
  )
}

export default ChangePassword
