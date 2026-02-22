'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useT } from '@/lib/useT'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const t = useT('errors')

  const tAuth = useT('auth')

  const errorMessages: Record<string, string> = {
    Configuration: t('configError'),
    AccessDenied: t('accessDenied'),
    Verification: t('verification'),
    AccountPendingApproval: tAuth('accountPendingApproval'),
    Default: t('default'),
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{t('authError')}</h2>
          <p className="mt-2 text-sm text-gray-600">{errorMessage}</p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="./signin"
            className="block w-full rounded-md bg-plast-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-plast-green-dark"
          >
            {t('tryAgain')}
          </Link>
          <Link
            href="../"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            {t('goHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
