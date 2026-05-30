const { Router } = require('express');
const recommendationService = require('../services/recommendation/recommendation.service');

const router = Router();

const USAGE_MAP = {
  City: 'CITY_DRIVING',
  Highway: 'LONG_DRIVE',
  Mixed: 'DAILY_COMMUTE',
};

const BODY_MAP = {
  SUV: 'SUV',
  Sedan: 'SEDAN',
  Hatchback: 'HATCHBACK',
};

const FUEL_MAP = {
  Petrol: 'PETROL',
  Diesel: 'DIESEL',
  Hybrid: 'HYBRID',
  EV: 'ELECTRIC',
};

const TRANSMISSION_MAP = {
  Manual: 'MANUAL',
  Automatic: 'AUTOMATIC',
};

const PRIORITY_MAP = {
  Low: 1,
  Medium: 3,
  High: 5,
};

function normalizeFamilySize(value) {
  if (!value) return 5;
  const cleaned = String(value).replace('+', '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 5 : parsed;
}

function normalizeInput(body) {
  return {
    budget: Number(body.budget) || 1500000,
    familySize: normalizeFamilySize(body.familySize),
    usageType: USAGE_MAP[body.usageType] || 'CITY_DRIVING',
    bodyType: BODY_MAP[body.bodyType] || null,
    fuelType: FUEL_MAP[body.fuelType] || null,
    transmission: TRANSMISSION_MAP[body.transmission] || null,
    mileagePriority: PRIORITY_MAP[body.mileagePriority] || 3,
    safetyPriority: PRIORITY_MAP[body.safetyPriority] || 3,
  };
}

function transformResponseItem(item) {
  const breakdown = item.scoreBreakdown || {};
  const numericBreakdown = {};

  for (const [key, value] of Object.entries(breakdown)) {
    if (key === 'finalScore') continue;
    numericBreakdown[key] = typeof value === 'object' && value !== null
      ? value.score
      : value;
  }

  return {
    carId: item.carId,
    score: item.score,
    scoreBreakdown: numericBreakdown,
    explanation: {
      why: item.explanation || '',
      whyNot: Array.isArray(item.whyNot) ? item.whyNot : [],
    },
    car: {
      id: item.car?.id ?? item.carId,
      make: item.car?.brand || '',
      model: item.car?.model || '',
      variant: item.car?.variant || '',
      price: item.car?.price ?? 0,
      mileage: item.car?.mileage ?? 0,
      safetyRating: item.car?.safetyRating ?? 0,
      fuelType: item.car?.fuelType ?? '',
      transmission: item.car?.transmission ?? '',
      bodyType: item.car?.bodyType ?? '',
      seatingCapacity: item.car?.seatingCapacity ?? 5,
      engine: item.car?.engine ?? '',
      power: item.car?.power ?? '',
      year: item.car?.launchYear ?? item.car?.year ?? new Date().getFullYear(),
      imageUrl: item.car?.imageUrl ?? null,
    },
  };
}

router.post('/recommendations', async (req, res, next) => {
  try {
    const prefs = normalizeInput(req.body);
    const recommendations = await recommendationService.generate(prefs);
    const transformed = recommendations.map(transformResponseItem);
    res.json({ recommendations: transformed });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
