interface WhyRecommendedProps {
  why: string
}

export default function WhyRecommended({ why }: WhyRecommendedProps) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
      <div className="flex items-start gap-2.5">
        <span className="text-emerald-600 text-lg mt-0.5 shrink-0">✓</span>
        <div>
          <h4 className="text-sm font-semibold text-emerald-800 mb-1">
            Why this car?
          </h4>
          <p className="text-sm text-emerald-700 leading-relaxed">{why}</p>
        </div>
      </div>
    </div>
  )
}
