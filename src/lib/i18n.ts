// Locale configuration
export const locales = ['uk', 'de', 'en'] as const
export const defaultLocale = 'uk' as const

export type Locale = (typeof locales)[number]
