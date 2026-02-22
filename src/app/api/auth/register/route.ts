import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password, ageGroup } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in Sanity (requires approval)
    const newUser = await client.create({
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      role: 'member',
      ageGroup: ageGroup || null,
      emailVerified: false,
      approved: false, // Requires administrator approval
      memberSince: new Date().toISOString().split('T')[0],
    })

    // TODO: Send email notification to administrators about new registration
    // This would require email service configuration
    if (process.env.ADMIN_EMAILS) {
      console.log(`New registration pending approval: ${email}`)
      console.log(`Notify admins at: ${process.env.ADMIN_EMAILS}`)
    }

    return NextResponse.json(
      {
        message: 'Registration successful. Your account is pending administrator approval.',
        requiresApproval: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
