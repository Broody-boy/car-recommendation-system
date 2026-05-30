import type { CompareItem } from '../../store/comparisonStore'

interface ComparisonSummaryProps {
  cars: CompareItem[]
}

export default function ComparisonSummary({ cars }: ComparisonSummaryProps) {
  const maxMileage = Math.max(...cars.map((c) => c.mileage))
  const maxSafety = Math.max(...cars.map((c) => c.safetyRating))
  const minPrice = Math.min(...cars.map((c) => c.price))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => {
        const pros: string[] = []
        const cons: string[] = []

        if (car.price === minPrice) pros.push('Best price among options')
        else if (car.price > minPrice * 1.3) cons.push('Higher price than alternatives')

        if (car.mileage === maxMileage) pros.push('Best fuel efficiency')
        else if (maxMileage - car.mileage > 3) cons.push('Lower mileage than competitors')

        if (car.safetyRating === maxSafety) pros.push(`Top safety score (${car.safetyRating}/5)`)
        else if (car.safetyRating < maxSafety) cons.push('Lower safety rating')

        if (car.seatingCapacity >= 5) pros.push(`Spacious interior (${car.seatingCapacity} seats)`)

        if (pros.length === 0) pros.push('Balanced all-round performer')
        if (cons.length === 0) cons.push('No significant drawbacks')

        return (
          <div
            key={car.carId}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <h4 className="font-bold text-text-heading mb-3">
              {car.make} {car.model}
            </h4>

            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1.5">
                  Pros
                </h5>
                <ul className="space-y-1">
                  {pros.map((p, i) => (
                    <li key={i} className="text-sm text-emerald-700 flex items-start gap-1.5">
                      <span className="text-emerald-500 shrink-0">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1.5">
                  Cons
                </h5>
                <ul className="space-y-1">
                  {cons.map((c, i) => (
                    <li key={i} className="text-sm text-red-600 flex items-start gap-1.5">
                      <span className="text-red-400 shrink-0">✗</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
