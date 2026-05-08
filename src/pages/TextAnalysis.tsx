import { useState } from 'react'
import All from '../components/All'
import Entities from '../components/Entities'
import HealthcareEntities from '../components/HealthcareEntities'
import KeyPhrases from '../components/Key_Phrases'
import Language from '../components/Language'
import LinkedEntities from '../components/Linked_Entities'
import PiiEntities from '../components/PII_Entities'
import Sentiment from '../components/Sentiment'

type Mode =
  | 'language'
  | 'keyPhrases'
  | 'entities'
  | 'linkedEntities'
  | 'sentiment'
  | 'piiEntities'
  | 'healthcareEntities'
  | 'all'

const modeLabels: Record<Mode, string> = {
  language: 'Language',
  keyPhrases: 'Key Phrases',
  entities: 'Entities',
  linkedEntities: 'Linked Entities',
  sentiment: 'Sentiment',
  piiEntities: 'PII',
  healthcareEntities: 'Healthcare',
  all: 'All',
}

const TextAnalysis = () => {
  const [mode, setMode] = useState<Mode>('language')

  const renderMode = () => {
    switch (mode) {
      case 'language':
        return <Language />
      case 'keyPhrases':
        return <KeyPhrases />
      case 'entities':
        return <Entities />
      case 'linkedEntities':
        return <LinkedEntities />
      case 'sentiment':
        return <Sentiment />
      case 'piiEntities':
        return <PiiEntities />
      case 'healthcareEntities':
        return <HealthcareEntities />
      case 'all':
        return <All />
      default:
        return null
    }
  }

  return (
    <div className="app-page">
      <div className="chat">
        <div className="input-row" style={{ flexWrap: 'wrap' }}>
          {(Object.keys(modeLabels) as Mode[]).map((modeKey) => (
            <button
              key={modeKey}
              type="button"
              className="send-button"
              onClick={() => setMode(modeKey)}
              disabled={mode === modeKey}
            >
              {modeLabels[modeKey]}
            </button>
          ))}
        </div>

        <div className="messages">{renderMode()}</div>
      </div>
    </div>
  )
}

export default TextAnalysis
