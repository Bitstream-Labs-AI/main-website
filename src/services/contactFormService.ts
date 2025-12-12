import type { ContactFormData } from '../schemas/contact-form'

/**
 * API response types
 */
interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Submits contact form data to the backend API.
 *
 * @param data - The contact form data to submit
 * @throws {Error} If the API call fails or returns an error
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  // Check if API calls are disabled (for testing)
  const apiEnabled = import.meta.env.VITE_CONTACT_API_ENABLED
  // If explicitly set to 'false', or in test mode and not explicitly enabled, disable API calls
  if (apiEnabled === 'false' || (import.meta.env.MODE === 'test' && apiEnabled !== 'true')) {
    // No-op for testing - return immediately without making HTTP request
    return Promise.resolve()
  }

  // Get API endpoint from environment variable
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL
  if (!apiUrl) {
    throw new Error('Contact form API endpoint is not configured. Please set VITE_CONTACT_API_URL.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      let errorMessage = 'Failed to submit contact form'

      try {
        const errorData: ContactFormResponse = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage
      }

      throw new Error(errorMessage)
    }

    // Parse response to check for success
    const result: ContactFormResponse = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'Failed to submit contact form')
    }
  } catch (error) {
    // Re-throw if it's already an Error, otherwise wrap it
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while submitting the contact form')
  }
}
