import { z } from 'zod'

// Define valid styles for Intl.DateTimeFormat
const styleSchema = z.enum(['full', 'long', 'medium', 'short'])

const envSchema = z.object({
  // Required: The Google Chat Webhook URL
  GOOGLE_CHAT_WEBHOOK_URL: z.url(),

  // Optional: Localization settings (with defaults)
  TIME_ZONE: z.string().default('America/Los_Angeles'),
  LOCALE: z.string().default('en-US'),
  DATE_STYLE: styleSchema.default('medium'),
  TIME_STYLE: styleSchema.default('short'),
})

// Use process.env directly.
// If using Netlify Functions with the "node" type installed, this is valid.
export const config = envSchema.parse(process.env)
