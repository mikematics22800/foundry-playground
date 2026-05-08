import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { LanguageContextProvider } from './context/LanguageContext'
import Chat from './pages/Chat'
import TextAnalysis from './pages/TextAnalytics'

function App() {
  return (
    <BrowserRouter basename="/foundry-playground/">
      <LanguageContextProvider>
        <div className="app">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/text-analysis" element={<TextAnalysis />} />
              <Route path="*" element={<Navigate to="/chat" replace />} />
            </Routes>
          </main>
        </div>
      </LanguageContextProvider>
    </BrowserRouter>
  )
}

export default App
