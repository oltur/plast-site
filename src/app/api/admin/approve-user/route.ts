import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { client } from '@/lib/sanity'
import { sendApprovalEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const session = await auth()

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { userId, adminEmail, locale } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user details before approving
    const user = await client.fetch(
      `*[_type == "user" && _id == $userId][0] { _id, name, email }`,
      { userId }
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Approve user
    await client
      .patch(userId)
      .set({
        approved: true,
        approvedBy: adminEmail,
        approvedAt: new Date().toISOString(),
      })
      .commit()

    console.log(`User ${userId} approved by ${adminEmail}`)

    // Send approval email notification
    if (user.email) {
      const emailResult = await sendApprovalEmail({
        to: user.email,
        name: user.name,
        locale: locale || 'uk',
      })

      if (emailResult.success) {
        console.log(`Approval email sent to ${user.email}`)
      } else {
        console.error(`Failed to send approval email to ${user.email}:`, emailResult.error)
      }
    }

    return NextResponse.json({ message: 'User approved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error approving user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
