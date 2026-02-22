'use client'

import { useState } from 'react'

type EventTabsProps = {
  upcomingLabel: string
  pastLabel: string
  upcomingContent: React.ReactNode
  pastContent: React.ReactNode
}

export default function EventTabs({ upcomingLabel, pastLabel, upcomingContent, pastContent }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`rounded-lg px-6 py-3 font-semibold transition ${
            activeTab === 'upcoming'
              ? 'bg-plast-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {upcomingLabel}
        </button>
        <button
          onClick={() => setActiveTab('past')}
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
