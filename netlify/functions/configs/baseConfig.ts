import { z } from 'zod'

// Define valid styles for Intl.DateTimeFormat
const styleSchema = z.enum(['full', 'long', 'medium', 'short'])

const envSchema = z.object({
  // Required: The Google Chat Webhook URL
  GOOGLE_CHAT_WEBHOOK_URL: z.url(),
  // RISK:     Leaking this value would allow posting to the internal dev chat
  // RESPONSE: Revoke the URL in Google Chat Space and generate url
  //           Update env vars in Netlify

  // Optional: Localization settings (with defaults)
  TIME_ZONE: z.string().default('America/Los_Angeles'),
  LOCALE: z.string().default('en-US'),
  DATE_STYLE: styleSchema.default('medium'),
  TIME_STYLE: styleSchema.default('short'),
})

// Use process.env directly.
// If using Netlify Functions with the "node" type installed, this is valid.
export const config = envSchema.parse(process.env)

// Unset sensitive env var after use
delete process.env.GOOGLE_CHAT_WEBHOOK_URL
