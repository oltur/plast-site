'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useT, useLocale } from '@/lib/useT'

export default function RegisterPage() {
  const router = useRouter()
  const locale = useLocale()
  const t = useT('auth')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageGroup: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDoNotMatch'))
      return
    }

    if (formData.password.length < 8) {
      setError(t('passwordMinLength'))
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ageGroup: formData.ageGroup || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t('error'))
        setLoading(false)
        return
      }

      // If account requires approval, redirect to signin with message
      if (data.requiresApproval) {
        router.push('./signin?pendingApproval=true')
        return
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        router.push('./signin?registered=true')
      } else {
        router.push(`/${locale}/members`)
        router.refresh()
      }
    } catch (error) {
      setError(t('error'))
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {t('createAccount')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('alreadyHaveAccount')}{' '}
            <Link href="./signin" className="font-medium text-plast-green hover:text-plast-green-dark">
              {t('signIn')}
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('fullName')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                {t('ageGroupOptional')}
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              >
                <option value="">{t('selectAgeGroup')}</option>
                <option value="cubs">{t('cubs')}</option>
                <option value="scouts">{t('scouts')}</option>
                <option value="seniors">{t('seniors')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">{t('passwordRequirement')}</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t('confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-plast-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-plast-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plast-green disabled:opacity-50"
              >
                {loading ? t('creatingAccount') : t('createAccount')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
