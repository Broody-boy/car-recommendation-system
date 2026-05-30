import { USAGE_OPTIONS } from '../../utils/constants'

interface UsageStepProps {
  value: string | null
  onChange: (value: string) => void
}

const USAGE_ICONS: Record<string, string> = {
  City: '🏙️',
  Highway: '🛣️',
  Mixed: '🔄',
}

export default function UsageStep({ value, onChange }: UsageStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          How will you primarily use the car?
        </h3>
        <p className="text-sm text-slate-500">
          Choose the option that best describes your driving habits
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {USAGE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
              value === option
                ? 'border-primary bg-primary-light text-primary-dark font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <span className="text-2xl">{USAGE_ICONS[option]}</span>
            <div>
              <div className="font-medium">{option}</div>
              <div className="text-xs text-slate-400 font-normal">
                {option === 'City' && 'Stop-and-go traffic, daily commutes'}
                {option === 'Highway' && 'Long drives, weekend getaways'}
                {option === 'Mixed' && 'Balanced city and highway driving'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
