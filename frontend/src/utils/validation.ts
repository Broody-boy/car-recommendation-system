import { BUDGET_MIN, BUDGET_MAX } from './constants'
import type { QuestionnaireData } from '../store/questionnaireStore'

type StepId = keyof QuestionnaireData

const STEP_VALIDATORS: Record<StepId, (value: unknown) => boolean> = {
  budget: (v) => typeof v === 'number' && v >= BUDGET_MIN && v <= BUDGET_MAX,
  familySize: (v) => typeof v === 'string' && v.length > 0,
  usageType: (v) => typeof v === 'string' && v.length > 0,
  bodyType: (v) => typeof v === 'string' && v.length > 0,
  fuelType: (v) => typeof v === 'string' && v.length > 0,
  transmission: (v) => typeof v === 'string' && v.length > 0,
  mileagePriority: (v) => typeof v === 'string' && v.length > 0,
  safetyPriority: (v) => typeof v === 'string' && v.length > 0,
}

export function validateStep(stepId: StepId, value: unknown): boolean {
  const validator = STEP_VALIDATORS[stepId]
  return validator ? validator(value) : false
}

export function isStepValid(stepId: StepId, data: QuestionnaireData): boolean {
  return validateStep(stepId, data[stepId])
}
