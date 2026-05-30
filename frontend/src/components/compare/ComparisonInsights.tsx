import type { CompareItem } from '../../store/comparisonStore'
import { generateInsights } from '../../utils/comparison'

interface ComparisonInsightsProps {
  cars: CompareItem[]
}

export default function ComparisonInsights({ cars }: ComparisonInsightsProps) {
  const insights = generateInsights(cars)

  if (insights.scenarios.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-text-heading mb-3">💡 Comparison Insight</h3>
      <p className="text-sm text-slate-600 mb-3">{insights.overall}</p>
      <ul className="space-y-2">
        {insights.scenarios.map((s, i) => (
          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
