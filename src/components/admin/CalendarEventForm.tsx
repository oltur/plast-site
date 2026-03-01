'use client'

import { useState } from 'react'
import { createEvent } from '@/app/actions/calendar-actions'

export default function CalendarEventForm({ locale }: { locale: string }) {
  const [isAllDay, setIsAllDay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    formData.set('isAllDay', isAllDay.toString())

    const result = await createEvent(formData)

    if (result.success) {
      setMessage({ type: 'success', text: 'Event created successfully!' })
      e.currentTarget.reset()
      // Reload the page to show new event
      window.location.reload()
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to create event' })
    }

    setLoading(false)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Event Title *
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isAllDay"
          checked={isAllDay}
          onChange={(e) => setIsAllDay(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-plast-green focus:ring-plast-green"
        />
        <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-700">
          All-day event
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            min={today}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
          />
        </div>

        {!isAllDay && (
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              required={!isAllDay}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date *
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            required
            min={today}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
          />
        </div>

        {!isAllDay && (
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              required={!isAllDay}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-plast-green focus:outline-none focus:ring-1 focus:ring-plast-green"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-plast-green px-4 py-2 font-semibold text-white transition hover:bg-plast-green-dark disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  )
}
