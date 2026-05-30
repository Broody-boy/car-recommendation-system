import { FUEL_OPTIONS } from '../../utils/constants'

interface FuelStepProps {
  value: string | null
  onChange: (value: string) => void
}

const FUEL_ICONS: Record<string, string> = {
  Petrol: '⛽',
  Diesel: '⛽',
  Hybrid: '⚡',
  EV: '🔋',
}

export default function FuelStep({ value, onChange }: FuelStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          Which fuel type do you prefer?
        </h3>
        <p className="text-sm text-slate-500">
          Choose the fuel type that fits your running cost expectations
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FUEL_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              value === option
                ? 'border-primary bg-primary-light text-primary-dark font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl mb-1">{FUEL_ICONS[option]}</div>
            <div className="text-sm font-medium">{option}</div>
            <div className="text-xs text-slate-400 mt-1">
              {option === 'Petrol' && 'Lower upfront cost'}
              {option === 'Diesel' && 'Better mileage, higher torque'}
              {option === 'Hybrid' && 'Best of both worlds'}
              {option === 'EV' && 'Zero emissions, low running cost'}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
