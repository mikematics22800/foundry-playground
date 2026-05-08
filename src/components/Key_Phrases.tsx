import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  'Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.',
  'I need to take my cat to the veterinarian.',
  'I will travel to South America in the summer.',
]

const KeyPhrases = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        client.extractKeyPhrases(documents, lang || 'en')
      }
      description="Identifies main talking points"
    />
  )
}

export default KeyPhrases
