import type { ContactFormData, FormValue, ContactFormResponse } from '../schemas'

// Replace 'any' with the specific union type
const encode = (data: Record<string, FormValue>) => {
  return (
    Object.keys(data)
      // 1. Filter out undefined keys (optional fields that weren't filled)
      .filter((key) => data[key] != null)
      .map((key) => {
        // 2. Safe encoding: Ensure value is converted to a string before encoding
        // (This handles numbers/booleans correctly)
        return encodeURIComponent(key) + '=' + encodeURIComponent(String(data[key]))
      })
      .join('&')
  )
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const apiEnabled = import.meta.env.VITE_CONTACT_API_ENABLED
  if (apiEnabled === 'false' || (import.meta.env.MODE === 'test' && apiEnabled !== 'true')) {
    return Promise.resolve()
  }

  try {
    // CHANGE 1: Post to the site root ("/")
    // CHANGE 2: Send URL-encoded data, NOT JSON
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // CHANGE 3: Include the 'form-name' field (must match your HTML form name attribute)
      body: encode({
        'form-name': 'contact', // <--- CRITICAL: Must match <form name="contact">
        ...data,
      }),
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }

    // Note: Netlify returns a 200 OK for successful form submissions.
    // It usually does NOT return JSON unless you redirect to a JSON file.
    // Usually, just checking response.ok is sufficient here.
    const responseParsed = (await response.json()) as ContactFormResponse
    console.log(responseParsed)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while submitting the contact form')
  }
}
