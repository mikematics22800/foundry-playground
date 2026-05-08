import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  'Microsoft was founded by Bill Gates and Paul Allen.',
  'Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.',
  'I use Azure Functions to develop my product.',
]

const LinkedEntities = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        client.recognizeLinkedEntities(documents, lang || 'en')
      }
      description="Disambiguates entities by determining which entry in a knowledge base they likely refer to"
    />
  )
}

export default LinkedEntities
