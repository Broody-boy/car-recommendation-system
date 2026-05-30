interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  isNextValid: boolean
  isSubmitting?: boolean
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextValid,
  isSubmitting,
}: NavigationButtonsProps) {
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex justify-between pt-6 border-t border-slate-200">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Back
      </button>

      {isLastStep ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!isNextValid || isSubmitting}
          className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Get Recommendations'
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!isNextValid}
          className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      )}
    </div>
  )
}
