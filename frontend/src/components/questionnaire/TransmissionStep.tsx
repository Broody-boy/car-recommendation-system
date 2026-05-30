import { TRANSMISSION_OPTIONS } from '../../utils/constants'

interface TransmissionStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function TransmissionStep({
  value,
  onChange,
}: TransmissionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-heading mb-1">
          Which transmission do you prefer?
        </h3>
        <p className="text-sm text-slate-500">
          Choose between control and convenience
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TRANSMISSION_OPTIONS.map((option) => (
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
            <div className="text-3xl mb-2">
              {option === 'Manual' ? '🕹️' : '⚙️'}
            </div>
            <div className="font-medium">{option}</div>
            <div className="text-xs text-slate-400 mt-1">
              {option === 'Manual' && 'More control, lower cost'}
              {option === 'Automatic' && 'Easy driving in traffic'}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
