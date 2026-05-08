import OpenAI from "openai";
import { z } from "zod";
import type { AdviceOutput } from "./types";

export const AdviceOutputSchema: z.ZodType<AdviceOutput> = z.object({
  greeting: z.string(),
  terse_summary: z.string(),
  detailed_explanation: z.string(),
  did_you_know: z.string(),
  jargon_glossary: z.record(z.string(), z.string()),
  objective_function_label: z.enum(["platform_revenue", "client_risk_adjusted_return"]),
});

export function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL ?? "https://api.deepseek.com/v1",
    timeout: 12_000,
    maxRetries: 0,
  });
}

export async function callAdvisor(
  systemPrompt: string,
  userPrompt: string,
): Promise<AdviceOutput> {
  const client = getClient();
  const model = process.env.OPENAI_MODEL ?? "deepseek-v4-flash";
  const controller = new AbortController();
  const hardLimit = setTimeout(() => controller.abort(), 12_000);
  try {
    const resp = await client.chat.completions.create(
      {
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
      },
      { signal: controller.signal },
    );
    const content = resp.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    return AdviceOutputSchema.parse(parsed);
  } finally {
    clearTimeout(hardLimit);
  }
}
