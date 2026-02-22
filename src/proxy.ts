import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'
import { auth } from '@/lib/auth'

export default auth(async function proxy(request) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/members', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Check authentication for protected routes
  if (isProtectedRoute && !request.auth) {
    const signInUrl = new URL('/uk/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to default locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
