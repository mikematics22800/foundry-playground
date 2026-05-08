import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type TextAnalysisLanguageContextValue = {
  lan: string
  setLan: (value: string) => void
}

const TextAnalysisLanguageContext = createContext<
  TextAnalysisLanguageContextValue | undefined
>(undefined)

type TextAnalysisLanguageProviderProps = {
  children: ReactNode
}

export const TextAnalysisLanguageProvider = ({
  children,
}: TextAnalysisLanguageProviderProps) => {
  const [lan, setLan] = useState('en')
  const value = useMemo(() => ({ lan, setLan }), [lan])

  return (
    <TextAnalysisLanguageContext.Provider value={value}>
      {children}
    </TextAnalysisLanguageContext.Provider>
  )
}

export const useTextAnalysisLanguage = () => {
  const context = useContext(TextAnalysisLanguageContext)

  if (!context) {
    throw new Error(
      'useTextAnalysisLanguage must be used within TextAnalysisLanguageProvider'
    )
  }

  return context
}
