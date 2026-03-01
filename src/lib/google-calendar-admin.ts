import { google } from 'googleapis'

/**
 * Get Google Calendar client using service account credentials
 * This allows the app to manage a specific calendar without user authentication
 */
export function getCalendarClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS

  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found in environment variables')
  }

  let parsedCredentials
  try {
    parsedCredentials = JSON.parse(credentials)
  } catch (error) {
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_CREDENTIALS format')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: parsedCredentials,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  })

  return google.calendar({ version: 'v3', auth })
}

/**
 * Get the calendar ID from environment or use default
 */
export function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary'
}

/**
 * List upcoming events from the PLAST calendar
 */
export async function listCalendarEvents(maxResults: number = 10) {
  const calendar = getCalendarClient()
  const calendarId = getCalendarId()

  const response = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  })

  return response.data.items || []
}

/**
 * Create an event in the PLAST calendar
 */
export async function createCalendarEvent(event: {
  summary: string
  description?: string
  location?: string
  start: { dateTime: string; timeZone?: string } | { date: string }
  end: { dateTime: string; timeZone?: string } | { date: string }
  attendees?: { email: string }[]
}) {
  const calendar = getCalendarClient()
  const calendarId = getCalendarId()

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
  })

  return response.data
}

/**
 * Update an existing event in the PLAST calendar
 */
export async function updateCalendarEvent(
  eventId: string,
  event: {
    summary?: string
    description?: string
    location?: string
    start?: { dateTime: string; timeZone?: string } | { date: string }
    end?: { dateTime: string; timeZone?: string } | { date: string }
    attendees?: { email: string }[]
  }
) {
  const calendar = getCalendarClient()
  const calendarId = getCalendarId()

  const response = await calendar.events.patch({
    calendarId,
    eventId,
    requestBody: event,
  })

  return response.data
}

/**
 * Delete an event from the PLAST calendar
 */
export async function deleteCalendarEvent(eventId: string) {
  const calendar = getCalendarClient()
  const calendarId = getCalendarId()

  await calendar.events.delete({
    calendarId,
    eventId,
  })
}

/**
 * Get a single event by ID
 */
export async function getCalendarEvent(eventId: string) {
  const calendar = getCalendarClient()
  const calendarId = getCalendarId()

  const response = await calendar.events.get({
    calendarId,
    eventId,
  })

  return response.data
}
