//Recognize and categorize entities in text as people, places, organizations, dates/times, quantities, currencies, etc.

import { client } from '../utils/Client'
import AnalysisTestForm from './AnalysisTestForm'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const defaultDocuments = [
  'Microsoft was founded by Bill Gates and Paul Allen.',
  'Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.',
  'Jeff bought three dozen eggs because there was a 50% discount.',
]

const Entities = () => {
  const { lan } = useTextAnalysisLanguage()

  return (
    <AnalysisTestForm
      defaultDocuments={defaultDocuments}
      language={lan}
      onSubmit={(documents, lang) =>
        client.recognizeEntities(documents, lang || 'en')
      }
      description="Categorizes entities including people, places, organizations, dates/times, quantities, and currencies"
    />
  )
}

export default Entities
