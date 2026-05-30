# CarDekho — AI-Powered Car Recommendation Platform

> From "I don't know what car to buy" to "I am confident about my shortlist."

## Demo

- **Live URL**: https://car-recommendation-system-xi.vercel.app
---

## Problem Statement

Car buyers face **decision paralysis**. With 100+ models across 20+ brands, each with multiple variants, trim levels, fuel types, and transmissions, the average buyer spends **12+ hours** researching before making a decision.

This application eliminates that friction by:

1. **Guiding** users through a structured 8-step questionnaire
2. **Analyzing** preferences against 128 real car variants using a weighted scoring engine
3. **Explaining** why each car was recommended (and why not)
4. **Enabling** side-by-side comparison of up to 3 shortlisted cars

---

## Features

| Feature | Description |
|---------|-------------|
| **Personalized Questionnaire** | 8-step wizard (budget, family size, usage, body type, fuel, transmission, mileage, safety) |
| **Recommendation Engine** | 7-factor weighted scoring system with tiebreaker logic |
| **Explainable AI** | Template-based natural language explanations for every recommendation |
| **Why Not Analysis** | Tradeoff bullets highlighting each car's weaknesses |
| **Car Comparison** | Side-by-side table with auto-highlighted best values, pros/cons, category winners, and overall winner |
| **Responsive UI** | Mobile and Desktop compatible design with Tailwind CSS v4 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Vite + React 19)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │Question- │  │Recommend-│  │ Compare  │  │  API    │ │
│  │ naire    │  │ ations   │  │  Page    │  │ Client  │ │
│  │ (Steps)  │  │ (Cards)  │  │ (Table)  │  │(Axios)  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       └──────────────┴──────────────┴──────────────┘     │
│                        │ HTTP (POST /api/recommendations) │
└────────────────────────┼──────────────────────────────────┘
                         │
┌────────────────────────┼──────────────────────────────────┐
│              Backend (Express + Node.js)                   │
│  ┌──────────┐  ┌───────┴────────┐  ┌──────────────────┐  │
│  │  Routes  │  │ Normalization  │  │ Response        │  │
│  │          │──│ + Validation   │──│ Transformation  │  │
│  └──────────┘  └────────────────┘  └──────────────────┘  │
│                        │                                    │
│  ┌─────────────────────┼──────────────────────────────┐   │
│  │         Recommendation Engine                       │   │
│  │  ┌────────────┐  ┌──────────┐  ┌───────────────┐  │   │
│  │  │  Scoring   │  │ Filters  │  │  Explanation  │  │   │
│  │  │  Engine    │──│(Prisma)  │──│  Service      │  │   │
│  │  └────────────┘  └──────────┘  └───────────────┘  │   │
│  └────────────────────────────────────────────────────┘   │
│                        │                                    │
│                  ┌─────┴──────┐                            │
│                  │  Prisma ORM │                            │
│                  └─────┬──────┘                            │
└────────────────────────┼──────────────────────────────────┘
                         │
                  ┌──────┴───────┐
                  │  PostgreSQL  │
                  │  (Supabase)  │
                  └──────────────┘
