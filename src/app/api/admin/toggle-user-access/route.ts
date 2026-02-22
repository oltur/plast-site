import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { client } from '@/lib/sanity'

export async function POST(request: Request) {
  try {
    const session = await auth()

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { userId, approved } = await request.json()

    if (!userId || typeof approved !== 'boolean') {
      return NextResponse.json({ error: 'User ID and approved status are required' }, { status: 400 })
    }

    // Update user's approved status
    await client
      .patch(userId)
      .set({
        approved,
        ...(approved
          ? {
              approvedBy: session.user.email || 'admin',
              approvedAt: new Date().toISOString(),
            }
          : {
              blockedBy: session.user.email || 'admin',
              blockedAt: new Date().toISOString(),
            }),
      })
      .commit()

    const action = approved ? 'unblocked' : 'blocked'
    console.log(`User ${userId} ${action} by ${session.user.email}`)

    return NextResponse.json({ message: `User ${action} successfully`, approved }, { status: 200 })
  } catch (error) {
    console.error('Error toggling user access:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
