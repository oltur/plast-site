import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import UserApprovalList from '@/components/admin/UserApprovalList'
import ApprovedUsersList from '@/components/admin/ApprovedUsersList'
import ukMessages from '../../../../../messages/uk.json'
import deMessages from '../../../../../messages/de.json'
import enMessages from '../../../../../messages/en.json'

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  // Only admins can access this page
  if (session.user.role !== 'admin') {
    redirect(`/${locale}/members`)
  }

  // Fetch all users
  const users = await client.fetch(
    `*[_type == "user"] | order(_createdAt desc) {
      _id,
      name,
      email,
      role,
      ageGroup,
      approved,
      approvedBy,
      approvedAt,
      _createdAt,
      memberSince
    }`
  )

  // Load translations
  const messages = locale === 'uk' ? ukMessages : locale === 'de' ? deMessages : enMessages
  const t = (key: string) => {
    const [namespace, ...keys] = key.split('.')
    let value: any = messages[namespace as keyof typeof messages]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  const pendingUsers = users.filter((u: any) => !u.approved)
  const approvedUsers = users.filter((u: any) => u.approved)

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Link
            href={`/${locale}/members`}
            className="text-plast-green hover:text-plast-green-dark"
          >
            ← {t('members.backToMembers')}
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('admin.userManagement')}</h1>

        {/* Pending Approvals */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {t('admin.pendingApprovals')} ({pendingUsers.length})
          </h2>
          {pendingUsers.length === 0 ? (
            <p className="text-gray-600">{t('admin.noPendingUsers')}</p>
          ) : (
            <UserApprovalList
              users={pendingUsers}
              locale={locale}
              adminEmail={session.user.email || ''}
            />
          )}
        </div>

        {/* Approved Users */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {t('admin.approvedUsers')} ({approvedUsers.length})
          </h2>
          <ApprovedUsersList users={approvedUsers} locale={locale} t={t} />
        </div>
      </div>
    </div>
  )
}
