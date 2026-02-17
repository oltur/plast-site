'use client'

import { createContext, useContext } from 'react'

type Messages = Record<string, any>

interface TranslationContextType {
  messages: Messages
  locale: string
}

const TranslationContext = createContext<TranslationContextType>({
  messages: {},
  locale: 'uk',
})

export function TranslationProvider({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode
  messages: Messages
  locale: string
}) {
  return (
    <TranslationContext.Provider value={{ messages, locale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation(namespace: string) {
  const { messages } = useContext(TranslationContext)

  return (key: string) => {
    const namespaceMessages = messages[namespace]
    if (!namespaceMessages) return key
    return namespaceMessages[key] || key
  }
}

export function useLocale() {
  const { locale } = useContext(TranslationContext)
  return locale
}
