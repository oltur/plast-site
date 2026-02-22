import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import ukMessages from '../../../../messages/uk.json'
import deMessages from '../../../../messages/de.json'
import enMessages from '../../../../messages/en.json'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

export default async function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  // Fetch user's full profile from Sanity
  const userProfile = await client.fetch(
    `*[_type == "user" && email == $email][0] {
      _id,
      name,
      email,
      role,
      ageGroup,
      phoneNumber,
      memberSince,
      image
    }`,
    { email: session.user.email }
  )

  // Fetch upcoming events
  const upcomingEvents = await client.fetch(
    `*[_type == "event" && status != "draft" && status != "cancelled" && endDate >= now()] | order(startDate asc)[0...3] {
      _id,
      title,
      startDate,
      endDate,
      slug
    }`
  )

  // Load translations
  const messages = locale === 'uk' ? ukMessages : locale === 'de' ? deMessages : enMessages
  const t = (key: string) => {
    const [namespace, ...keys] = key.split('.')
    let value = messages[namespace]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {t('members.welcomeBack')}, {userProfile?.name || session.user.name}!
          </h1>
          <p className="text-gray-600">{t('members.welcomeMessage')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t('members.yourProfile')}</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('auth.email')}</p>
                  <p className="text-gray-900">{userProfile?.email}</p>
                </div>
                {userProfile?.ageGroup && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('auth.ageGroup')}</p>
                    <p className="text-gray-900 capitalize">{userProfile.ageGroup}</p>
                  </div>
                )}
                {userProfile?.role && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('members.role')}</p>
                    <p className="text-gray-900 capitalize">{userProfile.role}</p>
                  </div>
                )}
                {userProfile?.memberSince && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('members.memberSince')}</p>
                    <p className="text-gray-900">{new Date(userProfile.memberSince).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <a
                  href={`/${locale}/profile`}
                  className="block w-full rounded-lg bg-plast-green px-4 py-2 text-center text-sm font-semibold text-white hover:bg-plast-green-dark"
                >
                  {t('members.editProfile')}
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Upcoming Events */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t('members.upcomingEvents')}</h2>
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-600">{t('members.noUpcomingEvents')}</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event: any) => {
                    const title = event.title[locale as keyof LocalizedString] || event.title.en || event.title.uk
                    return (
                      <div key={event._id} className="rounded-lg border border-gray-200 p-4 hover:border-plast-green">
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.startDate).toLocaleDateString()} -{' '}
                          {new Date(event.endDate).toLocaleDateString()}
                        </p>
                        <a
                          href={`/${locale}/events?tab=upcoming`}
                          className="mt-2 inline-block text-sm font-medium text-plast-green hover:text-plast-green-dark"
                        >
                          {t('members.viewDetails')} →
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t('members.quickLinks')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`/${locale}/events`}
                  className="rounded-lg border-2 border-plast-green p-4 text-center transition hover:bg-plast-green hover:text-white"
                >
                  <div className="text-lg font-semibold">{t('members.eventsCalendar')}</div>
                  <div className="text-sm">{t('members.viewAllActivities')}</div>
                </a>
                <a
                  href={`/${locale}/activities`}
                  className="rounded-lg border-2 border-plast-green p-4 text-center transition hover:bg-plast-green hover:text-white"
                >
                  <div className="text-lg font-semibold">{t('members.activities')}</div>
                  <div className="text-sm">{t('members.explorePrograms')}</div>
                </a>
                <a
                  href={`/${locale}/news`}
                  className="rounded-lg border-2 border-plast-green p-4 text-center transition hover:bg-plast-green hover:text-white"
                >
                  <div className="text-lg font-semibold">{t('members.newsUpdates')}</div>
                  <div className="text-sm">{t('members.latestCommunity')}</div>
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="rounded-lg border-2 border-plast-green p-4 text-center transition hover:bg-plast-green hover:text-white"
                >
                  <div className="text-lg font-semibold">{t('members.contact')}</div>
                  <div className="text-sm">{t('members.getInTouch')}</div>
                </a>
              </div>
            </div>

            {/* Resources Section */}
            <div className="rounded-lg bg-plast-yellow/20 p-6 shadow-md">
              <h2 className="mb-2 text-xl font-bold text-gray-900">{t('members.membersResources')}</h2>
              <p className="mb-4 text-gray-700">{t('members.exclusiveContent')}</p>
              <div className="space-y-2">
                <a
                  href={`/${locale}/members/resources`}
                  className="block rounded-md bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-plast-green"
                >
                  📚 {t('members.trainingMaterials')}
                </a>
                <a
                  href={`/${locale}/members/resources`}
                  className="block rounded-md bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-plast-green"
                >
                  📋 {t('members.formsDocs')}
                </a>
                <a
                  href={`/${locale}/members/songs`}
                  className="block rounded-md bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-plast-green"
                >
                  🎵 {t('members.songsResources')}
                </a>
                <a
                  href={`/${locale}/members/galleries`}
                  className="block rounded-md bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-plast-green"
                >
                  📸 {t('members.photoGalleries')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
