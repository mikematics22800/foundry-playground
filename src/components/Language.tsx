import { textAnalyticsClient } from '../utils/Foundry'
import AnalysisTestForm from './AnalysisTestForm'
import { useLanguageContext } from '../context/LanguageContext'
const defaultDocuments = [
  'This is written in English.',
  'Il documento scritto in italiano.',
  'Dies ist in deutscher Sprache verfasst.',
]

const Language = () => {
  const { lan } = useLanguageContext()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents) => textAnalyticsClient.detectLanguage(documents, 'none')}
      description="Identifies language"
    />
  )
}

export default Language
