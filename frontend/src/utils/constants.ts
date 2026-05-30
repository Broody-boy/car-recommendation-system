export const STEPS = [
  { id: 'budget', label: 'Budget', step: 1 },
  { id: 'familySize', label: 'Family Size', step: 2 },
  { id: 'usageType', label: 'Usage Type', step: 3 },
  { id: 'bodyType', label: 'Body Type', step: 4 },
  { id: 'fuelType', label: 'Fuel Type', step: 5 },
  { id: 'transmission', label: 'Transmission', step: 6 },
  { id: 'mileagePriority', label: 'Mileage Priority', step: 7 },
  { id: 'safetyPriority', label: 'Safety Priority', step: 8 },
] as const

export const BUDGET_MIN = 500000
export const BUDGET_MAX = 5000000

export const FAMILY_OPTIONS = ['1-2', '3-4', '5+', '7+'] as const
export const USAGE_OPTIONS = ['City', 'Highway', 'Mixed'] as const
export const BODY_OPTIONS = ['SUV', 'Sedan', 'Hatchback'] as const
export const FUEL_OPTIONS = ['Petrol', 'Diesel', 'Hybrid', 'EV'] as const
export const TRANSMISSION_OPTIONS = ['Manual', 'Automatic'] as const
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'] as const

export const STEP_FIELDS = STEPS.map((s) => s.id) as unknown as readonly [
  'budget',
  'familySize',
  'usageType',
  'bodyType',
  'fuelType',
  'transmission',
  'mileagePriority',
  'safetyPriority',
]
