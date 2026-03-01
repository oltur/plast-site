import { auth } from '@/lib/auth'

/**
 * Get Google Calendar events
 * Requires: https://www.googleapis.com/auth/calendar.events scope
 */
export async function getCalendarEvents() {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch calendar events')
  }

  return response.json()
}

/**
 * Create a calendar event
 * Requires: https://www.googleapis.com/auth/calendar.events scope
 */
export async function createCalendarEvent(event: {
  summary: string
  description?: string
  start: { dateTime: string; timeZone?: string }
  end: { dateTime: string; timeZone?: string }
  location?: string
  attendees?: { email: string }[]
}) {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create calendar event')
  }

  return response.json()
}

/**
 * List files from Google Drive
 * Requires: https://www.googleapis.com/auth/drive.file scope
 */
export async function listDriveFiles() {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files?pageSize=100',
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to list drive files')
  }

  return response.json()
}

/**
 * Upload a file to Google Drive
 * Requires: https://www.googleapis.com/auth/drive.file scope
 */
export async function uploadFileToDrive(file: File, metadata?: {
  name?: string
  parents?: string[]
  description?: string
}) {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  // Create metadata
  const fileMetadata = {
    name: metadata?.name || file.name,
    parents: metadata?.parents,
    description: metadata?.description,
  }

  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }))
  form.append('file', file)

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: form,
    }
  )

  if (!response.ok) {
    throw new Error('Failed to upload file to Drive')
  }

  return response.json()
}

/**
 * Share a Drive file with an email
 * Requires: https://www.googleapis.com/auth/drive.file scope
 */
export async function shareDriveFile(fileId: string, email: string, role: 'reader' | 'writer' | 'commenter' = 'reader') {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'user',
        role: role,
        emailAddress: email,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to share file')
  }

  return response.json()
}
