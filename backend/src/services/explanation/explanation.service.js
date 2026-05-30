function getTopFactors(breakdown, count = 3) {
  return Object.entries(breakdown)
    .filter(([key]) => key !== "finalScore")
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function getLowFactors(breakdown, maxCount = 3) {
  return Object.entries(breakdown)
    .filter(([key]) => key !== "finalScore")
    .map(([key, value]) => ({ key, ...value }))
    .filter((f) => f.tradeoff && f.score < 100)
    .sort((a, b) => a.score - b.score)
    .slice(0, maxCount);
}

function generateWhy(car, prefs, breakdown, usageLabel) {
  const topFactors = getTopFactors(breakdown, 3);

  const carName = `${car.brand?.name || "Car"} ${car.model} ${car.variant}`;
  const score = Math.round(breakdown.finalScore);

  if (topFactors.length === 0) {
    return `The ${carName} scores ${score}% for your needs.`;
  }

  const primary = topFactors[0];
  const secondary = topFactors.slice(1);

  let explanation = `The ${carName} scores ${score}% matched to your needs.`;

  if (primary.score >= 80) {
    explanation += ` It fits your requirements well — ${primary.detail.toLowerCase()}.`;
  } else {
    explanation += ` It ${primary.detail.toLowerCase()}.`;
  }

  if (secondary.length > 0) {
    const extraReasons = secondary.map((f) => f.detail.toLowerCase());
    const connected =
      extraReasons.length === 1
        ? extraReasons[0]
        : extraReasons.slice(0, -1).join(", ") + `, and ${extraReasons[extraReasons.length - 1]}`;
    explanation += ` Additionally, ${connected}.`;
  }

  explanation += ` This makes it a strong contender for ${usageLabel}.`;
  return explanation;
}

function generateWhyNot(car, prefs, breakdown) {
  const lowFactors = getLowFactors(breakdown, 3);

  if (lowFactors.length === 0) {
    return [];
  }

  const intro = "Consider these tradeoffs before deciding:";
  const points = lowFactors.map((f) => f.tradeoff);

  return [intro, ...points];
}

module.exports = {
  generateWhy,
  generateWhyNot,
};
