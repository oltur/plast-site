import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const user = await client.fetch(
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
      { email }
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phoneNumber, ageGroup } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Fetch user to get _id
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0] { _id }`,
      { email }
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user profile
    await client
      .patch(user._id)
      .set({
        name,
        phoneNumber: phoneNumber || undefined,
        ageGroup: ageGroup || undefined,
      })
      .commit()

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
