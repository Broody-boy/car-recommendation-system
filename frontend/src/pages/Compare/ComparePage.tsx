import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComparisonStore } from '../../store/comparisonStore'
import ComparisonHeader from '../../components/compare/ComparisonHeader'
import ComparisonTable from '../../components/compare/ComparisonTable'
import ComparisonSummary from '../../components/compare/ComparisonSummary'
import WinnerCard from '../../components/compare/WinnerCard'
import ComparisonInsights from '../../components/compare/ComparisonInsights'
import EmptyComparison from '../../components/compare/EmptyComparison'
import ComparisonSkeleton from '../../components/compare/ComparisonSkeleton'

export default function ComparePage() {
  const { selected, clearCompare } = useComparisonStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (loading && selected.length > 0) {
    return (
      <div className="flex-1 py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-8 bg-slate-200 rounded w-96 mx-auto mb-2 animate-pulse" />
            <div className="h-5 bg-slate-200 rounded w-64 mx-auto animate-pulse" />
          </div>
          <ComparisonSkeleton />
        </div>
      </div>
    )
  }

  if (selected.length === 0) {
    return <EmptyComparison />
  }

  return (
    <div className="flex-1 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-heading mb-1">
              Compare Your Shortlisted Cars
            </h1>
            <p className="text-slate-500">
              See how your top choices stack up against each other.
            </p>
          </div>
        </div>

        <ComparisonHeader cars={selected} />

        <div className="mb-8">
          <ComparisonTable cars={selected} />
        </div>

        <div className="mb-8">
          <WinnerCard cars={selected} />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-text-heading mb-4">📊 Pros & Cons Summary</h3>
          <ComparisonSummary cars={selected} />
        </div>

        <div className="mb-8">
          <ComparisonInsights cars={selected} />
        </div>
      </div>
    </div>
  )
}
