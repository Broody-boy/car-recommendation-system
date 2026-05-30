import { BODY_OPTIONS } from '../../utils/constants'

interface BodyTypeStepProps {
  value: string | null
  onChange: (value: string) => void
}

const BODY_ICONS: Record<string, string> = {
  SUV: '🚙',
  Sedan: '🚗',
  Hatchback: '🚘',
}

export default function BodyTypeStep({ value, onChange }: BodyTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          What body type do you prefer?
        </h3>
        <p className="text-sm text-slate-500">
          Choose the style that suits your lifestyle
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {BODY_OPTIONS.map((option) => (
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
            <span className="text-2xl">{BODY_ICONS[option]}</span>
            <div>
              <div className="font-medium">{option}</div>
              <div className="text-xs text-slate-400 font-normal">
                {option === 'SUV' && 'Spacious, ground clearance, road trips'}
                {option === 'Sedan' && 'Elegant, comfortable, fuel efficient'}
                {option === 'Hatchback' && 'Compact, maneuverable, city friendly'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
