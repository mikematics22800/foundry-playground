import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { TextAnalysisLanguageProvider } from './context/TextAnalysisLanguageContext'
import Chat from './pages/Chat'
import TextAnalysis from './pages/TextAnalysis'

function App() {
  return (
    <TextAnalysisLanguageProvider>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/text-analysis" element={<TextAnalysis />} />
          </Routes>
        </main>
      </div>
    </TextAnalysisLanguageProvider>
  )
}

export default App
