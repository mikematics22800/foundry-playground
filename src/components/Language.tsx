import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  'This is written in English.',
  'Il documento scritto in italiano.',
  'Dies ist in deutscher Sprache verfasst.',
]

const Language = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents) => client.detectLanguage(documents, 'none')}
      description="Identifies language"
    />
  )
}

export default Language
