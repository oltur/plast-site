'use client'

import { useState } from 'react'
import { deleteEvent } from '@/app/actions/calendar-actions'
import { Trash2, ExternalLink } from 'lucide-react'

type CalendarEvent = {
  id?: string | null
  summary?: string | null
  description?: string | null
  location?: string | null
  start?: { dateTime?: string | null; date?: string | null; timeZone?: string | null } | null
  end?: { dateTime?: string | null; date?: string | null; timeZone?: string | null } | null
  htmlLink?: string | null
}

export default function CalendarEventList({ events, locale }: { events: CalendarEvent[]; locale: string }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(eventId: string) {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    setDeletingId(eventId)
    const result = await deleteEvent(eventId)

    if (result.success) {
      window.location.reload()
    } else {
      alert('Failed to delete event: ' + result.error)
      setDeletingId(null)
    }
  }

  function formatDate(event: CalendarEvent) {
    if (event.start?.date) {
      // All-day event
      const start = new Date(event.start.date)
      const end = event.end?.date ? new Date(event.end.date) : start

      if (start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      } else {
        return `${start.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })} - ${end.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}`
      }
    } else if (event.start?.dateTime) {
      // Timed event
      const start = new Date(event.start.dateTime)
      const end = event.end?.dateTime ? new Date(event.end.dateTime) : start

      const dateStr = start.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      const startTime = start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      const endTime = end.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

      return `${dateStr}, ${startTime} - ${endTime}`
    }

    return 'Date not available'
  }

  if (events.length === 0) {
    return (
      <p className="text-center text-gray-600 py-8">
        No upcoming events. Create your first event!
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-lg border border-gray-200 p-4 transition hover:border-plast-green"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{event.summary || 'Untitled Event'}</h3>
              <p className="mt-1 text-sm text-gray-600">{formatDate(event)}</p>
              {event.location && (
                <p className="mt-1 text-sm text-gray-600">📍 {event.location}</p>
              )}
              {event.description && (
                <p className="mt-2 text-sm text-gray-700">{event.description}</p>
              )}
            </div>

            <div className="ml-4 flex gap-2">
              {event.htmlLink && (
                <a
                  href={event.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-plast-green hover:bg-gray-100"
                  title="Open in Google Calendar"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <button
                onClick={() => event.id && handleDelete(event.id)}
                disabled={deletingId === event.id}
                className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                title="Delete event"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
