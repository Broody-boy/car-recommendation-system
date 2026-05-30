const COMPATIBLE_BODY_TYPES = {
  SUV: ["MUV"],
  MUV: ["SUV"],
  HATCHBACK: ["SEDAN"],
  SEDAN: ["HATCHBACK"],
};

const COMPATIBLE_FUEL_TYPES = {
  PETROL: ["HYBRID"],
  HYBRID: ["PETROL"],
  CNG: ["PETROL"],
  LPG: ["PETROL"],
  DIESEL: [],
  ELECTRIC: [],
};

const COMPATIBLE_TRANSMISSIONS = {
  AUTOMATIC: ["CVT", "DCT", "AMT"],
  CVT: ["AUTOMATIC", "DCT"],
  DCT: ["AUTOMATIC", "CVT"],
  AMT: ["AUTOMATIC"],
  MANUAL: [],
};

const MAX_BUDGET_OVERAGE = 1.20;

function buildCarFilters(prefs) {
  const where = {};
  const AND = [];

  if (prefs.budget) {
    where.price = { lte: prefs.budget * MAX_BUDGET_OVERAGE };
  }

  if (prefs.familySize) {
    where.seatingCapacity = { gte: prefs.familySize };
  }

  if (prefs.bodyType) {
    const compatible = COMPATIBLE_BODY_TYPES[prefs.bodyType] || [];
    AND.push({
      OR: [
        { bodyType: prefs.bodyType },
        ...compatible.map((type) => ({ bodyType: type })),
      ],
    });
  }

  if (prefs.fuelType) {
    const compatible = COMPATIBLE_FUEL_TYPES[prefs.fuelType] || [];
    AND.push({
      OR: [
        { fuelType: prefs.fuelType },
        ...compatible.map((type) => ({ fuelType: type })),
      ],
    });
  }

  if (prefs.transmission) {
    const compatible = COMPATIBLE_TRANSMISSIONS[prefs.transmission] || [];
    AND.push({
      OR: [
        { transmission: prefs.transmission },
        ...compatible.map((type) => ({ transmission: type })),
      ],
    });
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  return { where, include: { brand: true } };
}

function buildFallbackFilters(prefs) {
  const where = {};
  const AND = [];

  if (prefs.budget) {
    where.price = { lte: prefs.budget * 1.50 };
  }

  if (prefs.familySize) {
    where.seatingCapacity = { gte: Math.max(1, prefs.familySize - 1) };
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  return { where, include: { brand: true } };
}

module.exports = {
  buildCarFilters,
  buildFallbackFilters,
  COMPATIBLE_BODY_TYPES,
  COMPATIBLE_FUEL_TYPES,
  COMPATIBLE_TRANSMISSIONS,
  MAX_BUDGET_OVERAGE,
};
