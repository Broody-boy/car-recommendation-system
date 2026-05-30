import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STEPS } from '../../utils/constants'
import { useQuestionnaireStore } from '../../store/questionnaireStore'
import { useRecommendations } from '../../hooks/useRecommendations'
import { isStepValid } from '../../utils/validation'
import ProgressBar from './ProgressBar'
import BudgetStep from './BudgetStep'
import FamilyStep from './FamilyStep'
import UsageStep from './UsageStep'
import BodyTypeStep from './BodyTypeStep'
import FuelStep from './FuelStep'
import TransmissionStep from './TransmissionStep'
import MileageStep from './MileageStep'
import SafetyStep from './SafetyStep'
import NavigationButtons from './NavigationButtons'

const STEP_COMPONENTS = [
  BudgetStep,
  FamilyStep,
  UsageStep,
  BodyTypeStep,
  FuelStep,
  TransmissionStep,
  MileageStep,
  SafetyStep,
]

export default function QuestionnaireWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()
  const { data, updateField } = useQuestionnaireStore()
  const { mutate, isPending } = useRecommendations()

  const totalSteps = STEPS.length
  const currentStepIndex = currentStep - 1
  const stepKey = STEPS[currentStepIndex].id as keyof typeof data
  const StepComponent = STEP_COMPONENTS[currentStepIndex]

  const isValid = isStepValid(stepKey, data)

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1)
    } else {
      mutate(data, {
        onSuccess: (response) => {
          navigate('/recommendations', { state: { recommendations: response.recommendations } })
        },
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1))
  }

  const handleFieldChange = (value: unknown) => {
    updateField(stepKey as any, value as never)
  }

  const fieldValue = data[stepKey as keyof typeof data] as any

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <ProgressBar currentStep={currentStep} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 min-h-[320px]">
        <div className="mb-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
            {STEPS[currentStepIndex].label}
          </span>
        </div>

        <div className="transition-opacity duration-300">
          <StepComponent value={fieldValue} onChange={handleFieldChange} />
        </div>

        <div className="mt-8">
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onBack={handleBack}
            onNext={handleNext}
            isNextValid={isValid}
            isSubmitting={isPending}
          />
        </div>
      </div>
    </div>
  )
}
