'use server'

import { auth } from '@/lib/auth'
import {
  listCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvent,
} from '@/lib/google-calendar-admin'
import { revalidatePath } from 'next/cache'

/**
 * Check if current user is admin
 */
async function requireAdmin() {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized: You must be logged in')
  }

  if (session.user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  return session
}

/**
 * Get upcoming calendar events (Admin only)
 */
export async function getUpcomingEvents(maxResults: number = 20) {
  await requireAdmin()

  try {
    const events = await listCalendarEvents(maxResults)
    return { success: true, events }
  } catch (error: any) {
    console.error('Error fetching calendar events:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Create a calendar event (Admin only)
 */
export async function createEvent(formData: FormData) {
  await requireAdmin()

  const summary = formData.get('summary') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const startDate = formData.get('startDate') as string
  const startTime = formData.get('startTime') as string
  const endDate = formData.get('endDate') as string
  const endTime = formData.get('endTime') as string
  const timeZone = formData.get('timeZone') as string || 'Europe/Berlin'
  const isAllDay = formData.get('isAllDay') === 'true'

  try {
    let event

    if (isAllDay) {
      event = await createCalendarEvent({
        summary,
        description,
        location,
        start: { date: startDate },
        end: { date: endDate },
      })
    } else {
      const startDateTime = `${startDate}T${startTime}:00`
      const endDateTime = `${endDate}T${endTime}:00`

      event = await createCalendarEvent({
        summary,
        description,
        location,
        start: { dateTime: startDateTime, timeZone },
        end: { dateTime: endDateTime, timeZone },
      })
    }

    revalidatePath('/[locale]/admin/calendar')
    return { success: true, event }
  } catch (error: any) {
    console.error('Error creating calendar event:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update a calendar event (Admin only)
 */
export async function updateEvent(eventId: string, formData: FormData) {
  await requireAdmin()

  const summary = formData.get('summary') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const startDate = formData.get('startDate') as string
  const startTime = formData.get('startTime') as string
  const endDate = formData.get('endDate') as string
  const endTime = formData.get('endTime') as string
  const timeZone = formData.get('timeZone') as string || 'Europe/Berlin'
  const isAllDay = formData.get('isAllDay') === 'true'

  try {
    let event

    if (isAllDay) {
      event = await updateCalendarEvent(eventId, {
        summary,
        description,
        location,
        start: { date: startDate },
        end: { date: endDate },
      })
    } else {
      const startDateTime = `${startDate}T${startTime}:00`
      const endDateTime = `${endDate}T${endTime}:00`

      event = await updateCalendarEvent(eventId, {
        summary,
        description,
        location,
        start: { dateTime: startDateTime, timeZone },
        end: { dateTime: endDateTime, timeZone },
      })
    }

    revalidatePath('/[locale]/admin/calendar')
    return { success: true, event }
  } catch (error: any) {
    console.error('Error updating calendar event:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a calendar event (Admin only)
 */
export async function deleteEvent(eventId: string) {
  await requireAdmin()

  try {
    await deleteCalendarEvent(eventId)
    revalidatePath('/[locale]/admin/calendar')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting calendar event:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get single event details (Admin only)
 */
export async function getEventDetails(eventId: string) {
  await requireAdmin()

  try {
    const event = await getCalendarEvent(eventId)
    return { success: true, event }
  } catch (error: any) {
    console.error('Error fetching event details:', error)
    return { success: false, error: error.message }
  }
}
