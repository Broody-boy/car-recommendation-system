import type { CompareItem } from '../store/comparisonStore'

export interface WinnerResult {
  label: string
  icon: string
  carId: number
  description: string
}

export interface InsightsResult {
  overall: string
  scenarios: string[]
}

function normalizeScore(value: number, min: number, max: number): number {
  if (max === min) return 50
  return ((value - min) / (max - min)) * 100
}

export function calculateWinners(cars: CompareItem[]): WinnerResult[] {
  if (cars.length === 0) return []

  const minPrice = Math.min(...cars.map((c) => c.price))
  const maxPrice = Math.max(...cars.map((c) => c.price))
  const maxMileage = Math.max(...cars.map((c) => c.mileage))
  const maxSafety = Math.max(...cars.map((c) => c.safetyRating))
  const maxSeating = Math.max(...cars.map((c) => c.seatingCapacity))

  const winners: WinnerResult[] = []

  const bestBudgetCar = cars.find((c) => c.price === minPrice)!
  winners.push({
    label: 'Best Budget Option',
    icon: '💰',
    carId: bestBudgetCar.carId,
    description: `Lowest price at ${formatPriceLabel(bestBudgetCar.price)}`,
  })

  const bestMileageCar = cars.find((c) => c.mileage === maxMileage)!
  winners.push({
    label: 'Best Mileage Choice',
    icon: '⛽',
    carId: bestMileageCar.carId,
    description: `Highest mileage at ${bestMileageCar.mileage} kmpl`,
  })

  const bestSafetyCar = cars.find((c) => c.safetyRating === maxSafety)!
  winners.push({
    label: 'Best Safety Choice',
    icon: '🛡️',
    carId: bestSafetyCar.carId,
    description: `${bestSafetyCar.safetyRating}-star safety rating`,
  })

  const bestFamilyCar = cars.find((c) => c.seatingCapacity === maxSeating)!
  winners.push({
    label: 'Best Family Car',
    icon: '👨‍👩‍👧‍👦',
    carId: bestFamilyCar.carId,
    description: `Seats up to ${bestFamilyCar.seatingCapacity} passengers`,
  })

  const scored = cars.map((c) => {
    const priceScore =
      c.price === minPrice ? 100 : normalizeScore(maxPrice - c.price, 0, maxPrice - minPrice)
    const mileageScore = normalizeScore(c.mileage, 0, maxMileage)
    const safetyScore = normalizeScore(c.safetyRating, 0, 5)
    const familyScore = normalizeScore(c.seatingCapacity, 0, maxSeating)
    const featureScore = (priceScore + mileageScore + safetyScore + familyScore) / 4

    const overall =
      priceScore * 0.2 + mileageScore * 0.2 + safetyScore * 0.3 + featureScore * 0.15 + familyScore * 0.15

    return { car: c, overall }
  })

  scored.sort((a, b) => b.overall - a.overall)
  const winner = scored[0]!

  winners.push({
    label: 'Overall Winner',
    icon: '🏆',
    carId: winner.car.carId,
    description: `${winner.car.make} ${winner.car.model} scores ${Math.round(winner.overall)}/100 overall`,
  })

  return winners
}

export function generateInsights(cars: CompareItem[]): InsightsResult {
  if (cars.length === 0) {
    return { overall: '', scenarios: [] }
  }

  const winners = calculateWinners(cars)
  const overallWinner = winners.find((w) => w.label === 'Overall Winner')!
  const safetyWinner = winners.find((w) => w.label === 'Best Safety Choice')!
  const mileageWinner = winners.find((w) => w.label === 'Best Mileage Choice')!
  const budgetWinner = winners.find((w) => w.label === 'Best Budget Option')!

  const overallCar = cars.find((c) => c.carId === overallWinner.carId)!
  const safetyCar = cars.find((c) => c.carId === safetyWinner.carId)!
  const mileageCar = cars.find((c) => c.carId === mileageWinner.carId)!
  const budgetCar = cars.find((c) => c.carId === budgetWinner.carId)!

  const scenarios: string[] = []

  if (safetyCar.carId !== overallCar.carId) {
    scenarios.push(
      `If safety is your top priority, **${safetyCar.make} ${safetyCar.model}** is the strongest option with a ${safetyCar.safetyRating}-star rating.`,
    )
  }

  if (mileageCar.carId !== overallCar.carId) {
    scenarios.push(
      `If you prioritize fuel efficiency, **${mileageCar.make} ${mileageCar.model}** performs better at ${mileageCar.mileage} kmpl.`,
    )
  }

  if (budgetCar.carId !== overallCar.carId) {
    scenarios.push(
      `For the most affordable option, **${budgetCar.make} ${budgetCar.model}** at ${formatPriceLabel(budgetCar.price)} is the best choice.`,
    )
  }

  const uniqueWinners = new Set(winners.map((w) => w.carId))
  if (uniqueWinners.size > 1) {
    scenarios.push(
      `For an overall balance of features, safety, and ownership experience, **${overallCar.make} ${overallCar.model}** is the recommended choice.`,
    )
  }

  return {
    overall: `Based on your preferences, here's how your selected cars compare across key factors.`,
    scenarios,
  }
}

export function formatPriceLabel(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`
  return `₹${amount.toLocaleString('en-IN')}`
}
