import { BUDGET_MIN, BUDGET_MAX } from '../../utils/constants'

interface BudgetStepProps {
  value: number | null
  onChange: (value: number | null) => void
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function BudgetStep({ value, onChange }: BudgetStepProps) {
  const currentValue = value ?? BUDGET_MIN

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          What's your budget?
        </h3>
        <p className="text-sm text-slate-500">
          Set your maximum budget for the car
        </p>
      </div>

      <div className="text-center">
        <span className="text-3xl font-bold text-primary">
          {formatCurrency(currentValue)}
        </span>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={50000}
          value={currentValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="flex justify-between text-xs text-slate-400">
          <span>{formatCurrency(BUDGET_MIN)}</span>
          <span>{formatCurrency(BUDGET_MAX)}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Exact amount
        </label>
        <input
          type="number"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          value={currentValue}
          onChange={(e) => {
            const v = e.target.value ? Number(e.target.value) : BUDGET_MIN
            onChange(Math.min(Math.max(v, BUDGET_MIN), BUDGET_MAX))
          }}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  )
}
