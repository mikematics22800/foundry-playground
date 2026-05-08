export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
] as const

export const languageNameByCode: Record<string, string> = Object.fromEntries(
  languageOptions.map((language) => [language.value, language.label])
)
