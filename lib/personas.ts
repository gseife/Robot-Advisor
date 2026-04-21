import type { Persona } from "./types";

export const PERSONAS: Persona[] = [
  {
    id: "marco",
    displayName: "Marco, 26",
    blurb: "M.A. Banking & Finance. Aggressive growth for a Zurich flat.",
    age: 26,
    annual_income_chf: 85000,
    savings_goal: "house",
    horizon_years: 5,
    risk_tolerance: 8,
    free_text_goal:
      "Been watching markets for years — want to grow aggressively for a Zurich property down payment.",
  },
  {
    id: "zoe",
    displayName: "Zoë, 24",
    blurb: "M.A. International Affairs. First-time investor, cares about ESG.",
    age: 24,
    annual_income_chf: 18000,
    savings_goal: "general",
    horizon_years: 10,
    risk_tolerance: 4,
    free_text_goal:
      "I inherited CHF 15,000 from my grandmother. I don't really understand stocks but I care about sustainability.",
  },
  {
    id: "dragan",
    displayName: "Dragan, 28",
    blurb: "M.B.I., moved to CH for studies. Wants safe long-term growth.",
    age: 28,
    annual_income_chf: 22000,
    savings_goal: "retirement",
    horizon_years: 15,
    risk_tolerance: 3,
    free_text_goal:
      "I moved to Switzerland for my degree with savings from my previous job. I want to invest, but safely.",
  },
];
