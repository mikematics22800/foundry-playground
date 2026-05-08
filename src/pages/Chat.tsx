import { useCallback, useState } from 'react'
import { languageNameByCode } from '../constants/languages'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'
import {
  addMessageAndGetResponse,
  createConversation,
  getProjectAndAgent,
} from '../utils/Agent'

type Message = { role: 'user' | 'assistant'; content: string }

export default function Chat() {
  const { lan } = useTextAnalysisLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)
    setError(null)

    try {
      const { openAIClient, agent } = await getProjectAndAgent()

      let convId = conversationId
      if (!convId) {
        const conv = await createConversation(openAIClient)
        convId = conv.id
        setConversationId(convId)
      }

      const languageName = languageNameByCode[lan] ?? 'English'
      const responseText = await addMessageAndGetResponse(
        openAIClient,
        convId,
        agent,
        `Please respond in ${languageName}. User message: ${text}`
      )

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: responseText },
      ])
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${message}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, conversationId, lan])

  return (
    <div className="app-page">
      <div className="chat">
        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <p>Send a message to start chatting with the agent.</p>
              <p className="hint">
                You may be prompted to sign in with Microsoft the first time.
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message message--${msg.role}`}
              data-role={msg.role}
            >
              <span className="message-role">
                {msg.role === 'user' ? 'You' : 'Agent'}
              </span>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message message--assistant" data-role="assistant">
              <span className="message-role">Agent</span>
              <div className="message-content message-content--loading">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        <div className="input-row">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={loading}
          />
          <button
            type="button"
            className="send-button"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
