import { PRIORITY_OPTIONS } from '../../utils/constants'

interface SafetyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function SafetyStep({ value, onChange }: SafetyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          How important is safety to you?
        </h3>
        <p className="text-sm text-slate-500">
          Higher priority means we'll recommend cars with better safety ratings
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PRIORITY_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`p-6 rounded-lg border-2 text-center transition-all ${
              value === option
                ? 'border-primary bg-primary-light text-primary-dark font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl mb-1">
              {option === 'Low' && '🟢'}
              {option === 'Medium' && '🟡'}
              {option === 'High' && '🔴'}
            </div>
            <div className="text-sm font-medium">{option}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
