import { useLocation, useNavigate } from 'react-router-dom'
import { useQuestionnaireStore } from '../../store/questionnaireStore'
import type { RecommendationItem } from '../../api/recommendations.api'
import RecommendationCard from '../../components/recommendations/RecommendationCard'
import RecommendationSkeleton from '../../components/recommendations/RecommendationSkeleton'
import CompareBar from '../../components/recommendations/CompareBar'

interface LocationState {
  recommendations?: RecommendationItem[]
  isLoading?: boolean
  error?: string
}

export default function RecommendationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const { data } = useQuestionnaireStore()

  const recommendations = state?.recommendations ?? null

  const hasQuestionnaireData = data.budget !== null

  if (!hasQuestionnaireData && !recommendations) {
    return (
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">
            No Recommendations Found
          </h2>
          <p className="text-slate-500 mb-6">
            Please complete the questionnaire to get personalized recommendations.
          </p>
          <button
            type="button"
            onClick={() => navigate('/questionnaire')}
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            Take the Questionnaire
          </button>
        </div>
      </div>
    )
  }

  if (!recommendations) {
    return (
      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-text-heading mb-2">
              Your Perfect Matches
            </h1>
            <p className="text-slate-500">
              We analyzed your preferences and found the best cars for you.
            </p>
          </div>
          <RecommendationSkeleton />
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">
            No Recommendations Found
          </h2>
          <p className="text-slate-500 mb-2">
            We couldn't find cars that match your preferences. Try adjusting your
            criteria.
          </p>
          <button
            type="button"
            onClick={() => navigate('/questionnaire')}
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retake Questionnaire
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-heading mb-2">
            Your Perfect Matches
          </h1>
          <p className="text-slate-500 text-lg">
            We analyzed your preferences and found the best cars for you.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {data.budget && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
              Budget: ₹{(data.budget / 100000).toFixed(1)}L
            </span>
          )}
          {data.familySize && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              Family: {data.familySize}
            </span>
          )}
          {data.fuelType && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              Fuel: {data.fuelType}
            </span>
          )}
          {data.transmission && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              Transmission: {data.transmission}
            </span>
          )}
        </div>

        <div className="space-y-5">
          {recommendations.map((item, index) => (
            <RecommendationCard key={item.carId} item={item} rank={index + 1} />
          ))}
        </div>
      </div>

      <CompareBar />
    </div>
  )
}
