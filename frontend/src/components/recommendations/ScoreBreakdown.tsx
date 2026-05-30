import { getScoreBarColor } from '../../utils/formatters'

interface ScoreBreakdownProps {
  breakdown: {
    budget: number
    safety: number
    mileage: number
    bodyType: number
    fuelType: number
    transmission: number
  }
}

const LABELS: Record<keyof ScoreBreakdownProps['breakdown'], string> = {
  budget: 'Budget Match',
  safety: 'Safety Match',
  mileage: 'Mileage Match',
  bodyType: 'Body Type Match',
  fuelType: 'Fuel Match',
  transmission: 'Transmission Match',
}

export default function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  return (
    <div className="space-y-3">
      {(Object.keys(LABELS) as Array<keyof typeof LABELS>).map((key) => (
        <div key={key}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">{LABELS[key]}</span>
            <span className="font-medium text-slate-700">{breakdown[key]}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getScoreBarColor(breakdown[key])}`}
              style={{ width: `${breakdown[key]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
