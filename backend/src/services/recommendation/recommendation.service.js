const prisma = require("../../config/database");
const { computeAllScores } = require("./scoringEngine");
const { buildCarFilters, buildFallbackFilters } = require("./filters");
const explanationService = require("../explanation/explanation.service");

const MAX_RECOMMENDATIONS = 5;
const USAGE_DESCRIPTIONS = {
  DAILY_COMMUTE: "daily commuting",
  FAMILY: "family trips",
  OFF_ROADING: "off-roading adventures",
  LONG_DRIVE: "long highway drives",
  CITY_DRIVING: "city driving",
};

function normalizePreferences(raw) {
  return {
    budget: Number(raw.budget) || 1500000,
    familySize: parseInt(raw.familySize, 10) || 5,
    usageType: raw.usageType || "CITY_DRIVING",
    bodyType: raw.bodyType || null,
    fuelType: raw.fuelType || null,
    transmission: raw.transmission || null,
    mileagePriority: mapPriority(raw.mileagePriority),
    safetyPriority: mapPriority(raw.safetyPriority),
  };
}

function mapPriority(priority) {
  if (priority === "HIGH") return 5;
  if (priority === "MEDIUM") return 3;
  if (priority === "LOW") return 1;
  return 3;
}

function rankAndTakeTop(scoredCars, topN) {
  const sorted = [...scoredCars].sort((a, b) => {
    if (a.finalScore !== b.finalScore) {
      return b.finalScore - a.finalScore;
    }
    const priceA = Number(a.car.price);
    const priceB = Number(b.car.price);
    if (priceA !== priceB) return priceA - priceB;
    if (a.car.safetyRating !== b.car.safetyRating) {
      return b.car.safetyRating - a.car.safetyRating;
    }
    return Number(b.car.mileage) - Number(a.car.mileage);
  });

  return sorted.slice(0, topN);
}

async function generate(rawPreferences) {
  const prefs = normalizePreferences(rawPreferences);
  const usageLabel = USAGE_DESCRIPTIONS[prefs.usageType] || "your needs";

  const filters = buildCarFilters(prefs);
  let cars = await prisma.car.findMany(filters);

  if (cars.length === 0) {
    const fallbackFilters = buildFallbackFilters(prefs);
    cars = await prisma.car.findMany(fallbackFilters);
  }

  if (cars.length === 0) {
    return [];
  }

  const scoredCars = cars.map((car) => {
    const breakdown = computeAllScores(car, prefs);
    return { car, ...breakdown };
  });

  const topCandidates = rankAndTakeTop(scoredCars, MAX_RECOMMENDATIONS);

  const recommendations = topCandidates.map((result) => {
    const explanation = explanationService.generateWhy(
      result.car,
      prefs,
      result,
      usageLabel
    );
    const whyNot = explanationService.generateWhyNot(result.car, prefs, result);

    return {
      carId: result.car.id,
      car: {
        id: result.car.id,
        brand: result.car.brand.name,
        model: result.car.model,
        variant: result.car.variant,
        price: Number(result.car.price),
        mileage: Number(result.car.mileage),
        safetyRating: result.car.safetyRating,
        fuelType: result.car.fuelType,
        transmission: result.car.transmission,
        bodyType: result.car.bodyType,
        seatingCapacity: result.car.seatingCapacity,
        engine: result.car.engine,
        power: result.car.power,
        imageUrl: result.car.imageUrl,
      },
      score: Math.round(result.finalScore),
      scoreBreakdown: {
        budget: { score: result.budget.score, detail: result.budget.detail },
        safety: { score: result.safety.score, detail: result.safety.detail },
        mileage: { score: result.mileage.score, detail: result.mileage.detail },
        bodyType: { score: result.bodyType.score, detail: result.bodyType.detail },
        fuelType: { score: result.fuelType.score, detail: result.fuelType.detail },
        transmission: { score: result.transmission.score, detail: result.transmission.detail },
        familySize: { score: result.familySize.score, detail: result.familySize.detail },
        finalScore: Math.round(result.finalScore),
      },
      explanation,
      whyNot,
    };
  });

  return recommendations;
}

module.exports = { generate };
