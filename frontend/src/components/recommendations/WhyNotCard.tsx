interface WhyNotCardProps {
  whyNot: string[]
}

export default function WhyNotCard({ whyNot }: WhyNotCardProps) {
  if (!whyNot || whyNot.length === 0) return null

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-start gap-2.5">
        <span className="text-amber-600 text-lg mt-0.5 shrink-0">⚡</span>
        <div>
          <h4 className="text-sm font-semibold text-amber-800 mb-2">
            Tradeoffs
          </h4>
          <ul className="space-y-1">
            {whyNot.map((item, i) => (
              <li
                key={i}
                className="text-sm text-amber-700 flex items-start gap-2"
              >
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
