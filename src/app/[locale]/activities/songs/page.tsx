import { client } from '@/lib/sanity'
import Link from 'next/link'
import { Download, Play } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import ukMessages from '../../../../../messages/uk.json'
import deMessages from '../../../../../messages/de.json'
import enMessages from '../../../../../messages/en.json'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

export default async function SongsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const pageContent = {
    uk: {
      backToActivities: '← Назад до діяльності',
      title: '🎵 Пісні та ресурси',
      noSongs: 'Наразі немає пісень.',
    },
    de: {
      backToActivities: '← Zurück zu Aktivitäten',
      title: '🎵 Lieder und Ressourcen',
      noSongs: 'Derzeit sind keine Lieder verfügbar.',
    },
    en: {
      backToActivities: '← Back to Activities',
      title: '🎵 Songs and Resources',
      noSongs: 'No songs available yet.',
    },
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.uk

  // Fetch songs
  const songs = await client.fetch(
    `*[_type == "song"] | order(publishedAt desc) {
      _id,
      title,
      lyrics,
      category,
      externalLink,
      "audioUrl": audioFile.asset->url,
      "sheetMusicUrl": sheetMusic.asset->url,
      "sheetMusicFileName": sheetMusic.asset->originalFilename,
      publishedAt
    }`
  )

  // Load translations
  const messages = locale === 'uk' ? ukMessages : locale === 'de' ? deMessages : enMessages
  const t = (key: string) => {
    const [namespace, ...keys] = key.split('.')
    let value: any = messages[namespace as keyof typeof messages]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  // Group songs by category
  const songsByCategory = songs.reduce((acc: any, song: any) => {
    const cat = song.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(song)
    return acc
  }, {})

  // Define category order and labels
  const categoryOrder = ['plast', 'folk', 'campfire', 'ceremonial', 'other']
  const categoryLabels: Record<string, string> = {
    plast: t('members.plastSongs'),
    folk: t('members.folkSongs'),
    campfire: t('members.campfireSongs'),
    ceremonial: t('members.ceremonialSongs'),
    other: t('members.otherSongs'),
  }

  // Sort categories by defined order
  const sortedCategories = categoryOrder
    .filter(cat => songsByCategory[cat] && songsByCategory[cat].length > 0)
    .map(cat => [cat, songsByCategory[cat]])

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Link
            href={`/${locale}/activities`}
            className="text-plast-green hover:text-plast-green-dark"
          >
            {content.backToActivities}
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          {content.title}
        </h1>

        {songs.length === 0 ? (
          <p className="text-gray-600">{content.noSongs}</p>
        ) : (
          <div className="space-y-12">
            {sortedCategories.map(([category, categorySongs]) => (
              <div key={category}>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {categoryLabels[category] || category}
                </h2>
                <div className="space-y-6">
                  {(categorySongs as any[]).map((song: any) => {
                    const title = song.title[locale as keyof LocalizedString] || song.title.en || song.title.uk
                    const lyrics = song.lyrics?.[locale as keyof LocalizedString] || song.lyrics?.en || song.lyrics?.uk
                    return (
                      <div key={song._id} className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">{title}</h3>

                        {lyrics && (
                          <div className="prose mb-4 max-w-none text-gray-700">
                            <PortableText value={lyrics} />
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4">
                          {song.audioUrl && (
                            <audio controls className="max-w-full">
                              <source src={song.audioUrl} />
                              {t('members.audioNotSupported')}
                            </audio>
                          )}
                          {!song.audioUrl && song.externalLink && (
                            <a
                              href={song.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-md bg-plast-green px-4 py-2 text-sm font-medium text-white hover:bg-plast-green-dark"
                            >
                              <Play size={16} />
                              {t('members.listenOnline')}
                            </a>
                          )}
                          {song.sheetMusicUrl && (
                            <a
                              href={song.sheetMusicUrl}
                              download
                              className="inline-flex items-center gap-2 text-sm font-medium text-plast-green hover:text-plast-green-dark"
                            >
                              <Download size={16} />
                              {song.sheetMusicFileName || t('members.downloadSheetMusic')}
                            </a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
