import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type LanguageContextValue = {
  lan: string
  setLan: (value: string) => void
}

const LanguageContext = createContext<
  LanguageContextValue | undefined
>(undefined)

type LanguageContextProps = {
  children: ReactNode
}

export const LanguageContextProvider = ({
  children,
}: LanguageContextProps) => {
  const [lan, setLan] = useState('en')
  const value = useMemo(() => ({ lan, setLan }), [lan])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('Undefined LanguageContext')
  }
  return context
}
