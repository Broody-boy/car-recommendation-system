import apiClient from './client'
import type { QuestionnaireData } from '../store/questionnaireStore'

export interface RecommendationCar {
  id: number
  make: string
  model: string
  variant: string
  price: number
  mileage: number
  safetyRating: number
  fuelType: string
  transmission: string
  bodyType: string
  seatingCapacity: number
  engine: string
  power: string
  year: number
  imageUrl: string | null
}

export interface RecommendationItem {
  carId: number
  score: number
  scoreBreakdown: {
    budget: number
    safety: number
    mileage: number
    bodyType: number
    fuelType: number
    transmission: number
  }
  explanation: {
    why: string
    whyNot: string[]
  }
  car: RecommendationCar
}

export interface RecommendationResponse {
  recommendations: RecommendationItem[]
}

export async function getRecommendations(
  data: QuestionnaireData,
): Promise<RecommendationResponse> {
  const response = await apiClient.post<RecommendationResponse>(
    '/recommendations',
    data,
  )
  return response.data
}
