const BASE_WEIGHTS = {
  budget: 0.30,
  safety: 0.25,
  mileage: 0.20,
  bodyType: 0.10,
  fuelType: 0.05,
  transmission: 0.05,
  familySize: 0.05,
};

function formatPrice(amount) {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}k`;
  return String(amount);
}

function getMileageUnit(fuelType) {
  return fuelType === "ELECTRIC" ? "km/kWh" : "kmpl";
}

function scoreBudget(carPrice, budget) {
  const ratio = Number(carPrice) / budget;

  if (ratio <= 1.0) {
    return { score: 100, detail: `Within your ₹${formatPrice(budget)} budget`, tradeoff: null };
  }
  if (ratio <= 1.05) {
    const excess = Number(carPrice) - budget;
    return { score: 80, detail: `Slightly over budget by ₹${formatPrice(excess)}`, tradeoff: `Exceeds budget by ₹${formatPrice(excess)}` };
  }
  if (ratio <= 1.10) {
    const excess = Number(carPrice) - budget;
    return { score: 55, detail: `Over budget by ₹${formatPrice(excess)}`, tradeoff: `Exceeds budget by ₹${formatPrice(excess)}` };
  }
  if (ratio <= 1.15) {
    const excess = Number(carPrice) - budget;
    return { score: 30, detail: `Significantly over budget by ₹${formatPrice(excess)}`, tradeoff: `Exceeds budget by ₹${formatPrice(excess)}` };
  }
  return { score: 10, detail: `Well over your budget range`, tradeoff: `Over budget by ₹${formatPrice(Number(carPrice) - budget)}` };
}

function scoreSafety(safetyRating, safetyPriority) {
  const curves = {
    5: { 5: 100, 4: 85, 3: 40, 2: 15, 1: 0 },
    3: { 5: 100, 4: 85, 3: 65, 2: 35, 1: 10 },
    1: { 5: 100, 4: 95, 3: 80, 2: 60, 1: 40 },
  };

  const score = curves[safetyPriority]?.[safetyRating] ?? 0;
  const labels = {
    5: "excellent 5-star",
    4: "good 4-star",
    3: "adequate 3-star",
    2: "basic 2-star",
    1: "minimal 1-star",
  };

  const label = labels[safetyRating] || `${safetyRating}-star`;

  if (score >= 70) {
    return { score, detail: `${label} safety rating`, tradeoff: null };
  }
  return {
    score,
    detail: `${label} safety rating`,
    tradeoff: `Only a ${label} safety rating`,
  };
}

function scoreMileage(carMileage, fuelType, mileagePriority) {
  const maxMileageByFuel = {
    PETROL: 25,
    DIESEL: 28,
    HYBRID: 35,
    ELECTRIC: 10,
    CNG: 30,
    LPG: 25,
  };

  const max = maxMileageByFuel[fuelType] || 25;
  const ratio = Math.min(1, Number(carMileage) / max);
  const unit = getMileageUnit(fuelType);

  const curves = {
    5: (r) => (r >= 0.9 ? 100 : r >= 0.75 ? 80 : r >= 0.55 ? 55 : r >= 0.35 ? 25 : 5),
    3: (r) => (r >= 0.9 ? 100 : r >= 0.75 ? 85 : r >= 0.55 ? 65 : r >= 0.35 ? 40 : 20),
    1: (r) => (r >= 0.9 ? 100 : r >= 0.75 ? 90 : r >= 0.55 ? 80 : r >= 0.35 ? 65 : 45),
  };

  const score = curves[mileagePriority](ratio);

  if (score >= 80) {
    return { score, detail: `Excellent ${carMileage} ${unit} mileage`, tradeoff: null };
  }
  if (score >= 50) {
    return { score, detail: `Decent ${carMileage} ${unit} mileage`, tradeoff: null };
  }
  return {
    score,
    detail: `${carMileage} ${unit} mileage`,
    tradeoff: `Lower mileage at ${carMileage} ${unit}`,
  };
}

function scoreBodyType(carBodyType, preferredBodyType) {
  if (!preferredBodyType) {
    return { score: 100, detail: "No body type preference specified", tradeoff: null };
  }

  if (carBodyType === preferredBodyType) {
    return { score: 100, detail: `${formatBodyType(carBodyType)} body type as preferred`, tradeoff: null };
  }

  const compatible = {
    SUV: ["MUV"],
    MUV: ["SUV"],
    HATCHBACK: ["SEDAN"],
    SEDAN: ["HATCHBACK"],
  };

  if (compatible[preferredBodyType]?.includes(carBodyType)) {
    return {
      score: 70,
      detail: `${formatBodyType(carBodyType)} body — close to your preferred ${formatBodyType(preferredBodyType)}`,
      tradeoff: `${formatBodyType(carBodyType)} instead of ${formatBodyType(preferredBodyType)}`,
    };
  }

  return {
    score: 25,
    detail: `${formatBodyType(carBodyType)} differs from your preferred ${formatBodyType(preferredBodyType)}`,
    tradeoff: `${formatBodyType(carBodyType)} instead of ${formatBodyType(preferredBodyType)}`,
  };
}

function formatBodyType(type) {
  const map = {
    HATCHBACK: "Hatchback",
    SEDAN: "Sedan",
    SUV: "SUV",
    MUV: "MUV",
    COUPE: "Coupe",
    CONVERTIBLE: "Convertible",
    WAGON: "Wagon",
    PICKUP_TRUCK: "Pickup truck",
  };
  return map[type] || type;
}

function scoreFuelType(carFuelType, preferredFuelType) {
  if (!preferredFuelType) {
    return { score: 100, detail: "No fuel type preference", tradeoff: null };
  }

  if (carFuelType === preferredFuelType) {
    return { score: 100, detail: `${formatFuelType(carFuelType)} fuel as preferred`, tradeoff: null };
  }

  const compatible = {
    PETROL: ["HYBRID"],
    HYBRID: ["PETROL"],
    CNG: ["PETROL"],
    LPG: ["PETROL"],
    DIESEL: [],
    ELECTRIC: [],
  };

  if (compatible[preferredFuelType]?.includes(carFuelType)) {
    return {
      score: 60,
      detail: `${formatFuelType(carFuelType)} fuel — compatible with your ${formatFuelType(preferredFuelType)} preference`,
      tradeoff: `Uses ${formatFuelType(carFuelType)} instead of ${formatFuelType(preferredFuelType)}`,
    };
  }

  return {
    score: 15,
    detail: `${formatFuelType(carFuelType)} fuel differs from your ${formatFuelType(preferredFuelType)} preference`,
    tradeoff: `Uses ${formatFuelType(carFuelType)} instead of ${formatFuelType(preferredFuelType)}`,
  };
}

function formatFuelType(type) {
  const map = {
    PETROL: "Petrol",
    DIESEL: "Diesel",
    ELECTRIC: "Electric",
    HYBRID: "Hybrid",
    CNG: "CNG",
    LPG: "LPG",
  };
  return map[type] || type;
}

function scoreTransmission(carTransmission, preferredTransmission) {
  if (!preferredTransmission) {
    return { score: 100, detail: "No transmission preference", tradeoff: null };
  }

  if (carTransmission === preferredTransmission) {
    return { score: 100, detail: `${formatTransmission(carTransmission)} transmission as preferred`, tradeoff: null };
  }

  if (preferredTransmission === "AUTOMATIC" && ["CVT", "DCT", "AMT"].includes(carTransmission)) {
    return {
      score: 75,
      detail: `${formatTransmission(carTransmission)} transmission — an automatic option`,
      tradeoff: `${formatTransmission(carTransmission)} instead of traditional automatic`,
    };
  }

  const nonManualPreferred = preferredTransmission !== "MANUAL";
  if (nonManualPreferred && carTransmission === "MANUAL") {
    return {
      score: 25,
      detail: `Manual transmission while you prefer ${formatTransmission(preferredTransmission)}`,
      tradeoff: `Manual transmission instead of ${formatTransmission(preferredTransmission)}`,
    };
  }

  return {
    score: 40,
    detail: `${formatTransmission(carTransmission)} differs from your ${formatTransmission(preferredTransmission)} preference`,
    tradeoff: `${formatTransmission(carTransmission)} instead of ${formatTransmission(preferredTransmission)}`,
  };
}

function formatTransmission(type) {
  const map = {
    MANUAL: "Manual",
    AUTOMATIC: "Automatic",
    CVT: "CVT",
    DCT: "DCT",
    AMT: "AMT",
  };
  return map[type] || type;
}

function scoreFamilySize(seatingCapacity, familySize) {
  if (seatingCapacity < familySize) {
    return {
      score: 0,
      detail: `${seatingCapacity}-seater — insufficient for family of ${familySize}`,
      tradeoff: `Only ${seatingCapacity} seats, needs at least ${familySize}`,
    };
  }

  if (seatingCapacity === familySize) {
    return { score: 100, detail: `Perfect ${seatingCapacity}-seater for your family of ${familySize}`, tradeoff: null };
  }

  if (seatingCapacity === familySize + 1) {
    return { score: 90, detail: `${seatingCapacity}-seater comfortably fits your family of ${familySize}`, tradeoff: null };
  }

  if (seatingCapacity === familySize + 2) {
    return { score: 70, detail: `${seatingCapacity}-seater has extra room for your family of ${familySize}`, tradeoff: null };
  }

  return {
    score: 45,
    detail: `${seatingCapacity}-seater larger than needed for ${familySize} people`,
    tradeoff: `Larger ${seatingCapacity}-seater than necessary`,
  };
}

function calculateFinalScore(scores) {
  const total = Object.entries(BASE_WEIGHTS).reduce((sum, [key, weight]) => {
    return sum + (scores[key].score * weight);
  }, 0);
  return Math.round(total * 100) / 100;
}

function computeAllScores(car, prefs) {
  const scores = {
    budget: scoreBudget(car.price, prefs.budget),
    safety: scoreSafety(car.safetyRating, prefs.safetyPriority),
    mileage: scoreMileage(car.mileage, car.fuelType, prefs.mileagePriority),
    bodyType: scoreBodyType(car.bodyType, prefs.bodyType),
    fuelType: scoreFuelType(car.fuelType, prefs.fuelType),
    transmission: scoreTransmission(car.transmission, prefs.transmission),
    familySize: scoreFamilySize(car.seatingCapacity, prefs.familySize),
  };

  scores.finalScore = calculateFinalScore(scores);
  return scores;
}

module.exports = {
  computeAllScores,
  scoreBudget,
  scoreSafety,
  scoreMileage,
  scoreBodyType,
  scoreFuelType,
  scoreTransmission,
  scoreFamilySize,
  BASE_WEIGHTS,
};
