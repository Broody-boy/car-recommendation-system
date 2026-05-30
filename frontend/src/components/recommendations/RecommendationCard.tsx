import { useState } from 'react'
import type { RecommendationItem } from '../../api/recommendations.api'
import { useComparisonStore, type CompareItem } from '../../store/comparisonStore'
import { formatPrice, formatMileage, getSafetyStars } from '../../utils/formatters'
import RecommendationScore from './RecommendationScore'
import ScoreBreakdown from './ScoreBreakdown'
import WhyRecommended from './WhyRecommended'
import WhyNotCard from './WhyNotCard'

interface RecommendationCardProps {
  item: RecommendationItem
  rank: number
}

export default function RecommendationCard({ item, rank }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showCompareWarning, setShowCompareWarning] = useState(false)
  const { selected, addToCompare, removeFromCompare } = useComparisonStore()

  const isSelected = selected.some((s) => s.carId === item.carId)

  const handleCompareToggle = () => {
    if (isSelected) {
      removeFromCompare(item.carId)
      setShowCompareWarning(false)
      return
    }

    const compareItem: CompareItem = {
      carId: item.carId,
      make: item.car.make,
      model: item.car.model,
      variant: item.car.variant,
      price: item.car.price,
      mileage: item.car.mileage,
      safetyRating: item.car.safetyRating,
      fuelType: item.car.fuelType,
      transmission: item.car.transmission,
      bodyType: item.car.bodyType,
      seatingCapacity: item.car.seatingCapacity ?? 5,
      engine: item.car.engine ?? '—',
      power: item.car.power ?? '—',
      year: item.car.year ?? new Date().getFullYear(),
      imageUrl: item.car.imageUrl,
      score: item.score,
    }

    const added = addToCompare(compareItem)
    if (!added) {
      setShowCompareWarning(true)
      setTimeout(() => setShowCompareWarning(false), 3000)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative w-full lg:w-48 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0">
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-5xl">
              🚗
            </div>
            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">
              #{rank}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-text-heading">
                  {item.car.make} {item.car.model}
                </h3>
                <p className="text-sm text-slate-500">{item.car.variant}</p>
              </div>

              <div className="relative shrink-0">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <RecommendationScore score={item.score} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm">
              <span className="text-slate-700 font-medium">
                {formatPrice(item.car.price)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">
                {formatMileage(item.car.mileage)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-500">
                {getSafetyStars(item.car.safetyRating)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">{item.car.fuelType}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">{item.car.transmission}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">{item.car.bodyType}</span>
            </div>

            <div className="mt-4">
              <WhyRecommended why={item.explanation.why} />
            </div>

            {expanded && (
              <div className="mt-4 space-y-4 animate-fade-in">
                <ScoreBreakdown breakdown={item.scoreBreakdown} />
                <WhyNotCard whyNot={item.explanation.whyNot} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleCompareToggle}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-600">Compare</span>
            </label>
            {showCompareWarning && (
              <span className="text-xs text-red-500 animate-pulse">
                Max 3 cars for comparison
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              {expanded ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
