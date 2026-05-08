import { useId, useState, type FormEvent } from 'react'

type AnalysisTestFormProps = {
  defaultDocuments: string[]
  /** BCP-47 hint for the API; defaults to English (`en`). */
  language?: string
  description?: string
  onSubmit: (documents: string[], language: string) => Promise<unknown>
}

const AnalysisTestForm = ({
  defaultDocuments,
  language = 'en',
  description,
  onSubmit,
}: AnalysisTestFormProps) => {
  const documentsFieldId = useId()
  const [documentsText, setDocumentsText] = useState(defaultDocuments.join('\n'))
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setResult('')

    const documents = documentsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    if (documents.length === 0) {
      setError('Please enter at least one document.')
      return
    }

    try {
      setIsLoading(true)
      const response = await onSubmit(documents, language.trim() || 'en')
      setResult(JSON.stringify(response, null, 2))
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Unknown error'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="analysis-form">
      <h2>{description}</h2>
      <form className="analysis-form__form" onSubmit={handleSubmit}>
        <div className="analysis-form__field">
          <textarea
            id={documentsFieldId}
            className="analysis-form__textarea"
            rows={8}
            value={documentsText}
            onChange={(event) => setDocumentsText(event.target.value)}
            disabled={isLoading}
            spellCheck={false}
          />
        </div>

        <div className="analysis-form__submit-row">
          <button
            type="submit"
            className="send-button"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error ? (
        <div className="error-banner" role="alert">
          {error}
        </div>
      ) : null}

      {result ? (
        <div
          className="message message--assistant analysis-form__result"
          data-role="assistant"
        >
          <span className="message-role">Result</span>
          <pre className="message-content analysis-form__pre">{result}</pre>
        </div>
      ) : null}
    </div>
  )
}

export default AnalysisTestForm
