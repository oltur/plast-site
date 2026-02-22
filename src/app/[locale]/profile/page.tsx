'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useT, useLocale } from '@/lib/useT'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const locale = useLocale()
  const t = useT('auth')
  const tMembers = useT('members')

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    ageGroup: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin`)
    }
  }, [status, router, locale])

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch user profile
      fetch(`/api/user/profile?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setFormData({
              name: data.user.name || '',
              phoneNumber: data.user.phoneNumber || '',
              ageGroup: data.user.ageGroup || '',
            })
          }
        })
        .catch(err => console.error('Error fetching profile:', err))
    }
  }, [session])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t('error'))
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">{tMembers('loading')}</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10 max-w-2xl">
        <div className="mb-6">
          <button
            onClick={() => router.push(`/${locale}/members`)}
            className="text-plast-green hover:text-plast-green-dark"
          >
            ← {tMembers('backToMembers')}
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">{tMembers('editProfile')}</h1>

          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">{tMembers('profileUpdated')}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
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
                disabled
                value={session?.user?.email || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">{tMembers('emailCannotChange')}</p>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                {tMembers('phoneNumber')}
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-plast-green sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                {t('ageGroup')}
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

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-md bg-plast-green px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-plast-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plast-green disabled:opacity-50"
              >
                {loading ? tMembers('saving') : tMembers('saveChanges')}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/${locale}/members`)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {tMembers('cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
