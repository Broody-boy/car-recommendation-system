import { useNavigate } from 'react-router-dom'

export default function EmptyComparison() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-text-heading mb-2">
          No Cars Selected for Comparison
        </h2>
        <p className="text-slate-500 mb-6">
          Go to the recommendations page and select up to 3 cars to compare them side-by-side.
        </p>
        <button
          type="button"
          onClick={() => navigate('/recommendations')}
          className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to Recommendations
        </button>
      </div>
    </div>
  )
}
