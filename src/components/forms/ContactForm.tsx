'use client'

import { useState } from 'react'

type ContactFormProps = {
  locale: string
}

export default function ContactForm({ locale }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // Honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const content = {
    uk: {
      title: 'Надішліть нам повідомлення',
      name: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Телефон (опціонально)',
      phonePlaceholder: '+49 123 456789',
      message: 'Повідомлення',
      messagePlaceholder: 'Ваше повідомлення...',
      submit: 'Надіслати',
      submitting: 'Надсилання...',
      successMessage: 'Дякуємо! Ваше повідомлення успішно надіслано.',
      errorMessage: 'Помилка при надсиланні. Спробуйте ще раз.',
    },
    de: {
      title: 'Schreiben Sie uns',
      name: 'Name',
      namePlaceholder: 'Ihr Name',
      email: 'E-Mail',
      emailPlaceholder: 'ihre@email.com',
      phone: 'Telefon (optional)',
      phonePlaceholder: '+49 123 456789',
      message: 'Nachricht',
      messagePlaceholder: 'Ihre Nachricht...',
      submit: 'Senden',
      submitting: 'Senden...',
      successMessage: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
      errorMessage: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
    },
    en: {
      title: 'Send us a message',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone (optional)',
      phonePlaceholder: '+49 123 456789',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      submit: 'Submit',
      submitting: 'Submitting...',
      successMessage: 'Thank you! Your message has been sent successfully.',
      errorMessage: 'Error sending message. Please try again.',
    },
  }

  const t = content[locale as keyof typeof content] || content.en

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Honeypot check - if filled, it's likely a bot
    if (formData.website) {
      console.log('Spam detected')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '', website: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-gray-700">
            {t.name} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-plast-green focus:outline-none focus:ring-2 focus:ring-plast-green/20"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">
            {t.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-plast-green focus:outline-none focus:ring-2 focus:ring-plast-green/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-gray-700">
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-plast-green focus:outline-none focus:ring-2 focus:ring-plast-green/20"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-semibold text-gray-700">
            {t.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-plast-green focus:outline-none focus:ring-2 focus:ring-plast-green/20"
          />
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-plast-green px-6 py-3 font-semibold text-white transition hover:bg-plast-green-dark disabled:opacity-50"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            {t.successMessage}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-100 p-4 text-red-800">
            {t.errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}
