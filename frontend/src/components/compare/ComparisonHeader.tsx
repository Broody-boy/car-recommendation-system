import type { CompareItem } from '../../store/comparisonStore'
import { useComparisonStore } from '../../store/comparisonStore'

interface ComparisonHeaderProps {
  cars: CompareItem[]
}

export default function ComparisonHeader({ cars }: ComparisonHeaderProps) {
  const { removeFromCompare } = useComparisonStore()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {cars.map((car) => (
        <div
          key={car.carId}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative group"
        >
          <button
            type="button"
            onClick={() => removeFromCompare(car.carId)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Remove from comparison"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
              {car.imageUrl ? (
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl">
                  🚗
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-text-heading truncate">
                {car.make} {car.model}
              </h3>
              <p className="text-sm text-slate-500 truncate">{car.variant}</p>
              {car.score > 0 && (
                <span className="inline-block mt-1 text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded">
                  Score: {car.score}/100
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
