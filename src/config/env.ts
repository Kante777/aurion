export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",

  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEV: process.env.NODE_ENV === "development",

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",

  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://aurion:aurion_pass@localhost:5432/aurion_db",

  OANDA_ENV: process.env.OANDA_ENV || "practice",
  OANDA_API_KEY: process.env.OANDA_API_KEY || "",
  FCS_API_KEY: process.env.FCS_API_KEY || ""
};
