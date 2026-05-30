import { create } from 'zustand'

export interface QuestionnaireData {
  budget: number | null
  familySize: string | null
  usageType: string | null
  bodyType: string | null
  fuelType: string | null
  transmission: string | null
  mileagePriority: string | null
  safetyPriority: string | null
}

interface QuestionnaireStore {
  data: QuestionnaireData
  updateField: <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K],
  ) => void
  resetForm: () => void
}

const INITIAL_DATA: QuestionnaireData = {
  budget: null,
  familySize: null,
  usageType: null,
  bodyType: null,
  fuelType: null,
  transmission: null,
  mileagePriority: null,
  safetyPriority: null,
}

export const useQuestionnaireStore = create<QuestionnaireStore>((set) => ({
  data: { ...INITIAL_DATA },
  updateField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
  resetForm: () => set({ data: { ...INITIAL_DATA } }),
}))
