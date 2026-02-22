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

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Delete the user
    await client.delete(userId)

    // TODO: Send email notification to user about rejection (optional)
    console.log(`User ${userId} rejected and deleted`)

    return NextResponse.json({ message: 'User rejected successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error rejecting user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
