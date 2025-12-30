import { z } from 'zod'

/**
 * Maximum field lengths for contact form fields.
 * These constants are used for validation and HTML attributes to ensure consistency.
 */
export const CONTACT_FORM_MAX_LENGTHS = {
  name: 100, // Full name (first + last), [PII]
  email: 254, // RFC 5321 standard, [PII]
  organizationName: 150, // Organization names can be long but 150 is sufficient
  organizationDescription: 2000,
  referralSource: 100, // Referral sources are typically short [PII]
  message: 5000, // may contain [PII]
} as const

/**
 * Contact form schema for validation and type inference.
 * This is the single source of truth for the contact form data structure.
 *
 * Both frontend and backend should import and use this schema to ensure
 * type safety and validation consistency.
 */
export const contactFormBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(
      CONTACT_FORM_MAX_LENGTHS.name,
      `Name must be ${CONTACT_FORM_MAX_LENGTHS.name} characters or less`,
    ), // [PII]
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(
      CONTACT_FORM_MAX_LENGTHS.email,
      `Email must be ${CONTACT_FORM_MAX_LENGTHS.email} characters or less`,
    )
    .refine(
      (val) => {
        // Only validate email format if email is not empty (min check already passed)
        if (val.length === 0) return true
        return z.email().safeParse(val).success
      },
      {
        message: 'Please enter a valid email address',
      },
    ), // [PII]
  organizationName: z
    .string()
    .trim()
    .max(
      CONTACT_FORM_MAX_LENGTHS.organizationName,
      `Organization name must be ${CONTACT_FORM_MAX_LENGTHS.organizationName} characters or less`,
    )
    .optional(),
  organizationDescription: z
    .string()
    .trim()
    .max(
      CONTACT_FORM_MAX_LENGTHS.organizationDescription,
      `Organization description must be ${CONTACT_FORM_MAX_LENGTHS.organizationDescription} characters or less`,
    )
    .optional(),
  referralSource: z
    .string()
    .trim()
    .max(
      CONTACT_FORM_MAX_LENGTHS.referralSource,
      `Referral source must be ${CONTACT_FORM_MAX_LENGTHS.referralSource} characters or less`,
    )
    .optional(), // [PII]
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(
      CONTACT_FORM_MAX_LENGTHS.message,
      `Message must be ${CONTACT_FORM_MAX_LENGTHS.message} characters or less`,
    ),
  marketingConsent: z.preprocess((val) => {
    if (typeof val === 'string') {
      return val === 'true' || val === 'on'
    }
    return val
  }, z.boolean().default(false)),
})

/**
 * FRONTEND SCHEMA (The submission data)
 * This extends the base to include the transport-only reCAPTCHA token.
 */
export const contactFormFrontendSchema = contactFormBaseSchema.extend({
  'g-recaptcha-response': z.string().min(1, 'Please complete the reCAPTCHA'),
})

// Types
export type ContactFormBaseData = z.infer<typeof contactFormBaseSchema>
export type ContactFormFrontendData = z.infer<typeof contactFormFrontendSchema>

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
}
