import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'
import RotatingBackground from '@/components/ui/RotatingBackground'
import ContactForm from '@/components/forms/ContactForm'
import { client } from '@/lib/sanity'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch settings from Sanity
  const settings = await client.fetch(`*[_type == "settings"][0] {
    backgroundImages,
    contactEmail,
    contactPhone,
    address,
    socialMedia
  }`)

  const content = {
    uk: {
      title: 'Контакти',
      subtitle: "Зв'яжіться з нами",
      getInTouch: 'Як з нами зв\'язатися',
      email: 'Електронна пошта',
      phone: 'Телефон',
      address: 'Адреса',
      addressText: 'Дюссельдорф, Німеччина',
      followUs: 'Слідкуйте за нами',
      joinUs: 'Приєднатися до Пласту',
      joinText: 'Якщо ви хочете приєднатися до нашого пластового осередку або дізнатися більше про наші активності, зв\'яжіться з нами будь-яким зручним способом.',
    },
    de: {
      title: 'Kontakt',
      subtitle: 'Kontaktieren Sie uns',
      getInTouch: 'So erreichen Sie uns',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      addressText: 'Düsseldorf, Deutschland',
      followUs: 'Folgen Sie uns',
      joinUs: 'Bei Plast mitmachen',
      joinText: 'Wenn Sie unserer Plast-Gruppe beitreten oder mehr über unsere Aktivitäten erfahren möchten, kontaktieren Sie uns auf eine beliebige Art und Weise.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in Touch',
      getInTouch: 'How to Reach Us',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      addressText: 'Düsseldorf, Germany',
      followUs: 'Follow Us',
      joinUs: 'Join Plast',
      joinText: 'If you want to join our Plast scout group or learn more about our activities, contact us in any convenient way.',
    },
  }

  const t = content[locale as keyof typeof content] || content.uk

  return (
    <div className="relative py-12">
      <RotatingBackground images={settings?.backgroundImages} />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.getInTouch}</h2>

            <div className="space-y-6">
              {/* Email */}
              {settings?.contactEmail && (
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-plast-green p-3 text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{t.email}</h3>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-plast-green hover:underline"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {settings?.contactPhone && (
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-plast-green p-3 text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{t.phone}</h3>
                    <a
                      href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
                      className="text-plast-green hover:underline"
                    >
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {settings?.address && (
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-plast-green p-3 text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{t.address}</h3>
                    <p className="text-gray-700">
                      {settings.address[locale as keyof typeof settings.address] || settings.address.en || t.addressText}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Media */}
            {settings?.socialMedia && (settings.socialMedia.facebook || settings.socialMedia.instagram) && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{t.followUs}</h3>
                <div className="flex space-x-4">
                  {settings.socialMedia.facebook && (
                    <a
                      href={settings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-plast-green text-white transition hover:bg-plast-green-dark"
                    >
                      <Facebook size={24} />
                    </a>
                  )}
                  {settings.socialMedia.instagram && (
                    <a
                      href={settings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-plast-green text-white transition hover:bg-plast-green-dark"
                    >
                      <Instagram size={24} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}
