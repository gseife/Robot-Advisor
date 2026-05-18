import type { Persona } from "./types";

export const PERSONAS: Persona[] = [
  {
    id: "marco",
    displayName: "Marco, 27",
    blurb: "M.A. Political Science. No finance background, saving for a Swiss house.",
    age: 27,
    annual_income_chf: 150000,
    initial_investment_chf: 80000,
    savings_goal: "house",
    goal_amount_chf: 600000,
    horizon_years: 8,
    risk_tolerance: 8,
    free_text_goal:
      "I want to save for the downpayment for a house in Switzerland that is going to cost 2000000 and thus I want to save up 600000 for the downpayment.",
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
