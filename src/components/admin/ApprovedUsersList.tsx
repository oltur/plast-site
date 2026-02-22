'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Ban, CheckCircle } from 'lucide-react'

type User = {
  _id: string
  name: string
  email: string
  role: string
  ageGroup?: string
  memberSince?: string
  approved: boolean
}

export default function ApprovedUsersList({
  users,
  locale,
  t,
}: {
  users: User[]
  locale: string
  t: (key: string) => string
}) {
  const router = useRouter()
  const [processing, setProcessing] = useState<string | null>(null)

  const handleToggleAccess = async (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? 'block' : 'unblock'
    const confirmMessage = currentStatus
      ? 'Are you sure you want to block this user? They will not be able to sign in.'
      : 'Are you sure you want to unblock this user?'

    if (!confirm(confirmMessage)) {
      return
    }

    setProcessing(userId)
    try {
      const response = await fetch('/api/admin/toggle-user-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, approved: !currentStatus }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert(`Failed to ${action} user`)
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error)
      alert('An error occurred')
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('auth.fullName')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('auth.email')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('members.role')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('auth.ageGroup')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('members.memberSince')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('admin.status')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {t('admin.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.role}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {user.ageGroup || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {user.memberSince ? new Date(user.memberSince).toLocaleDateString(locale) : '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    user.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.approved ? t('admin.active') : t('admin.blocked')}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => handleToggleAccess(user._id, user.approved)}
                  disabled={processing === user._id}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50 ${
                    user.approved
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {user.approved ? (
                    <>
                      <Ban size={14} />
                      {t('admin.block')}
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} />
                      {t('admin.unblock')}
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
