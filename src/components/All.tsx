import { textAnalyticsClient } from '../utils/Foundry'
import AnalysisTestForm from './AnalysisTestForm'
import { useLanguageContext } from '../context/LanguageContext'
const defaultDocuments = [
  'Microsoft was founded by Bill Gates and Paul Allen.',
  "The employee's SSN is 555-55-5555.",
  'Easter Island, a Chilean territory, is a remote volcanic island in Polynesia.',
  'I use Azure Functions to develop my product.',
]

const All = () => {
  const { lan } = useLanguageContext()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      description="Runs all text analyses simultaneously"
      onSubmit={async (documents, lang) => {
        const actions = {
          recognizeEntitiesActions: [{ modelVersion: 'latest' }],
          recognizePiiEntitiesActions: [{ modelVersion: 'latest' }],
          extractKeyPhrasesActions: [{ modelVersion: 'latest' }],
        }

        const poller = await textAnalyticsClient.beginAnalyzeActions(
          documents,
          actions,
          lang || 'en'
        )
        const pages = await poller.pollUntilDone()
        const response: unknown[] = []

        for await (const page of pages) {
          response.push(page)
        }

        return response
      }}
    />
  )
}

export default All
