import { FAMILY_OPTIONS } from '../../utils/constants'

interface FamilyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function FamilyStep({ value, onChange }: FamilyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          How many people in your family?
        </h3>
        <p className="text-sm text-slate-500">
          This helps us recommend the right seating capacity
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FAMILY_OPTIONS.map((option) => (
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
            <span className="text-lg">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
