import { create } from 'zustand'

export interface CompareItem {
  carId: number
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
  score: number
}

interface ComparisonStore {
  selected: CompareItem[]
  addToCompare: (item: CompareItem) => boolean
  removeFromCompare: (carId: number) => void
  clearCompare: () => void
}

const MAX_COMPARE = 3

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  selected: [],
  addToCompare: (item) => {
    const { selected } = get()
    if (selected.length >= MAX_COMPARE) return false
    if (selected.some((s) => s.carId === item.carId)) return false
    set({ selected: [...selected, item] })
    return true
  },
  removeFromCompare: (carId) =>
    set((state) => ({
      selected: state.selected.filter((s) => s.carId !== carId),
    })),
  clearCompare: () => set({ selected: [] }),
}))
