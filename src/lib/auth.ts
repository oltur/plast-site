import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { client } from '@/lib/sanity'
import bcrypt from 'bcryptjs'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      ageGroup?: string
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  interface User {
    id: string
    role: string
    ageGroup?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
  }
}

// Configure providers
const providers: any[] = [
  Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Fetch user from Sanity
        const user = await client.fetch(
          `*[_type == "user" && email == $email][0] {
            _id,
            name,
            email,
            password,
            role,
            ageGroup,
            image,
            avatarUrl,
            approved
          }`,
          { email: credentials.email as string }
        )

        if (!user || !user.password) {
          return null
        }

        // Check if user is approved
        if (!user.approved) {
          throw new Error('AccountPendingApproval')
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password as string, user.password)

        if (!isValid) {
          return null
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          ageGroup: user.ageGroup,
          image: user.avatarUrl || user.image,
        }
      },
    }),
]

// Add Google provider only if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/calendar.events',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: user.email }
          )

          if (!existingUser) {
            // Create new user from Google account (requires approval)
            console.log('Creating new user from Google account:', user.email)
            await client.create({
              _type: 'user',
              name: user.name || '',
              email: user.email || '',
              avatarUrl: user.image,
              googleId: account.providerAccountId,
              emailVerified: true,
              approved: false, // Requires administrator approval
              role: 'member',
              memberSince: new Date().toISOString().split('T')[0],
            })
            console.log('User created successfully (pending approval)')

            // Notify admins
            if (process.env.ADMIN_EMAILS) {
              console.log(`New Google registration pending approval: ${user.email}`)
            }

            // Redirect to sign-in with pending approval message
            throw new Error('AccountPendingApproval')
          } else if (!existingUser.approved) {
            // Existing user but not yet approved
            throw new Error('AccountPendingApproval')
          } else if (!existingUser.googleId) {
            // Link Google account to existing user
            console.log('Linking Google account to existing user:', user.email)
            await client
              .patch(existingUser._id)
              .set({
                googleId: account.providerAccountId,
                avatarUrl: user.image,
              })
              .commit()
          }
        } catch (error) {
          console.error('Error in Google sign-in callback:', error)
          // Return false to prevent sign-in if there's an error
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.ageGroup = user.ageGroup
      }

      // Store Google OAuth tokens
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.ageGroup = token.ageGroup as string | undefined
        session.accessToken = token.accessToken as string | undefined
        session.refreshToken = token.refreshToken as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/uk/auth/signin',
    error: '/uk/auth/error',
  },
  events: {
    async signIn({ isNewUser }) {
      // Optional: Log successful sign-ins
    },
  },
  session: {
    strategy: 'jwt',
  },
})
