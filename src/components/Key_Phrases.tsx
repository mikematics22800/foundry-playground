import { textAnalyticsClient } from '../utils/Foundry'
import AnalysisTestForm from './AnalysisTestForm'
import { useLanguageContext } from '../context/LanguageContext'
const defaultDocuments = [
  'Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.',
  'I need to take my cat to the veterinarian.',
  'I will travel to South America in the summer.',
]

const KeyPhrases = () => {
  const { lan } = useLanguageContext()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        textAnalyticsClient.extractKeyPhrases(documents, lang || 'en')
      }
      description="Identifies main talking points"
    />
  )
}

export default KeyPhrases
