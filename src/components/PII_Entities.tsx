import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  "The employee's SSN is 555-55-5555.",
  "The employee's phone number is (555) 555-5555.",
]

const PiiEntities = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        client.recognizePiiEntities(documents, lang || 'en')
      }
      description="Recognizes Personally Identifiable Information (PII) including Social Security Numbers, bank account information, and credit card numbers"
    />
  )
}

export default PiiEntities
