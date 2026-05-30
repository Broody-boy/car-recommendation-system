const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// BRANDS
// ---------------------------------------------------------------------------
const BRANDS = [
  { name: "Maruti Suzuki", logoUrl: "/images/brands/maruti-suzuki.png" },
  { name: "Hyundai", logoUrl: "/images/brands/hyundai.png" },
  { name: "Honda", logoUrl: "/images/brands/honda.png" },
  { name: "Tata", logoUrl: "/images/brands/tata.png" },
  { name: "Mahindra", logoUrl: "/images/brands/mahindra.png" },
  { name: "Kia", logoUrl: "/images/brands/kia.png" },
  { name: "Toyota", logoUrl: "/images/brands/toyota.png" },
];

// ---------------------------------------------------------------------------
// MODEL DEFINITIONS — each entry is expanded to one or more car rows
// ---------------------------------------------------------------------------
const MODEL_DEFS = [
  // ═══════════════════════  MARUTI SUZUKI  ═══════════════════════
  { brand: "Maruti Suzuki", model: "Alto K10",      body: "HATCHBACK", engine: "998 cc",   power: "65 bhp",   torque: "89 Nm",  seats: 5, year: 2024, variants: [
    { name: "VXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 499000,   mil: 24.0, safety: 2 },
    { name: "VXi AMT",       fuel: "PETROL",  trans: "AMT",      price: 549000,   mil: 23.5, safety: 2 },
  ]},
  { brand: "Maruti Suzuki", model: "Celerio",       body: "HATCHBACK", engine: "998 cc",   power: "65 bhp",   torque: "89 Nm",  seats: 5, year: 2023, variants: [
    { name: "LXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 569000,   mil: 26.0, safety: 2 },
    { name: "VXi AMT",       fuel: "PETROL",  trans: "AMT",      price: 639000,   mil: 25.0, safety: 2 },
  ]},
  { brand: "Maruti Suzuki", model: "WagonR",        body: "HATCHBACK", engine: "1197 cc",  power: "87 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "LXi 1.0 MT",    fuel: "PETROL",  trans: "MANUAL",   price: 589000,   mil: 23.0, safety: 3 },
    { name: "VXi 1.2 MT",    fuel: "PETROL",  trans: "MANUAL",   price: 679000,   mil: 22.0, safety: 3 },
    { name: "ZXi 1.2 AMT",   fuel: "PETROL",  trans: "AMT",      price: 769000,   mil: 21.5, safety: 3 },
  ]},
  { brand: "Maruti Suzuki", model: "Swift",         body: "HATCHBACK", engine: "1197 cc",  power: "87 bhp",   torque: "113 Nm", seats: 5, year: 2024, variants: [
    { name: "LXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 649000,   mil: 23.0, safety: 3 },
    { name: "VXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 729000,   mil: 23.5, safety: 3 },
    { name: "ZXi+ CVT",      fuel: "PETROL",  trans: "CVT",      price: 949000,   mil: 22.0, safety: 3 },
  ]},
  { brand: "Maruti Suzuki", model: "Baleno",        body: "HATCHBACK", engine: "1197 cc",  power: "87 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "Sigma MT",      fuel: "PETROL",  trans: "MANUAL",   price: 699000,   mil: 22.0, safety: 3 },
    { name: "Delta MT",      fuel: "PETROL",  trans: "MANUAL",   price: 769000,   mil: 22.5, safety: 3 },
    { name: "Alpha CVT",     fuel: "PETROL",  trans: "CVT",      price: 999000,   mil: 21.0, safety: 3 },
  ]},
  { brand: "Maruti Suzuki", model: "Dzire",         body: "SEDAN",    engine: "1197 cc",  power: "87 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "LXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 749000,   mil: 24.0, safety: 4 },
    { name: "VXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 829000,   mil: 24.5, safety: 4 },
    { name: "ZXi+ AMT",      fuel: "PETROL",  trans: "AMT",      price: 999000,   mil: 23.0, safety: 4 },
  ]},
  { brand: "Maruti Suzuki", model: "Brezza",        body: "SUV",      engine: "1462 cc",  power: "101 bhp",  torque: "136 Nm", seats: 5, year: 2023, variants: [
    { name: "LXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 899000,   mil: 20.0, safety: 4 },
    { name: "VXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 999000,   mil: 20.5, safety: 4 },
    { name: "ZXi+ AT",       fuel: "PETROL",  trans: "AUTOMATIC", price: 1349000,  mil: 19.0, safety: 4 },
  ]},
  { brand: "Maruti Suzuki", model: "Ertiga",        body: "MUV",      engine: "1462 cc",  power: "101 bhp",  torque: "136 Nm", seats: 7, year: 2023, variants: [
    { name: "LXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 949000,   mil: 20.0, safety: 4 },
    { name: "VXi MT",        fuel: "PETROL",  trans: "MANUAL",   price: 1029000,  mil: 20.5, safety: 4 },
    { name: "ZXi CNG MT",    fuel: "CNG",     trans: "MANUAL",   price: 1249000,  mil: 26.0, safety: 4 },
  ]},
  { brand: "Maruti Suzuki", model: "Fronx",         body: "SUV",      engine: "1197 cc",  power: "87 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "Sigma MT",      fuel: "PETROL",  trans: "MANUAL",   price: 799000,   mil: 21.0, safety: 4 },
    { name: "Delta Turbo AT", fuel: "PETROL", trans: "AUTOMATIC", price: 1149000,  mil: 19.0, safety: 4 },
    { name: "Alpha Turbo AT", fuel: "PETROL", trans: "AUTOMATIC", price: 1299000,  mil: 19.0, safety: 4 },
  ]},
  { brand: "Maruti Suzuki", model: "Grand Vitara",  body: "SUV",      engine: "1462 cc",  power: "101 bhp",  torque: "136 Nm", seats: 5, year: 2023, variants: [
    { name: "Sigma MT",      fuel: "PETROL",  trans: "MANUAL",   price: 1149000,  mil: 22.0, safety: 5 },
    { name: "Zeta Hybrid CVT", fuel: "HYBRID", trans: "CVT",     price: 1599000,  mil: 27.0, safety: 5 },
    { name: "Alpha Hybrid CVT", fuel: "HYBRID",trans: "CVT",     price: 1799000,  mil: 27.0, safety: 5 },
  ]},
  { brand: "Maruti Suzuki", model: "Jimny",         body: "SUV",      engine: "1462 cc",  power: "101 bhp",  torque: "134 Nm", seats: 4, year: 2023, variants: [
    { name: "Zeta MT",       fuel: "PETROL",  trans: "MANUAL",   price: 1299000,  mil: 17.0, safety: 4 },
    { name: "Alpha AT",      fuel: "PETROL",  trans: "AUTOMATIC", price: 1549000,  mil: 16.0, safety: 4 },
  ]},

  // ═══════════════════════  HYUNDAI  ═══════════════════════
  { brand: "Hyundai", model: "i20",          body: "HATCHBACK", engine: "1197 cc",  power: "83 bhp",   torque: "114 Nm", seats: 5, year: 2023, variants: [
    { name: "Sportz MT",     fuel: "PETROL",  trans: "MANUAL",   price: 789000,   mil: 20.3, safety: 3 },
    { name: "Asta CVT",      fuel: "PETROL",  trans: "CVT",      price: 989000,   mil: 19.8, safety: 3 },
    { name: "N Line DCT",    fuel: "PETROL",  trans: "DCT",      price: 1089000,  mil: 19.2, safety: 3 },
  ]},
  { brand: "Hyundai", model: "Exter",        body: "SUV",      engine: "1197 cc",  power: "83 bhp",   torque: "114 Nm", seats: 5, year: 2023, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 699000,   mil: 19.5, safety: 3 },
    { name: "SX AMT",        fuel: "PETROL",  trans: "AMT",      price: 849000,   mil: 19.0, safety: 3 },
    { name: "SX+ Turbo MT",  fuel: "PETROL",  trans: "MANUAL",   price: 999000,   mil: 18.5, safety: 3 },
  ]},
  { brand: "Hyundai", model: "Venue",        body: "SUV",      engine: "1197 cc",  power: "83 bhp",   torque: "114 Nm", seats: 5, year: 2024, variants: [
    { name: "E MT",          fuel: "PETROL",  trans: "MANUAL",   price: 799000,   mil: 19.0, safety: 4 },
    { name: "S DCT",         fuel: "PETROL",  trans: "DCT",      price: 1029000,  mil: 18.5, safety: 4 },
    { name: "SX Turbo DCT",  fuel: "PETROL",  trans: "DCT",      price: 1149000,  mil: 18.2, safety: 4 },
  ]},
  { brand: "Hyundai", model: "Verna",        body: "SEDAN",    engine: "1497 cc",  power: "113 bhp",  torque: "144 Nm", seats: 5, year: 2023, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 1199000,  mil: 18.0, safety: 5 },
    { name: "SX CVT",        fuel: "PETROL",  trans: "CVT",      price: 1449000,  mil: 17.5, safety: 5 },
    { name: "SX Turbo DCT",  fuel: "PETROL",  trans: "DCT",      price: 1749000,  mil: 20.0, safety: 5 },
  ]},
  { brand: "Hyundai", model: "Creta",        body: "SUV",      engine: "1497 cc",  power: "113 bhp",  torque: "144 Nm", seats: 5, year: 2024, variants: [
    { name: "E MT",          fuel: "PETROL",  trans: "MANUAL",   price: 1099000,  mil: 17.0, safety: 5 },
    { name: "S Diesel AT",   fuel: "DIESEL",  trans: "AUTOMATIC", price: 1499000, mil: 21.0, safety: 5 },
    { name: "SX DCT",        fuel: "PETROL",  trans: "DCT",      price: 1649000,  mil: 19.0, safety: 5 },
    { name: "SX+ Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 1899000, mil: 21.0, safety: 5 },
  ]},
  { brand: "Hyundai", model: "Alcazar",      body: "MUV",      engine: "1497 cc",  power: "113 bhp",  torque: "144 Nm", seats: 7, year: 2024, variants: [
    { name: "Prestige MT",   fuel: "PETROL",  trans: "MANUAL",   price: 1699000,  mil: 17.5, safety: 5 },
    { name: "Platinum Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 2149000, mil: 20.0, safety: 5 },
  ]},
  { brand: "Hyundai", model: "Tucson",       body: "SUV",      engine: "1995 cc",  power: "183 bhp",  torque: "416 Nm", seats: 5, year: 2024, variants: [
    { name: "E Diesel AT",   fuel: "DIESEL",  trans: "AUTOMATIC", price: 2999000, mil: 16.0, safety: 5 },
    { name: "SX Diesel AT",  fuel: "DIESEL",  trans: "AUTOMATIC", price: 3399000, mil: 16.0, safety: 5 },
  ]},
  { brand: "Hyundai", model: "Ioniq 5",      body: "SUV",      engine: "Electric", power: "214 bhp",  torque: "350 Nm", seats: 5, year: 2023, variants: [
    { name: "RWD Electric",  fuel: "ELECTRIC", trans: "AUTOMATIC", price: 4595000, mil: 6.5, safety: 5 },
  ]},

  // ═══════════════════════  HONDA  ═══════════════════════
  { brand: "Honda", model: "Amaze",        body: "SEDAN",    engine: "1199 cc",  power: "88 bhp",   torque: "110 Nm", seats: 5, year: 2023, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 749000,   mil: 19.0, safety: 4 },
    { name: "V CVT",         fuel: "PETROL",  trans: "CVT",      price: 849000,   mil: 18.5, safety: 4 },
    { name: "VX CVT",        fuel: "PETROL",  trans: "CVT",      price: 949000,   mil: 18.0, safety: 4 },
  ]},
  { brand: "Honda", model: "City",         body: "SEDAN",    engine: "1498 cc",  power: "119 bhp",  torque: "145 Nm", seats: 5, year: 2023, variants: [
    { name: "V MT",          fuel: "PETROL",  trans: "MANUAL",   price: 1249000,  mil: 18.4, safety: 5 },
    { name: "V CVT",         fuel: "PETROL",  trans: "CVT",      price: 1379000,  mil: 17.8, safety: 5 },
    { name: "ZX CVT",        fuel: "PETROL",  trans: "CVT",      price: 1499000,  mil: 17.8, safety: 5 },
    { name: "VX Hybrid e-CVT", fuel: "HYBRID", trans: "CVT",     price: 1549000,  mil: 27.0, safety: 5 },
  ]},
  { brand: "Honda", model: "Elevate",      body: "SUV",      engine: "1498 cc",  power: "119 bhp",  torque: "145 Nm", seats: 5, year: 2023, variants: [
    { name: "V MT",          fuel: "PETROL",  trans: "MANUAL",   price: 1199000,  mil: 16.5, safety: 5 },
    { name: "V CVT",         fuel: "PETROL",  trans: "CVT",      price: 1329000,  mil: 15.5, safety: 5 },
    { name: "ZX CVT",        fuel: "PETROL",  trans: "CVT",      price: 1599000,  mil: 15.5, safety: 5 },
  ]},
  { brand: "Honda", model: "WR-V",         body: "SUV",      engine: "1199 cc",  power: "88 bhp",   torque: "110 Nm", seats: 5, year: 2023, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 899000,   mil: 17.5, safety: 4 },
    { name: "VX MT",         fuel: "PETROL",  trans: "MANUAL",   price: 1049000,  mil: 17.0, safety: 4 },
  ]},

  // ═══════════════════════  TATA  ═══════════════════════
  { brand: "Tata", model: "Tiago",        body: "HATCHBACK", engine: "1199 cc",  power: "84 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "XE MT",         fuel: "PETROL",  trans: "MANUAL",   price: 549000,   mil: 19.8, safety: 4 },
    { name: "XZ+ AMT",       fuel: "PETROL",  trans: "AMT",      price: 749000,   mil: 19.2, safety: 4 },
  ]},
  { brand: "Tata", model: "Tiago EV",     body: "HATCHBACK", engine: "Electric", power: "73 bhp",   torque: "140 Nm", seats: 5, year: 2023, variants: [
    { name: "XE Electric",   fuel: "ELECTRIC", trans: "AUTOMATIC", price: 899000,  mil: 7.5, safety: 4 },
    { name: "XZ+ Electric",  fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1149000, mil: 7.0, safety: 4 },
  ]},
  { brand: "Tata", model: "Altroz",       body: "HATCHBACK", engine: "1199 cc",  power: "84 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "XE MT",         fuel: "PETROL",  trans: "MANUAL",   price: 699000,   mil: 18.5, safety: 5 },
    { name: "XZ Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 949000,   mil: 22.0, safety: 5 },
    { name: "XZ CNG MT",     fuel: "CNG",     trans: "MANUAL",   price: 799000,   mil: 26.0, safety: 5 },
  ]},
  { brand: "Tata", model: "Punch",        body: "SUV",      engine: "1199 cc",  power: "84 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "Adventure MT",  fuel: "PETROL",  trans: "MANUAL",   price: 649000,   mil: 19.0, safety: 5 },
    { name: "Accomplished AMT", fuel: "PETROL", trans: "AMT",    price: 779000,   mil: 18.5, safety: 5 },
    { name: "Creative AMT",  fuel: "PETROL",  trans: "AMT",      price: 849000,   mil: 18.5, safety: 5 },
  ]},
  { brand: "Tata", model: "Punch EV",     body: "SUV",      engine: "Electric", power: "120 bhp",  torque: "190 Nm", seats: 5, year: 2024, variants: [
    { name: "Adventure Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1249000, mil: 7.2, safety: 5 },
    { name: "Empowered Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1499000, mil: 7.0, safety: 5 },
  ]},
  { brand: "Tata", model: "Nexon",        body: "SUV",      engine: "1199 cc",  power: "118 bhp",  torque: "170 Nm", seats: 5, year: 2023, variants: [
    { name: "Smart MT",      fuel: "PETROL",  trans: "MANUAL",   price: 849000,   mil: 17.0, safety: 5 },
    { name: "Fearless DCT",  fuel: "PETROL",  trans: "DCT",      price: 1099000,  mil: 17.5, safety: 5 },
    { name: "Fearless Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 1249000, mil: 22.0, safety: 5 },
    { name: "Creative Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 1449000, mil: 22.0, safety: 5 },
  ]},
  { brand: "Tata", model: "Nexon EV",     body: "SUV",      engine: "Electric", power: "141 bhp",  torque: "215 Nm", seats: 5, year: 2023, variants: [
    { name: "Smart Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1499000, mil: 7.0, safety: 5 },
    { name: "Fearless Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1699000, mil: 7.0, safety: 5 },
  ]},
  { brand: "Tata", model: "Harrier",      body: "SUV",      engine: "1956 cc",  power: "167 bhp",  torque: "350 Nm", seats: 5, year: 2023, variants: [
    { name: "XE Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 1549000,  mil: 16.0, safety: 5 },
    { name: "XZ+ Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 2249000,  mil: 14.0, safety: 5 },
    { name: "Fearless Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 2399000, mil: 14.0, safety: 5 },
  ]},
  { brand: "Tata", model: "Safari",       body: "SUV",      engine: "1956 cc",  power: "167 bhp",  torque: "350 Nm", seats: 7, year: 2023, variants: [
    { name: "XE Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 1699000,  mil: 16.0, safety: 5 },
    { name: "XZ+ Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 2549000,  mil: 14.5, safety: 5 },
  ]},

  // ═══════════════════════  MAHINDRA  ═══════════════════════
  { brand: "Mahindra", model: "XUV300",    body: "SUV",      engine: "1197 cc",  power: "108 bhp",  torque: "200 Nm", seats: 5, year: 2023, variants: [
    { name: "W4 Turbo MT",   fuel: "PETROL",  trans: "MANUAL",   price: 949000,   mil: 17.0, safety: 5 },
    { name: "W6 Diesel AMT", fuel: "DIESEL",  trans: "AMT",      price: 1249000,  mil: 20.0, safety: 5 },
    { name: "W8 Diesel AMT", fuel: "DIESEL",  trans: "AMT",      price: 1349000,  mil: 20.0, safety: 5 },
  ]},
  { brand: "Mahindra", model: "XUV400",    body: "SUV",      engine: "Electric", power: "147 bhp",  torque: "310 Nm", seats: 5, year: 2023, variants: [
    { name: "EL Electric",   fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1649000, mil: 6.8, safety: 5 },
    { name: "EL Pro Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 1799000, mil: 6.5, safety: 5 },
  ]},
  { brand: "Mahindra", model: "XUV700",    body: "SUV",      engine: "1997 cc",  power: "197 bhp",  torque: "380 Nm", seats: 7, year: 2023, variants: [
    { name: "MX Turbo MT",   fuel: "PETROL",  trans: "MANUAL",   price: 1499000,  mil: 15.0, safety: 5 },
    { name: "AX3 Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 1849000,  mil: 17.0, safety: 5 },
    { name: "AX5 Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 2149000,  mil: 17.0, safety: 5 },
    { name: "AX7 Diesel AT AWD", fuel: "DIESEL", trans: "AUTOMATIC", price: 2649000, mil: 16.0, safety: 5 },
  ]},
  { brand: "Mahindra", model: "Scorpio N",  body: "SUV",      engine: "1997 cc",  power: "197 bhp",  torque: "380 Nm", seats: 7, year: 2023, variants: [
    { name: "Z4 Turbo MT",   fuel: "PETROL",  trans: "MANUAL",   price: 1399000,  mil: 15.0, safety: 5 },
    { name: "Z8 Diesel AT",  fuel: "DIESEL",  trans: "AUTOMATIC", price: 2249000,  mil: 14.5, safety: 5 },
    { name: "Z8L Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 2449000,  mil: 14.0, safety: 5 },
  ]},
  { brand: "Mahindra", model: "Thar",       body: "SUV",      engine: "1497 cc",  power: "115 bhp",  torque: "300 Nm", seats: 4, year: 2023, variants: [
    { name: "LX Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 1349000,  mil: 15.0, safety: 4 },
    { name: "AX Turbo AT",   fuel: "PETROL",  trans: "AUTOMATIC", price: 1749000,  mil: 13.0, safety: 4 },
  ]},
  { brand: "Mahindra", model: "Bolero",     body: "SUV",      engine: "1493 cc",  power: "75 bhp",   torque: "210 Nm", seats: 7, year: 2023, variants: [
    { name: "B4 Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 979000,   mil: 16.0, safety: 3 },
  ]},
  { brand: "Mahindra", model: "Bolero Neo", body: "SUV",     engine: "1493 cc",  power: "108 bhp",  torque: "260 Nm", seats: 7, year: 2023, variants: [
    { name: "N8 Diesel MT",  fuel: "DIESEL",  trans: "MANUAL",   price: 1149000,  mil: 17.0, safety: 4 },
  ]},

  // ═══════════════════════  KIA  ═══════════════════════
  { brand: "Kia", model: "Sonet",        body: "SUV",      engine: "1197 cc",  power: "81 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "HTE MT",        fuel: "PETROL",  trans: "MANUAL",   price: 799000,   mil: 18.5, safety: 4 },
    { name: "HTK+ iMT",      fuel: "PETROL",  trans: "MANUAL",   price: 929000,   mil: 18.0, safety: 4 },
    { name: "HTX DCT",       fuel: "PETROL",  trans: "DCT",      price: 1199000,  mil: 18.0, safety: 4 },
    { name: "GTX+ Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 1499000, mil: 22.0, safety: 4 },
  ]},
  { brand: "Kia", model: "Seltos",       body: "SUV",      engine: "1497 cc",  power: "113 bhp",  torque: "144 Nm", seats: 5, year: 2023, variants: [
    { name: "HTE MT",        fuel: "PETROL",  trans: "MANUAL",   price: 1099000,  mil: 17.0, safety: 5 },
    { name: "HTK Diesel iMT", fuel: "DIESEL", trans: "MANUAL",   price: 1299000,  mil: 22.0, safety: 5 },
    { name: "HTX Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 1649000, mil: 21.0, safety: 5 },
    { name: "GTX+ DCT",      fuel: "PETROL",  trans: "DCT",      price: 1949000,  mil: 16.0, safety: 5 },
  ]},
  { brand: "Kia", model: "Carens",       body: "MUV",      engine: "1497 cc",  power: "113 bhp",  torque: "144 Nm", seats: 7, year: 2023, variants: [
    { name: "Premium MT",    fuel: "PETROL",  trans: "MANUAL",   price: 1099000,  mil: 17.0, safety: 5 },
    { name: "Prestige DCT",  fuel: "PETROL",  trans: "DCT",      price: 1499000,  mil: 16.5, safety: 5 },
    { name: "Luxury Diesel AT", fuel: "DIESEL", trans: "AUTOMATIC", price: 1899000, mil: 20.0, safety: 5 },
  ]},
  { brand: "Kia", model: "EV6",          body: "SUV",      engine: "Electric", power: "225 bhp",  torque: "350 Nm", seats: 5, year: 2023, variants: [
    { name: "GT Line Electric", fuel: "ELECTRIC", trans: "AUTOMATIC", price: 6099000, mil: 6.5, safety: 5 },
  ]},

  // ═══════════════════════  TOYOTA  ═══════════════════════
  { brand: "Toyota", model: "Glanza",        body: "HATCHBACK", engine: "1197 cc", power: "88 bhp",   torque: "113 Nm", seats: 5, year: 2023, variants: [
    { name: "G MT",          fuel: "PETROL",  trans: "MANUAL",   price: 749000,   mil: 20.0, safety: 4 },
    { name: "V CVT",         fuel: "PETROL",  trans: "CVT",      price: 949000,   mil: 19.0, safety: 4 },
  ]},
  { brand: "Toyota", model: "Urban Cruiser Taisor", body: "SUV", engine: "1197 cc", power: "88 bhp", torque: "113 Nm", seats: 5, year: 2024, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 849000,   mil: 20.0, safety: 4 },
    { name: "V AMT",         fuel: "PETROL",  trans: "AMT",      price: 999000,   mil: 19.0, safety: 4 },
  ]},
  { brand: "Toyota", model: "Hyryder",        body: "SUV",      engine: "1490 cc",  power: "101 bhp",  torque: "135 Nm", seats: 5, year: 2023, variants: [
    { name: "S MT",          fuel: "PETROL",  trans: "MANUAL",   price: 1099000,  mil: 21.0, safety: 5 },
    { name: "V Hybrid e-CVT", fuel: "HYBRID", trans: "CVT",      price: 1649000,  mil: 27.0, safety: 5 },
    { name: "G Hybrid e-CVT", fuel: "HYBRID", trans: "CVT",      price: 1799000,  mil: 27.0, safety: 5 },
  ]},
  { brand: "Toyota", model: "Innova Hycross", body: "MUV",     engine: "2393 cc",  power: "148 bhp",  torque: "343 Nm", seats: 7, year: 2023, variants: [
    { name: "G Diesel MT",   fuel: "DIESEL",  trans: "MANUAL",   price: 1999000,  mil: 15.0, safety: 5 },
    { name: "VX Diesel AT",  fuel: "DIESEL",  trans: "AUTOMATIC", price: 2499000,  mil: 14.0, safety: 5 },
    { name: "ZX Hybrid CVT", fuel: "HYBRID",  trans: "CVT",      price: 2999000,  mil: 18.0, safety: 5 },
  ]},
  { brand: "Toyota", model: "Fortuner",       body: "SUV",      engine: "2694 cc",  power: "164 bhp",  torque: "245 Nm", seats: 7, year: 2023, variants: [
    { name: "4x2 Petrol MT", fuel: "PETROL",  trans: "MANUAL",   price: 3399000,  mil: 11.0, safety: 5 },
    { name: "4x4 Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 4249000,  mil: 12.0, safety: 5 },
  ]},
  { brand: "Toyota", model: "Camry",          body: "SEDAN",    engine: "2487 cc",  power: "174 bhp",  torque: "221 Nm", seats: 5, year: 2023, variants: [
    { name: "Hybrid e-CVT",  fuel: "HYBRID",  trans: "CVT",      price: 4799000,  mil: 22.0, safety: 5 },
  ]},
  { brand: "Toyota", model: "Hilux",          body: "PICKUP_TRUCK", engine: "2755 cc", power: "201 bhp", torque: "500 Nm", seats: 5, year: 2023, variants: [
    { name: "4x4 Diesel AT", fuel: "DIESEL",  trans: "AUTOMATIC", price: 3799000,  mil: 12.0, safety: 5 },
  ]},
];

// ---------------------------------------------------------------------------
// REVIEW POOLS — grouped by body type for contextual relevance
// ---------------------------------------------------------------------------
const REVIEWS = {
  HATCHBACK: {
    high: [
      "Perfect city car — easy to park, nippy in traffic, and sips fuel.",
      "Excellent fuel economy for daily commuting. The engine is smooth and responsive.",
      "Great little car! Zips through city traffic effortlessly and parking is a breeze.",
      "Very impressed with the mileage. Perfect for someone who drives daily in the city.",
      "The turning radius is amazing for tight spots. Perfect urban runabout.",
      "Surprisingly spacious inside for a compact hatchback. Very practical.",
      "Fun to drive with great handling. The steering is light and precise.",
      "Best value-for-money hatchback right now. Loaded with features at this price.",
    ],
    mid: [
      "Decent car overall but cabin noise is noticeable at highway speeds.",
      "Good city commuter but rear seat space is tight for three adults.",
      "Average performance on highways. City driving is where this car shines.",
      "The engine feels a bit underpowered when fully loaded with passengers.",
      "Good first car. Features are adequate for the price but nothing extraordinary.",
      "Interior quality is decent but some plastic bits could be better finished.",
    ],
    low: [
      "Engine feels sluggish, especially with AC on. Struggles on inclines.",
      "Poor rear legroom. Tall passengers will find it very uncomfortable.",
      "Not happy with the fuel efficiency. Much lower than advertised figures.",
      "Build quality is average at best. Panel gaps are noticeable.",
    ],
  },
  SEDAN: {
    high: [
      "Excellent highway cruiser. Stable at triple-digit speeds with great ride quality.",
      "Spacious and comfortable rear seat. Perfect for family outings and long drives.",
      "The boot is massive — swallowed all our luggage for a week-long trip.",
      "Superb ride quality. Absorbs bumps and potholes with ease.",
      "Refined and quiet cabin at high speeds. Makes long journeys very relaxing.",
      "The handling inspires confidence on winding roads. A driver's car.",
      "Great balance of comfort and performance. The suspension is well-tuned.",
      "Rear seat comfort is exceptional for this segment. Very plush.",
    ],
    mid: [
      "Decent car but ground clearance is a concern on bad roads.",
      "Good highway manners but low-speed ride is a bit stiff.",
      "Boot space is adequate but the opening could be wider for large bags.",
      "Engine is refined but could use a bit more punch for highway overtakes.",
      "Cabin is well laid out but rear AC vents should have been standard.",
    ],
    low: [
      "Low ground clearance is a real issue on Indian roads. Scrapes on speed breakers.",
      "Fuel efficiency is disappointing for a petrol sedan. Expected much better.",
      "Cabin feels a bit cramped for taller passengers, especially at the rear.",
    ],
  },
  SUV: {
    high: [
      "Commanding driving position with great road visibility. Feels very safe.",
      "Excellent ground clearance — never worry about bad roads or waterlogging.",
      "The road presence is fantastic. Solid and planted at all speeds.",
      "Spacious and versatile. The high seating makes ingress and exit very easy.",
      "A perfect family SUV — safe, spacious, and confidence-inspiring to drive.",
      "The suspension soaks up everything Indian roads throw at it. Superb ride.",
      "Great highway tourer. The high seating position reduces fatigue on long trips.",
      "Impressive off-road capability combined with daily drivability. Best of both worlds.",
    ],
    mid: [
      "Good SUV but fuel efficiency takes a hit in stop-and-go city traffic.",
      "The size can be intimidating in narrow lanes. Parking takes some getting used to.",
      "Body roll is noticeable around corners compared to a sedan.",
      "Nice road presence but the engine feels strained at high RPMs.",
      "Decent off-road capability but the tires are more road-biased.",
    ],
    low: [
      "Heavy on fuel in city conditions. The mileage is way below claimed figures.",
      "Too bulky for daily city use. Maneuvering in traffic is a handful.",
      "The stiff ride at low speeds makes it uncomfortable on broken city roads.",
    ],
  },
  MUV: {
    high: [
      "Perfect family vehicle. Every row has generous space for adults.",
      "The flexible seating arrangement is a game-changer for large families.",
      "Took six adults on a road trip and everyone was comfortable. Brilliant.",
      "Great for intercity travel. The ride quality at highway speeds is exceptional.",
      "The third row actually seats adults comfortably, unlike most in this segment.",
      "Excellent practicality. Fold the seats and you have a mini-van for luggage.",
    ],
    mid: [
      "Good family car but the engine works hard when fully loaded with luggage.",
      "Spacious interior but some of the plastics feel budget-grade.",
      "Well-suited for family duties but the fuel economy suffers with full load.",
      "Comfortable on highways but the length makes city parking a challenge.",
    ],
    low: [
      "Underpowered when fully loaded with 7 passengers and luggage.",
      "Poor fuel economy in city driving. Only makes sense for highway use.",
      "Too long and cumbersome for daily use in congested urban areas.",
    ],
  },
  PICKUP_TRUCK: {
    high: [
      "Unmatched capability for both work and adventure. Built like a tank.",
      "The raw power and torque make it perfect for towing and hauling.",
      "Built for the toughest conditions. Absolutely unstoppable off-road.",
      "Massive payload capacity and rugged ladder-frame construction.",
    ],
    mid: [
      "Capable vehicle but too large and stiff for daily city commutes.",
      "Great for work purposes but rear passenger comfort is compromised.",
    ],
    low: [
      "Very stiff ride when unladen. Only comfortable with a load in the bed.",
      "Fuel efficiency is terrible for daily use. Purpose-built for specific needs.",
    ],
  },
};

const AUTHORS = [
  "Arjun Sharma", "Priya Patel", "Rahul Verma", "Sneha Reddy", "Vikram Singh",
  "Ananya Gupta", "Rohit Kumar", "Divya Nair", "Amit Joshi", "Kavita Deshmukh",
  "Sanjay Menon", "Pooja Iyer", "Deepak Chopra", "Neha Kapoor", "Suresh Babu",
  "Lakshmi Narayan", "Manoj Tiwari", "Meera Rajan", "Praveen Shetty", "Nandini Rao",
  "Ravi Shankar", "Shweta Jain", "Karthik Subramanian", "Anjali Bose", "Vivek Agarwal",
  "Sunita Devi", "Rajesh Khanna", "Preeti Saxena", "Arvind Krishnan", "Nalini Pillai",
  "Gaurav Mehta", "Deepika Srivastava", "Harsha Vardhan", "Lalita Prasad", "Mahesh Hegde",
  "Revathi Krishnan", "Siddharth Ghosh", "Tara Banerjee", "Umesh Patil", "Vani Srinivasan",
  "Akshay Kulkarni", "Bhavana Joshi", "Chandan Roy", "Durga Prasad", "Esha Bhat",
  "Farhan Qureshi", "Geeta Nair", "Harish Malhotra", "Isha Saxena", "Jatin Desai",
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate 4-7 reviews per car, weighted by safety rating
function buildReviewsForCar(carId, safetyRating, bodyType) {
  const pool = REVIEWS[bodyType] || REVIEWS.HATCHBACK;
  const count = rand(4, 7);
  const results = [];

  // Rating distribution based on safety
  const ratingWeights = {
    5: { 5: 45, 4: 35, 3: 15, 2: 4, 1: 1 },
    4: { 5: 30, 4: 40, 3: 20, 2: 8, 1: 2 },
    3: { 5: 15, 4: 30, 3: 35, 2: 15, 1: 5 },
    2: { 5: 5,  4: 20, 3: 35, 2: 25, 1: 15 },
    1: { 5: 2,  4: 10, 3: 25, 2: 35, 1: 28 },
  };

  const weights = ratingWeights[safetyRating] || ratingWeights[3];
  const ratingPool = [];
  for (const [rating, weight] of Object.entries(weights)) {
    for (let i = 0; i < weight; i++) ratingPool.push(Number(rating));
  }

  for (let i = 0; i < count; i++) {
    const rating = pick(ratingPool);
    let textPool;
    if (rating >= 4) textPool = pool.high;
    else if (rating >= 3) textPool = pool.mid;
    else textPool = pool.low;

    results.push({
      carId,
      rating,
      reviewText: pick(textPool),
      authorName: pick(AUTHORS),
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// MAIN SEED
// ---------------------------------------------------------------------------
async function main() {
  console.log("Cleaning existing data...");
  await prisma.recommendationHistory.deleteMany();
  await prisma.review.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.car.deleteMany();
  await prisma.brand.deleteMany();

  // --- Brands ---
  console.log("Creating brands...");
  await prisma.brand.createMany({ data: BRANDS });
  const brandRecords = await prisma.brand.findMany();
  const brandMap = {};
  for (const b of brandRecords) brandMap[b.name] = b.id;

  // --- Cars (expand model definitions) ---
  console.log("Creating cars...");
  const carRows = [];
  for (const def of MODEL_DEFS) {
    const brandId = brandMap[def.brand];
    if (!brandId) throw new Error(`Brand not found: ${def.brand}`);
    for (const v of def.variants) {
      carRows.push({
        brandId,
        model: def.model,
        variant: v.name,
        price: v.price,
        mileage: v.mil,
        safetyRating: v.safety,
        fuelType: v.fuel,
        transmission: v.trans,
        bodyType: def.body,
        engine: def.engine,
        power: def.power,
        torque: def.torque,
        seatingCapacity: def.seats,
        launchYear: def.year,
        imageUrl: `/images/cars/${def.brand.toLowerCase().replace(/\s+/g, "-")}-${def.model.toLowerCase().replace(/\s+/g, "-")}.jpg`,
      });
    }
  }
  await prisma.car.createMany({ data: carRows });

  const carRecords = await prisma.car.findMany({ orderBy: { id: "asc" } });
  console.log(`Created ${carRecords.length} cars.`);

  // --- Reviews (body-type-aware, safety-weighted) ---
  console.log("Creating reviews...");
  let allReviews = [];
  for (const car of carRecords) {
    const reviews = buildReviewsForCar(car.id, car.safetyRating, car.bodyType);
    allReviews = allReviews.concat(reviews);
  }
  await prisma.review.createMany({ data: allReviews });
  console.log(`Created ${allReviews.length} reviews.`);

  // --- Summary ---
  const brandCount = await prisma.brand.count();
  const carCount = await prisma.car.count();
  const reviewCount = await prisma.review.count();

  console.log("\n═══════════════════════════════════════");
  console.log("  SEED COMPLETE");
  console.log(`  Brands:  ${brandCount}`);
  console.log(`  Cars:    ${carCount}`);
  console.log(`  Reviews: ${reviewCount}`);
  console.log("═══════════════════════════════════════\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
