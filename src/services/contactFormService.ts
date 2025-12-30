import type { ContactFormData, FormValue } from '../schemas'

const MASTER_BLUEPRINT = {
  'form-name': 'contact',
  'bot-field': '',
  name: '',
  email: '',
  organizationName: '', // Optional
  organizationDescription: '', // Optional
  referralSource: '', // Optional
  message: '',
  marketingConsent: 'false', // Always a string
}

// Replace 'any' with the specific union type
const encode = (data: Record<string, FormValue>): string => {
  const params = new URLSearchParams()

  Object.entries(data).forEach(([key, value]) => {
    // If value is null/undefined, send an empty string instead of skipping
    if (value === null || value === undefined) {
      params.append(key, '')
    } else {
      // Handle booleans specifically to ensure 'true'/'false' strings
      params.append(key, String(value))
    }
  })

  return params.toString()
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const apiEnabled = import.meta.env.VITE_CONTACT_API_ENABLED
  if (apiEnabled === 'false' || (import.meta.env.MODE === 'test' && apiEnabled !== 'true')) {
    return Promise.resolve()
  }

  try {
    // CHANGE 1: Post to the site root ("/")
    // CHANGE 2: Send URL-encoded data, NOT JSON
    const normalizedData = {
      ...MASTER_BLUEPRINT,
      ...data,
    }

    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // CHANGE 3: Include the 'form-name' field (must match your HTML form name attribute)
      body: encode({
        ...normalizedData,
      }),
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }

    // Note: Netlify returns a 200 OK for successful form submissions.
    // It usually does NOT return JSON unless you redirect to a JSON file.
    // Usually, just checking response.ok is sufficient here.
    // const responseParsed = (await response.json()) as ContactFormResponse
    console.log(response)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while submitting the contact form')
  }
}
