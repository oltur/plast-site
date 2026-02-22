'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'

type User = {
  _id: string
  name: string
  email: string
  role: string
  ageGroup?: string
  _createdAt: string
}

export default function UserApprovalList({
  users,
  locale,
  adminEmail,
}: {
  users: User[]
  locale: string
  adminEmail: string
}) {
  const router = useRouter()
  const [processing, setProcessing] = useState<string | null>(null)

  const handleApprove = async (userId: string) => {
    setProcessing(userId)
    try {
      const response = await fetch('/api/admin/approve-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, adminEmail, locale }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to approve user')
      }
    } catch (error) {
      console.error('Error approving user:', error)
      alert('An error occurred')
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (userId: string) => {
    if (!confirm('Are you sure you want to reject this user? This will delete their account.')) {
      return
    }

    setProcessing(userId)
    try {
      const response = await fetch('/api/admin/reject-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to reject user')
      }
    } catch (error) {
      console.error('Error rejecting user:', error)
      alert('An error occurred')
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user._id} className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.ageGroup && (
                <p className="mt-1 text-sm text-gray-500">Age Group: {user.ageGroup}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                Registered: {new Date(user._createdAt).toLocaleDateString(locale)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(user._id)}
                disabled={processing === user._id}
                className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                <Check size={16} />
                Approve
              </button>
              <button
                onClick={() => handleReject(user._id)}
                disabled={processing === user._id}
                className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                <X size={16} />
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
