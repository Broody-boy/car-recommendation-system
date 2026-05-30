import { getScoreColor } from '../../utils/formatters'

interface RecommendationScoreProps {
  score: number
}

export default function RecommendationScore({ score }: RecommendationScoreProps) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold leading-none ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-slate-400 leading-none mt-0.5">/ 100</span>
      </div>
    </div>
  )
}
