import { contactFormSchema } from '../../../src/schemas/contact-form'
import { buildContactFormCard, sendGoogleChatMessage } from '../services/google-chat'

export interface HandlerResult {
  statusCode: number
  body?: string
}

/**
 * Orchestrates the contact form submission logic.
 * 1. Validates input against Zod schema
 * 2. Formats the data for Google Chat
 * 3. Sends the notification
 */
export async function handleContactSubmission(data: unknown): Promise<HandlerResult> {
  console.log('Processing Contact Form...')

  // 1. Validation Logic
  // We use safeParse to handle invalid data gracefully without throwing
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    console.warn('Validation failed:', result.error.message)

    // Return 422 (Unprocessable Entity) for validation errors
    return {
      statusCode: 422,
      body: JSON.stringify({
        error: 'Validation Failed',
        details: result.error.issues,
      }),
    }
  }

  // TypeScript now knows 'validData' matches your ContactFormData interface
  const validData = result.data

  // 2. Business Logic
  try {
    // Generate the specific payload for Google Chat
    const chatPayload = buildContactFormCard(validData)

    // Send the notification via the service layer
    await sendGoogleChatMessage(chatPayload)

    console.log(`Successfully notified Google Chat for: ${validData.email}`)

    // TODO: Add Email Service logic here (e.g., await sendAutoReply(validData))

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact processed successfully' }),
    }
  } catch (error) {
    // Strict Type Check: Verify 'error' is actually an Error object
    const errorMessage = error instanceof Error ? error.message : String(error)

    console.error('Handler Error:', errorMessage)

    // Return 500 for server errors
    // Note: If you want to prevent Netlify from retrying this function, return 200 here instead.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to communicate with notification services' }),
    }
  }
}