```

### Frontend

- **React 19** with TypeScript 6
- **Vite 8** for fast HMR and builds
- **Tailwind CSS v4** with custom design tokens
- **React Query (TanStack)** for server state and mutations
- **Zustand** for lightweight client state (questionnaire answers, comparison selection)
- **React Router v7** for client-side routing
- **Axios** for HTTP with env-based base URL

### Backend

- **Express 4** HTTP server
- **Prisma ORM 5** for type-safe database access
- **PostgreSQL** hosted on Supabase
- Pure-function scoring engine with zero framework dependencies

### Recommendation Engine

The engine is a three-layer pipeline:

1. **Filters** — Prisma `where` clause builder with compatibility matrices (e.g., SUV→MUV, Petrol→Hybrid) and automatic fallback strategy
2. **Scoring** — 7 independent scorers returning 0–100 with detail strings
3. **Explanation** — Template-based generator producing natural-language sentences

---

## Folder Structure

```
car-dekho/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── api/                 # Axios client + endpoint modules
│   │   │   ├── client.ts
│   │   │   └── recommendations.api.ts
│   │   ├── components/
│   │   │   ├── questionnaire/   # Step components + wizard
│   │   │   ├── recommendations/ # Recommendation cards, scores, breakdowns
│   │   │   └── compare/         # Comparison table, winners, insights
│   │   ├── hooks/               # React Query mutation hooks
│   │   ├── pages/
│   │   │   ├── Questionnaire/
│   │   │   ├── Recommendations/
│   │   │   └── Compare/
│   │   ├── store/               # Zustand stores
│   │   │   ├── questionnaireStore.ts
│   │   │   └── comparisonStore.ts
│   │   ├── utils/               # Constants, validation, formatters
│   │   ├── App.tsx              # Router + QueryClient provider
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Tailwind import + theme tokens
│   ├── .env                     # VITE_API_URL
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                     # Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma        # 5 models, 4 enums, 13 indexes
│   │   └── seed.js              # 7 brands, 128 cars, 706 reviews
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # Prisma client singleton
│   │   ├── routes/
│   │   │   └── recommendations.js  # POST /api/recommendations
│   │   ├── services/
│   │   │   ├── recommendation/
│   │   │   │   ├── recommendation.service.js  # Orchestrator
│   │   │   │   ├── scoringEngine.js           # 7 scorers
│   │   │   │   └── filters.js                 # Prisma query builder
│   │   │   └── explanation/
│   │   │       └── explanation.service.js     # Template generator
│   │   └── server.js            # Express entry point
│   ├── .env                     # DATABASE_URL, NODE_ENV
│   └── package.json
│
└── README.md
```

---

## Recommendation Engine

### Input Preferences

| Field | Type | Values |
|-------|------|--------|
| Budget | Number | ₹5,00,000 – ₹50,00,000 |
| Family Size | String | 1-2, 3-4, 5+, 7+ |
| Usage Type | String | City, Highway, Mixed |
| Body Type | String | SUV, Sedan, Hatchback |
| Fuel Type | String | Petrol, Diesel, Hybrid, EV |
| Transmission | String | Manual, Automatic |
| Mileage Priority | String | Low, Medium, High |
| Safety Priority | String | Low, Medium, High |

### Scoring Factors & Weights

| Factor | Weight | Description |
|--------|--------|-------------|
| Budget | 30% | Proximity to budget (under = 100, slight over = 80, etc.) |
| Safety | 25% | Safety rating weighted by user's safety priority |
| Mileage | 20% | Fuel efficiency relative to category max, weighted by priority |
| Body Type | 10% | Exact match = 100, compatible = 70, different = 25 |
| Fuel Type | 5% | Exact match = 100, compatible = 60, different = 15 |
| Transmission | 5% | Exact match = 100, compatible automatic variant = 75, different = 25 |
| Family Size | 5% | Perfect fit = 100, extra room = 90–70, insufficient = 0 |

### Ranking Logic

1. Sort by `finalScore` descending
2. Tiebreaker 1: Price ascending (prefer cheaper)
3. Tiebreaker 2: Safety rating descending
4. Tiebreaker 3: Mileage descending
5. Return top 5

### Tradeoff Analysis

The explanation service identifies the 3 lowest-scoring factors and generates:

- **Why**: "The Honda City scores 92% matched to your needs. It fits your requirements well — within your ₹15.0L budget. Additionally, sedan body type as preferred, and petrol fuel as preferred."
- **Why Not**: "Consider these tradeoffs before deciding: • Lower mileage at 18.4 kmpl • Manual transmission instead of Automatic"

---

## API Endpoints

### `POST /api/recommendations`

Generate personalized car recommendations.

**Request:**
```json
{
  "budget": 1500000,
  "familySize": "3-4",
  "usageType": "City",
  "bodyType": "SUV",
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "mileagePriority": "Medium",
  "safetyPriority": "High"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "carId": 253,
      "score": 92,
      "scoreBreakdown": {
        "budget": 100,
        "safety": 85,
        "mileage": 85,
        "bodyType": 100,
        "fuelType": 100,
        "transmission": 100,
        "familySize": 70
      },
      "explanation": {
        "why": "The Maruti Suzuki Fronx...",
        "whyNot": []
      },
      "car": {
        "id": 253,
        "make": "Maruti Suzuki",
        "model": "Fronx",
        "variant": "Delta Turbo AT",
        "price": 1149000,
        "mileage": 19,
        "safetyRating": 4,
        "fuelType": "PETROL",
        "transmission": "AUTOMATIC",
        "bodyType": "SUV",
        "seatingCapacity": 5,
        "engine": "1197 cc",
        "power": "87 bhp",
        "year": 2026,
        "imageUrl": "/images/cars/maruti-suzuki-fronx.jpg"
      }
    }
  ]
}
```

### Planned Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/cars` | List all cars with optional filters |
| GET | `/api/cars/:id` | Single car details |
| GET | `/api/reviews/:carId` | Reviews for a car |
| POST | `/api/reviews` | Submit a review |

