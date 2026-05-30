import type { CompareItem } from '../../store/comparisonStore'
import { formatPrice, formatMileage, getSafetyStars } from '../../utils/formatters'

interface ComparisonTableProps {
  cars: CompareItem[]
}

interface RowConfig {
  label: string
  extract: (car: CompareItem) => string | number
  highlight: 'lowest' | 'highest' | 'none'
  icon?: string
}

export default function ComparisonTable({ cars }: ComparisonTableProps) {
  const minPrice = Math.min(...cars.map((c) => c.price))
  const maxMileage = Math.max(...cars.map((c) => c.mileage))
  const maxSafety = Math.max(...cars.map((c) => c.safetyRating))
  const maxSeating = Math.max(...cars.map((c) => c.seatingCapacity))

  const rows: RowConfig[] = [
    { label: 'Price', extract: (c) => formatPrice(c.price), highlight: 'lowest', icon: '💰' },
    { label: 'Mileage', extract: (c) => formatMileage(c.mileage), highlight: 'highest', icon: '⛽' },
    { label: 'Safety Rating', extract: (c) => `${getSafetyStars(c.safetyRating)} (${c.safetyRating}/5)`, highlight: 'highest', icon: '🛡️' },
    { label: 'Fuel Type', extract: (c) => c.fuelType, highlight: 'none' },
    { label: 'Transmission', extract: (c) => c.transmission, highlight: 'none' },
    { label: 'Body Type', extract: (c) => c.bodyType, highlight: 'none' },
    { label: 'Engine', extract: (c) => c.engine, highlight: 'none', icon: '⚙️' },
    { label: 'Power', extract: (c) => c.power, highlight: 'none', icon: '💪' },
    { label: 'Seating Capacity', extract: (c) => `${c.seatingCapacity} seats`, highlight: 'highest', icon: '👨‍👩‍👧‍👦' },
    { label: 'Year', extract: (c) => c.year, highlight: 'none' },
  ]

  const isBest = (car: CompareItem, row: RowConfig): boolean => {
    if (row.highlight === 'lowest') return car.price === minPrice
    if (row.highlight === 'highest') {
      if (row.label === 'Mileage') return car.mileage === maxMileage
      if (row.label === 'Safety Rating') return car.safetyRating === maxSafety
      if (row.label === 'Seating Capacity') return car.seatingCapacity === maxSeating
    }
    return false
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-semibold text-slate-600 min-w-[140px] sticky left-0 bg-slate-50">
                Feature
              </th>
              {cars.map((car) => (
                <th
                  key={car.carId}
                  className="px-4 py-3 font-semibold text-text-heading text-center min-w-[160px]"
                >
                  {car.make} {car.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="px-4 py-3 font-medium text-slate-600 sticky left-0 bg-inherit">
                  <span className="flex items-center gap-2">
                    {row.icon && <span>{row.icon}</span>}
                    {row.label}
                  </span>
                </td>
                {cars.map((car) => {
                  const best = isBest(car, row)
                  return (
                    <td
                      key={car.carId}
                      className={`px-4 py-3 text-center ${
                        best
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-slate-600'
                      }`}
                    >
                      {best && (
                        <span className="inline-block mr-1.5" title="Best value">
                          🏆
                        </span>
                      )}
                      {String(row.extract(car))}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
