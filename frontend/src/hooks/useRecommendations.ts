import { useMutation } from '@tanstack/react-query'
import { getRecommendations } from '../api/recommendations.api'
import type { QuestionnaireData } from '../store/questionnaireStore'

export function useRecommendations() {
  return useMutation({
    mutationFn: (data: QuestionnaireData) => getRecommendations(data),
  })
}
