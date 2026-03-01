import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUpcomingEvents } from '@/app/actions/calendar-actions'
import CalendarEventForm from '@/components/admin/CalendarEventForm'
import CalendarEventList from '@/components/admin/CalendarEventList'
import Link from 'next/link'

export default async function AdminCalendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth()
  const { locale } = await params

  // Check authentication
  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  // Check admin role
  if (session.user.role !== 'admin') {
    redirect(`/${locale}/members`)
  }

  // Fetch calendar events
  const result = await getUpcomingEvents(50)

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Link
            href={`/${locale}/members`}
            className="text-plast-green hover:text-plast-green-dark"
          >
            ← Back to Members Area
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            📅 Google Calendar Management
          </h1>
          <p className="text-gray-600">
            Manage events for plastduesseldorfsite@gmail.com calendar
          </p>
        </div>

        {result.error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-red-800">
              <strong>Error:</strong> {result.error}
            </p>
            <p className="mt-2 text-sm text-red-600">
              Make sure Google Calendar service account is properly configured.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Create Event Form */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Create Event</h2>
              <CalendarEventForm locale={locale} />
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Upcoming Events</h2>
              {result.success && result.events ? (
                <CalendarEventList events={result.events} locale={locale} />
              ) : (
                <p className="text-gray-600">No events found or unable to load events.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
