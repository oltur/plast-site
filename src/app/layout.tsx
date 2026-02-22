import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Plast Düsseldorf',
  description: 'Ukrainian Scouting Organization in Düsseldorf',
  icons: {
    icon: '/icon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}