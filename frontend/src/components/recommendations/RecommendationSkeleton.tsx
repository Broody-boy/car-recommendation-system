export default function RecommendationSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-pulse"
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-48 h-36 bg-slate-200 rounded-lg shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="flex gap-4">
                  <div className="h-4 bg-slate-200 rounded w-20" />
                  <div className="h-4 bg-slate-200 rounded w-24" />
                  <div className="h-4 bg-slate-200 rounded w-16" />
                </div>
                <div className="flex gap-3">
                  <div className="h-8 bg-slate-200 rounded w-24" />
                  <div className="h-8 bg-slate-200 rounded w-32" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
