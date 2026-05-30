import { useNavigate } from 'react-router-dom'
import { useComparisonStore } from '../../store/comparisonStore'

export default function CompareBar() {
  const { selected, clearCompare } = useComparisonStore()
  const navigate = useNavigate()
  const count = selected.length

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">
            {count} Car{count > 1 ? 's' : ''} Selected
          </span>
          <div className="hidden sm:flex gap-2">
            {selected.map((item) => (
              <span
                key={item.carId}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
              >
                {item.make} {item.model}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearCompare}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => navigate('/compare')}
            className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  )
}
