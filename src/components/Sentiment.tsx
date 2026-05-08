import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  'I did not like the restaurant. The food was too spicy.',
  "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
  'The food was yummy. :)',
]

const Sentiment = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        client.analyzeSentiment(documents, lang || 'en')
      }
      description="Determines whether text sentiment is positive, negative, neutral, or mixed, including per-sentence sentiment analysis and confidence scores"
    />
  )
}

export default Sentiment
