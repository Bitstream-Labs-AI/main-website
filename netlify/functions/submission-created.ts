import type { Handler } from '@netlify/functions'
import { handleContactSubmission } from './handlers/contact-submission'

// Define the Handler Result type inline for simplicity
interface HandlerResult {
  statusCode: number
  body?: string
}

interface NetlifySubmissionBody {
  payload: {
    form_name: string
    number: number
    created_at: string
    data: Record<string, string | number | boolean | undefined>
  }
}

// Update the type definition to require a return value
type FormHandler = (data: unknown) => Promise<HandlerResult>

const FORM_HANDLERS: Record<string, FormHandler> = {
  contact: handleContactSubmission,
}

export const handler: Handler = async (event) => {
  // REST Pattern: 400 Bad Request (Missing Data)
  if (!event.body) {
    return { statusCode: 400, body: 'Missing request body' }
  }

  let body: NetlifySubmissionBody

  try {
    // REST Pattern: 400 Bad Request (Malformed JSON)
    console.debug(event.body)
    body = JSON.parse(event.body) as NetlifySubmissionBody
  } catch (error) {
    console.error(error)
    return { statusCode: 400, body: 'Invalid JSON format' }
  }

  const { payload } = body
  const formData = payload.data

  // Safe extraction of form name
  const formName = payload.form_name || 'unknown'
  const processingFunction = FORM_HANDLERS[formName]

  // REST Pattern: 404 Not Found (Resource/Handler does not exist)
  if (!processingFunction) {
    console.warn(`No handler found for form: "${formName}"`)
    return {
      statusCode: 404,
      body: `No handler defined for form "${formName}"`,
    }
  }

  try {
    console.log(`Routing submission #${payload.number} to ${formName} handler`)

    // Execute and return the specific status code from the handler
    const result = await processingFunction(formData)

    return {
      statusCode: result.statusCode,
      body: result.body || JSON.stringify({ message: 'Success' }),
    }
  } catch (error) {
    console.error('Server Error:', error)
    // REST Pattern: 500 Internal Server Error (Something unexpected crashed)
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }
}
