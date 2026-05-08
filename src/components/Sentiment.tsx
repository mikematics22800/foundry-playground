import { textAnalyticsClient } from '../utils/Foundry'
import AnalysisTestForm from './AnalysisTestForm'
import { useLanguageContext } from '../context/LanguageContext'
const defaultDocuments = [
  'I did not like the restaurant. The food was too spicy.',
  "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
  'The food was yummy. :)',
]

const Sentiment = () => {
  const { lan } = useLanguageContext()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        textAnalyticsClient.analyzeSentiment(documents, lang || 'en')
      }
      description="Determines whether text sentiment is positive, negative, neutral, or mixed, including per-sentence sentiment analysis and confidence scores"
    />
  )
}

export default Sentiment