---

## Database Schema

### Models

| Model | Fields | Purpose |
|-------|--------|---------|
| **Brand** | id, name, logoUrl | Car manufacturers (7 seeded) |
| **Car** | id, brandId, model, variant, price, mileage, safetyRating, fuelType, transmission, bodyType, engine, power, torque, seatingCapacity, launchYear, imageUrl | Individual car variants (128 seeded) |
| **Review** | id, carId, rating, reviewText, authorName | User reviews (706 seeded) |
| **UserPreference** | id, minBudget, maxBudget, familySize, usageType, preferredBodyType, preferredFuelType, preferredTransmission, mileagePriority, safetyPriority | Saved questionnaire responses |
| **RecommendationHistory** | id, preferenceId, recommendedCarId, recommendationScore, explanation | Audit trail of recommendations |

### Enums

FuelType (PETROL, DIESEL, ELECTRIC, HYBRID, CNG, LPG), Transmission (MANUAL, AUTOMATIC, CVT, DCT, AMT), BodyType (HATCHBACK, SEDAN, SUV, MUV, COUPE, CONVERTIBLE, WAGON, PICKUP_TRUCK), UsageType (DAILY_COMMUTE, FAMILY, OFF_ROADING, LONG_DRIVE, CITY_DRIVING)

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or Supabase account)
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env      # Edit DATABASE_URL
npx prisma db push         # Create tables
npx prisma db seed         # Seed 128 cars + 706 reviews
npm run dev                # Starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env       # Set VITE_API_URL=http://localhost:5000/api
npm run dev                # Starts on http://localhost:5173
```

### Environment Variables

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend `.env`:**
```
DATABASE_URL=postgresql://user:password@host:5432/db
PORT=5000
```

---

## Deployment

### Frontend (Vercel)

```bash
npm run build            # Produces frontend/dist/
vercel --prod
```

Set env variable `VITE_API_URL` to the production backend URL.

### Backend (Railway)

```bash
railway login
railway init
railway add --database postgresql   # Provisions PostgreSQL
railway up                          # Deploys Express app
```

set `DATABASE_URL`, `CLIENT_URL` into the environment.

---

## Why This Tech Stack

### Frontend: React + Vite + TypeScript + Tailwind CSS

- **React** — Easier developement, component-driven UIs, Massive ecosystem.
- **Vite** — Fastest dev server (instant Hot Module Reload).
- **TypeScript** — To enforce Type safety.
- **Tailwind CSS v4** — Utility-first CSS with zero runtime. Easier to make responsive websites.

### Backend: Express

- **Express** — Easier REST API developement, Massive ecosystem.
- **Prisma** — One of the most popular ORMs.

### DB: Postgres

- **SQL** — Easier for making structured tables.
- **Support for pgvectors** — Can be used in the future to expand the app to include RAG based systems.


### State Management: Zustand over Redux

The app has exactly two pieces of client state (questionnaire answers and comparison selection), each under 10 fields. Zustand's hook-based API eliminates Redux boilerplate (actions, reducers, dispatch) without sacrificing TypeScript inference. Context would cause unnecessary re-renders on step changes.

---

## Product Decisions

### Why a recommendation engine over a large feature set?

The core value proposition is **reducing decision time**. A recommendation engine directly solves the user's problem (too many choices) more effectively than any peripheral feature. The engine was built as a pure, deterministic scoring system — no black boxes, no hallucinations, and every recommendation is reproducible.

### Why explainability?

Trust. Users won't buy a ₹15L car based on a black-box score. Every recommendation includes a natural-language "why" and a transparent "why not" so users can make informed tradeoffs. This also makes the recommendation debuggable — if a user disagrees, they know exactly which factor to adjust.

### Why comparison?

Shortlisting 2-3 cars from 5 recommendations is still cognitively demanding. The comparison page highlights differences (price, safety, mileage) and automatically declares winners in 5 categories (budget, mileage, safety, family, overall). This guides users from "these are your options" to "here's your best choice."

---

## Tradeoffs

### What was deliberately cut?

| Feature | Why cut |
|---------|---------|
| **Authentication** | MVP was made, hence skipped this. |
| **User accounts** | MVP with core use case was made, hence skipped this. |
| **Advanced analytics** | Dashboard for tracking user preferences is valuable but doesn't help the current user. |
| **Admin dashboard** | Car inventory management is a separate product concern. |
| **Real AI/LLM** | Can be used in conjunction. Can add a button called view with AI and then the required response can be generated. This way, templates (current scenario) are auditable but adding AI makes the platform more interactive. Also, AI is prone to hallucination.|
| **Car detail page** | Would be the next feature added; comparison covers the immediate need. |

---

## AI Usage

### What was delegated to AI tools?

- **Architecture brainstorming** — Exploring folder structures
- **Component scaffolding** — Boilerplate for React components, Express routes, and Prisma schema
- **Code generation** — UI components, form validation, responsive layouts, Tailwind styling
- **Documentation** — README structure, deployment guides, technical writing

### What was manually reviewed and owned?

- **Validation at each step** — After each prompt, the output was validated, tested. End to end testing was done in the end as well.
- **Product decisions** — Questionarre system, What to build, feature prioritization
- **Architecture** — Controller/Service/Repository separation, engine purity, data flow integrity
- **Bug fixes** — Database connectivity, API response shape mismatches, explanation service edge cases
- **Configuration issues missed by AI** — Supabase has a separate IPv4 connection string, which was resolved promptly after learning the issue.
- **Fine tweaks to the Documentation** — The value points were reviewed, evaluated, and refined/altered to match the actual code base and not just contain AI generated buzz words.

---

## Future Improvements

If I had another 4 hours:

1. **Login to save previous recommendations/comparisons** — Login using phone number, email etc. to save each comparison sessions.
2. **User preference is saved** - instead of going through the questionaire each time, we can show the user what he/she chose last time and modify it instead of going through all again.
3. **LLM-powered explanations** — Replace templates with GPT-4o for richer, more contextual "why" and "why not" text
4. **Saved recommendations** — Allow users to bookmark/share their favourite cars via URL
5. **Feedback loop** — Thumbs up/down on recommendations to refine future results
6. **Advanced filtering** — Add on-road price, color, feature set filters post-questionnaire
7. **Car detail page** — Full-spec view with high-res images, 360° view, and expert reviews
8. **Test drive booking** — Integration with dealership APIs
9. **Ticketing system** — For adding the request callback feature
10. **Innovative** - Take pic of your existing car. Most users have a preference for their existing cars. Detect the car using AI and suggest similar cars based on the scores of the current car. This way a user likes sedan, he can find similar sedans. If a user likes a brand (say Tata), he can find similar Tata cars.