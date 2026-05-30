import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import QuestionnairePage from './pages/Questionnaire/QuestionnairePage'
import RecommendationsPage from './pages/Recommendations/RecommendationsPage'
import ComparePage from './pages/Compare/ComparePage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<QuestionnairePage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
