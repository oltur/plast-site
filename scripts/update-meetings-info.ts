import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateMeetingsInfo() {
  console.log('🚀 Updating meetings information...\n')

  try {
    const activity = await client.fetch(`*[_type == "activity" && _id == "activity-weekly-meetings"][0]`)

    if (!activity) {
      console.error('✗ Weekly meetings activity not found.')
      return
    }

    await client
      .patch(activity._id)
      .set({
        title: {
          uk: 'Періодичні пластові сходини',
          de: 'Regelmäßige Pfadfindertreffen',
          en: 'Periodic Scout Meetings',
        },
        slug: { current: 'periodic-scout-meetings' },
        description: {
          uk: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Ми періодично збираємося по неділях для навчання, ігор та підготовки до таборів. Наші сходини включають різноманітні активності: від вивчення пластових навичок до командних ігор та обговорення цікавих тем.',
                },
              ],
            },
          ],
          de: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Wir treffen uns regelmäßig sonntags zum Lernen, Spielen und zur Vorbereitung auf Lager. Unsere Treffen umfassen verschiedene Aktivitäten: vom Erlernen von Pfadfinderfähigkeiten bis hin zu Teamspielen und Diskussionen über interessante Themen.',
                },
              ],
            },
          ],
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We gather periodically on Sundays for learning, games, and preparation for camps. Our meetings include various activities: from learning scout skills to team games and discussions on interesting topics.',
                },
              ],
            },
          ],
        },
        excerpt: {
          uk: 'Періодичні зустрічі по неділях для всіх вікових груп з іграми, навчанням та підготовкою до таборів',
          de: 'Regelmäßige Treffen sonntags für alle Altersgruppen mit Spielen, Lernen und Lagervorbereitung',
          en: 'Periodic Sunday gatherings for all age groups with games, learning, and camp preparation',
        },
        frequency: {
          uk: 'По неділях',
          de: 'Sonntags',
          en: 'Sundays',
        },
      })
      .commit()

    console.log('✅ Meetings information updated successfully!')
    console.log('   Title: Periodic Scout Meetings')
    console.log('   Frequency: Sundays (periodic)')
  } catch (error) {
    console.error('✗ Failed to update meetings information:', error)
  }
}

updateMeetingsInfo().catch(console.error)
