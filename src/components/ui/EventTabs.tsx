'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type EventTabsProps = {
  upcomingLabel: string
  pastLabel: string
  upcomingContent: React.ReactNode
  pastContent: React.ReactNode
  initialTab?: 'upcoming' | 'past'
}

export default function EventTabs({
  upcomingLabel,
  pastLabel,
  upcomingContent,
  pastContent,
  initialTab = 'upcoming',
}: EventTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>(initialTab)

  // Sync with URL on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'past' || tabParam === 'upcoming') {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab)
    // Update URL without page reload
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => handleTabChange('upcoming')}
          className={`rounded-lg px-6 py-3 font-semibold transition ${
            activeTab === 'upcoming'
              ? 'bg-plast-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {upcomingLabel}
        </button>
        <button
          onClick={() => handleTabChange('past')}
          className={`rounded-lg px-6 py-3 font-semibold transition ${
            activeTab === 'past'
              ? 'bg-plast-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {pastLabel}
        </button>
      </div>

      {/* Content */}
      <div>{activeTab === 'upcoming' ? upcomingContent : pastContent}</div>
    </div>
  )
}
