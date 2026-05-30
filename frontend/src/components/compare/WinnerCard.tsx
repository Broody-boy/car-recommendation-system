import type { CompareItem } from '../../store/comparisonStore'
import { calculateWinners } from '../../utils/comparison'

interface WinnerCardProps {
  cars: CompareItem[]
}

export default function WinnerCard({ cars }: WinnerCardProps) {
  const winners = calculateWinners(cars)

  if (winners.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-text-heading mb-4">🏆 Category Winners</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {winners.map((w) => {
          const car = cars.find((c) => c.carId === w.carId)!
          return (
            <div
              key={w.label}
              className={`rounded-lg border-2 p-3 ${
                w.label === 'Overall Winner'
                  ? 'border-amber-400 bg-amber-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{w.icon}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {w.label}
                </span>
              </div>
              <p className="font-bold text-text-heading text-sm">
                {car.make} {car.model}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{w.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
